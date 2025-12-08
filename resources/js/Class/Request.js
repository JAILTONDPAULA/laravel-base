class Request {
    static call(url,type,data,callback=null,start=true,headers={},dataType='json') {
        $.ajax({
            url,type,dataType,type,data,headers,
            beforeSend() {
                start && Preload.show();
            },
            error(xhr, status, error) {
                if(xhr.status === 401 && !['/login','/senha'].includes(location.pathname)) {
                    location.href = '/login'
                } else {
                    Preload.hide();
                    Toast.error('Erro na Requisição: ' + xhr.responseText, true);
                }
            },
            success(r,text,jqXHR) {
                callback && callback(r,jqXHR.status)
            }
        })
    }
}
