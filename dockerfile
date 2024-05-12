docker container run \
--name nest-app-docker \
-w /app \
-p 80:3000 \
-v "$(pwd)":/app \
node:18.20.2 \
sh -c "yarn install && yarn start:dev"

docker container run --name finanzapp -w /app -p 5173:5173 -v ${PWD}:/app node:18.16.1 sh -c "npm install && npm run dev"
