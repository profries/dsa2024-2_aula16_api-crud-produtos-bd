const produtoService = require('../service/produto_service')

//Listar Produtos
async function listar(req, res) {
    res.json(await produtoService.listar())
}

//Buscar por id
async function buscarPorId(req, res) {
  // O + antes converte o valor para number (na URL vem como string)
  const id = +req.params.id;
  try {
    res.json(await produtoService.buscarPorId(id));
  } catch(err) {
    res.status(err.id).json(err)
  }
}

//Inserir
async function inserir(req, res) {
    const produto = req.body;
    try{
      const produtoInserido = await produtoService.inserir(produto);
      res.status(201).json(produtoInserido)
    }
    catch(err){
      res.status(err.id).json(err)
    }
}

//Atualizar
async function atualizar (req, res) {
  const id = +req.params.id;
  const produto = req.body;
  try{
    const produtoAtualizado = await produtoService.atualizar(id, produto);
    res.json(produtoAtualizado)
  }
  catch(err){
    res.status(err.id).json(err)
  }
}

//Deletar
async function deletar(req, res) {
  const id = +req.params.id;
  try {
    res.json(await produtoService.deletar(id));
  } catch(err) {
    res.status(err.id).json(err)
  }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}