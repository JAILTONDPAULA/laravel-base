class UsuarioApi {

    static login(data, callback) {
        Request.call('/api/usuarios/logar', 'POST', data, callback);
    }

}
