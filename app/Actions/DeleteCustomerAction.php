<?php

namespace App\Actions;

use App\Models\Customer;

class DeleteCustomerAction
{
    public function execute(Customer $customer): void
    {
        $customer->delete();
    }
}
