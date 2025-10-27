class Dialog {
    static open(id, titulo, html, submit) {
        $('.dialog-form').attr('id', id);
        $('.dialog-form .titulo').text(titulo);
        $('.dialog-form .body').html(html);
        $('.dialog-form .footer button[type="submit"]').remove();
        submit && $('.dialog-form .footer').append(`<button type="submit">${submit}</button>`);
        $('.containerdialog').css({transform: 'translateX(0)', opacity: 1});
    }

    static close() {
        $('.containerdialog').css({transform: 'translateX(-100%)', opacity: 0});
    }
}


$(document).ready(function() {
    $(document).on("click", ".close-modal", Dialog.close)
});
