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
            RolesAndPermissionsSeeder::class,
            HousingSeeder::class,
            IdentityDocumentSeeder::class,
            HousingRoomSeeder::class,
            TenancySeeder::class,
            HousingPaymentSeeder::class,
        ]);
    }
}
