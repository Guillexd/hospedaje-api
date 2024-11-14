<?php

namespace Database\Seeders;

use App\Models\IdentityDocument;
use Illuminate\Database\Seeder;

class IdentityDocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        IdentityDocument::create([
            'id' => 1,
            'abbreviation' => 'DNI',
            'description' => 'Documento Nacional de Identidad',
        ]);
        IdentityDocument::create([
            'id' => 2,
            'abbreviation' => 'RUC',
            'description' => 'Registro Unico de Contribuyentes',
        ]);
        IdentityDocument::create([
            'id' => 3,
            'abbreviation' => 'Carnet de extranjería',
            'description' => 'Carnet de extranjería',
        ]);
    }
}
