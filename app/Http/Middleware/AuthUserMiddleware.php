<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class AuthUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Verificar se a sessão está iniciada
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        // Verificar se o usuário está autenticado
        if (!isset($_SESSION['user'])) {
            return response()->json(['error' => 'Usuário não autenticado.'], 401);
        }

        // Verificar os perfis permitidos, se especificados
        if (!empty($roles)) {
            $userRole = $_SESSION['user']['perfil'] ?? null;

            if (!in_array($userRole, $roles)) {
                return response()->json(['error' => 'Acesso negado.'], 403);
            }
        }

        return $next($request);
    }
}
