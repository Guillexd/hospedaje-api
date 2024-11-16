<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
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

    protected function rentalStartDate(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::parse($value)->setSeconds(0)->format('Y-m-d H:i:s'),
            set: fn (string $value) => Carbon::parse($value)->setSeconds(0)->format('Y-m-d H:i:s'),
        );
    }

    protected function rentalEndDate(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::parse($value)->setSeconds(0)->format('Y-m-d H:i:s'),
            set: fn (string $value) => Carbon::parse($value)->setSeconds(0)->format('Y-m-d H:i:s'),
        );
    }

    protected function paymentDate(): Attribute
    {
        return Attribute::make(
            get: fn (string | null $value) => !!$value ? Carbon::parse($value)->setSeconds(0)->format('Y-m-d H:i:s') : null,
            set: fn (string | null $value) => !!$value ? Carbon::parse($value)->setSeconds(0)->format('Y-m-d H:i:s') : null,
        );
    }

    public function scopeToExpire(Builder $query): void
    {
        $query->whereNull('payment_date')
            ->whereDate('rental_end_date', '>=', now())
            ->whereDate('rental_end_date', '<=', now()->addDays(7))
            ->orderByR('rental_end_date');
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
