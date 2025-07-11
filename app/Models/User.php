<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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
 * @property-read \App\Models\Organization[] $createdOrganizations
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
            'role' => UserRole::class,
        ];
    }

    /**
     * Get the organizations created by the user.
     *
     * @return HasMany<Organization, $this>
     */
    public function createdOrganizations(): HasMany
    {
        return $this->hasMany(Organization::class, 'created_by_id');
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
     * Get the employee record for a specific organization.
     */
    public function employeeFor(Organization $organization): ?Employee
    {
        return $this->employees()
            ->where('organization_id', $organization->id)
            ->first();
    }

    /**
     * Check if user is an employee of the organization.
     */
    public function isEmployeeOf(Organization $organization): bool
    {
        return $this->employees()
            ->where('organization_id', $organization->id)
            ->exists();
    }

    /**
     * Check if user has a specific role in the organization.
     */
    public function hasRoleInOrganization(Organization $organization, string $role): bool
    {
        return $this->employees()
            ->where('organization_id', $organization->id)
            ->where('role', $role)
            ->exists();
    }

    /**
     * Check if user is owner of the organization.
     */
    public function isOwnerOf(Organization $organization): bool
    {
        return $this->hasRoleInOrganization($organization, 'owner');
    }

    /**
     * Check if user is admin of the organization.
     */
    public function isAdminOf(Organization $organization): bool
    {
        return $this->hasRoleInOrganization($organization, 'admin');
    }

    /**
     * Check if user can manage the organization.
     */
    public function canManageOrganization(Organization $organization): bool
    {
        return $this->isOwnerOf($organization) || $this->isAdminOf($organization);
    }
}
