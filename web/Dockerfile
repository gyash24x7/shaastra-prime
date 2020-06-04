FROM node:12-alpine
RUN mkdir shaastra-prime-web
ADD . /shaastra-prime-web
WORKDIR /shaastra-prime-web
RUN npm install
RUN npm run build
EXPOSE 5000
CMD [ "npm", "run", "serve" ]
