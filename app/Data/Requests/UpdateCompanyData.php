<?php

namespace App\Data\Requests;

use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UpdateCompanyData extends Data
{
    public function __construct(
        #[Required, Max(255)]
        public string $name,

        #[Required, Max(255), Regex('/^[a-z0-9]+(?:-[a-z0-9]+)*$/')]
        public string $slug,
    ) {}
}
