### NEDU - Authentication Service
This project developed by Nibgat development team.

##### Service Version:
```
v1.0.0-pre-alpha.0
```

##### .env Template:
```
RMQ_ADDRESS = amqp://user:password@localhost:5672
AUTHENTICATION_SERVICE_RMQ_QUEUE = authentication_service_queue_XXX

RETHINKDB_ADDRESS = localhost
RETHINKDB_PORT = 28015

JWT_SECRET_KEY=XXX

REDIS_ADDRESS = localhost
REDIS_PORT = 6379

PORT = 3005

```

##### To start for work:
```
Development:
yarn start:dev