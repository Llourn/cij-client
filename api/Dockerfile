FROM node:18-alpine AS Dev

WORKDIR /api

COPY package.json package-lock.json ./
RUN npm install

COPY src ./src

CMD ["npm", "run", "dev"]