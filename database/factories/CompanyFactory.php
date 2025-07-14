<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(?User $user = null): array
    {
        return [
            'name' => fake()->company(),
            'slug' => fake()->unique()->slug(),
            'created_by_id' => $user?->id ?? User::factory(),
        ];
    }
}
