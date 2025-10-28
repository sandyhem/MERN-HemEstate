FROM node:18
WORKDIR /app
# file starts with package* copy it.
COPY package*.json ./
RUN npm install
# copy all the source codes.
COPY . .
EXPOSE 5000
# to run "npm start"
CMD ["npm", "run","dev"]