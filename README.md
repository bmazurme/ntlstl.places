# Project: ntlstl.places
### Tech Stack
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/-Redux-black?style=flat-square&logo=redux)
![Sharp](https://img.shields.io/badge/-Sharp-black?style=flat-square&logo=sharp)
![Express](https://img.shields.io/badge/-Express-black?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-black?style=flat-square&logo=postgresql)
![Sequelize](https://img.shields.io/badge/-Sequelize-black?style=flat-square&logo=sequelize)
![HTML5](https://img.shields.io/badge/-HTML5-black?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-black?style=flat-square&logo=css3)
![Eslint](https://img.shields.io/badge/-Eslint-black?style=flat-square&logo=eslint)
![Stylelint](https://img.shields.io/badge/-Stylelint-black?style=flat-square&logo=stylelint)
![BEM](https://img.shields.io/badge/-BEM-black?style=flat-square&logo=bem)
![Webpack](https://img.shields.io/badge/-Webpack-black?style=flat-square&logo=webpack)
![Jest](https://img.shields.io/badge/-Jest-black?style=flat-square&logo=jest)
![Cypress](https://img.shields.io/badge/-Cypress-black?style=flat-square&logo=cypress)
![PostCSS](https://img.shields.io/badge/-PostCSS-black?style=flat-square&logo=postcss)
![PM2](https://img.shields.io/badge/-PM2-black?style=flat-square&logo=pm2)
![Docker](https://img.shields.io/badge/-Docker-black?style=flat-square&logo=docker)

### About
* Photo posting service.

[![Auto tests backend](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/backend.js.yml/badge.svg)](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/backend.js.yml)
[![Auto tests frontend](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/frontend.js.yml/badge.svg)](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/frontend.js.yml)
[![Deploy backend](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/deploy.backend.yml/badge.svg)](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/deploy.backend.yml)
[![Deploy frontend](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/deploy.frontend.yml/badge.svg)](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/deploy.frontend.yml)

## Demo

![Alt-text](https://github.com/bmazurme/ntlstl.mesto/blob/development/frontend/src/images/places.png "demo")

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

$ sudo nano /etc/nginx/sites-available/domain.com

$ sudo ln -s /etc/nginx/sites-available/domain.com /etc/nginx/sites-enabled/domain.com

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
