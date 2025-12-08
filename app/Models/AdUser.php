<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class AdUser extends Authenticatable
{
    protected $table = 'tabela_users'; // ! trocar o nome da tabela
    protected $primaryKey = 'user_id'; // ! trocar o nome da chave primária
    // protected $sequence = 'user_id_seq'; // ! trocar o nome da sequência, se aplicável
    public $timestamps = false;  // ! definir se a tabela possui timestamps
    public $incrementing = true; // ! definir se a chave primária é auto-incremento
    protected $fillable = [
        'name',
        'email',
    ]; // ! trocar os nomes das colunas preenchíveis

}
