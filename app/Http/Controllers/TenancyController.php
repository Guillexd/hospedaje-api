<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTenancyRequest;
use App\Http\Resources\TenancyCollection;
use App\Models\Tenancy;
use App\Services\UploadImageService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TenancyController extends Controller
{
    public function __construct(private UploadImageService $uploadImageService) {}

    public function list(Request $request): TenancyCollection
    {
        $tenancy = Tenancy::with(['identity_document'])->where(function (Builder $query) use ($request) {
            if (isset($request->finishDate) && isset($request->startDate)) {
                $query->whereBetween('created_at', [$request->startDate, $request->finishDate]);
            }
            if (isset($request->searchInput)) {
                $query->where('name', 'LIKE', "%{$request->searchInput}%")
                    ->orWhere('document_number', 'LIKE', "%{$request->searchInput}%")
                    ->orWhereHas('identity_document', function (Builder $query) use ($request) {
                        $query->where('abbreviation', 'LIKE', "%{$request->searchInput}%");
                    });
            }
        })->orderBy('id', 'desc')->paginate($request->limit ?? 20);
        return new TenancyCollection($tenancy);
    }

    public function store(StoreTenancyRequest $request): Response
    {
        $data = $this->handleDataAndImageUpload($request);
        Tenancy::create($data);
        return response()->noContent();
    }

    public function update(StoreTenancyRequest $request): Response
    {
        $data = $this->handleDataAndImageUpload($request);
        Tenancy::find($request->id)->update($data);
        return response()->noContent();
    }

    public function destroy(Request $request): Response
    {
        Tenancy::destroy($request->ids);
        return response()->noContent();
    }

    private function getImageTypes(): array
    {
        return [
            (object) [
                'image' => 'first_document_image_url',
                'key' => 'first_document_public_id',
            ],
            (object) [
                'image' => 'second_document_image_url',
                'key' => 'second_document_public_id',
            ],
        ];
    }

    private function handleDataAndImageUpload(Request $request): array
    {
        $imageUrls = [];

        foreach ($this->getImageTypes() as $type) {
            if ($request->hasFile($type->image)) {
                $img_info = $this->uploadImageService->saveImage($request->file($type->image)->getRealPath());
                $imageUrls[$type->image] = (object) array_merge(['public_id_key' => $type->key], $img_info);
            }
        }

        $validatedArray = $request->validated();
        $data = [];

        foreach ($validatedArray as $key => $value) {
            if (isset($imageUrls[$key])) {
                $data[$key] = $imageUrls[$key]->image_url;
                $data[$imageUrls[$key]->public_id_key] = $imageUrls[$key]->public_id;
                continue;
            }
            $data[$key] = $value;
        }

        return $data;
    }
}
