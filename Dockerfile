FROM node:22-alpine
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]