class Toast {
  static containerSelector = '.toast-container';

  static types = {
    success: 'toast-success',
    error: 'toast-error',
    alert: 'toast-alert',
    neutral: 'toast-neutral',
  };

  static show(message, type = 'neutral', fixed = false) {
    if (!document.querySelector(Toast.containerSelector)) {
      const container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const container = document.querySelector(Toast.containerSelector);
    const toast = document.createElement('div');
    toast.className = `toast ${Toast.types[type] || Toast.types.neutral}`;

    const msg = document.createElement('span');
    msg.textContent = message;
    toast.appendChild(msg);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => toast.remove();
    toast.appendChild(closeBtn);

    container.appendChild(toast);

    if (!fixed) {
      setTimeout(() => {
        toast.remove();
      }, 3500);
    }
  }

  static success(message, fixed = false) {
    Toast.show(message, 'success', fixed);
  }

  static error(message, fixed = false) {
    Toast.show(message, 'error', fixed);
  }

  static alert(message, fixed = false) {
    Toast.show(message, 'alert', fixed);
  }

  static neutral(message, fixed = false) {
    Toast.show(message, 'neutral', fixed);
  }
}

// Exemplo de uso:
// Toast.success('Operação realizada com sucesso!');
// Toast.error('Ocorreu um erro!', true);
// Toast.alert('Atenção ao campo!', false);
// Toast.neutral('Mensagem informativa.');
