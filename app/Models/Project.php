<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ProjectStatus;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * @property-read string $id
 * @property-read string $company_id
 * @property-read string $customer_id
 * @property-read string $name
 * @property-read string|null $description
 * @property-read ProjectStatus $status
 * @property-read Carbon|null $start_date
 * @property-read Carbon|null $end_date
 * @property-read float|null $budget
 * @property-read Carbon $created_at
 * @property-read Carbon $updated_at
 * @property-read Carbon|null $deleted_at
 * @property-read Company $company
 * @property-read Customer $customer
 */
class Project extends Model
{
    use HasFactory, HasUlids, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'company_id',
        'customer_id',
        'name',
        'description',
        'status',
        'start_date',
        'end_date',
        'budget',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'status' => ProjectStatus::class,
        'start_date' => 'date',
        'end_date' => 'date',
        'budget' => 'decimal:2',
        'created_at' => 'datetime',
    ];

    /**
     * Get the company that owns the project.
     *
     * @return BelongsTo<Company, $this>
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the customer that owns the project.
     *
     * @return BelongsTo<Customer, $this>
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
