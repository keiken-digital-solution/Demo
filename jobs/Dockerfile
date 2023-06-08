FROM node:14-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .


ENV CLIENT_ID="68effaad-2dda-438b-bcae-69d197401b89"
ENV CLIENT_PASSWORD="Azerty-12345"
ENV COMMERCE_CLOUD_HOST="https://bkdn-003.dx.commercecloud.salesforce.com"
ENV KAFKA_HOST="192.168.26.210:9092"

# EXPOSE 3000

# Run the script
CMD [ "node", "OrdersJob.js" ]