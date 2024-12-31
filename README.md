# NİBGAT® | Community - NEDU Service

## Introduction
This project is a microservice-based architecture built with NestJS. Each service is containerized using Docker, making it easy to deploy and manage.

## Prerequisites
1. Ensure Docker and Docker Compose are installed on your system.
2. Clone the repository to your local machine.

## How to Run

### Initial Setup
1. Add .env file to all services and define necessary database address, ports and RabbitMQ queues in this file.
2. Remove the "#" character from the lines in the docker-compose.yml file
3. Build and start the project:
   ```bash
   docker-compose up --build
   ```

### Subsequent Changes
- Whenever you make changes to the code, you need to rebuild the services:
  ```bash
  docker-compose up --build
  ```

- After building once, you can start the services without rebuilding by running:
  ```bash
  docker-compose up
  ```

### Initial Setup For Development
1. Build and start RabbitMQ and RethinkDB:
   ```bash
   docker-compose up --build
   ```
2. Add .env file to all services and define necessary database address, ports and RabbitMQ queues in this file.
3. Run the services you need in develop mode on different terminals.
   ```bash
   yarn start:dev
   ```


## Notes
- Ensure all required environment variables are correctly set before starting the services.
- For any issues or further setup instructions, refer to the documentation or contact the maintainer.

Enjoy coding!

