<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Santa Lucía</title>
        @vite(['resources/css/app.css', 'resources/js/app.ts'])
        @stack('styles')
    </head>
    <body class="h-screen overflow-hidden">
        <div id="app">
            {{ $slot }}
        </div>
    </body>
</html>
