FROM node:lts
WORKDIR /
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE 4001
CMD ["npm", "start"]