# Patientor FE
A React based application, using tools like:
- useContext and useReducer hooks for state management 
- React-router for the route management
- SemanticUI components
- GraphQL Apollo client

* The Patientor BE application is required.

## Running locally (dev mode)
Set the backend url in the `.env.local` file. Assuming the backend service is also locally running, the `.env.local` this would look like:
```
REACT_APP_BACKEND_URL='http://localhost:4000'
```
Then, run the application in development mode with:
```console
$ npm install
$ npm start
```

## Running as a docker container
* The application is production-builded and served using nginx.

Assuming you have the backend service running in localhost, build the container image with:
```console
$ docker build \
    --build-arg REACT_APP_BACKEND_URL='http://localhost:4000/' . \
    -t patientor-fe
```
<!-- * REACT_APP_BACKEND_URL='http://host.docker.internal:4000/' -->

And you'll run the container with:
```console
$ docker run -it -p 80:80 --name fe --rm patientor-fe
```

<!-- * --add-host=host.docker.internal:host-gateway \ -->
