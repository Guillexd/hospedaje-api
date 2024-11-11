<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class HousingRoomCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($housing_room) {
            return [
                'id' => $housing_room->id,
                'room_number' => $housing_room->room_number,
                'housing' => $housing_room->housing->name,
                'is_active' => $housing_room->is_active,
                'is_available' => $housing_room->is_available,

                'housing_id' => (string) $housing_room->housing_id,
            ];
        })->toArray();
    }
    public function paginationInformation($request, $paginated, $default)
    {
        unset($default['links']);
        return $default;
    }
}
