<?php

namespace App\Enums;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
enum ProjectStatus: string
{
    case ACTIVE = 'active';
    case ON_HOLD = 'on_hold';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';
}
