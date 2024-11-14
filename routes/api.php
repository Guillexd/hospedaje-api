<?php

use App\Http\Controllers\Auth\AuthenticatedTokenSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GenericController;
use App\Http\Controllers\HousingController;
use App\Http\Controllers\HousingPaymentController;
use App\Http\Controllers\HousingRoomController;
use App\Http\Controllers\IdentityDocumentController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\TenancyController;
use App\Http\Controllers\UsersController;
use App\Http\Resources\UserAuthResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthenticatedTokenSessionController::class, 'store'])
    ->middleware('guest');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request): UserAuthResource {
        return new UserAuthResource($request->user());
    });

    Route::prefix('dashboard')->controller(DashboardController::class)->group(function () {
        Route::get('/list', 'list');
    });

    Route::prefix('users')->controller(UsersController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store');
        Route::put('/update', 'update');
        Route::delete('/destroy', 'destroy');
    });

    Route::prefix('housing')->controller(HousingController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store');
        Route::put('/update', 'update');
        Route::delete('/destroy', 'destroy');
        Route::get('/get-active', 'getActive');
    });

    Route::prefix('identity-document')->controller(IdentityDocumentController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store');
        Route::put('/update', 'update');
        Route::delete('/destroy', 'destroy');
        Route::get('/get-all', 'getAll');
    });

    Route::prefix('tenancy')->controller(TenancyController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store');
        Route::post('/update', 'update');
        Route::delete('/destroy', 'destroy');
    });

    Route::prefix('housing-room')->controller(HousingRoomController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store');
        Route::put('/update', 'update');
        Route::delete('/destroy', 'destroy');
    });

    Route::prefix('housing-payment')->controller(HousingPaymentController::class)->group(function () {
        Route::get('/list', 'list');
        Route::post('/store', 'store');
        Route::put('/update', 'update');
        Route::delete('/destroy', 'destroy');
        Route::post('/collect-add-payment', 'collectAndAddNewPayment');
        Route::post('/just-collect', 'justCollect');
        Route::post('/cancel-collect', 'cancelCollect');
        Route::get('/get-rent-expire', 'getRentExpire');
    });

    Route::prefix('inquiry')->controller(InquiryController::class)->group(function () {
        Route::get('/ruc', 'getRUC');
        Route::get('/dni', 'getDNI');
    });

    Route::prefix('generic')->controller(GenericController::class)->group(function () {
        Route::patch('/change-status', 'changeStatus');
    });
});
