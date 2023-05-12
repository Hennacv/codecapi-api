## Migrations

##### Generate migration from entities

`yarn typeorm:generate ./src/db/migrations/<MIGRATION_NAME>`

##### Create empty migration

`yarn typeorm:create ./src/db/migrations/<MIGRATION_NAME>`

##### Run migrations

`yarn typeorm:up`

##### Revert migrations

`yarn typeorm:down`

## .env

Place a file called .env in the root of the project with the following content:

```
NODE_ENV=development
DATABASE_URL=postgres://localhost/codecapi_portal_development
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
GOOGLE_CLIENT_ID=client_id
GOOGLE_CLIENT_SECRET=client_secret
DOMAIN=http://localhost:3000
```

## Service account

A file called `service-account.json` should be placed in the root folder. This file contains the credentials
necessary for Google OAuth.
