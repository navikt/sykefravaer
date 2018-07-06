# SyfoFront

Frontend for digitalisering av sykefraværsoppfølging (DigiSYFO) http://tjenester.nav.no/sykefravaer/

### TL;DR

React-app for den sykmeldte. Viser sykmeldinger, sykepengesøknader og informasjon om nærmeste leder.
Konsumerer REST-APIet til [SyfoREST](http://stash.devillo.no/projects/SYFO/repos/syforest).

### Kjøre lokalt

Du må ha Node installert. 

Du må også konfigurere npm som følger:

`npm config set @types:registry "http://a34apvl062.devillo.no:8082/repository/npm-all"`
`npm config set @babel:registry "http://a34apvl062.devillo.no:8082/repository/npm-all"`

* I web/src/frontend: Kjør `npm install`, dernest `npm run naisdev`. I et annet vindu, kjør `npm run naisdev-start`.
* Kjør tester med `npm test` 
* Lint JS-kode med `npm run lint`

### Logge på i T-miljø

Se denne siden for [testdata](http://confluence.adeo.no/display/Digisyfo/Testdata+Barken).

<img src="http://stash.devillo.no/projects/SYFO/repos/syfofront/browse/web/src/frontend/img/svg/illustrasjon-landingsside-2.svg?at=d6b6e4bb8384bcbffdb411ffd7caaf01fa104007&raw" width="500" height="500">