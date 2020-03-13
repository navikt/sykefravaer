# Sykefravaer
[![Build status](https://github.com/navikt/sykefravaer/workflows/Deploy%20to%20dev%20and%20prod/badge.svg)](https://github.com/navikt/sykefravaer/workflows/Deploy%20to%20dev%20and%20prod/badge.svg)

Sykefravaer er landingssiden for sykefraværsoppfølging. Den henter data om sykmeldinger og sykepengesøknader og lar den 
sykmeldte navigere til sider hvor dataen vises. Appen skal videreutvikles til å bare være et skall som lenker videre til
egne appers om er ansvarlige for å vise og behandle data for forskjellige områder. 

## CI
Appen bygges og deployes på [GITHUB](https://github.com/navikt/sykefravaer/actions). Det er kun `master` som vil bli 
deployet automatisk. Ved vellykket bygg av docker image på master vil imaget bli pushet til `dev-sbs` og `prod-sbs`. 
Alle andre brancher vil kun bli rullet ut til `dev-sbs`. 

## Logger
Denne appen bruker frontendlogger, du kan se loggen [her](https://logs.adeo.no/goto/da5c8e86da5d5151a9b3be331de093bc).

## Kjøre lokalt
For å kjøre appen lokalt må du ha Node installert og installere npm avhengigheter, `npm install`.

For å kjøre appen lokalt brukes `webpack-dev-server` for å serve ressurser, selve appen serves av en express server.
Det betyr at man må ha to prosesser kjørende for å kjøre appen. 

Appen startes lokalt ved å kjøre disse kommandoene:
- `npm run dev`
- `npm run start-local` 

## Test og lint
Appen testes med chai + mocha. Foretrukket plassering av tester er i samme mappe som filen den tester med navneformat:
`<fil-som-testes>.test.js`. Vi bruker eslint for å håndheve kodestil. Stilen er en gatemiks av air-bnb og hjemmesnekra
regler. 

* Kjør tester med `npm test`, watch med `npm test:watch`
* Lint JS-kode med `npm run lint`. For å fikse enkle lint feil kan du kjøre `npm run lint:fix`

## Deploy mock app til Heroku
Installer heroku, på mac kan du bruke brew: `$ brew install heroku/brew/heroku`.

For å kunne deploye til Heroku må du først logge inn: 
* `$ heroku login`
* `$ heroku container:login`

Deploy til heroku ved å kjøre deployscript: `$ sh deploy-heroku.sh`.

## Logge på i Q1-miljø
Se denne siden for [testdata](https://confluence.adeo.no/pages/viewpage.action?pageId=228580060) (NAV-intern lenke).
