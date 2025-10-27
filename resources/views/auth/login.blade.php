@php
use App\Services\FileVersionService;
$css = FileVersionService::get('/css/login');
$js = FileVersionService::get('/js/login');
@endphp
@extends('layout.main')
@section('titulo', 'Login')
@section('head')
<script src="{{ $js }}" defer></script>
<link rel="stylesheet" href="{{ $css }}">
@endsection
@section('body')
<div class="login-bg">
  <div class="login-anim"></div>
  <div class="login-anim"></div>
  <div class="login-anim"></div>
</div>
<div class="login-glass">
  <div class="login-title">
    @if(file_exists(public_path('img/logo.png')))
      <img src="{{ asset('img/logo.png') }}" alt="Logo" class="login-logo">
    @else
      <h1>Sistema</h1>
    @endif
  </div>
  <form class="login-form" method="POST">
    @csrf
    <input type="text" name="email" class="login-input" placeholder="E-mail" required autofocus>
    <div class="login-password">
      <input type="password" name="password" class="login-input" id="login-password" placeholder="Senha" required>
      <button type="button" class="login-view-toggle" onclick="Page.togglePassword()" tabindex="-1">
        <span id="login-eye">👁️</span>
      </button>
    </div>
    <button type="submit" class="login-btn">Entrar</button>
    <div class="login-footer">TraumFabirk Software</div>
  </form>
</div>
@endsection
