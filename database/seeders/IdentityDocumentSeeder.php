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
            'abbreviation' => 'DNI',
            'description' => 'Documento Nacional de Identidad',
        ]);
        IdentityDocument::create([
            'abbreviation' => 'RUC',
            'description' => 'Registro Unico de Contribuyentes',
        ]);
        IdentityDocument::create([
            'abbreviation' => 'Carnet de extranjería',
            'description' => 'Carnet de extranjería',
        ]);
    }
}
