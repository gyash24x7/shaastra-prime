FROM node:12-alpine
RUN mkdir shaastra-prime
ADD . /shaastra-prime
WORKDIR /shaastra-prime
RUN npm install
RUN npm run gen:server
RUN npm run build:server
EXPOSE 8000
CMD [ "yarn", "start" ]
