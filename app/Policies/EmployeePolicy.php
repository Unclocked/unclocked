<?php

namespace App\Policies;

use App\Enums\EmployeeRole;
use App\Enums\UserRole;
use App\Models\Employee;
use App\Models\User;

class EmployeePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // Users can view employees of companies they belong to
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Employee $employee): bool
    {
        // Users can view employees in their company
        return $user->isEmployeeOf($employee->company);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Check is handled in CreateEmployeeData with company context
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Employee $employee): bool
    {
        // Owners and admins can update employees in their company
        if (! $user->isEmployeeOf($employee->company)) {
            return false;
        }

        // Get user's role in the company
        $userEmployee = $user->employeeFor($employee->company);

        if (! $userEmployee) {
            return false;
        }

        // Owners can update anyone
        if ($userEmployee->role === EmployeeRole::OWNER) {
            return true;
        }

        // Admins can update non-owners
        if ($userEmployee->role === EmployeeRole::ADMIN) {
            return $employee->role !== EmployeeRole::OWNER;
        }

        // Regular employees can only update their own profile
        return $employee->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Employee $employee): bool
    {
        // Cannot delete yourself
        if ($employee->user_id === $user->id) {
            return false;
        }

        // Must be in the same company
        if (! $user->isEmployeeOf($employee->company)) {
            return false;
        }

        $userEmployee = $user->employeeFor($employee->company);

        if (! $userEmployee) {
            return false;
        }

        // Owners can delete anyone except themselves
        if ($userEmployee->role === EmployeeRole::OWNER) {
            return true;
        }

        // Admins can delete non-owners
        if ($userEmployee->role === EmployeeRole::ADMIN) {
            return $employee->role !== EmployeeRole::OWNER;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Employee $employee): bool
    {
        // Same as delete permissions
        return $this->delete($user, $employee);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Employee $employee): bool
    {
        // Only system admins can permanently delete
        return $user->role === UserRole::ADMIN;
    }
}
