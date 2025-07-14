<?php

namespace Database\Factories;

use App\Enums\EmployeeRole;
use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company_id' => Company::factory(),
            'user_id' => User::factory(),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'role' => fake()->randomElement([EmployeeRole::OWNER, EmployeeRole::ADMIN, EmployeeRole::EMPLOYEE]),
        ];
    }

    /**
     * Indicate that the employee is an owner.
     */
    public function owner(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => EmployeeRole::OWNER,
        ]);
    }

    /**
     * Indicate that the employee is an admin.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => EmployeeRole::ADMIN,
        ]);
    }

    /**
     * Indicate that the employee is a regular employee.
     */
    public function employee(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => EmployeeRole::EMPLOYEE,
        ]);
    }

    /**
     * Create an employee from an existing user.
     */
    public function forUser(User $user): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }
}
