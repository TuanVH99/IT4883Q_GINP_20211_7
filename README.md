## The project is using
  - NodeJS + MySQL - by TuanVH175995 and Tkank2306
  - ReactJS - By TIENND

## Devide app into 3 part
### Back-end: NodeJs - ExpressJs
- throw the service / endpoint / apis / ... for the front-end
### front-end:ReactJs
- the face of the app :D  fetch the api then show it
### database: MySQL
- I had some difficulties in choosing which db may fit well this app, mongodb, firebase or rsql. So i chose MySQL,though it is not the most suitable but i hope the app can run well


## #1: Running docker:
### If you want to run separate be and ui, just go to folder
- docker build -t [name] .
** After build **
- docker run -dp 3000:8080 [name] // for the be and 3001:8081 for the ui
U can set anything you like for the [name] and any port you like, but default ports are 8080 for be and 8081 for ui
### Run docker-compose
Just run
- docker-compose up -d at the folder contain the dockercompose.yml 
### After
  If you can use, maybe the database is not ready
  - run "docker ps" to find the db container
  - "docker exec -it [container name] bash" to enter the command line
  - "mysql -u root -p"
  - "admin"
  - "create database testdb;"
  - "exit;"
  - "exit"
  - "docker-compose restart"
