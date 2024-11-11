<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreIdentityDocumentRequest extends FormRequest
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
            'abbreviation' => ['required', 'string', 'max:30'],
            'description' => ['required', 'string', 'max:40'],
        ];
    }

    public function attributes()
    {
        return [
            'abbreviation' => 'abreviación',
            'description' => 'descripción',
        ];
    }
}
