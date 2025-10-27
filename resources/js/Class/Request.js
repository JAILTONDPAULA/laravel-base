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
                    Dialog.close('all', 'Erro na Requisição', xhr.responseText);
                }
            },
            success(r,text,jqXHR) {
                callback && callback(r,jqXHR.status)
            }
        })
    }
}
