class Dialog {
    static show(title = 'Título', message = 'Mensagem', customClass = '', confirmText = null) {
        const dialogId = 'dialog-' + Date.now();
        
        const submitButton = confirmText ? `<button type="submit">${confirmText}</button>` : '';

        const dialogHtml = `
            <section class="dialog ${customClass}" id="${dialogId}">
                <form class="dialog-form">
                    <div class="dialog-form-header">
                        <h2 class="dialog-form-header-title">${title}</h2>
                        <span class="dialog-close">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                            </svg>
                        </span>
                    </div>
                    <div class="dialog-form-body">
                        ${message}
                    </div>
                    <div class="dialog-form-footer">
                        <button type="button" class="dialog-close">Fechar</button>
                        ${submitButton}
                    </div>
                </form>
            </section>
        `;

        // Ocultar scroll do body quando dialog abre
        $('body').addClass('dialog-open').append(dialogHtml);

        return dialogId;
    }

    static success(title, message, confirmText = null, customClass = '') {
        return Dialog.show(title, message, `dialog-success ${customClass}`, confirmText);
    }

    static error(title, message, confirmText = null, customClass = '') {
        return Dialog.show(title, message, `dialog-error ${customClass}`, confirmText);
    }

    static alert(title, message, confirmText = null, customClass = '') {
        return Dialog.show(title, message, `dialog-alert ${customClass}`, confirmText);
    }
}

// Eventos do documento para fechar dialogs
$(document).on('click', '.dialog-close', function() {
    const $dialog = $(this).closest('.dialog');
    const $form = $dialog.find('.dialog-form');
    
    // Animação de fechamento
    $dialog.css('animation', 'dialog-fade-out 0.3s ease-out');
    $form.css('animation', 'dialog-slide-down 0.3s ease-out');
    
    // Remover do DOM após animação
    setTimeout(() => {
        $dialog.remove();
        
        // Restaurar scroll do body se não há mais dialogs
        if ($('.dialog').length === 0) {
            $('body').removeClass('dialog-open');
        }
    }, 300);
});

// Fechar ao clicar no overlay
$(document).on('click', '.dialog', function(e) {
    if (e.target === this) {
        $(this).find('.dialog-close').first().click();
    }
});

// Exemplo de uso:
// Dialog.show('Título', '<p>HTML complexo <strong>aqui</strong></p>', 'minha-classe');
// Dialog.success('Sucesso', 'Operação realizada!', 'OK');
// Dialog.error('Erro', 'Falha na operação!', 'Tentar Novamente');
// Dialog.alert('Atenção', 'Verifique os dados!');
// Dialog.success('Concluído', 'Processo finalizado!'); // Sem botão submit
