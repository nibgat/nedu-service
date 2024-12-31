### NEDU - Api Gateway Service
This project developed by Nibgat development team.

##### Service Version:
```
v1.0.0-pre-alpha.0
```

##### .env Template:
```
RMQ_ADDRESS = amqp://user:password@localhost:5672
AUTHENTICATION_SERVICE_RMQ_QUEUE = authentication_service_queue_XXX
ACCOUNT_SERVICE_RMQ_QUEUE = account_service_queue_XXX

PORT = 3004

```

##### To start for work:
```
Development:
yarn start:dev