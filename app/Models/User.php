<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property-read string $id
 * @property-read string $name
 * @property-read string $email
 * @property-read string $email_verified_at
 * @property-read string $password
 * @property-read string $remember_token
 * @property-read \App\Enums\UserRole $role
 * @property-read string|null $active_company_id
 * @property-read \App\Models\Company|null $activeCompany
 * @property-read \App\Models\Company[] $createdCompanies
 * @property-read \App\Models\Employee[] $employees
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasUlids, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'active_company_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user's role.
     */
    public function getRoleAttribute($value): UserRole
    {
        return UserRole::tryFrom($value) ?? UserRole::USER;
    }

    /**
     * Set the user's role.
     */
    public function setRoleAttribute($value): void
    {
        $this->attributes['role'] = $value instanceof UserRole ? $value->value : $value;
    }

    /**
     * Get the user's active company.
     *
     * @return BelongsTo<Company, $this>
     */
    public function activeCompany(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'active_company_id');
    }

    /**
     * Get the companies created by the user.
     *
     * @return HasMany<Company, $this>
     */
    public function createdCompanies(): HasMany
    {
        return $this->hasMany(Company::class, 'created_by_id');
    }

    /**
     * Get the employee records for the user.
     *
     * @return HasMany<Employee, $this>
     */
    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    /**
     * Get the employee record for a specific company.
     */
    public function employeeFor(Company $company): ?Employee
    {
        return $this->employees()
            ->where('company_id', $company->id)
            ->first();
    }

    /**
     * Check if user is an employee of the company.
     */
    public function isEmployeeOf(Company $company): bool
    {
        return $this->employees()
            ->where('company_id', $company->id)
            ->exists();
    }

    /**
     * Check if user has a specific role in the company.
     */
    public function hasRoleInCompany(Company $company, string $role): bool
    {
        return $this->employees()
            ->where('company_id', $company->id)
            ->where('role', $role)
            ->exists();
    }

    /**
     * Check if user is owner of the company.
     */
    public function isOwnerOf(Company $company): bool
    {
        return $this->hasRoleInCompany($company, 'owner');
    }

    /**
     * Check if user is admin of the company.
     */
    public function isAdminOf(Company $company): bool
    {
        return $this->hasRoleInCompany($company, 'admin');
    }

    /**
     * Check if user can manage the company.
     */
    public function canManageCompany(Company $company): bool
    {
        return $this->isOwnerOf($company) || $this->isAdminOf($company);
    }

    /**
     * Set the user's active company.
     */
    public function setActiveCompany(Company $company): void
    {
        // Only allow setting active company if user is an employee
        if (! $this->isEmployeeOf($company)) {
            throw new \InvalidArgumentException('User must be an employee of the company to set it as active');
        }

        $this->update(['active_company_id' => $company->id]);
    }

    /**
     * Clear the user's active company.
     */
    public function clearActiveCompany(): void
    {
        $this->update(['active_company_id' => null]);
    }

    /**
     * Check if user has an active company.
     */
    public function hasActiveCompany(): bool
    {
        return $this->active_company_id !== null;
    }
}
