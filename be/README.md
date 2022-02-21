# Patientor Backend
A NodeJs based application. Developed using tools like:
- GraphQL
- Apollo server
- Nexus
- Prisma

## Running in console (dev mode)
A mongo db instance is required. The fastest way to get one is by launching a docker container.
```console
$ docker run -d -p 27017:27017 --name mongo --rm \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    mongo
```
An `.env` file is required to set some project settings. Fill the file fields propperly. Then, install de project dependencies with:
```console 
$ npm i
$ npm install prisma
```

Build the Prisma client and run the application in dev mode with:
```console 
$ npm run prisma-push
$ npm run dev
```

Aditionally, you can seed some testing data with:
```console
$ npm run prisma-seed
```

## Running as a docker container
Build the project image with 
```console
$ docker build . -t patientor-be
```
An `.env.local` file is required, but be aware the project code should be able to reach the mongo db instance from within the container. Assuming you're still working with the previous mongo db docker container, the `MONGODB_URI` field would look as:
```
DATABASE_URL=mongodb://admin:password@host.docker.internal/patientor?authSource=admin
```

And you would run the container with:
```console
$ docker run -it -p 4001:{env.local PORT} --name be --rm \
    --add-host=host.docker.internal:host-gateway \
    --env-file .env.local \
    patientor-be
```

You can start playing with the GraphQL schemas and requests by looking at GraphQL palyground (at `localhost:{env.local PORT}`) or by importing the `Insomnia.json` file into Insomnia.

ToDo:
- Add Apollo request logging