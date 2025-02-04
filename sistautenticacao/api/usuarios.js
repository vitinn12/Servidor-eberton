const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash

            /*if(!req.body.nome.trim()){
                return res.status(400).send('Nome inválido!')
            }
           
            if(!req.body.cpf.trim()){
                return res.status(400).send('Nome inválido!')
            }*/
           
            app.db('usuarios')
                .insert({nome: req.body.nome,
                    cpf: req.body.cpf,
                    telefone: req.body.telefone,
                    email: req.body.email,
                    password: password})
                .then( _ => res.status(204).send())
                .catch( err => res.status(400).json(err))
               
        })
    }
    const listUsuarios = (req, res) => {
        app.db('usuarios')
            .orderBy('nome')
            .then(users => res.json(users))
            .catch(err => res.status(400).json(err))
            return {save, listUsuarios}
     }

    return {save, listUsuarios}
}