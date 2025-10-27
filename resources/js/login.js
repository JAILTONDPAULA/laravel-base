class Page {
    static event = {
        init() {
            Preload.hide();
        },
        dom() {
            $(document).on('click', '.login-view-toggle', Page.togglePassword);
            $(document).on('submit', '.login-form', Page.logar.fetch);
        }
    }

    static togglePassword(e) {
        e.preventDefault();
        const input = document.getElementById('login-password');
        const eye = document.getElementById('login-eye');
        if (input.type === 'password') {
            input.type = 'text';
            eye.textContent = '🙈';
        } else {
            input.type = 'password';
            eye.textContent = '👁️';
        }
    }

    static logar = {
        fetch(e) {
            e.preventDefault();
            UsuarioApi.login($(this).serialize(), Page.logar.callback);
        },
        callback(response) {
            location.href = '/';
        }
    }
}

$(document).ready(function() {
    Page.event.init();
    Page.event.dom();
});
