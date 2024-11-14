<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHousingRoomRequest;
use App\Http\Resources\HousingRoomCollection;
use App\Models\HousingRoom;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HousingRoomController extends Controller
{
    public function list(Request $request): HousingRoomCollection
    {
        $housing_room = HousingRoom::with(['housing'])->where(function (Builder $query) use ($request) {
            if (isset($request->searchInput)) {
                $query->where('room_number', 'LIKE', "%{$request->searchInput}%")
                    ->orWhereHas('housing', function (Builder $query) use ($request) {
                        $query->where('name', 'LIKE', "%{$request->searchInput}%");
                    });
            }
            if (isset($request->active)) {
                $query->active();
            }
            if (isset($request->available)) {
                $query->available();
            } elseif(isset($request->not_available)) {
                $query->notAvailable();
            }
        })->paginate($request->limit ?? 20);
        return new HousingRoomCollection($housing_room);
    }

    public function store(StoreHousingRoomRequest $request): Response
    {
        HousingRoom::create($request->validated());

        return response()->noContent();
    }

    public function update(StoreHousingRoomRequest $request): Response
    {
        HousingRoom::findOrFail($request->id)->update($request->validated());

        return response()->noContent();
    }

    public function destroy(Request $request): Response
    {
        HousingRoom::destroy($request->ids);

        return response()->noContent();
    }
}
