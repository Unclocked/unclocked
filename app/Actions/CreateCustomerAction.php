<?php

namespace App\Actions;

use App\Data\Requests\CreateCustomerData;
use App\Models\Company;
use App\Models\Customer;

class CreateCustomerAction
{
    public function execute(CreateCustomerData $data, Company $company): Customer
    {
        return Customer::create([
            'company_id' => $company->id,
            'name' => $data->name,
            'email' => $data->email,
            'phone' => $data->phone,
            'address' => $data->address,
            'notes' => $data->notes,
            'status' => $data->status,
        ]);
    }
}
