<?php

namespace Database\Seeders;

use App\Helpers\HelperPermission;
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
        $permissions = HelperPermission::all();

        $permissions->each(function ($description, $permission) {
            Permission::create([
                'description' => $description,
                'name' => $permission,
            ]);
        });

        $roles = collect([
            'admin' => 'Administrador',
            'employee' => 'Empleado',
        ]);

        $roles->each(function ($description, $role)  use ($roles){
            $role = Role::create([
                'description' => $description,
                'name' => $role,
            ]);

            switch ($role->name) {
                case $roles->keys()->get(0):
                    $role->givePermissionTo(Permission::all());
                    break;

                case $roles->keys()->get(1):
                    $role->givePermissionTo([
                        'see_dashboard',
                    ]);
                    break;
            }
        });

        User::factory()->create([
            'email' => 'enrique@gmail.com'
        ])->assignRole($roles->keys()->get(0));

        User::factory()->create([
            'email' => 'fredy@gmail.com'
        ])->assignRole($roles->keys()->get(0));
    }
}
