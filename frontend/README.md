# Project: ntlstl.places
### Tech Stack
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/-Redux-black?style=flat-square&logo=redux)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)
![HTML5](https://img.shields.io/badge/-HTML5-black?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-black?style=flat-square&logo=css3)
![Eslint](https://img.shields.io/badge/-Eslint-black?style=flat-square&logo=eslint)
![Stylelint](https://img.shields.io/badge/-Stylelint-black?style=flat-square&logo=stylelint)
![BEM](https://img.shields.io/badge/-BEM-black?style=flat-square&logo=bem)
![Webpack](https://img.shields.io/badge/-Webpack-black?style=flat-square&logo=webpack)
![PostCSS](https://img.shields.io/badge/-PostCSS-black?style=flat-square&logo=postcss)
![Nginx](https://img.shields.io/badge/-Nginx-black?style=flat-square&logo=nginx)
![Docker](https://img.shields.io/badge/-Docker-black?style=flat-square&logo=docker)


### About
* Photo posting service.

[![Auto tests frontend](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/frontend.js.yml/badge.svg)](https://github.com/bmazurme/ntlstl.mesto/actions/workflows/frontend.js.yml)

## Demo

![Alt-text](https://github.com/bmazurme/ntlstl.mesto/blob/main/src/images/places.png "demo")

### To do frontend
- [X] prod/dev configs .env
- [X] fix package.json, scripts
- [X] fix dockerfile
- [X] docker-compose -> shared
- [ ] fix update libs
- [ ] fix style-lint config
- [ ] fix links (color)
- [ ] fix icon, static
- [ ] fix footer for mobile mode
- [ ] fix main-page (custom cards, ads-card)
- [ ] fix upload form avatar (crop, rotate, scale) - lib AvatarEditor
- [ ] fix upload form image for card (crop, rotate, scale) - lib AvatarEditor
- [ ] fix atatar component (add preloader)
- [ ] fix oauth page (wigth, color-scheme)
- [ ] fix profile style
- [ ] fix slide style, effect, edit mode, edit template / grid
- [ ] fix slide-image preloader
- [ ] fix edit-profile form
- [ ] fix routing (to slide, to auth)
- [ ] fix routing slide (open card page by id & open slide by click) 
- [ ] fix mobile, tab modes
- [ ] fix paginator, carousel
- [ ] fix preloader, api (is-loading)
- [ ] fix users-page - style, likes, comments
- [ ] fix bundle
- [ ] fix refactoring - fix structure
- [ ] fix readme - add manual
- [ ] feat upload progress files/images widget
- [ ] feat card page
- [ ] feat theme-array [custom theme]
- [ ] feat tags-page / block (lib)
- [ ] feat pwa api
- [ ] feat admin-page (cards, notes, comments, metrik)
- [ ] feat role
- [ ] feat ui-kit-page
- [ ] feat metrik-page
- [ ] feat page about (info)
- [ ] feat location tag widget
- [ ] feat share-link widget
- [ ] feat notication page, page-list, block, widget, websocket
- [ ] feat metrik

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

$ docker push cr.yandex/${REGISTRY_ID}/places:latest

$ docker pull cr.yandex/${REGISTRY_ID}/places:latest

$ docker run cr.yandex/${REGISTRY_ID}/places:latest

$ docker run -d -p 80:3005 cr.yandex/${REGISTRY_ID}/places:latest

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

