<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreHousingPaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'housing_room_id' => [
                'required',
                isset($this->id) ? 'exists:housing_rooms,id' : 'exists:housing_rooms,id,is_available,1',
            ],
            'tenancy_id' => [
                'required',
                'exists:tenancies,id',
            ],
            'payment' => ['required', 'numeric', 'min:1', 'max:999999'],
            'rental_start_date' => ['required', 'date'],
            'rental_end_date' => ['required', 'date', 'after:rental_start_date'],
            'payment_date' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
        ];
    }

    public function attributes()
    {
        return [
            'housing_room_id' => 'habitación',
            'tenancy_id' => 'inquilino',
            'payment' => 'pago',
            'rental_start_date' => 'fecha de ingreso',
            'rental_end_date' => 'fecha de culminación',
            'payment_date' => 'fecha de pago',
            'description' => 'descripión',
        ];
    }

    public function messages()
    {
        return [
            'housing_room_id.exists' => 'La :attribute no está disponible.',
        ];
    }
}
