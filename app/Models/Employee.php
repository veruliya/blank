<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Table;

#[Table('public.employees')]

class Employee extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'parent_id',
        'name',
        'email',
        'phone',
        'department',
        'position',
        'level',
        'start_date',
        'birth_date',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'start_date' => 'date:Y-m-d',
            'birth_date' => 'date:Y-m-d',
        ];
    }

    /**
     * Get the superior employee.
     */
    public function superior(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'parent_id', 'id');
    }

    /**
     * Get the subordinate employees.
     */
    public function subordinates(): HasMany
    {
        return $this->hasMany(Employee::class, 'parent_id', 'id');
    }
}
