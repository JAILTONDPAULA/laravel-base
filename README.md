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

## 📁 Estrutura SASS

```
resources/sass/
├── _main.sass      # Variáveis principais e cores
├── _preload.sass   # Estilos do preloader
├── _toast.sass     # Sistema de notificações
└── login.sass      # Tela de login
```

## 🎨 Classes JavaScript

- `Toast`: Sistema de notificações
- `Preload`: Controle do carregamento
- `FileVersionService`: Versionamento de assets

## 📝 Uso dos Toasts

```javascript
Toast.success('Operação realizada com sucesso!');
Toast.error('Erro ao processar!', true); // fixo
Toast.alert('Atenção necessária!');
Toast.neutral('Informação geral');
```

---

**Desenvolvido por Jailton Paula** para acelerar o desenvolvimento de projetos Laravel.
