# server (Golang)

## Configuration 

Create `.env` file that looks like this:

```
ENV=development
PORT=5000
DB_CONN=postgres://postgres:qwerty@localhost:5432/presence
SECRET=S3cRettt
```

To generate a new safe secret key, use python in terminal:

```
>>> import secrets
>>> secrets.token_urlsafe()
```

## Docker 

Run `docker-compose up` to start Postgres database.
