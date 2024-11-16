<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
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
        $rules = [
            'name' => ['required', 'string', 'max:100'],
            'role_id' => [
                'required',
                'exists:roles,id',
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:100',
                isset($this->id)
                    ? Rule::unique('users', 'email')->ignore($this->id)
                    : 'unique:' . User::class
            ],
            'dni' => [
                'required',
                'integer',
                'digits:8',
                isset($this->id)
                    ? Rule::unique('users', 'dni')->ignore($this->id)
                    : 'unique:' . User::class
            ],
            'phone' => ['required', 'integer', 'digits:9'],
        ];

        if (!isset($this->id)) {
            $rules['password'] = ['required', 'confirmed', Rules\Password::defaults()];
        }

        return $rules;
    }
    public function attributes()
    {
        return [
            'name' => 'nombre',
            'email' => 'correo electrónico',
            'phone' => 'teléfono',
            'role' => 'rol',
            'password' => 'contraseña',
        ];
    }
}
