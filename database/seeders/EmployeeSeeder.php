<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

use App\Models\Employee;

class EmployeeSeeder extends Seeder
{
    const DEPARTMENT_NAMES = ['Marketing', 'Engineering', 'HR', 'Finance', 'Sales'];
    const LEVEL_NAMES = ['Manager', 'Supervisor', 'Staff'];
    const LEVEL_COUNT_RANGES = [
        'Manager'    => ['min' => 1, 'max' => 1],
        'Supervisor' => ['min' => 4, 'max' => 6],
        'Staff'      => ['min' => 5, 'max' => 8],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = array_merge(
            ...array_map(function ($departmentName) {
                return $this->generateEmployees($departmentName);
            }, self::DEPARTMENT_NAMES)
        );

        DB::transaction(function () use ($employees) {
            $this->createEmployees($employees);
        });
    }

    private function createEmployees($employees, $parentId = null)
    {
        foreach ($employees as $employee) {
            $createdEmployee = Employee::create([
                'parent_id' => $parentId,
                'name' => $employee['name'],
                'email' => $employee['email'],
                'phone' => $employee['phone'],
                'department' => $employee['department'],
                'position' => $employee['position'],
                'level' => $employee['level'],
                'start_date' => $employee['start_date'],
                'birth_date' => $employee['birth_date'],
            ]);

            if (count($employee['subordinates']) !== 0) {
                $this->createEmployees($employee['subordinates'], $createdEmployee->id);
            }
        }
    }

    private function generateEmployees($departmentName, $index = 0)
    {
        $levelName = self::LEVEL_NAMES[$index];
        $levelCountRange = self::LEVEL_COUNT_RANGES[$levelName];

        $createEmployeesCount = rand($levelCountRange['min'], $levelCountRange['max']);

        $employees = [];

        for ($i = 0; $i < $createEmployeesCount; $i++) {
            $employee = $this->createEmployee($departmentName, $levelName);

            if (count(self::LEVEL_NAMES) !== $index + 1) {
                $employee['subordinates'] = $this->generateEmployees($departmentName, $index + 1);
            } else {
                $employee['subordinates'] = [];
            }

            $employees[] = $employee;
        }

        return $employees;
    }

    private function createEmployee($departmentName, $levelName)
    {
        return [
            'name' => fake()->unique()->name(),
            'email' => fake()->unique()->email(),
            'phone' => fake()->unique()->e164PhoneNumber(),
            'department' => $departmentName,
            'position' => Str::title(fake()->unique()->words(3, true)),
            'level' => $levelName,
            'start_date' => fake()->dateTimeBetween('-10 Years'),
            'birth_date' => fake()->date('Y-m-d', '2002-01-01'),
        ];
    }
}
