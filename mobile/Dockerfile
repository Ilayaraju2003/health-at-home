#use the official nodejs image for build the react app
FROM node:18 AS build

#set working directory
WORKDIR /app

#copy the package.json and install dependencies
COPY package.json ./
RUN npm install

#copy the rest of the app code
COPY . .

#build the react app
RUN npx expo export:web

#serve the app with nginx
FROM nginx:alpine

#copy the build folder to the nginx html folder
COPY --from=build /app/web-build /usr/share/nginx/html

EXPOSE 8081

CMD ["npx", "expo", "start", "--tunnel"]




