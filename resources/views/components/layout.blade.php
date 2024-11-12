<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description"
        content="Hospedaje Santa Lucía - Disfruta de una estancia cómoda y relajante en nuestro hospedaje, donde te ofrecemos un ambiente acogedor y servicios de calidad para tu descanso. Ubicado en el corazón de Huancayo, ideal para quienes buscan comodidad y tranquilidad.">
    <meta name="keywords"
        content="hospedaje, hotel, alojamiento, descanso, vacaciones, Huancayo, servicio de calidad, ambiente acogedor, confort, hospedaje Santa Lucía">
    <meta name="author" content="Hospedaje Santa Lucía">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Hospedaje Santa Lucía - Tu hogar lejos de casa">
    <meta property="og:description"
        content="Disfruta de una estancia cómoda y relajante en nuestro hospedaje, donde te ofrecemos un ambiente acogedor y servicios de calidad para tu descanso. Ubicado en el corazón de Huancayo, ideal para quienes buscan comodidad y tranquilidad.">
    <meta property="og:image" content="{{ @url('/assets/img/sl2.jpg') }}">
    <meta property="og:url" content="https://santa-lucia.scriptify-peru.com">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Hospedaje Santa Lucía">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Hospedaje Santa Lucía - Tu hogar lejos de casa">
    <meta name="twitter:description"
        content="Disfruta de una estancia cómoda y relajante en nuestro hospedaje, donde te ofrecemos un ambiente acogedor y servicios de calidad para tu descanso. Ubicado en el corazón de Huancayo, ideal para quienes buscan comodidad y tranquilidad.">
    <meta name="twitter:image" content="{{ @url('/assets/img/sl2.jpg') }}">
    <meta name="twitter:site" content="@HospedajeSantaLucia">


    <!-- Additional SEO Tags -->
    <link rel="canonical" href="https://santa-lucia.scriptify-peru.com">
    <meta name="robots" content="index, follow">
    <meta name="language" content="es">
    <meta name="geo.region" content="PE-JUN"> <!-- Código ISO 3166-2 para Junín -->
    <meta name="geo.placename" content="Huancayo">
    <meta name="geo.position" content="-12.0653;-75.2048"> <!-- Coordenadas de Huancayo -->
    <meta name="ICBM" content="-12.0653, -75.2048">

    <link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml">
    <title>Santa Lucía</title>
    @vite(['resources/css/app.css', 'resources/js/app.ts'])
    <link rel="manifest" crossorigin="use-credentials" href="{{ @url('/build/manifest.webmanifest') }}">
    <script id="vite-plugin-pwa:register-sw" src="{{ @url('/build/registerSW.js') }}"></script>
    @stack('styles')
</head>

<body class="h-screen overflow-hidden">
    <div id="app">
        {{ $slot }}
    </div>
</body>

</html>
