<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Resources\PermissionCollection;
use App\Http\Resources\RoleCollection;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class RolController extends Controller
{
    public function list(Request $request): RoleCollection
    {
        $roles = Role::where(function (Builder $query) use ($request) {
            if (isset($request->searchInput)) {
                $query->where('description', 'LIKE', "%{$request->searchInput}%");
            }
        })->paginate($request->limit ?? 20);
        return new RoleCollection($roles);
    }

    public function store(StoreRoleRequest $request): Response
    {
        $rol = Role::create(array_merge(
            $request->validated(),
            [
                'name' => Str::slug(Str::lower($request->description), '_'),
                'guard_name' => 'web',
            ]
        ));
        $rol->syncPermissions($request->permissions);

        return response()->noContent();
    }

    public function update(StoreRoleRequest $request): Response
    {
        $rol = Role::findOrFail($request->id);
        $rol->update(array_merge(
            $request->validated(),
            [
                'name' => Str::slug(Str::lower($request->description), '_'),
                'guard_name' => 'web',
            ]
        ));
        $rol->syncPermissions($request->permissions);

        return response()->noContent();
    }

    public function destroy(Request $request): Response
    {
        foreach ($request->ids as $id) {
            if ($id === 1) {
                throw ValidationException::withMessages([
                    'message' => ['No es posible eliminar el rol principal (Administrador).'],
                ]);
            }
        }

        Role::destroy($request->ids);

        return response()->noContent();
    }

    public function getPermissions(): PermissionCollection
    {
        $permissions = Permission::all();
        return new PermissionCollection($permissions);
    }
}
