<?php

namespace Database\Seeders;

use App\Models\HousingPayment;
use App\Models\Tenancy;
use Illuminate\Database\Seeder;

class HousingPaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HousingPayment::factory(500)->create();
    }
}
