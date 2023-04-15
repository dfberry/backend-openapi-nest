export default () => ({
  port: parseInt(process.env.PORT) || 8080,
  dbhost: process.env.AZURE_SQL_HOST,
  dbusername: process.env.AZURE_SQL_USERNAME,
  dbpassword: process.env.AZURE_SQL_PASSWORD,
  dbdatabase: process.env.AZURE_SQL_DATABASE,
});
