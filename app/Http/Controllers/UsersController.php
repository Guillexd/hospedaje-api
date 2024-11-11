<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function list(Request $request): UserCollection
    {
        $users = User::where(function (Builder $query) use ($request) {
            if (isset($request->searchInput)) {
                $query->where('name', 'LIKE', "%{$request->searchInput}%")
                    ->orWhere('dni', 'LIKE', "%{$request->searchInput}%")
                    ->orWhere('phone', 'LIKE', "%{$request->searchInput}%");
            }
        })->orderBy('id', 'desc')->paginate($request->limit ?? 20);
        return new UserCollection($users);
    }

    public function store(StoreUserRequest $request): Response
    {
        User::create(array_merge(
            $request->validated(),
            ['password' => Hash::make($request->password)]
        ));

        return response()->noContent();
    }

    public function update(StoreUserRequest $request): Response
    {
        User::findOrFail($request->id)->update($request->validated());

        return response()->noContent();
    }

    public function destroy(Request $request): Response
    {
        foreach ($request->ids as $id) {
            if ($id === Auth::user()->id) {
                throw ValidationException::withMessages([
                    'message' => ['No es posible eliminar tu cuenta directamente a través del sistema, tienes que realizarlo desde otra cuenta administrativa.'],
                ]);
            }
        }

        User::destroy($request->ids);

        return response()->noContent();
    }
}
