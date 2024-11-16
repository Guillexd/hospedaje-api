<?php

use App\Helpers\HelperPermission;
use App\Http\Controllers\Auth\AuthenticatedTokenSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GenericController;
use App\Http\Controllers\HousingController;
use App\Http\Controllers\HousingPaymentController;
use App\Http\Controllers\HousingRoomController;
use App\Http\Controllers\IdentityDocumentController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\TenancyController;
use App\Http\Controllers\UsersController;
use App\Http\Resources\UserAuthResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

$permissions = HelperPermission::all()->keys();

Route::post('/login', [AuthenticatedTokenSessionController::class, 'store'])
    ->middleware('guest');

Route::middleware(['auth:sanctum'])->group(function () use ($permissions) {
    Route::get('/user', function (Request $request): UserAuthResource {
        return new UserAuthResource($request->user());
    });

    Route::prefix('dashboard')->controller(DashboardController::class)->group(function () use ($permissions) {
        Route::get('/list', 'list')->can($permissions->get(0));
    });

    Route::prefix('users')->controller(UsersController::class)->group(function () use ($permissions) {
        Route::get('/list', 'list')->can($permissions->get(1));
        Route::post('/store', 'store')->can($permissions->get(2));
        Route::put('/update', 'update')->can($permissions->get(3));
        Route::delete('/destroy', 'destroy')->can($permissions->get(4));
    });

    Route::prefix('housing')->controller(HousingController::class)->group(function () use ($permissions) {
        Route::get('/list', 'list')->can($permissions->get(5));
        Route::post('/store', 'store')->can($permissions->get(6));
        Route::put('/update', 'update')->can($permissions->get(7));
        Route::delete('/destroy', 'destroy')->can($permissions->get(8));
        Route::get('/get-active', 'getActive');
    });

    Route::prefix('identity-document')->controller(IdentityDocumentController::class)->group(function () use ($permissions) {
        Route::get('/list', 'list')->can($permissions->get(9));
        Route::post('/store', 'store')->can($permissions->get(10));
        Route::put('/update', 'update')->can($permissions->get(11));
        Route::delete('/destroy', 'destroy')->can($permissions->get(12));
        Route::get('/get-all', 'getAll');
    });

    Route::prefix('tenancy')->controller(TenancyController::class)->group(function () use ($permissions) {
        Route::get('/list', 'list')->can($permissions->get(13));
        Route::post('/store', 'store')->can($permissions->get(14));
        Route::post('/update', 'update')->can($permissions->get(15));
        Route::delete('/destroy', 'destroy')->can($permissions->get(16));
    });

    Route::prefix('housing-room')->controller(HousingRoomController::class)->group(function () use ($permissions) {
        Route::get('/list', 'list')->can($permissions->get(17));
        Route::post('/store', 'store')->can($permissions->get(18));
        Route::put('/update', 'update')->can($permissions->get(19));
        Route::delete('/destroy', 'destroy')->can($permissions->get(20));
    });

    Route::prefix('housing-payment')->controller(HousingPaymentController::class)->group(function () use ($permissions) {
        Route::get('/list', 'list')->can($permissions->get(21));
        Route::post('/store', 'store')->can($permissions->get(22));
        Route::put('/update', 'update')->can($permissions->get(23));
        Route::delete('/destroy', 'destroy')->can($permissions->get(24));
        Route::post('/collect-add-payment', 'collectAndAddNewPayment')->can($permissions->get(25));
        Route::post('/just-collect', 'justCollect')->can($permissions->get(26));
        Route::post('/cancel-collect', 'cancelCollect')->can($permissions->get(27));
        Route::get('/get-rent-expire', 'getRentExpire')->can($permissions->get(28));
    });

    Route::prefix('inquiry')->controller(InquiryController::class)->group(function () use ($permissions) {
        Route::get('/ruc', 'getRUC')->can($permissions->get(29));
        Route::get('/dni', 'getDNI')->can($permissions->get(30));
    });

    Route::prefix('generic')->controller(GenericController::class)->group(function () use ($permissions) {
        Route::patch('/change-status', 'changeStatus')->can($permissions->get(31));
    });

    Route::prefix('role')->controller(RolController::class)->group(function () use ($permissions) {
        Route::get('/list', 'list')->can($permissions->get(32));
        Route::post('/store', 'store')->can($permissions->get(33));
        Route::put('/update', 'update')->can($permissions->get(34));
        Route::delete('/destroy', 'destroy')->can($permissions->get(35));
        Route::get('/permissions', 'getPermissions')->can($permissions->get(36));
    });
});
