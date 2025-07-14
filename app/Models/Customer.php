<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\CustomerStatus;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * @property-read string $id
 * @property-read string $company_id
 * @property-read string $name
 * @property-read string|null $email
 * @property-read string|null $phone
 * @property-read string|null $address
 * @property-read string|null $notes
 * @property-read CustomerStatus $status
 * @property-read Carbon $created_at
 * @property-read Carbon $updated_at
 * @property-read Carbon|null $deleted_at
 * @property-read Company $company
 * @property-read Project[] $projects
 */
class Customer extends Model
{
    use HasFactory, HasUlids, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = ['company_id', 'name', 'email', 'phone', 'address', 'notes', 'status'];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => CustomerStatus::class,
        'created_at' => 'datetime',
    ];

    /**
     * Get the company that owns the customer.
     *
     * @return BelongsTo<Company, $this>
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the projects for the customer.
     *
     * @return HasMany<Project, $this>
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }
}
