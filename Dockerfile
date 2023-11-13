FROM node:20.9-alpine AS prebuild

# Set working directory
WORKDIR /var/www/app

COPY ./package*.json ./

# Install dependencies
RUN yarn install --production --frozen-lockfile

ARG APP_API_SERVER=http://palizvani.hghweb.ir/api
ARG VUEX_PERSISTED_STATE_KEY=vuex
ARG GET_TIME_SERVER=/time
ARG APP_API=/api
ARG NGINX_PORT=8081
ARG SSR_PORT=3000
ARG APP_ENV=development
ARG GOOGLE_TAG_MANAGER_TOKEN=GTM-PNP1111
ARG HEAP_MEMORY_ALLOCATION_INTERVAL=10000
ARG MAX_HEAP_MEMORY_ALLOCATION_IN_PERCENT=70
ARG LOG_REQUEST=false

# Copy all files
COPY ./ ./

# Build app on SSR mode
RUN yarn build:ssr


##############################################


FROM node:20.9-alpine


COPY --from=prebuild /var/www/app/dist/ssr /var/www/app/dist/ssr

WORKDIR /var/www/app/dist/ssr

RUN yarn install

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image

USER node

CMD ["node", "/var/www/app/dist/ssr/index.js"]
