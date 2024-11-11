<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            RolesAndPermissionsSeeder::class,
            HousingSeeder::class,
            IdentityDocumentSeeder::class,
            TenancySeeder::class,
            HousingRoomSeeder::class,
        ]);
    }
}
