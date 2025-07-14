<?php

namespace App\Data\Resources;

use App\Enums\ProjectStatus;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ProjectResource extends Data
{
    public function __construct(
        public string $id,
        public string $company_id,
        public string $customer_id,
        public string $name,
        public ?string $description,
        public ProjectStatus $status,
        public ?string $start_date,
        public ?string $end_date,
        public ?float $budget,
        public string $created_at,
        public string $updated_at,
        public ?CustomerResource $customer = null,
    ) {}
}
