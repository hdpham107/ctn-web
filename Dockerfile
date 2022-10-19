FROM node:10.16.0
# RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
# Update repository and install dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  curl \
  sudo \
  vim \
  wget

EXPOSE 8080 7000

# Define app and log variables
ENV APP_SRC_DIR=/usr/src/app \
  APP_LOGS_DIR=/var/log/app \
  APP_LOG=/var/log/app/app.log \
  APP_ERR=/var/log/app/app.err

# Add node user to sudoers
RUN /usr/sbin/adduser node sudo
RUN echo "node ALL=NOPASSWD: ALL" >> /etc/sudoers

# Change NPM global location
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global \
  PATH=$PATH:/home/node/.npm-global/bin

# Install NPM global dependencies
RUN npm install -g --silent react-scripts@3.0.1
RUN npm install -g --silent react-app-rewired@2.1.4 \
  cross-env@4.0.0 \
  react-dev-utils@^5.0.2

# Change permissions for folders
RUN mkdir -p $APP_LOGS_DIR && chown node:node $APP_LOGS_DIR

# Set working directory and switch user
WORKDIR $APP_SRC_DIR
RUN chown node:node $APP_SRC_DIR
USER node

# Install local npm dependencies
COPY --chown=node package*.json ./
RUN npm install

# Copy source over
COPY --chown=node ./ .

# Compile front-end files
# RUN gulp sass && gulp compress

# Start app
CMD npm start
