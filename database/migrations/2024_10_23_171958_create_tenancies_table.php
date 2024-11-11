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
        Schema::create('tenancies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('identity_document_id')->nullable()->constrained();
            $table->string('name', 50);
            $table->string('document_number', 20)->unique()->nullable();
            $table->string('first_document_image_url')->nullable();
            $table->string('first_document_public_id')->nullable();
            $table->string('second_document_image_url')->nullable();
            $table->string('second_document_public_id')->nullable();
            $table->text('description')->nullable();
            $table->string('phone', 9);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenancies');
    }
};
