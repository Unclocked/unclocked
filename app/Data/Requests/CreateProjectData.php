<?php

namespace App\Data\Requests;

use App\Enums\ProjectStatus;
use Spatie\LaravelData\Attributes\Validation\Date;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\LaravelData\Attributes\Validation\Exists;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Numeric;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CreateProjectData extends Data
{
    public function __construct(
        #[Required, Exists('customers', 'id')]
        public string $customer_id,

        #[Required, Max(255)]
        public string $name,

        #[Nullable]
        public ?string $description = null,

        #[Enum(ProjectStatus::class)]
        public ProjectStatus $status = ProjectStatus::ACTIVE,

        #[Nullable, Date]
        public ?string $start_date = null,

        #[Nullable, Date]
        public ?string $end_date = null,

        #[Nullable, Numeric]
        public ?float $budget = null,
    ) {}

    public static function rules(): array
    {
        return [
            'customer_id' => ['required', 'string', 'exists:customers,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'string', 'in:active,on_hold,completed,cancelled'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'budget' => ['nullable', 'numeric', 'min:0'],
        ];
    }
}
