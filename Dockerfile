FROM node:12-alpine
RUN mkdir shaastra-prime
ADD . /shaastra-prime
WORKDIR /shaastra-prime/server
RUN npm install
RUN npm run gen
RUN npm run build
EXPOSE 8000
CMD [ "npm", "start" ]
