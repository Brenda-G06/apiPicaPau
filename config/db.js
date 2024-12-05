require('dotenv').config();
const mysql = require('mysql2/promise');

// Logs para depuração
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "******" : "undefined");
console.log("DB_DATABASE:", process.env.DB_DATABASE);
console.log("DB_PORT:", process.env.DB_PORT);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "autorack.proxy.rlwy.net",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "caFeHODAgKaGcNMAXIrgAPVZfjoQKFPF",
  database: process.env.DB_DATABASE || "railway",
  port: process.env.DB_PORT || 36215,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexão bem-sucedida com o banco de dados!");
    connection.release();
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  }
})();

module.exports = pool;
