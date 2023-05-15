var express = require('express');
var router = express.Router();
var axios = require('axios');

/*
Se colocares no browser o endereço http://localhost:15016 deverás obter a página principal constituída por:

  - Um cabeçalho com metainformação à tua escolha;
  - Uma tabela contendo a lista de contratos, um por linha, com os campos: _id, 
        DataInicioContrato, DataFimContrato, NomeInstituicao e AreasInvestigacao;
  - O campo _id deverá ser um link para a página do contrato com esse identificador;
  - O campo NomeInstituicao deverá ser um link para a página dessa instituição.

Se colocares no browser o endereço http://localhost:15016/:id deverás obter a página do contrato 
      com o identificador passado na rota:

  - Esta página deverá conter todos os campos do contrato e um link para voltar à página principal.

Se colocares no browser o endereço http://localhost:15016/:nipc deverás obter a página da instituição
           cujo NIPCInstituicao seja igual ao parâmetro passado na rota:
  - Na página de cada instituição deverá constar o nome e o nipc da instituição e uma tabela com a
           lista de contratos dessa instituição (tabela com estrutura semelhante à da página principal).
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:15015/contracts') 
    .then(response => {
      var contracts = response.data;
      res.render('index', { d: data, contracts: contracts }); 
    })
    .catch(error => {
      console.error(error);
      res.render('error', { error: error});
    });
});

router.get('/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:15015/contracts/' + req.params.id) 
    .then(response => {
      var contract = response.data;
      res.render('contract', { d: data, contract: contract }); 
    })
    .catch(error => {
      console.error(error);
      res.render('error', { error: error});
    });
});

router.get('/inst/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:15015/contracts?inst=' + req.params.id) 
    .then(response => {
      var inst = response.data;
      res.render('institution', { d: data, inst: inst }); 
    })
    .catch(error => {
      console.error(error);
      res.render('error', { error: error});
    });
});

module.exports = router;
