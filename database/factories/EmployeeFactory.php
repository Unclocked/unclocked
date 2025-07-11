<?php

namespace Database\Factories;

use App\Enums\EmployeeRole;
use App\Models\Organization;
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
            'organization_id' => Organization::factory(),
            'user_id' => User::factory(),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'role' => fake()->randomElement(EmployeeRole::cases()),
        ];
    }

    /**
     * Indicate that the employee is an owner.
     */
    public function owner(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => EmployeeRole::Owner,
        ]);
    }

    /**
     * Indicate that the employee is an admin.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => EmployeeRole::Admin,
        ]);
    }

    /**
     * Indicate that the employee is a regular employee.
     */
    public function employee(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => EmployeeRole::Employee,
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
