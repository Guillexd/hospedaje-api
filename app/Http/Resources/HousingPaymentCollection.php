<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class HousingPaymentCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($housing_payment) {
            return [
                'id' => $housing_payment->id,
                'payment' => (float) $housing_payment->payment,
                'rental_start_date' => $housing_payment->rental_start_date,
                'rental_end_date' => $housing_payment->rental_end_date,
                'payment_date' => $housing_payment->payment_date,
                'description' => $housing_payment->description,

                'housing_room' => $housing_payment->housing_room->room_number,
                'housing' => $housing_payment->housing_room->housing->name,

                'tenancy_name' => $housing_payment->tenancy->name,
                'tenancy_document_number' => $housing_payment->tenancy->document_number,
                'tenancy_phone' => $housing_payment->tenancy->phone,
                'first_document_image_url' => $housing_payment->tenancy->first_document_image_url,
                'second_document_image_url' => $housing_payment->tenancy->second_document_image_url,
                'tenancy_identity_document' => $housing_payment->tenancy->identity_document->abbreviation,

                'tenancy_id' => (string) $housing_payment->tenancy_id,
                'housing_room_id' => (string) $housing_payment->housing_room_id,
            ];
        })->toArray();
    }
    public function paginationInformation($request, $paginated, $default)
    {
        unset($default['links']);
        return $default;
    }
}
