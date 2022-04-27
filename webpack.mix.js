
let mix = require('laravel-mix');

mix.js('src/js/app.js', 'public/js/app.js').setPublicPath('public');
mix.sass('src/scss/app.scss', 'public/css/app.css').setPublicPath('public');
