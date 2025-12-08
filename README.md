<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

# Laravel Base Template

Template Laravel otimizado para desenvolvimento rápido e eficiente, com SASS, jQuery e Gulp pré-configurados.

## 🚀 Instalação

Crie um novo projeto usando este template:

```bash
composer create-project jailtonpaula/laravel-base meu-novo-projeto
```

## 🛠️ Tecnologias Incluídas

- **Laravel 12**: Framework PHP robusto e moderno
- **SASS**: Pré-processador CSS para estilos organizados
- **jQuery**: Biblioteca JavaScript para manipulação de DOM
- **Gulp**: Automatização de tarefas para desenvolvimento frontend
- **Oracle & PostgreSQL**: Configurações prontas para múltiplos bancos
- **Localização pt-BR**: Interface em português brasileiro

## 📦 O que está incluso

- ✅ Estrutura SASS organizada com variáveis centralizadas
- ✅ Sistema de toasts configurado (sucesso, erro, alerta, neutro)
- ✅ Tela de login estilo glass com animações
- ✅ Middleware de autenticação por sessão
- ✅ Service para versionamento automático de assets
- ✅ Preloader customizável
- ✅ Gulpfile configurado para desenvolvimento
- ✅ Configurações de banco Oracle e PostgreSQL

## 🚦 Primeiros Passos

Após criar o projeto com `composer create-project jailtonpaula/laravel-base meu-projeto`:

1. **Configure o nome da aplicação** no arquivo `.env`:
   ```
   APP_NAME="Meu Sistema"
   ```

2. **Configure o banco de dados** no `.env`:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=meu_banco
   DB_USERNAME=usuario
   DB_PASSWORD=senha
   ```

3. **Execute as migrações**:
   ```bash
   php artisan migrate
   ```

4. **Para desenvolvimento**:
   ```bash
   npm run dev
   php artisan serve
   ```

## 🛠️ Comandos Gulp

O projeto inclui um sistema Gulp modular para compilação automática de assets:

### **📁 Estrutura dos Gulpfiles:**
- `gulpfile.js` - Arquivo principal que importa os módulos
- `gulpfile.style.js` - Compilação de SASS para CSS
- `gulpfile.script.js` - Compilação e minificação de JavaScript

### **🎨 Comandos SASS (CSS):**

```bash
# Compilar SASS da aplicação principal
gulp sass:app

# Compilar SASS do login
gulp sass:login

# Watch mode - monitora mudanças e recompila automaticamente
gulp sass:app:wt    # Watch apenas da aplicação
gulp sass:login:wt  # Watch apenas do login
gulp sass:all       # Watch de todos os arquivos SASS
```

### **⚙️ Comandos JavaScript:**

```bash
# Compilar e minificar JS da aplicação
gulp js:app

# Compilar e minificar JS do login
gulp js:login

# Watch mode - monitora mudanças e recompila automaticamente
gulp js:app:w    # Watch apenas da aplicação
gulp js:login:w  # Watch apenas do login
gulp js:all      # Watch de todos os arquivos JS
```

### **🔄 Modo Desenvolvimento Completo:**

```bash
# Para monitorar e compilar automaticamente SASS e JS:
gulp sass:all &
gulp js:all

# Ou executar individualmente conforme necessário
```

### **📝 O que cada tarefa faz:**

**SASS:**
- Compila arquivos `.sass` para `.css` minificado
- Gera timestamp único para cache-busting (`v1234567890.min.css`)
- Remove arquivos antigos automaticamente
- Suporte a sourcemaps para debugging

**JavaScript:**
- Concatena múltiplos arquivos JS em um só
- Minifica o código para produção
- Gera timestamp único para cache-busting (`v1234567890.min.js`)
- Remove arquivos antigos automaticamente

## 📚 Sistemas Disponíveis

### **🔔 Sistema de Toast**
Sistema completo de notificações toast com 4 tipos visuais:

```javascript
// Notificação de sucesso
Toast.success('Operação realizada com sucesso!');

// Notificação de erro
Toast.error('Erro ao processar operação!');

// Notificação de aviso
Toast.alert('Atenção: Verifique os dados!');

// Notificação neutra/informativa
Toast.neutral('Informação importante para o usuário');

// Toast personalizado com duração fixa
Toast.show('Mensagem customizada', 'custom', true); // fixo na tela
```

### **💬 Sistema de Dialog**
Sistema de diálogos modais tipados com design moderno:

```javascript
// Dialog de sucesso
Dialog.success('Sucesso!', 'Operação concluída com êxito');

// Dialog de erro
Dialog.error('Erro!', 'Falha na operação');

// Dialog de alerta
Dialog.alert('Atenção!', 'Verifique os dados antes de continuar');

// Dialog genérico personalizado
Dialog.show('Título', 'Conteúdo da mensagem', 'classe-css', 'Botão');
```

### **🎨 Sistema de Cores SASS**
Variáveis centralizadas no arquivo `_main.sass`:

```sass
/* Cores Primárias */
--color-primary-50: #eff6ff
--color-primary-500: #3b82f6
--color-primary-600: #2563eb

/* Cores de Superfície */
--color-surface-0: #ffffff
--color-surface-50: #f8fafc
--color-surface-900: #0f172a

/* Cores Semânticas */
--color-success: #059669
--color-error: #dc2626
--color-warning: #d97706
--color-info: #0284c7
```

## 📁 Estrutura SASS

```
resources/sass/
├── _main.sass      # Variáveis principais e sistema de cores
├── _preload.sass   # Estilos do preloader customizado
├── _toast.sass     # Sistema de notificações toast
├── _dialog.sass    # Sistema de diálogos modais
└── login.sass      # Tela de login com glass morphism
```

## 🎨 Classes JavaScript Disponíveis

- **`Toast`**: Sistema de notificações com tipos visuais
- **`Dialog`**: Sistema de diálogos modais com variantes tipadas  
- **`Preload`**: Controle do carregamento da aplicação
- **`FileVersionService`**: Versionamento automático de assets

## 🔧 Configurações Especiais

### **Oracle Database**
Configuração pronta no `config/database.php` para conexão Oracle:

```php
'oracle' => [
    'driver' => 'oci8',
    'tns' => env('DB_TNS', ''),
    'host' => env('DB_HOST', 'localhost'),
    'port' => env('DB_PORT', '1521'),
    'database' => env('DB_DATABASE', 'xe'),
    'service_name' => env('DB_SERVICE_NAME', ''),
    'username' => env('DB_USERNAME', 'hr'),
    'password' => env('DB_PASSWORD', ''),
    'charset' => 'utf8',
    'prefix' => env('DB_PREFIX', ''),
    'prefix_schema' => env('DB_SCHEMA_PREFIX', ''),
    'edition' => env('DB_EDITION', 'ora$base'),
    'server_version' => env('DB_SERVER_VERSION', '11g'),
],
```

### **PostgreSQL**
Configuração pronta para PostgreSQL com otimizações:

```php
'pgsql' => [
    'driver' => 'pgsql',
    'url' => env('DATABASE_URL'),
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', '5432'),
    'database' => env('DB_DATABASE', 'laravel'),
    'username' => env('DB_USERNAME', 'postgres'),
    'password' => env('DB_PASSWORD', ''),
    'charset' => 'utf8',
    'prefix' => '',
    'prefix_indexes' => true,
    'search_path' => 'public',
    'sslmode' => 'prefer',
],
```

## 📝 Exemplos de Uso Completos

### **🍞 Toast Notifications**

```javascript
// Sucesso - cor verde
Toast.success('Usuário cadastrado com sucesso!');

// Erro - cor vermelha
Toast.error('Falha ao conectar com o servidor!');

// Alerta - cor amarela
Toast.alert('Campos obrigatórios não preenchidos!');

// Neutro - cor azul
Toast.neutral('Dados salvos automaticamente');

// Personalizado com duração fixa (não desaparece automaticamente)
Toast.show('Mensagem importante', 'custom-class', true);
```

### **📋 Modal Dialogs**

```javascript
// Sucesso com botão personalizado
Dialog.success('Parabéns!', 'Conta criada com sucesso!', 'Continuar');

// Erro com botão personalizado 
Dialog.error('Ops!', 'Não foi possível processar o pagamento.', 'Tentar Novamente');

// Alerta simples (apenas botão fechar)
Dialog.alert('Atenção', 'Sua sessão expirará em 5 minutos.');

// Dialog customizado com HTML
Dialog.show(
    'Confirmação', 
    '<p>Deseja realmente <strong>excluir</strong> este item?</p><p class="text-danger">Esta ação não pode ser desfeita.</p>', 
    'dialog-danger', 
    'Excluir'
);
```

## 🚀 Deploy e Produção

### **Compilação para Produção**

```bash
# Compilar todos os assets para produção
npm run assets

# Ou individualmente
gulp sass:app && gulp sass:login
gulp js:app && gulp js:login
```

### **Versionamento Automático**
O sistema gera automaticamente timestamps nos arquivos CSS e JS:
- `public/css/app.v1234567890.min.css`
- `public/js/app.v1234567890.min.js`

Use no Blade com a classe `FileVersionService`:

```php
<!-- CSS -->
<link rel="stylesheet" href="{{ FileVersionService::css('app') }}">
<link rel="stylesheet" href="{{ FileVersionService::css('login') }}">

<!-- JavaScript -->
<script src="{{ FileVersionService::js('app') }}"></script>
<script src="{{ FileVersionService::js('login') }}"></script>
```

## 🤝 Contribuição

Este template foi desenvolvido para acelerar o desenvolvimento Laravel. Se encontrar bugs ou tiver sugestões de melhorias:

1. **Issues**: Reporte problemas no repositório GitHub
2. **Pull Requests**: Contribuições são bem-vindas
3. **Documentação**: Ajude a melhorar esta documentação

## 📄 Licença

Este projeto está sob a [licença MIT](https://opensource.org/licenses/MIT), assim como o Laravel Framework.

---

**🎯 Template Laravel Base v1.0**  
**Desenvolvido por Jailton Paula** para acelerar o desenvolvimento de projetos Laravel modernos.

**📧 Contato**: [jailton@exemplo.com](mailto:jailton@exemplo.com)  
**🌐 GitHub**: [github.com/jailtonpaula](https://github.com/jailtonpaula)
