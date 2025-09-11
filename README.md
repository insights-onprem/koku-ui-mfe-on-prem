# Koku microfrontend (MFE) monorepo

[![Apache 2.0][license-badge]](https://github.com/project-koku/koku-ui-mfe-on-prem/blob/main/LICENSE)
[![CI Status][build-badge]](https://github.com/project-koku/koku-ui-mfe-on-prem/actions/workflows/ci.yml?query=branch%3Amain)
[![codecov][codecov-badge]](https://codecov.io/gh/project-koku/koku-ui-mfe-on-prem)

Monorepo containing:

- apps/koku-mfe-cloud: React app for Cost Management MFE
- libs/api: shared API client and query/helpers
- libs/i18n: shared i18n runtime and messages data
- libs/routes-components: shared UI components and route utilities

User interface is based on [Patternfly].

Submit issues in [Jira].

## Requirements

* [NodeJS v20.15+][nodejs]
* [npm v10.8+][npm]
* [Podman][podman]

After installing Podman, create and start your VM.

```
podman machine init
podman machine start
```

## Setup `hosts` entries (do this once)

Edit the `/etc/hosts` file and add the following entries
```
127.0.0.1 prod.foo.redhat.com
127.0.0.1 stage.foo.redhat.com
```

Alternatively, run the [patch-etc-hosts.sh][patch-etc-hosts] script from the insights-proxy repo
```
sudo bash scripts/patch-etc-hosts.sh
```

## Getting Started

1. Install requirements listed above.
2. Setup `/etc/hosts` entries listed above.
3. Clone the repository, and open a terminal in the base of this project.
4. Run `npm install` to install all workspace dependencies.
5. Build libs: `npm run build:libs`

## Building
```
npm run build
```

## Testing
```
npm test
```

## Running the app against hosted API (webpack proxy)

Note that this approach currently supports the Insights stage-beta, stage-stable, prod-beta, and prod-stable environments.

1. Start development server
```
npm start
```

Follow the prompts that follow.

* Do you want to use local api? `no`
* Which platform environment you want to use `stage`
* Which Chrome environment you want to use? `beta`

2. Open the following URL
```
https://stage.foo.redhat.com:1337/beta/staging/cost-management
```

### Running with local Cloud Services Backend

Refer to the [serving files locally][serving-files-locally] section of cloud services config for more details

1. Serve files locally from Cloud Services Backend repo
```
make dev-static-node
```

2. Start development server in Koku MFE repo
```
npm start:csb
```

### Running with local Koku UI

Refer to the [koku-ui README][koku-ui-readme] for more details

1. Start development server in Koku MFE repo
```
npm start:static
```

2. Start development server in Koku UI repo
```
npm start:mfe
```

### Running Koku MFE with local Koku UI and Cloud Services Backend

Refer to the [serving files locally][serving-files-locally] section of cloud services config and the [koku-ui README][koku-ui-readme] for more details

1. Serve files locally from Cloud Services Backend repo
```
make dev-static-node
```

2. Start development server in Koku MFE repo
```
npm start:static
```

3. Start development server in Koku UI repo
```
npm start:csb:mfe
```

## Scripts

Scripts are preserved by name; behavior is updated for the monorepo:

- build: runs build:libs then builds `apps/koku-mfe-cloud`
- build:prod: same as build
- check:dependencies: check outdated dependencies
- check:dependencies:update: update dependencies
- check:messages: run unused i18n messages check across workspace
- clean: remove dist caches in workspace
- codemods: PatternFly codemods over app source
- deploy: build, lint, test
- install:pkgs / install:pkgs:force: install workspace deps
- lint / lint:ts / lint:ts:fix: lint workspace TypeScript code
- patch:hosts: update /etc/hosts via fec
- postinstall: ts-patch install and cleanup
- release:prod: release script
- start / start:*: run app dev server with environment options
- stats: output build stats
- test / test:clean / test:update: jest test workflows
- translations:*: extract/compile/sync i18n files into libs/i18n
- verify: build, lint, test

This [RELEASE][release-doc] doc describes how to release Koku MFE to each staging environment.

[build-badge]: https://github.com/project-koku/koku-ui-mfe-on-prem/actions/workflows/ci.yml/badge.svg?branch=main
[codecov-badge]: https://codecov.io/gh/project-koku/koku-ui-mfe-on-prem/graph/badge.svg
[Jira]: https://issues.redhat.com/projects/COST/
[koku-ui-readme]: https://github.com/project-koku/koku-ui#readme
[license-badge]: https://img.shields.io/github/license/project-koku/koku-ui-mfe-on-prem.svg?longCache=true
[nodejs]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[patch-etc-hosts]: https://github.com/RedHatInsights/insights-proxy/blob/master/scripts/patch-etc-hosts.sh
[Patternfly]: https://www.patternfly.org/
[release-doc]: https://github.com/project-koku/koku-ui-mfe-on-prem/blob/main/RELEASE.md
[serving-files-locally]: https://github.com/RedHatInsights/chrome-service-backend/blob/main/docs/cloud-services-config.md#serving-files-locally
