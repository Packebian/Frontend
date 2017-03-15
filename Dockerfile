# Build a docker container containing the sails framework
FROM node:latest
MAINTAINER Rémi GATTAZ <remi.gattaz@gmail.com>

# Add the application in the image
ADD . /srv/angular

# Define working directory.
WORKDIR /srv/angular

# Update path for easy access to futurly npm installed softs
ENV PATH=/srv/angular/node_modules/.bin/:$PATH

# Install all npm dependencies
RUN npm prune && npm install --quiet

# Install all bower dependencies
RUN bower --allow-root prune && bower install --quiet --allow-root

# Define mountable directories.
VOLUME ["/srv/angular"]

# Expose sails default port
EXPOSE 9000 9001

# Envrionment
ENV API_URL="192.168.99.100:1337"

# Start application
CMD grunt serve
