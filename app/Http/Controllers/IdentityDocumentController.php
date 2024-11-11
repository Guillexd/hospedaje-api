<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIdentityDocumentRequest;
use App\Http\Resources\IdentityDocumentCollection;
use App\Models\IdentityDocument;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class IdentityDocumentController extends Controller
{
    public function list(Request $request): IdentityDocumentCollection
    {
        $document = IdentityDocument::where(function (Builder $query) use ($request) {
            if (isset($request->searchInput)) {
                $query->where('abbreviation', 'LIKE', "%{$request->searchInput}%")
                    ->orWhere('description', 'LIKE', "%{$request->searchInput}%");
            }
        })->paginate($request->limit ?? 20);
        return new IdentityDocumentCollection($document);
    }

    public function store(StoreIdentityDocumentRequest $request): Response
    {
        IdentityDocument::create($request->validated());

        return response()->noContent();
    }

    public function update(StoreIdentityDocumentRequest $request): Response
    {
        IdentityDocument::findOrFail($request->id)->update($request->validated());

        return response()->noContent();
    }

    public function destroy(Request $request): Response
    {
        IdentityDocument::destroy($request->ids);

        return response()->noContent();
    }

    public function getAll(): IdentityDocumentCollection
    {
        $identity_docs = IdentityDocument::all();
        return new IdentityDocumentCollection($identity_docs);
    }
}
