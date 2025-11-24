## [3.1.3](https://github.com/IPS-Hosting/pino-sentry-stream/compare/v3.1.2...v3.1.3) (2025-11-24)


### Bug Fixes

* use trusted publishing ([7cc3659](https://github.com/IPS-Hosting/pino-sentry-stream/commit/7cc36592ccf8465617de5b1a2bd53048019a9cef))

## [3.1.2](https://github.com/IPS-Hosting/pino-sentry-stream/compare/v3.1.1...v3.1.2) (2025-11-24)


### Bug Fixes

* support @sentry/core v10 (use fix commit type for peer dependency updates) ([7bef641](https://github.com/IPS-Hosting/pino-sentry-stream/commit/7bef641a860a7068808b9f0876b0bba3cf251b27))

## [3.1.1](https://github.com/IPS-Hosting/pino-sentry-stream/compare/v3.1.0...v3.1.1) (2025-02-15)


### Bug Fixes

* **types:** pick only required methods from @sentry/core ([11cd11c](https://github.com/IPS-Hosting/pino-sentry-stream/commit/11cd11cbb23c731fb3e7a41572f2f8c04833d5ac))

# [3.1.0](https://github.com/IPS-Hosting/pino-sentry-stream/compare/v3.0.0...v3.1.0) (2025-02-15)


### Bug Fixes

* remove wrapping sentry in setImmediate to support non node.js environments ([6c6ad85](https://github.com/IPS-Hosting/pino-sentry-stream/commit/6c6ad85219c7e6d62eb4a77005037b5ceea74902))


### Features

* support sentry 9 and support other runtimes than node.js ([03c2f5c](https://github.com/IPS-Hosting/pino-sentry-stream/commit/03c2f5cfce18dcbf81009cea772f3345f1b6b750))

# [3.0.0](https://github.com/IPS-Hosting/pino-sentry-stream/compare/v2.0.0...v3.0.0) (2024-06-05)


### Features

* support @sentry/node 8 ([67e7660](https://github.com/IPS-Hosting/pino-sentry-stream/commit/67e7660b9204d38fe1dfbfa16ef02ed8da149500))


### BREAKING CHANGES

* At least Node.js 20 is now required
* The package is now ESM-only

Signed-off-by: Pascal Sthamer <10992664+P4sca1@users.noreply.github.com>

# [2.0.0](https://github.com/IPS-Hosting/pino-sentry-stream/compare/v1.0.2...v2.0.0) (2022-06-06)


### Bug Fixes

* remove typo in stream import ([ff12b50](https://github.com/IPS-Hosting/pino-sentry-stream/commit/ff12b505c726844f6a4486efa0362cdd3053d0d6))


### Features

* upgrade to Sentry v7 ([db9c72c](https://github.com/IPS-Hosting/pino-sentry-stream/commit/db9c72ce6e12488025ac40f51c8a56b789ec50b7))


### BREAKING CHANGES

* Requires at least @sentry/node v7.

Signed-off-by: Pascal Sthamer <10992664+P4sca1@users.noreply.github.com>

## [1.0.2](https://github.com/IPS-Hosting/pino-sentry-stream/compare/v1.0.1...v1.0.2) (2021-04-27)


### Bug Fixes

* add main, types and sideEffects fields to package.json ([50d3d84](https://github.com/IPS-Hosting/pino-sentry-stream/commit/50d3d84fd921fc902f9e46ffb36f34c429d1ce99))

## [1.0.1](https://github.com/IPS-Hosting/pino-sentry-stream/compare/v1.0.0...v1.0.1) (2021-04-11)


### Bug Fixes

* make package public ([8782e69](https://github.com/IPS-Hosting/pino-sentry-stream/commit/8782e694a6e1e35475bfdf624635fe71a282dd1e))

# 1.0.0 (2021-04-11)


### Bug Fixes

* dont import helpers ([2386a95](https://github.com/IPS-Hosting/pino-sentry-stream/commit/2386a95a7ba27c8773e3c3f02d36373f64179f2b))

# 1.0.0 (2021-04-11)


### Bug Fixes

* update lockfile ([c578607](https://github.com/IPS-Hosting/node-typescript-starter/commit/c578607246654bcc41da07064402710d9d4296ad))


### Features

* add jest setup and example ([fd9f781](https://github.com/IPS-Hosting/node-typescript-starter/commit/fd9f781d2fa25a2faee5dacb8512b08da70a698a)), closes [#1](https://github.com/IPS-Hosting/node-typescript-starter/issues/1)
