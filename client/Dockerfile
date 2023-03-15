FROM node:18-alpine AS Dev

WORKDIR /client

COPY package.json package-lock.json tsconfig.json ./
RUN npm install

CMD ["npm", "run", "dev"]