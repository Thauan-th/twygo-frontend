DOCKER_COMPOSE = docker-compose
SERVICE = twygo-api-ui

start:
	$(DOCKER_COMPOSE) up

stop:
	$(DOCKER_COMPOSE) down
