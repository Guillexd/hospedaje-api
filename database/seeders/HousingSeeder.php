<?php

namespace Database\Seeders;

use App\Models\Housing;
use Illuminate\Database\Seeder;

class HousingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Housing::create([
            'name' => 'Hosp. Arequipa',
            'direction' => 'Jr. Arequipa #745 - Chilca',
        ]);
        Housing::create([
            'name' => 'Llamus',
            'direction' => 'Psj. Las Colmenas - Chilca',
        ]);
    }
}
