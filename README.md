# pino-sentry-stream
A pino stream to automatically pass errors to Sentry.

## Installation
```
# npm
npm install @ips-hosting/pino-sentry-stream

# pnpm
pnpm add @ips-hosting/pino-sentry-stream

# yarn
yarn add @ips-hosting/pino-sentry-stream
```

The package is ESM-only and requires at least Node.js 20.

## Usage
```ts
import { pinoSentryStream } from '@ips-hosting/pino-sentry-stream'
import * as Sentry from '@sentry/node'
import { pino } from 'pino'
// ...

/**
 * Available options:
 * sentry (required): The Sentry SDK
 * severityMap (optional): Maps pino levels to sentry severities. See index.ts for an example and the default mapping.
 * callback (optional): (obj: { log: PinoLog; scope: Sentry.Scope; severity: Sentry.Severity }) => void | false
 * 	Called for every pino log message. Use to assign custom properties to the sentry scope. Return false to prevent that message from being sent to sentry.
 */
const sentryStream = pinoSentryStream({ sentry: Sentry });

// With pino
// All messages will directly go to Sentry.
// They won't be passed to stdout so you don't see them in your terminal.
const pinoOpts = { /* ... */ };
const pinoLogger = pino(pinoOpts, sentryStream);

// Using pino.multistream
// You can send log messages to multiple destination streams.
// In this example, log messages are sent both to stdout and Sentry, while being prettified in development.
const streams = [
	// Log everything to stdout in production, prettify in dev environments.
		{
			level: 'debug',
			stream: process.env.NODE_ENV === 'production'
				? process.stdout
				: await import('pino-pretty').then((m) => m.default.default()),
		},
		// In addition to logging to stdout, send everything starting from level info to sentry.
		{
			level: 'info',
			stream: sentryStream,
		},
]

const pinoLogger = pino(pinoOpts, pino.multiStream(streams))
```
