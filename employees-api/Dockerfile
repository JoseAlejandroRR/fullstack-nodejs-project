itFROM node:20

WORKDIR /usr/src

COPY . .

RUN npm install

RUN npm run build

ENV PORT=8787

ENV JWT_SECRET_KEY=123456
ENV HOST=http://localhost:8787
ENV DOMAIN=localhost:8787
ENV API_GATEWAY=http://localhost:8787/api

#ENV DB_HOST=host.docker.internal
#ENV DB_PORT=3307
#ENV DB_USER=developer
#ENV DB_PASSWORD=2486
#ENV DB_DATABASE=employee-management

ENV AUTH_LAYER_ACTIVE=false

EXPOSE 8787
CMD ["sh", "-c", "npx wait-port db:3306 --timeout=60000 && npm run migration:run && npm run seed:run && npm run start"]
