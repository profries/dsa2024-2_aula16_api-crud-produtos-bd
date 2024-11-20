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

async function buscarPorId(id) {
    const cliente = new Client(config);
    await cliente.connect();
    const sql = "SELECT * from produtos WHERE id=$1";
    const values = [id];
    const result = await cliente.query(sql, values);
    await cliente.end();
    const produtoEncontrado = result.rows[0];
    return (produtoEncontrado);

}

async function atualizar(id, produto) {
    const sql = 'UPDATE produtos set nome=$1, categoria=$2, preco=$3 WHERE id=$4 RETURNING *'
    const values = [produto.nome, produto.categoria, produto.preco, id];

    const cliente = new Client(config);
    await cliente.connect();
    const result = await cliente.query(sql, values);
    await cliente.end();
    const produtoAtualizado = result.rows[0];
    return (produtoAtualizado);
}

async function deletar(id) {
    const sql = 'DELETE FROM produtos WHERE id=$1 RETURNING *'
    const values = [id];

    const cliente = new Client(config);
    await cliente.connect();
    const result = await cliente.query(sql, values);
    await cliente.end();
    const produtoDeletado = result.rows[0];
    return (produtoDeletado);
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}