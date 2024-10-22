#!/bin/bash

# Down API Gateway
cd ./api-gateway

docker compose down

# Down user service

cd ../markey.user-service

docker compose down

# Down product service

cd ../markey.payment-service

docker compose down

# Down shopping service

cd ../markey.shopping-service

docker compose down

# Down order service

cd ../markey.order-service/main

docker compose down
