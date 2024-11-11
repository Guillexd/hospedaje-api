<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Housing extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'direction',
        'is_active',
    ];
    public function scopeActive(Builder $query): void
    {
        $query->where('is_active', 1);
    }
}
