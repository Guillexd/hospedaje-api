<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HousingRoom extends Model
{
    use HasFactory;
    protected $fillable = [
        'housing_id',
        'room_number',
        'is_active',
        'is_available',
    ];
    protected static function booted(): void
    {
        static::addGlobalScope('active', function (Builder $builder) {
            $builder->whereHas('housing', function (Builder $query) {
                $query->where('is_active', 1);
            });
        });
    }
    public function scopeActive(Builder $query): void
    {
        $query->where('is_active', 1);
    }
    public function housing(): BelongsTo
    {
        return $this->belongsTo(Housing::class);
    }
}
