<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TenancyCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($tenancy) {
            return [
                'id' => $tenancy->id,
                'name' => $tenancy->name,
                'document_type' => $tenancy->identity_document?->abbreviation,
                'document_number' => $tenancy->document_number,
                'first_document_image_url' => $tenancy->first_document_image_url,
                'second_document_image_url' => $tenancy->second_document_image_url,
                'description' => $tenancy->description,
                'phone' => $tenancy->phone,
                'created_at' => $tenancy->created_at,

                'identity_document_id' => (string) $tenancy->identity_document_id,
            ];
        })->toArray();
    }
    public function paginationInformation($request, $paginated, $default)
    {
        unset($default['links']);
        return $default;
    }
}
