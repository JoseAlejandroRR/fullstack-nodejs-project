FROM node:20

WORKDIR /usr/src

COPY . .

RUN npm install

RUN npm run build


RUN npm install --global serve

ENV VITE_EMPLOYEES_API=host.docker.internal:8787/api/employees
ENV VITE_DEPARTMENTS_API=host.docker.internal:8787/api/departments
ENV VITE_AUTH_API=host.docker.internal:8787/api/auth
ENV VITE_AUTH_LAYER_ACTIVE=true


CMD ["serve", "-s","./dist/"]
