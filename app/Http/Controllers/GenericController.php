<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

class GenericController extends Controller
{
    public function changeStatus(Request $request): Response
    {
        DB::table($request->table)->where('id', $request->id)->update(['is_active' => $request->is_active]);

        return response()->noContent();
    }
}
