<?php

namespace Database\Seeders;

use App\Models\Tenancy;
use Illuminate\Database\Seeder;

class TenancySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tenancy::factory(100)->create();
    }
}
