<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Configurar locale para português brasileiro
        app()->setLocale(config('app.locale'));

        // Configurar Carbon para português brasileiro
        \Carbon\Carbon::setLocale(config('app.locale'));

        // Configurar validação para usar mensagens em português
        \Illuminate\Support\Facades\Validator::extend('cpf', function ($attribute, $value, $parameters, $validator) {
            return preg_match('/^\d{3}\.\d{3}\.\d{3}-\d{2}$/', $value) || preg_match('/^\d{11}$/', $value);
        });
    }
}
