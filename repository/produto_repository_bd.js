const {Client} = require('pg')

const config = {
    user:'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'crud_produtos'
}

async function listar() {
    const cliente = new Client(config);
    //conexão
    await cliente.connect();
    //query
    const sql = "SELECT * FROM produtos ORDER BY(id)";
    const res = await cliente.query(sql);
    //finalizar conexão
    await cliente.end();

    return res.rows;
}

module.exports = {
    listar
}