# Project: ntlstl.places
### Tech Stack
![Node](https://img.shields.io/badge/-Node-black?style=flat-square&logo=node)
![Express](https://img.shields.io/badge/-Express-black?style=flat-square&logo=express)
![Sharp](https://img.shields.io/badge/-Sharp-black?style=flat-square&logo=sharp)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-black?style=flat-square&logo=postgresql)
![Sequelize](https://img.shields.io/badge/-Sequelize-black?style=flat-square&logo=sequelize)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)
![Eslint](https://img.shields.io/badge/-Eslint-black?style=flat-square&logo=eslint)
![PM2](https://img.shields.io/badge/-PM2-black?style=flat-square&logo=pm2)
![Docker](https://img.shields.io/badge/-Docker-black?style=flat-square&logo=docker)

### About
* Photo posting service.

[![Auto tests backend](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/backend.js.yml/badge.svg)](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/backend.js.yml)
[![Deploy backend](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/deploy.backend.yml/badge.svg)](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/deploy.backend.yml)

- [X] prod/dev configs .env
- [X] fix package.json, scripts
- [X] fix dockerfile
- [X] fix remove field email from response users & userId
- [X] fix docker-compose -> shared
- [X] fix update libs
- [ ] fix logs (live-time, root)
- [ ] fix winston telegram config, manual
- [ ] fix endpoint cards
- [ ] fix admins endpoints
- [ ] fix avatar endpoint (sharp)
- [ ] fix oauth (any services)
- [ ] fix CORS, CSP configs
- [ ] fix refactoring - fix structure
- [ ] fix readme - add manual
- [ ] feat role
- [ ] feat tag (location, model, controller, route)
- [ ] feat note (model, controller, route)
- [ ] feat comment (model, controller, slides, notes)
- [ ] feat notification model, controller, route, websocket
- [ ] express -> nest
- [ ] sequelize -> type-orm
- [ ] oauth -> passport
- [ ] separate file-storage api
- [ ] size images for upload

### Installation
```bash
# clone the repository on your computer
$ git clone git@github.com:bmazurme/react-mesto-auth.git

# install dependencies
$ npm install

# run dev mode
$ npm run dev

# build project
$ npm run build

# clear project
$ npm run clear

# run eslint
$ npm run eslint

# launch
$ npm start
```

### Postgres

```bash
$ brew update

$ brew doctor

$ brew install postgresql@14

$ brew services start postgresql@14

$ brew services list

$ brew services stop postgresql@14
```

### Docker

```bash
$ docker-compose build

$ docker-compose up

$ docker-compose stop

$ docker system prune -a

$ docker push cr.yandex/${CR_REGISTRY}/places:latest

$ docker pull cr.yandex/${CR_REGISTRY}/places:latest

$ docker run cr.yandex/${CR_REGISTRY}/places:latest

$ docker run -d -p 80:3005 cr.yandex/${CR_REGISTRY}/places:latest

$ docker rmi id -f

# [https://cloud.yandex.ru/docs/container-registry/tutorials/run-docker-on-vm#before-begin](https://cloud.yandex.ru/docs/container-registry/tutorials/run-docker-on-vm#before-begin)
$ docker exec -it container_ID_or_name /bin/bash

```

### NGINX

```bash
$ sudo apt update

$ sudo apt install -y nginx

$ sudo ufw allow 'Nginx Full'

$ sudo ufw allow OpenSSH

$ sudo ufw enable

$ sudo systemctl enable --now nginx

$ sudo nano /etc/nginx/sites-available/default

$ sudo nginx -t

$ sudo systemctl reload nginx
```

### SSL

```bash
$ sudo apt update

$ sudo apt install -y certbot python3-certbot-nginx

$ sudo certbot --nginx

$ sudo systemctl reload nginx
```
