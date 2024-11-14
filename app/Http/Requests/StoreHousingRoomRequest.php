<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreHousingRoomRequest extends FormRequest
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
            'housing_id' => [
                'required',
                'exists:housings,id',
                Rule::unique('housing_rooms')
                    ->where(function ($query) {
                        return $query->where('room_number', $this->room_number);
                    })
                    ->ignore($this->id)
            ],
            'room_number' => [
                'required',
                'string',
                'max:3',
                Rule::unique('housing_rooms')
                    ->where(function ($query) {
                        return $query->where('housing_id', $this->housing_id);
                    })
                    ->ignore($this->id),
            ],
            'is_available' => ['required', 'boolean'],
        ];
    }
    public function attributes()
    {
        return [
            'housing_id' => 'propiedad',
            'room_number' => 'habitación',
            'is_available' => 'disponibilidad',
        ];
    }
}
