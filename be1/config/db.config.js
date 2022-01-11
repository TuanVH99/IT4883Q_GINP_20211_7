module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: "mysql",
    port: process.env.DB_PORT,
};

// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "admin",
//   DB: "chatapp",
//   dialect: "mysql",
//   port: "3306",
// };

module.exports = {
    HOST: "db4free.net",
    USER: "vuhoangtuan0213",
    PASSWORD: "tuanthoi22",
    DB: "tuanvh_chatapp",
    dialect: "mysql",
    port: "3306",
};