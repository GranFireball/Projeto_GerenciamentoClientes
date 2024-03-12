const {Pool} = require("pg")
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: "postgres",
  password: process.env.DATABASE_PASSWORD,
  host: "localhost",
  port: 5432,
  database: "gerenciamento_clientes"
})
/* QUERY PARA CRIAR O BANCO DE DADOS
const createDatabaseQuery = "CREATE DATABASE gerenciamento_clientes;";
*/

/* QUERY PARA CRIAR A TABELA 
const createTableQuery = `CREATE TABLE clientes(
  id serial PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  telefone VARCHAR(50) NOT NULL,
  coord_x VARCHAR(50) NOT NULL,
  coord_y VARCHAR(50) NOT NULL
  );`;
*/
/* EXECUTA A QUERY DESEJADA
pool.query(createTableQuery).then((res) => {
  console.log("Criado");
})
.catch((err) => {
  console.log(err);
})
*/
module.exports = pool;