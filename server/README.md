# server (Golang)

## Configuration 

Create .env file like this:

```
ENV=development 
PORT=5000
DB_CONN=postgres://postgres:qwerty@localhost:5432/presence
```

In Postgres, run this script to enable uuid: 

```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
```

Run `docker-compose up` to start Postgres database.


