<?php

namespace App\Enums;

enum EmployeeRole: string
{
    case Owner = 'owner';
    case Admin = 'admin';
    case Employee = 'employee';
}
