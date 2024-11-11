<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('housing_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('housing_room_id')->nullable()->constrained();
            $table->foreignId('tenancy_id')->constrained()->cascadeOnDelete();
            $table->decimal('payment', 8, 2);
            $table->dateTimeTz('rental_start_date');
            $table->dateTimeTz('rental_end_date');
            $table->dateTimeTz('payment_date')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('housing_payments');
    }
};
