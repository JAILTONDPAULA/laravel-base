<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors()->first(), 422);
        }


        return response()->json('Login bem-sucedido.', 200);

    }
}
