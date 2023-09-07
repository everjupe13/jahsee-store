#!/bin/sh

docker build -t ayaysee-front .
docker run -d --rm -p 3000:3000 --name ayaysee-front-container ayaysee-front
