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
            $table->foreignUlid('organization_id')->constrained('organizations');
            $table->foreignUlid('user_id')->constrained('users');
            $table->string('name');
            $table->string('email');
            $table->enum('role', array_column(EmployeeRole::cases(), 'value'))->default(EmployeeRole::Employee->value);
            $table->timestampsTz();
            $table->softDeletesTz();

            $table->index('organization_id');
            $table->index('user_id');
            $table->index('email');
            $table->unique(['organization_id', 'user_id'], 'employee_organization_user_unique');
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
