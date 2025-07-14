<?php

namespace App\Data\Resources;

use App\Enums\UserRole;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UserResource extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $email,
        public UserRole $role,
        public string $created_at,
        public string $updated_at,
    ) {}
}
