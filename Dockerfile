FROM node:20
WORKDIR /app
COPY package*.json ./
COPY serve.js ./
COPY src ./
COPY static ./
RUN npm install
EXPOSE 3000
CMD ["node", "serve.js"]