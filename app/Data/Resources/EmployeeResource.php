<?php

namespace App\Data\Resources;

use App\Enums\EmployeeRole;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class EmployeeResource extends Data
{
    public function __construct(
        public string $id,
        public string $company_id,
        public string $user_id,
        public string $name,
        public string $email,
        public EmployeeRole $role,
        public string $created_at,
        public string $updated_at,
    ) {}
}
