Welcome to the capi-portal, this is the back-end of the project.
The front-end can be found here: https://gitlab.com/codecapi/codecapi-portale
There are a few things you need to do before you can start working on this project.
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

In my case you have a user and password for your database the URL would need to be this instead

```
DATABASE_URL=postgres://user:password@localhostcodecapi_portal_development
```

## Service account

A file called `service-account.json` should be placed in the root folder. This file contains the credentials necessary for Google OAuth. Below you will find an example of how the file should look, the exact details can be retrieved from the resident supervisor.

```
{
  "type": "service_account",
  "project_id": "capiverse",
  "private_key_id": "number",
  "private_key": "private key",
  "client_email": "url",
  "client_id": "number",
  "auth_uri": "url",
  "token_uri": "url",
  "auth_provider_x509_cert_url": "url",
  "client_x509_cert_url": "url"
}
```

Once these files have been added you can run a "yarn" and "yarn start:dev" in your terminal to start up the backend of the project.

Happy Coding Capi!

Some helpful commands:
## Migrations

##### Generate migration from entities

`yarn typeorm:generate ./src/db/migrations/<MIGRATION_NAME>`

##### Create empty migration

`yarn typeorm:create ./src/db/migrations/<MIGRATION_NAME>`

##### Run migrations

`yarn typeorm:up`

##### Revert migrations

`yarn typeorm:down`
