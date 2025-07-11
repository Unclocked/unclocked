<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the test user (created in DatabaseSeeder)
        $testUser = User::where('email', 'test@example.com')->first();

        if ($testUser) {
            // Create 2 organizations for the test user
            $testOrganizations = Organization::factory()->count(2)->create([
                'created_by_id' => $testUser->id,
            ]);

            // Add test user as owner employee in their organizations
            foreach ($testOrganizations as $org) {
                Employee::factory()
                    ->owner()
                    ->forUser($testUser)
                    ->create([
                        'organization_id' => $org->id,
                    ]);

                // Add 3-5 employees to each organization
                Employee::factory()
                    ->count(rand(3, 5))
                    ->create([
                        'organization_id' => $org->id,
                    ]);
            }
        }

        // Create 5 more organizations with random owners and employees
        User::factory()->count(5)->create()->each(function ($user) {
            // Each user creates 1-2 organizations
            $organizations = Organization::factory()->count(rand(1, 2))->create([
                'created_by_id' => $user->id,
            ]);

            foreach ($organizations as $org) {
                // Add the creator as owner employee
                Employee::factory()
                    ->owner()
                    ->forUser($user)
                    ->create([
                        'organization_id' => $org->id,
                    ]);

                // Add 2-8 additional employees with mixed roles
                $employeeCount = rand(2, 8);

                // Add 1-2 admins
                Employee::factory()
                    ->admin()
                    ->count(rand(1, min(2, $employeeCount)))
                    ->create([
                        'organization_id' => $org->id,
                    ]);

                // Add remaining as regular employees
                $remainingCount = $employeeCount - $org->employees()->count() + 1;
                if ($remainingCount > 0) {
                    Employee::factory()
                        ->employee()
                        ->count($remainingCount)
                        ->create([
                            'organization_id' => $org->id,
                        ]);
                }
            }
        });
    }
}
