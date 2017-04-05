# SyfoFront

Frontend for digitalisering av sykefraværsoppfølging (DigiSYFO) http://tjenester.nav.no/sykefravaer/

### TL;DR

React-app for den sykmeldte. Viser sykmeldinger, sykepengesøknader og informasjon om nærmeste leder.
Konsumerer REST-APIet til [SyfoREST](http://stash.devillo.no/projects/SYFO/repos/syforest).

### Kjøre lokalt

Du må ha Node installert. 

* Kjør java-klassen StartJetty
* I web/src/frontend: Kjør `npm install`, dernest `npm run dev`
* Kjør tester med `npm test` 
* Lint JS-kode med `npm run lint`

For å skru på pre-commit-hook og dermed kjøre tester før commit, kjør følgende fra ROOT: 

`sh git-hooks-symlink.sh`

### Logge på i T-miljø

Se denne siden for [testdata](http://confluence.adeo.no/display/Digisyfo/Testdata+Barken).

<img src="http://stash.devillo.no/projects/SYFO/repos/syfofront/browse/web/src/frontend/img/svg/illustrasjon-landingsside-2.svg?at=d6b6e4bb8384bcbffdb411ffd7caaf01fa104007&raw" width="500" height="500">