@php
use App\Services\FileVersionService;
$css = FileVersionService::get('/css/app');
$js = FileVersionService::get('/js/app');
@endphp
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('titulo','Sistema')</title>
    {{-- JS --}}
    <script src="/js/jQuery-v3.7.1.min.js" defer></script>
    <script src="{{ $js }}" defer></script>
    {{-- CSS --}}
    <link rel="stylesheet" href="{{ $css }}">
    @yield('head')
</head>
<body>
@include('layout.preload')
@include('components.dialog')
@yield('body')
</body>
</html>
