## The project is using
  - NodeJS + MySQL - by TuanVH175995 and Tkank2306
  - ReactJS - By TIENND

## Devide app into 3 services
***Back-end: NodeJs - ExpressJs***
- Provide end-points and api, broker server for peer connection like RTC
***Front-end:ReactJs***
- Stand for some client that want to use **server** service
***Database: MySQL***
- For saving data


## Running docker:
**You can run client and server+db separately**
### Run docker-compose
Just run `docker-compose up -build` at the folder contain the dockercompose.yml 
### After
Visit `<hostname>:<server-service-port>/resetdb` for sync db and create table for the app
