#!/bin/bash

# Building latest ui production build folder
git checkout gh-page
REACT_APP_DEPLOYMENT_SERVER='gh-pages' \
REACT_APP_BACKEND_URL='http://localhost:4000/' \
npm run build

# Coping build folder to docs
rm -rf ../docs
cp -r ./build ../docs

git add .
git commit -m "Updated docs/: `date +'%Y-%m-%d %H:%M:%S'`"
git push origin
git checkout master