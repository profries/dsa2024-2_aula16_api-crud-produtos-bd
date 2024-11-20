const produtoRepositoryBD = require('../repository/produto_repository_bd')

async function listar() {
    return await produtoRepositoryBD.listar();
}

async function inserir(produto) {
    if(produto && produto.nome 
        && produto.categoria && produto.preco){
            return await produtoRepositoryBD.inserir(produto);
    }
    else {
        throw { id: 400, msg: "Produto sem dados corretos"}
    }
}

async function buscarPorId(id) {
    let produto = await produtoRepositoryBD.buscarPorId(id);
    if(produto) {
        return produto;
    }
    else {
        throw { id: 404, msg: "Produto não encontrado!" }
    }
}

async function atualizar(id, produto) {
    if(produto && produto.nome && produto.categoria && produto.preco) {
        const produtoAtualizado = await produtoRepositoryBD.atualizar(id, produto);
        if(produtoAtualizado) {
            return produtoAtualizado;
        }        
        else {
            throw {id:404, msg: "Produto não encontrado"};
        }
    }
    else {
        throw {id:400, msg: "Produto sem dados corretos"};
    }
}

async function deletar(id) {
    let produto = await produtoRepositoryBD.deletar(id);
    if(produto) {
        return produto;
    }
    else {
        throw { id: 404, msg: "Produto não encontrado!" }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}