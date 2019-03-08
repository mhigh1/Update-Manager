module.exports = {
	"development": {
	  "username": process.env.DEV_DB_USERNAME,
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DB,
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
	"test": {
    "username": process.env.TEST_DB_USERNAME,
    "password": process.env.TEST_DB_PASSWORD,
    "database": process.env.TEST_DB,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
	  "production": {
    "username": process.env.PROD_DB_USERNAME,
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DB,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
