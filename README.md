# SyfoFront

Frontend for digitalisering av sykefraværsoppfølging (DigiSYFO); http://tjenester.nav.no/sykefravaer.

For å starte applikasjonen lokalt, må du ha Node installert. 

* Kjør java-klassen StartJetty
* I web/src/frontend: Kjør `npm install`, dernest `npm run dev`
* Kjør tester med `npm test` 
* Lint JS-kode med `npm run lint`

For å skru på pre-commit-hook og dermed kjøre tester før commit, kjør følgende fra ROOT: 

`sh git-hooks-symlink.sh`

![""](http://stash.devillo.no/projects/SYFO/repos/syfofront/browse/web/src/frontend/img/svg/illustrasjon-landingsside-2.svg?at=d6b6e4bb8384bcbffdb411ffd7caaf01fa104007&raw)