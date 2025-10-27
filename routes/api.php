<?php

use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('usuarios')->group(function () {
    Route::post('/logar', [UsuarioController::class, 'login']);
});
