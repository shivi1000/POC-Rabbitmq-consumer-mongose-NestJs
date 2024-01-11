#!/bin/bash
cd /var/www/html/plandid_app/plandid-rabbitmq/dev/
ls -la
pwd
tar -xzf plandid_rabbitmq_artifact.tar.gz
rm -rf plandid_rabbitmq_artifact.tar.gz
mkdir bin
cp env bin/.env.dev
pwd
NODE_ENV=dev pm2 restart ./dist/src/main.js --name Plandid-rabbitmq-Dev
#pm2 reload Okdap_Dev_Backned 
pm2 status 
