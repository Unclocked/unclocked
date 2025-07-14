<?php

namespace App\Actions;

use App\Data\Requests\CreateCompanyData;
use App\Enums\EmployeeRole;
use App\Models\Company;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CreateCompanyAction
{
    public function execute(CreateCompanyData $data, User $user): Company
    {
        return DB::transaction(function () use ($data, $user) {
            $company = Company::create([
                'name' => $data->name,
                'slug' => $data->slug,
                'created_by_id' => $user->id,
            ]);

            Employee::create([
                'company_id' => $company->id,
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => EmployeeRole::OWNER,
            ]);

            $user->setActiveCompany($company);

            return $company;
        });
    }
}
