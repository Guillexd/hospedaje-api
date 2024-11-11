<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHousingPaymentRequest;
use App\Http\Resources\HousingPaymentCollection;
use App\Models\HousingPayment;
use App\Models\HousingRoom;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use function PHPUnit\Framework\isNull;

class HousingPaymentController extends Controller
{
    public function list(Request $request): HousingPaymentCollection
    {
        $housing_payment = HousingPayment::with(['tenancy' => function ($queryBuilder) {
            $queryBuilder->select('id', 'name', 'document_number', 'identity_document_id', 'phone', 'first_document_image_url', 'second_document_image_url');
        }, 'tenancy.identity_document' => function ($queryBuilder) {
            $queryBuilder->select('id', 'abbreviation');
        }, 'housing_room' => function ($queryBuilder) {
            $queryBuilder->withoutGlobalScopes()->select('id', 'housing_id', 'room_number');
        }, 'housing_room.housing' => function ($queryBuilder) {
            $queryBuilder->select('id', 'name');
        }])->where(function (Builder $query) use ($request) {
            if (isset($request->finishDate) && isset($request->startDate)) {
                $query->where('rental_start_date', '>=', $request->startDate)
                    ->where('rental_end_date', '<=', $request->finishDate);
            }
            if (isset($request->searchInput)) {
                $query->whereHas('tenancy', function (Builder $query) use ($request) {
                    $query->where('name', 'LIKE', "%{$request->searchInput}%")
                        ->orWhere('document_number', 'LIKE', "%{$request->searchInput}%");
                })
                    ->orWhereHas('housing_room', function (Builder $query) use ($request) {
                        $query->where('room_number', 'LIKE', "%{$request->searchInput}%");
                    })
                    ->orWhereHas('housing_room.housing', function (Builder $query) use ($request) {
                        $query->where('name', 'LIKE', "%{$request->searchInput}%");
                    });
            }
            if (isset($request->rent_debtors)) {
                $query->whereNull('payment_date');
            } elseif (isset($request->rent_payers)) {
                $query->whereNotNull('payment_date');
            }
        })->orderBy('id', 'desc')->paginate($request->limit ?? 20);

        return new HousingPaymentCollection($housing_payment);
    }

    public function store(StoreHousingPaymentRequest $request): Response
    {
        HousingPayment::create($request->validated());

        HousingRoom::findOrFail($request->housing_room_id)->update(['is_available' => 0]);

        return response()->noContent();
    }

    public function update(StoreHousingPaymentRequest $request): Response
    {
        HousingPayment::findOrFail($request->id)->update($request->validated());

        return response()->noContent();
    }

    public function destroy(Request $request): Response
    {
        foreach ($request->ids as $id) {
            $housing_payment = HousingPayment::findOrFail($id);
            if (is_null($housing_payment->payment_date)) {
                HousingRoom::findOrFail($housing_payment->housing_room_id)->update(['is_available' => 1]);
            }
            $housing_payment->delete();
        }

        return response()->noContent();
    }

    public function collectAndAddNewPayment(StoreHousingPaymentRequest $request): Response
    {
        HousingPayment::findOrFail($request->id)->update(['payment_date' => Carbon::now()->setSeconds(0)]);

        HousingPayment::create(array_merge(
            $request->validated(),
            [
                'rental_start_date' => $this->adjustDateByDifference($request->rental_start_date, $request->rental_end_date)['start'],
                'rental_end_date' => $this->adjustDateByDifference($request->rental_start_date, $request->rental_end_date)['end'],
            ]
        ));

        return response()->noContent();
    }

    public function justCollect(Request $request): Response
    {
        HousingPayment::findOrFail($request->id)->update(['payment_date' => Carbon::now()->setSeconds(0)]);

        HousingRoom::findOrFail($request->housing_room_id)->update(['is_available' => 1]);

        return response()->noContent();
    }

    public function cancelCollect(Request $request): Response
    {
        $housing_payment = HousingPayment::findOrFail($request->id);
        $housing_payment->update(['payment_date' => null]);

        if (is_null($housing_payment->payment_date)) {
            HousingRoom::findOrFail($request->housing_room_id)->update(['is_available' => 0]);
        }

        return response()->noContent();
    }

    public function getRentExpire(): HousingPaymentCollection
    {
        $housing_payment = HousingPayment::toExpire()->get();

        return new HousingPaymentCollection($housing_payment);
    }

    private function adjustDateByDifference($startDate, $endDate)
    {
        $start = Carbon::parse($startDate);
        $end = Carbon::parse($endDate);

        $diffInMonths = $start->diffInMonths($end);
        $diffInDays = $start->diffInDays($end);

        if ($diffInMonths >= 1) {
            return [
                'start' => $start->addMonths($diffInMonths),
                'end' => $end->addMonths($diffInMonths),
            ];
        }

        return [
            'start' => $start->addDays($diffInDays),
            'end' => $end->addDays($diffInDays++),
        ];
    }
}
