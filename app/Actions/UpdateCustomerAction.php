<?php

namespace App\Actions;

use App\Data\Requests\UpdateCustomerData;
use App\Models\Customer;

class UpdateCustomerAction
{
    public function execute(UpdateCustomerData $data, Customer $customer): Customer
    {
        $customer->update([
            'name' => $data->name,
            'email' => $data->email,
            'phone' => $data->phone,
            'address' => $data->address,
            'notes' => $data->notes,
            'status' => $data->status,
        ]);

        return $customer->fresh();
    }
}
