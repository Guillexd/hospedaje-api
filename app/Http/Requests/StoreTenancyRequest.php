<?php

namespace App\Http\Requests;

use App\Models\Tenancy;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTenancyRequest extends FormRequest
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
            'identity_document_id' => ['nullable', 'exists:identity_documents,id'],
            'name' => ['required', 'string', 'max:50'],
            'document_number' => [
                'nullable',
                'max:20',
                isset($this->id)
                    ? Rule::unique('tenancies', 'document_number')->ignore($this->id)
                    : 'unique:' . Tenancy::class
            ],
            'first_document_image_url' => ['nullable'],
            'second_document_image_url' => ['nullable'],
            'description' => ['nullable', 'string'],
            'phone' => ['required', 'integer', 'digits:9'],
        ];

        return $rules;
    }

    public function attributes()
    {
        return [
            'identity_document_id' => 'tipo de documento',
            'name' => 'nombre',
            'document_number' => 'número de documento',
            'first_document_image_url' => '1° imagen de doc. de identidad',
            'second_document_image_url' => '2° imagen de doc. de identidad',
            'description' => 'descripción',
        ];
    }

    public function withValidator($validator)
    {
        $validator->sometimes('first_document_image_url', 'image:2048', function ($input) {
            return $input->first_document_image_url instanceof \Illuminate\Http\UploadedFile;
        });
        $validator->sometimes('second_document_image_url', 'image:2048', function ($input) {
            return $input->second_document_image_url instanceof \Illuminate\Http\UploadedFile;
        });
    }
}
