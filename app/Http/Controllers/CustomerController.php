<?php

namespace App\Http\Controllers;

use App\Actions\CreateCustomerAction;
use App\Actions\DeleteCustomerAction;
use App\Actions\UpdateCustomerAction;
use App\Data\Requests\CreateCustomerData;
use App\Data\Requests\UpdateCustomerData;
use App\Data\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CustomerController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Customer::class);

        $customers = request()->user()->activeCompany
            ->customers()
            ->orderBy('name')
            ->get();

        return inertia('customers/index', [
            'customers' => CustomerResource::collect($customers),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Customer::class);

        return inertia('customers/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCustomerData $data, CreateCustomerAction $action)
    {
        $this->authorize('create', Customer::class);

        $customer = $action->execute($data, request()->user()->activeCompany);

        return redirect()->route('customers.index')
            ->with('success', 'Customer created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        $this->authorize('view', $customer);

        $customer->load('projects');

        return inertia('customers/show', [
            'customer' => CustomerResource::from($customer),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        $this->authorize('update', $customer);

        return inertia('customers/edit', [
            'customer' => CustomerResource::from($customer),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerData $data, Customer $customer, UpdateCustomerAction $action)
    {
        $this->authorize('update', $customer);

        $action->execute($data, $customer);

        return redirect()->route('customers.show', $customer)
            ->with('success', 'Customer updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer, DeleteCustomerAction $action)
    {
        $this->authorize('delete', $customer);

        $action->execute($customer);

        return redirect()->route('customers.index')
            ->with('success', 'Customer deleted successfully.');
    }
}
