<?php

namespace App\Providers;

use App\Services\DNIService;
use App\Services\RUCService;
use GuzzleHttp\Client;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->when([DNIService::class, RUCService::class])
            ->needs(Client::class)
            ->give(function (): Client {
                return new Client([
                    'base_uri' => 'https://api.apis.net.pe',
                    'headers' => [
                        'Authorization' => 'Bearer ' . env('TOKEN_APIS_NET'),
                        'User-Agent' => 'laravel/guzzle',
                        'Accept' => 'application/json',
                    ],
                    'http_errors' => false,
                    'connect_timeout' => 5,
                    'verify' => false,
                ]);
            });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . "/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
    }
}
