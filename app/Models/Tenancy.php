<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tenancy extends Model
{
    use HasFactory;
    protected $fillable = [
        'identity_document_id',
        'document_number',
        'name',
        'first_document_image_url',
        'first_document_public_id',
        'second_document_image_url',
        'second_document_public_id',
        'description',
        'phone',
    ];
    public function identity_document(): BelongsTo
    {
        return $this->belongsTo(IdentityDocument::class);
    }
}
