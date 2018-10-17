#!/bin/bash

cd web/src/frontend

npm install
npm run lint
npm run test
npm run nais-build

cp -r dist ../../../.
cp .env ../../../.
cp server.js ../../../.
cp decorator.js ../../../.
cp settings.json ../../../.
cp package.json ../../../.

cp mockEndepunkter.js ../../../.
mkdir -p ../../../test/mock
cp -r ./test/mock/* ../../../test/mock/

cd ../../../

# Build docker image
docker build -t sykefravaer -f Dockerfile.web --build-arg BASE_IMAGE_PREFIX=node . 

# Push docker image
heroku container:push web -a sykefravaer --recursive

# Release image
heroku container:release web -a sykefravaer
