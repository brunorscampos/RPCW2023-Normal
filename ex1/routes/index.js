var express = require('express');
var router = express.Router();
var Contract = require('../controllers/contract')
var contractsModel = require('../models/contract')

/*
GET /contracts: devolve uma lista com todos os contratos;
GET /contracts/:id: devolve o contrato com identificador id;
GET /contracts?year=YYYY: devolve a lista dos contratos realizados durante o ano YYYY;
GET /contracts?inst=AAA: devolve a lista dos contratos realizados pela instituição contratante AAA;
GET /contracts/courses: devolve a lista dos cursos dos contratados (sem repetições);
GET /contracts/institutions: devolve a lista das instituições contratantes (sem repetições);
POST /contracts: acrescenta um contrato novo à BD;
DELETE /contracts/:id: elimina da BD o contrato com o identificador id.
*/

router.get('/contracts', function(req, res, next) {
  var filter = {}
  var projection = {}
  if (req.query.year) {
    var startYear = parseInt(req.query.year);
    var endYear = startYear + 1;
  
    filter.DataInicioContrato = {
      $gte: startYear + "-01-01",
      $lt: endYear + "-01-01"
    };
  }
  if(req.query.inst) filter.NIPCInstituicao = Number(req.query.inst)
  Contract.list(filter,projection).then(contracts => {
    res.jsonp(contracts)
  })
  .catch(err => {
    res.jsonp({error:err,message: 'Erro na obtencçao da lista de contracts'})
  })
});

router.get('/contracts/courses', function(req, res, next) {
  var filter = {}
  var projection = {_id:0,Curso:1}
  Contract.list(filter,projection).then(contracts => {
    var result = Array.from(new Set(contracts.map(c => c.Curso)));
    res.jsonp(result)
  })
  .catch(err => {
    res.jsonp({error:err,message: 'Erro na obtencçao da lista de contracts'})
  })
});

router.get('/contracts/institutions', function(req, res, next) {
  var filter = {}
  var projection = {_id:0,NomeInstituicao:1}
  Contract.list(filter,projection).then(contracts => {
    var result = Array.from(new Set(contracts.map(c => c.NomeInstituicao)));
    res.jsonp(result)
  })
  .catch(err => {
    res.jsonp({error:err,message: 'Erro na obtencçao da lista de contracts'})
  })
});

router.get('/contracts/:id', function(req, res, next) {
  Contract.getContract(req.params.id).then(contract => {
    res.jsonp(contract)
  })
  .catch(err => {
    res.jsonp({error:err,message: 'Erro na obtencçao da lista de contract'})
  })
});

router.post('/contracts', function(req, res, next) {
  Contract.addContract(req.body)
    .then(contract => {
      res.status(200).json(contract);
    })
    .catch(erro => {
      res.status(522).json({erro:erro,mensagem:"Erro no post do contract"})
    })
});

router.delete('/contracts/:id', function(req, res, next) {
  Contract.deleteContract(req.params.id)
    .then(contract => {
      res.status(200).jsonp(contract);
    })
    .catch(erro => {
      res.status(524).jsonp({erro:erro,mensagem:"Erro no delete do contract"})
    })
});

module.exports = router;
