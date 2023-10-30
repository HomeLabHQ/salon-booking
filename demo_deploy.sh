#!/usr/bin/env bash
#!/bin/sh

git pull
docker compose -f compose.override.yml build
docker compose -f compose.override.yml up -d --force-recreate
docker exec -it salon-booking-api-demo python manage.py migrate
docker exec -it salon-booking-api-demo python manage.py createsuperuser --no-input
setsid devtunnel host ${TUNNEL_ID} >/dev/null 2>&1 < /dev/null &
exec "$@"
