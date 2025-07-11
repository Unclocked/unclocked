<?php

namespace App\Http\Requests;

use App\Enums\EmployeeRole;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('employee'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'string', 'email', 'max:255'],
            'role' => ['sometimes', 'required', Rule::enum(EmployeeRole::class), Rule::notIn([EmployeeRole::Owner->value])],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Prevent changing own role if user is the last owner
        $employee = $this->route('employee');

        if ($employee && $this->has('role') && $employee->user_id === $this->user()->id) {
            if ($employee->role === EmployeeRole::Owner && $this->role !== EmployeeRole::Owner->value) {
                // Check if this is the last owner
                $ownerCount = $employee->organization->employees()
                    ->where('role', EmployeeRole::Owner)
                    ->count();

                if ($ownerCount <= 1) {
                    $this->merge(['role' => EmployeeRole::Owner->value]);
                }
            }
        }
    }
}
