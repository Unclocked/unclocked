<?php

namespace App\Http\Controllers;

use App\Actions\CreateCompanyAction;
use App\Data\Requests\CreateCompanyData;
use App\Data\Requests\UpdateCompanyData;
use App\Models\Company;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('companies/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCompanyData $data, CreateCompanyAction $action)
    {
        $this->authorize('create', Company::class);

        $company = $action->execute($data, request()->user());

        return redirect()->route('companies.index')
            ->with('success', 'Company created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyData $data, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }

    /**
     * Check if a company slug is available.
     */
    public function checkSlugAvailability(Request $request)
    {
        $slug = $request->input('slug');

        if (empty($slug)) {
            return response()->json(['available' => false, 'message' => 'Slug is required']);
        }

        $exists = Company::where('slug', $slug)->exists();

        return response()->json([
            'available' => ! $exists,
            'message' => $exists ? 'This slug is already taken' : 'Slug is available',
        ]);
    }
}
