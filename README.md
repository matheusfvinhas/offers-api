# Offers API

### Setup

```sh
npm i
npm run setup:dev
npm run start:dev
```

### Database

SQLite is the default database, to use PostgreSQL, comment the necessary code in the files **_src/index.ts_** and **_sequelize/config/database.js_** and set the **_POSTGRES_URL_** in the file .env

### Docs

The project uses swagger for documentation, it's acessible through **_/docs_** endpoint

```
http://localhost:5000/docs/
```

### Heroku

The project is acessible through the following link

[https://offers-quero.herokuapp.com](https://offers-quero.herokuapp.com/docs/)
