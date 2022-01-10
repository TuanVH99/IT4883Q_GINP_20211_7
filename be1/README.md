To run this server:
- find the config file in the config folder
- comment the code of local mysql, un-comment the code of online mysql(db4free.net)
- command: `npm install`
- command: `npx nodemon be1`
- access url to reset / sync / create DB: `http://localhost:3000/resetdb` 
- if it return **DB sync**, access  `http://localhost:3000/`
### 1 1 Chat proccess aka Private chat
- signup an account,
- login with your account
- **chat** tab
- - create private chat with some user,
- - get private info of private chat with that user
- - send a message
- - get list (top 25) message
