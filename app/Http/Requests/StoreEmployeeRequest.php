<?php

namespace App\Http\Requests;

use App\Enums\EmployeeRole;
use App\Models\Organization;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $organization = $this->route('organization');

        return $organization instanceof Organization
            && $this->user()->can('manageEmployees', $organization);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $organization = $this->route('organization');

        return [
            'user_id' => [
                'required',
                'exists:users,id',
                Rule::unique('employees')->where(fn ($query) => $query->where('organization_id', $organization->id))->whereNull('deleted_at'),
            ],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'role' => [
                'required',
                Rule::enum(EmployeeRole::class),
                Rule::notIn([EmployeeRole::Owner->value]),
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'user_id.unique' => 'This user is already an employee of this organization.',
        ];
    }
}
