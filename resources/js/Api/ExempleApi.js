class ExempleApi {
    static post(data, callback) {
        Request.call({url: '/api/usurios', method: 'POST', data, callback});
    }
}
