<?php

namespace App\Enums;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
enum EmployeeRole: string
{
    case OWNER = 'owner';
    case ADMIN = 'admin';
    case EMPLOYEE = 'employee';
}
