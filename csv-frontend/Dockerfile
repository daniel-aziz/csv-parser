FROM node:lts
WORKDIR /src
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE 4001
CMD ["npm", "start"]