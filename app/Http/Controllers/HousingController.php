<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHousingRequest;
use App\Http\Resources\HousingCollection;
use App\Models\Housing;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HousingController extends Controller
{
    public function list(Request $request): HousingCollection
    {
        $housing = Housing::where(function (Builder $query) use ($request) {
            if (isset($request->searchInput)) {
                $query->where('name', 'LIKE', "%{$request->searchInput}%")
                    ->orWhere('direction', 'LIKE', "%{$request->searchInput}%");
            }
        })->paginate($request->limit ?? 20);
        return new HousingCollection($housing);
    }

    public function store(StoreHousingRequest $request): Response
    {
        Housing::create($request->validated());

        return response()->noContent();
    }

    public function update(StoreHousingRequest $request): Response
    {
        Housing::findOrFail($request->id)->update($request->validated());

        return response()->noContent();
    }

    public function destroy(Request $request): Response
    {
        Housing::destroy($request->ids);

        return response()->noContent();
    }

    public function getActive(): HousingCollection
    {
        $housing = Housing::active()->get();
        return new HousingCollection($housing);
    }
}
