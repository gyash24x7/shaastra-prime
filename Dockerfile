FROM node:12-alpine
RUN mkdir shaastra-prime
RUN npm i -g yarn
ADD . /shaastra-prime
WORKDIR /shaastra-prime
RUN yarn
RUN yarn gen:server
RUN yarn build:server
EXPOSE 8000
CMD [ "yarn", "start" ]
