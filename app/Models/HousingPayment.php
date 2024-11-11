<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HousingPayment extends Model
{
    use HasFactory;
    protected $fillable = [
        'housing_room_id',
        'tenancy_id',
        'payment',
        'rental_start_date',
        'rental_end_date',
        'payment_date',
        'description',
    ];

    public function scopeToExpire(Builder $query): void
    {
        $query->whereNull('payment_date')
            ->whereDate('rental_end_date', '>=', now())
            ->whereRaw('DATEDIFF(rental_end_date, ?) <= 7', [now()]);
    }

    public function tenancy(): BelongsTo
    {
        return $this->belongsTo(Tenancy::class);
    }

    public function housing_room(): BelongsTo
    {
        return $this->belongsTo(HousingRoom::class);
    }
}
