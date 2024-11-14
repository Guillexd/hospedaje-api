<?php

namespace App\Http\Controllers;

use App\Http\Resources\DashBoardCollection;
use App\Models\HousingPayment;
use App\Models\HousingRoom;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function list(): DashBoardCollection
    {
        $startOfMonth = now()->startOfMonth()->format('Y-m-d');
        $endOfMonth = now()->endOfMonth()->addDays(2)->format('Y-m-d');

        // Los últimos 4 meses
        $lastFourMonths = [];
        for ($i = 0; $i < 4; $i++) {
            $lastFourMonths[] = now()->subMonths($i)->format('Y-m');
        }

        // Obtener monto esperado y cantidad de inquilinos activos en una sola consulta
        $housing_payment = HousingPayment::where('rental_start_date', '>=', $startOfMonth)
            ->where('rental_end_date', '<=', $endOfMonth)
            ->selectRaw('SUM(payment) as expected_amount, COUNT(*) as tenancies')
            ->first();

        $expectedAmount = $housing_payment->expected_amount;
        $tenancies = $housing_payment->tenancies;

        // Estado de las habitaciones (housingState): Agrupado por propiedad y estado de habitación
        $housingState = HousingRoom::with('housing')
            ->whereNotNull('housing_id')
            ->select(
                'housing_id',
                DB::raw('
        SUM(CASE WHEN is_available = 1 AND is_active = 1 THEN 1 ELSE 0 END) as available,
        SUM(CASE WHEN is_available = 0 AND is_active = 1 THEN 1 ELSE 0 END) as occupied,
        SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as inactive
        ')
            )
            ->groupBy('housing_id')
            ->get()
            ->map(function (HousingRoom $roomState) {
                return [
                    'housing' => $roomState->housing->name,
                    'data' => [
                        ['name' => 'Habitaciones disponibles', 'total' => $roomState->available],
                        ['name' => 'Habitaciones ocupadas', 'total' => $roomState->occupied],
                        ['name' => 'Habitaciones inactivas', 'total' => $roomState->inactive],
                    ],
                ];
            });

        // Estado de los ingresos (incomeState): Suma de pagos por mes para los últimos 4 meses
        $incomeState = collect(array_reverse($lastFourMonths))->map(function ($month) {
            $startOfMonth = Carbon::createFromFormat('Y-m', $month)->startOfMonth();
            $endOfMonth = Carbon::createFromFormat('Y-m', $month)->endOfMonth()->addDays(2);

            $income = HousingPayment::where('rental_start_date', '>=', $startOfMonth)
                ->where('rental_end_date', '<=', $endOfMonth)
                ->sum('payment');

            return [
                'month' => Carbon::createFromFormat('Y-m', $month)->setDay(2)->format('Y-m-d'),
                'income' => $income
            ];
        });

        return new DashBoardCollection(compact('expectedAmount', 'tenancies', 'housingState', 'incomeState'));
    }
}
