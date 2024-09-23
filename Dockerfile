FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV AWS_ACCESS_KEY_ID="AKIA5FTZBJYT6DGJBYGN"
ENV AWS_SECRET_KEY_ID="Tl8D4xZ/OGi2uSQs/dyG+jXdSaNNRTy7YxBmYjOe"
ENV AWS_S3_BUCKET_NAME_ID="storesmart"
ENV AWS_REGION_ID="us-east-1"

EXPOSE 8000

CMD [ "node", "server.js" ]