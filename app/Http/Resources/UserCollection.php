<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'birth_date' => $user->birth_date,
                'email' => $user->email,
                'dni' => $user->dni,
                'phone' => $user->phone,
                'is_active' => $user->is_active,
            ];
        })->toArray();
    }
    public function paginationInformation($request, $paginated, $default)
    {
        unset($default['links']);
        return $default;
    }
}
