module.exports = app => {
    app.post('/signup', app.api.usuarios.save)
    app.post('/signin', app.api.auth.signin)
    app.route('/usuarios/list')
    .all(app.config.passport.authenticate())
    .post(app.api.usuarios.listUsuarios)
}