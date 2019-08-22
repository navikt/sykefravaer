# Sykefravaer (tidligere kjent som «syfofront»)
[![CircleCI](https://circleci.com/gh/navikt/sykefravaer.svg?style=svg)](https://circleci.com/gh/navikt/sykefravaer)

Frontend for digitalisering av sykefraværsoppfølging (DigiSYFO) http://tjenester.nav.no/sykefravaer/

## TL;DR
React-app for den sykmeldte. Viser sykmeldinger, sykepengesøknader og informasjon om nærmeste leder.

## CI
Appen bygges og deployes på [CircleCI](https://circleci.com/gh/navikt/sykefravaer). Det er kun `master` som vil bli 
deployet automatisk. Ved vellykket bygg av docker image på master vil imaget bli pushet til `dev-sbs` og `prod-sbs`. 
Alle andre brancher vil kun bli testet. For å rulle en branch til `dev-sbs` kan man bruke 
[syfodeploy](https://github.com/navikt/syfodeploy/blob/master/syfodeploy.sh), dette er et verktøy som vil trigge kjøring
av `build_branch` workflowen til CircleCI som bygger og deployer branchen til `dsv-sbs`. 

## Kjøre lokalt
Applikasjonen har en mock som kan brukes lokalt. Her mockes diverse endepunkter, dog ikke alle. 

Du må ha Node installert.

Du må også konfigurere npm som følger:

```bash
$ npm config set @types:registry "http://a34apvl062.devillo.no:8082/repository/npm-all"
$ npm config set @babel:registry "http://a34apvl062.devillo.no:8082/repository/npm-all"
```

* For å kjøre koden lokalt: 
    - `$ npm install`
    - `$ npm run dev`
    - I et annet vindu `$ npm run start-local`
    - Eventuelt kan komandoene kjøres fra `package.json` i intellij.
* Kjør tester med `npm test` eller `npm test:watch`
* Lint JS-kode med `npm run lint` eller `npm run lint:fix`

## Deploy mock app til Heroku
Installer heroku, på mac kan du bruke brew: `$ brew install heroku`.

For å kunne deploye til Heroku må du først logge inn: 
* `$ heroku login`
* `$ heroku container:login`

Deploy til heroku ved å kjøre deployscript: `$ sh deploy-heroku.sh`.

## Logge på i Q1-miljø
Se denne siden for [testdata](https://confluence.adeo.no/pages/viewpage.action?pageId=228580060) (NAV-intern lenke).
