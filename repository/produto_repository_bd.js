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

async function inserir(produto){
    const cliente = new Client(config);
    //conexão
    await cliente.connect();
    //query
    const sql = "INSERT INTO produtos(nome, categoria, preco) VALUES ($1, $2, $3) RETURNING *";
    const valores = [produto.nome, produto.categoria, produto.preco];
    const res = await cliente.query(sql, valores);
    //finalizar conexão
    await cliente.end();

    const produtoInserido = res.rows[0];
    return produtoInserido;

}

module.exports = {
    listar,
    inserir
}