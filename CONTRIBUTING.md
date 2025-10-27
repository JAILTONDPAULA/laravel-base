# Diretrizes de Desenvolvimento

Este documento descreve as regras e padrões que devem ser seguidos ao contribuir para este projeto.

## Estrutura de Código

### SASS
- Desenvolva organizando o código em cascata.
- As cores a ser usada no projeto estão em resources\sass\_main.sass e não precisam ser importadas nos arquivos a ser editado pois ela já está na app.

### JAVASCRIPT
- Todo código deve ser organizado em classe.
- Os métodos devem ser estaticos.
- Considere que a página que vai rodar esse código já tem jQuery então der preferia a desenvolver com jQuery.
- Os eventos DOM devem parti de document:
  ```script
    $(document).on("click", "#id", Page.close)
  ```
- Se os métodos forem relacionado devem ser agrupados, exemplo openmodal, close modal:
  ```script
  static modal = {
    open() {},
    close() {}
  }
  ``` 
<!-- ### SASS
- Use a estrutura modular para organizar os arquivos SCSS.
- Nomeie os arquivos com o prefixo `_` para partials (ex.: `_buttons.scss`).
- Utilize variáveis para cores, fontes e espaçamentos.
- Exemplo de estrutura:
  ```scss
  $primary-color: #3b82f6;

  .btn {
      background-color: $primary-color;
      border-radius: 4px;
  }
  ``` -->

---

Siga essas diretrizes para garantir a consistência e qualidade do código no projeto. Obrigado por contribuir!
