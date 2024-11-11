<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tenancy>
 */
class TenancyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'identity_document_id' => fake()->numberBetween(1, 2),
            'name' => fake()->name(),
            'document_number' => fake()->numberBetween(10000000, 99999999),
            'description' => fake()->realText(50),
            'phone' => fake()->numberBetween(900000000, 999999999),
        ];
    }
}
