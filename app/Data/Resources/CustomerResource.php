<?php

namespace App\Data\Resources;

use App\Enums\CustomerStatus;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CustomerResource extends Data
{
    public function __construct(
        public string $id,
        public string $company_id,
        public string $name,
        public ?string $email,
        public ?string $phone,
        public ?string $address,
        public ?string $notes,
        public CustomerStatus $status,
        public string $created_at,
        public string $updated_at,
    ) {}
}
