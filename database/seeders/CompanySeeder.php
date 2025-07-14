<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the test user (created in DatabaseSeeder)
        $testUser = User::where('email', 'test@example.com')->first();

        if ($testUser) {
            // Create 2 companies for the test user
            $testCompanies = Company::factory()->count(2)->create([
                'created_by_id' => $testUser->id,
            ]);

            // Add test user as owner employee in their companies
            foreach ($testCompanies as $company) {
                Employee::factory()
                    ->owner()
                    ->forUser($testUser)
                    ->create([
                        'company_id' => $company->id,
                    ]);

                // Add 3-5 employees to each company
                Employee::factory()
                    ->count(rand(3, 5))
                    ->create([
                        'company_id' => $company->id,
                    ]);
            }
        }

        // Create 5 more companies with random owners and employees
        User::factory()->count(5)->create()->each(function ($user) {
            // Each user creates 1-2 companies
            $companies = Company::factory()->count(rand(1, 2))->create([
                'created_by_id' => $user->id,
            ]);

            foreach ($companies as $company) {
                // Add the creator as owner employee
                Employee::factory()
                    ->owner()
                    ->forUser($user)
                    ->create([
                        'company_id' => $company->id,
                    ]);

                // Add 2-8 additional employees with mixed roles
                $employeeCount = rand(2, 8);

                // Add 1-2 admins
                Employee::factory()
                    ->admin()
                    ->count(rand(1, min(2, $employeeCount)))
                    ->create([
                        'company_id' => $company->id,
                    ]);

                // Add remaining as regular employees
                $remainingCount = $employeeCount - $company->employees()->count() + 1;
                if ($remainingCount > 0) {
                    Employee::factory()
                        ->employee()
                        ->count($remainingCount)
                        ->create([
                            'company_id' => $company->id,
                        ]);
                }
            }
        });
    }
}
