<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'email' => 'enrique@gmail.com'
        ]);
        User::factory()->create([
            'email' => 'fredy@gmail.com'
        ]);
    }
}
