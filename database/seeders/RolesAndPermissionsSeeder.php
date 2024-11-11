<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = collect([
            'view dashboard',
            'create post',
            'edit post',
            'delete post',
            'publish post',
            'view user',
            'create user',
            'edit user',
            'delete user',
            'manage roles',
        ]);

        $permissions->each(function ($permission) {
            Permission::create(['name' => $permission]);
        });

        $admin = Role::create(['name' => 'admin']);
        $assistant = Role::create(['name' => 'assistant']);
        $employee = Role::create(['name' => 'employee']);

        $admin->givePermissionTo(Permission::all());
        $assistant->givePermissionTo([
            'view dashboard',
            'create post',
            'edit post',
            'delete post',
            'publish post',
            'view user',
            'edit user',
        ]);
        $employee->givePermissionTo([
            'view dashboard',
            'view user',
        ]);

        User::first()?->assignRole('admin');
    }
}
