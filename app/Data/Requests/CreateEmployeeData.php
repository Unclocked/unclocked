<?php

namespace App\Data\Requests;

use App\Enums\EmployeeRole;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CreateEmployeeData extends Data
{
    public function __construct(
        #[Required, Exists('users', 'id')]
        public string $user_id,

        #[Required, Max(255)]
        public string $name,

        #[Required, Email, Max(255)]
        public string $email,

        #[Required]
        public EmployeeRole $role,
    ) {}
}
