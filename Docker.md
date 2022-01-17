## The project is using

- NodeJS + MySQL - by TuanVH175995 and Tkank2306
- ReactJS - By TIENND

## Devide app into 3 services

> actually, there are 4

**_Back-end: NodeJs - ExpressJs_**

- Provide end-points and api, socket events at port 3001 : 3000
- a small video server run peer js as a broker server for peer connection like RTC at port 9001 : 9000
 
 **_Front-end:ReactJs_**
- Stand for some client that want to use **server** service, but it has only signup and login function! Port 8081 : 8080
 
 **_Database: MySQL_**
- For saving data, Please access it with docker exec and show some cmd SQL query skill. Or you can build **phpmyadmin** (build yourself!)

## Running docker:

**You can run any services separately**
The config file is provided, enjoy!
### Run docker-compose

Just run `docker-compose up -build` at the folder contain the dockercompose.yml

### After

Visit `<hostname>:<server-service-port>/resetdb` for sync db and create tables for the app

*Some old browser will not support webRTC API like `navigator.mediaDevices`!*

In case you want to use the static file served from port3031, change the host name (dev):

```
      const peer = new Peer({
        host: <Your host here>,
        port: 9001,
        path: '/'
      });
```



