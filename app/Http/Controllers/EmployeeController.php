<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use Illuminate\Database\QueryException;

use Inertia\Inertia;
use Inertia\Response;

use App\Models\Employee;

use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Requests\DestroyEmployeeRequest;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $employees = Employee::with('subordinates')
            ->orderBy('updated_at', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('employees/index', compact(
            'employees',
        ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $employees = Employee::select('id', 'name', 'position', 'department', 'level')
            ->get();

        $departments = $employees->unique('department')->pluck('department');
        $levels = $employees->unique('level')->pluck('level');

        return Inertia::render('employees/create', compact(
            'departments',
            'levels',
            'employees',
        ));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Employee::create($validated);

        Inertia::flash([
            [
                'type' => 'positive',
                'message' => 'Employee created succesfully',
            ]
        ]);

        return to_route('employees.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $employee = Employee::where('id', $id)
            ->with('superior')
            ->first();

        return Inertia::render('employees/show', compact(
            'employee',
        ));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $employee = Employee::find($id);
        $employees = Employee::select('id', 'name', 'position', 'department', 'level')
            ->get();

        $departments = $employees->unique('department')->pluck('department');
        $levels = $employees->unique('level')->pluck('level');

        return Inertia::render('employees/edit', compact(
            'departments',
            'levels',
            'employees',
            'employee',
        ));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, string $id): RedirectResponse
    {
        $employee = Employee::find($id);

        $employee->update($request->validated());
        $employee->save();

        Inertia::flash([
            [
                'type' => 'positive',
                'message' => 'Employee updated succesfully',
            ]
        ]);

        return to_route('employees.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyEmployeeRequest $request): RedirectResponse
    {
        Employee::whereIn('id', $request->input('ids'))->delete();

        Inertia::flash([
            [
                'type' => 'positive',
                'message' => 'Employees deleted succesfully',
            ]
        ]);

        return back();
    }
}
