var Contract = require('../models/contract').contractModel

// Acordao list
module.exports.list = (filter,projection) => {
    return Contract.find(filter,projection)
        .then(docs => {
            return docs
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getContract = id => {
    return Contract.findOne({_id:id})
        .then(contract => {
            return contract
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addContract = t => {
    return Contract.create(t)
        .then(contract => {
            return contract
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deleteContract = id => {
    return Contract.deleteOne({_id:id})
        .then(contract => {
            return contract
        })
        .catch(erro => {
            return erro
        })
}