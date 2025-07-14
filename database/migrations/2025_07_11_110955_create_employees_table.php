<?php

use App\Enums\EmployeeRole;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('company_id')->constrained('companies');
            $table->foreignUlid('user_id')->constrained('users');
            $table->string('name');
            $table->string('email');
            $table->enum('role', [EmployeeRole::OWNER, EmployeeRole::ADMIN, EmployeeRole::EMPLOYEE])->default(EmployeeRole::EMPLOYEE);
            $table->timestampsTz();
            $table->softDeletesTz();

            $table->index('company_id');
            $table->index('user_id');
            $table->index('email');
            $table->unique(['company_id', 'user_id'], 'employee_company_user_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
