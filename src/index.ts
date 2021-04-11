import { Transform } from 'stream'
import * as Sentry from '@sentry/node'

export class ParsedSentryError extends Error {
	public constructor(message: string, stack?: string, type?: string) {
		super(message)

		this.stack = stack

		if (type) {
			this.name = type
		}
	}
}

export type SeverityMap = {
	[value in string | number]: Sentry.Severity
}

export const DefaultSeverityMap: SeverityMap = {
	10: Sentry.Severity.Debug, // trace
	20: Sentry.Severity.Debug, // debug
	30: Sentry.Severity.Info, // info
	40: Sentry.Severity.Warning, // warn
	50: Sentry.Severity.Error, // error
	60: Sentry.Severity.Fatal, // fatal
}

export interface PinoLog {
	[key: string]: unknown
	level: number
	time: number
	msg: string
}

export interface PinoSentryStreamOptions {
	sentry: typeof Sentry
	severityMap?: SeverityMap
	callback?: (obj: {
		log: PinoLog
		scope: Sentry.Scope
		severity: Sentry.Severity
	}) => void | false
}

export function pinoSentryStream({
	sentry,
	severityMap,
	callback,
}: PinoSentryStreamOptions) {
	return new Transform({
		objectMode: true,
		transform(log: string, enc, transformCallback) {
			// Move logging to the end of the event queue.
			setImmediate(() => {
				sentry.withScope((scope) => {
					const parsedLog = JSON.parse(log) as PinoLog
					severityMap ??= DefaultSeverityMap
					const severity = severityMap[parsedLog.level] ?? Sentry.Severity.Info

					if (callback) {
						if (callback({ log: parsedLog, scope, severity }) === false) {
							transformCallback()
							return
						}
					}

					// Assign tags
					if (typeof parsedLog.tags === 'object' && parsedLog.tags !== null) {
						for (const [tag, value] of Object.entries(parsedLog.tags)) {
							scope.setTag(tag, value)
						}
					}

					// Assign user
					if (typeof parsedLog.user === 'object' && parsedLog.user !== null) {
						scope.setUser(parsedLog.user)
					}

					// Pass every key / value pair assigned to the log that we do not handle manually to sentry.
					for (const [key, value] of Object.entries(parsedLog)) {
						if (!['level', 'time', 'msg', 'v', 'err', 'user'].includes(key)) {
							scope.setExtra(key, value)
						}
					}

					let capturedException = false

					if (
						severity === Sentry.Severity.Error ||
						severity === Sentry.Severity.Fatal
					) {
						if (typeof parsedLog.stack === 'string') {
							// The error object was given directly to a pino logger.
							// logger.error(new Error('Something went wrong.'))
							sentry.captureException(
								new ParsedSentryError(
									parsedLog.msg,
									parsedLog.stack,
									typeof parsedLog.type === 'string'
										? parsedLog.type
										: undefined
								)
							)
							capturedException = true
						} else if (
							typeof parsedLog.err === 'object' &&
							parsedLog.err !== null
						) {
							// The error object was given via an object.
							// logger.error({ err: new Error('Something went wrong.')}, 'Some additional message.')
							const err = parsedLog.err as Record<string, unknown>

							// Keep log message as an extra. The error message is used as the main message if it exists.
							if (err.message) {
								scope.setExtra('message', parsedLog.msg)
							}

							// Add error properties as extras to the sentry scope.
							for (const [key, value] of Object.entries(err)) {
								if (!['message', 'stack', 'type'].includes(key)) {
									scope.setExtra(`err.${key}`, value)
								}
							}

							sentry.captureException(
								new ParsedSentryError(
									typeof err.message === 'string' ? err.message : parsedLog.msg,
									typeof err.stack === 'string' ? err.stack : undefined,
									typeof err.type === 'string' ? err.type : undefined
								)
							)
							capturedException = true
						}
					}

					if (!capturedException) {
						if (parsedLog.err) {
							scope.setExtra('err', parsedLog.err)
						}

						sentry.captureMessage(parsedLog.msg, severity)
					}

					transformCallback()
				})
			})
		},
	})
}
