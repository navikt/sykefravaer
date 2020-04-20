echo "Bygger sykefravaer-flex-dc latest for docker compose utvikling"

npm i
npm run flex-dc-build

docker build . -t sykefravaer-flex-dc:latest
