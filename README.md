# Project: ntlstl.places
### Tech Stack
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/-Redux-black?style=flat-square&logo=redux)
![Express](https://img.shields.io/badge/-Express-black?style=flat-square&logo=express)
![Mongoose](https://img.shields.io/badge/-Mongoose-black?style=flat-square&logo=mongoose)
![MongoDB](https://img.shields.io/badge/-MongoDB-black?style=flat-square&logo=mongodb)
![HTML5](https://img.shields.io/badge/-HTML5-black?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-black?style=flat-square&logo=css3)
![Eslint](https://img.shields.io/badge/-Eslint-black?style=flat-square&logo=eslint)
![Stylelint](https://img.shields.io/badge/-Stylelint-black?style=flat-square&logo=stylelint)
![BEM](https://img.shields.io/badge/-BEM-black?style=flat-square&logo=bem)
![Webpack](https://img.shields.io/badge/-Webpack-black?style=flat-square&logo=webpack)
![Jest](https://img.shields.io/badge/-Jest-black?style=flat-square&logo=jest)

* framer-motion
* uuidv4
* classnames

### About
* Photo posting service.

## Demo
...

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

Implemented features:
- [X] Popup, modal
- [X] Display the number of likes of the card
- [X] Form validation, react-hook-form
- [X] Redux, RTK Query
- [X] React error boundaries
- [X] TypeScript, Webpack
- [X] Express static
- [X] Docker
- [X] Service worker
- [X] CI/CD GitHub Actions
- [X] Dark&light theme
- [X] API, express
- [X] User registration, authorization OAUTH
- [X] Add, edit user information
- [X] Add, delete card, like and dislike
- [ ] Tests, jest, cypress

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

$ docker run -d -p 80:3000 cr.yandex/${REGISTRY_ID}/places:latest

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
