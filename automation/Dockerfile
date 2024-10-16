FROM node:20-bookworm

WORKDIR /usr/src

COPY . .

#RUN npx playwright install

RUN npx -y playwright@1.48.1 install --with-deps

RUN npm install

CMD ["sh", "-c", "npx wait-port backend:8787/health --timeout=60000 && npx playwright test && npx playwright show-report"]

#CMD ["npx", "playwright", "test"]
