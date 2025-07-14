<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Customer;
use App\Models\User;

class CustomerPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->activeCompany !== null;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Customer $customer): bool
    {
        return $user->isEmployeeOf($customer->company);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->activeCompany !== null && $user->canManageCompany($user->activeCompany);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Customer $customer): bool
    {
        return $user->isEmployeeOf($customer->company);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Customer $customer): bool
    {
        return $user->canManageCompany($customer->company);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Customer $customer): bool
    {
        return $user->canManageCompany($customer->company) || $user->role === UserRole::ADMIN;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Customer $customer): bool
    {
        return $user->role === UserRole::ADMIN;
    }
}
