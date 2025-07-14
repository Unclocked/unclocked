<?php

namespace App\Data\Requests;

use App\Enums\CustomerStatus;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UpdateCustomerData extends Data
{
    public function __construct(
        #[Required, Max(255)]
        public string $name,

        #[Nullable, Email, Max(255)]
        public ?string $email = null,

        #[Nullable, Max(255)]
        public ?string $phone = null,

        #[Nullable]
        public ?string $address = null,

        #[Nullable]
        public ?string $notes = null,

        #[Enum(CustomerStatus::class)]
        public CustomerStatus $status = CustomerStatus::ACTIVE,
    ) {}

    public static function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
            'status' => ['required', 'string', 'in:active,inactive,archived'],
        ];
    }
}
