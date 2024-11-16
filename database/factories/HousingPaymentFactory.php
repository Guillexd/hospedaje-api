<?php

namespace Database\Factories;

use App\Models\HousingRoom;
use App\Models\Tenancy;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HousingPayment>
 */
class HousingPaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $housing_id = HousingRoom::inRandomOrder()->where('is_active', 1)->first()->id;
        $rentalStartDate = fake()->dateTimeBetween('-4 months', 'now');
        $rentalEndDate = Carbon::instance($rentalStartDate)->addMonth()->format('Y-m-d H:i:s');
        $paymentDate = rand(1, 10) === 10 ? null : $rentalEndDate;
        $rentalStartDate = Carbon::instance($rentalStartDate)->format('Y-m-d H:i:s');

        if(is_null($paymentDate)) {
            HousingRoom::find($housing_id)->update(['is_available' => 0]);
        }

        return [
            'housing_room_id' => $housing_id,
            'tenancy_id' => Tenancy::inRandomOrder()->first()->id,
            'payment' => fake()->randomFloat(2, 200, 500),
            'rental_start_date' => $rentalStartDate,
            'rental_end_date' => $rentalEndDate,
            'payment_date' => $paymentDate,
            'description' => fake()->realText(200),
        ];
    }
}
