# Sykefravaer (tidligere kjent som «syfofront»)
Frontend for digitalisering av sykefraværsoppfølging (DigiSYFO) http://tjenester.nav.no/sykefravaer/

## TL;DR
React-app for den sykmeldte. Viser sykmeldinger, sykepengesøknader og informasjon om nærmeste leder.
Konsumerer REST-APIet til [SyfoREST](http://stash.devillo.no/projects/SYFO/repos/syforest).

## Kjøre lokalt
Foreløpig kjører denne appen kun internt på nav, da den er avhengig av diverse baksystemer. Det jobbes med å sette opp lokal mock.

Du må ha Node installert.

Du må også konfigurere npm som følger:

```bash
$ npm config set @types:registry "http://a34apvl062.devillo.no:8082/repository/npm-all"
$ npm config set @babel:registry "http://a34apvl062.devillo.no:8082/repository/npm-all"
```

* For å kjøre koden lokalt: 
    - `$ npm install`
    - `$ npm run dev`
    - I et annet vindu `$ npm run devstart`
    - Eventuelt kan komandoene kjøres fra `package.json` i intellij.
* Kjør tester med `npm test`
* Lint JS-kode med `npm run lint`

## Deploy mock app til Heroku
Installer heroku, på mac kan du bruke brew: `$ brew install heroku`.

For å kunne deploye til Heroku må du først logge inn: 
* `$ heroku login`
* `$ heroku container:login`

Deploy til heroku ved å kjøre deployscript: `$ sh deploy-heroku.sh`.

## Logge på i T-miljø
Se denne siden for [testdata](http://confluence.adeo.no/display/Digisyfo/Testdata+Barken) (intern lenke).
