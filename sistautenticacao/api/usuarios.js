const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        console.log("Headers:", req.headers); 
        console.log("Body recebido:", req.body); 
    
        if (!req.body || !req.body.password) {
            return res.status(400).json({ error: "Dados inválidos ou não recebidos" });
        }
    
        obterHash(req.body.password, hash => {
            const password = hash;
            app.db('usuarios')
                .insert({
                    nome: req.body.nome,
                    cpf: req.body.cpf,
                    telefone: req.body.telefone,
                    email: req.body.email,
                    password: password
                })
                .then(() => res.status(201).json({ message: "Usuário cadastrado com sucesso!" }))
                .catch(err => res.status(400).json({ error: "Erro ao cadastrar usuário", details: err }));
        });
    };
    
    
    
    const listUsuarios = (req, res) => {
        app.db('usuarios')
            .orderBy('nome')
            .then(users => res.json(users))
            .catch(err => res.status(400).json(err))
            return {save, listUsuarios}
     }

    return {save, listUsuarios}
}