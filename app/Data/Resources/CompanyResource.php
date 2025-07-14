<?php

namespace App\Data\Resources;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CompanyResource extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $slug,
        public string $created_by_id,
        public string $created_at,
        public string $updated_at,
    ) {}
}
