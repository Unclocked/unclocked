<?php

namespace App\Models;

use App\Enums\EmployeeRole;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property-read string $id
 * @property-read string $company_id
 * @property-read string $user_id
 * @property-read string $name
 * @property-read string $email
 * @property-read \App\Enums\EmployeeRole $role
 * @property-read \App\Models\Company $company
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Support\Carbon $updated_at
 * @property-read \Illuminate\Support\Carbon|null $deleted_at
 */
class Employee extends Model
{
    /** @use HasFactory<\Database\Factories\EmployeeFactory> */
    use HasFactory, HasUlids, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'company_id',
        'user_id',
        'name',
        'email',
        'role',
    ];

    /**
     * Get the employee's role.
     */
    public function getRoleAttribute($value): EmployeeRole
    {
        return EmployeeRole::tryFrom($value) ?? EmployeeRole::EMPLOYEE;
    }

    /**
     * Set the employee's role.
     */
    public function setRoleAttribute($value): void
    {
        $this->attributes['role'] = $value instanceof EmployeeRole ? $value->value : $value;
    }

    /**
     * Get the company that the employee belongs to.
     *
     * @return BelongsTo<Company, $this>
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the user that the employee belongs to.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
