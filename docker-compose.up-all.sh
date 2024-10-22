#!/bin/bash

docker network create markey-backend-network

# Start API Gateway
cd ./api-gateway

docker compose up --build -d

# Start user service

cd ../markey.user-service

docker compose up --build -d

# Start product service

cd ../markey.payment-service

docker compose up --build -d

# Start shopping service

cd ../markey.shopping-service

docker compose up --build -d

# Start order service

cd ../markey.order-service/main

docker compose up --build -d
