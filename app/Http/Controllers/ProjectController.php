<?php

namespace App\Http\Controllers;

use App\Actions\CreateProjectAction;
use App\Actions\DeleteProjectAction;
use App\Actions\UpdateProjectAction;
use App\Data\Requests\CreateProjectData;
use App\Data\Requests\UpdateProjectData;
use App\Data\Resources\CustomerResource;
use App\Data\Resources\ProjectResource;
use App\Models\Customer;
use App\Models\Project;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProjectController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(Customer $customer)
    {
        $this->authorize('view', $customer);
        $this->authorize('viewAny', Project::class);

        $projects = $customer->projects()
            ->orderBy('name')
            ->get();

        return inertia('customers/projects/index', [
            'customer' => CustomerResource::from($customer),
            'projects' => ProjectResource::collect($projects),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Customer $customer)
    {
        $this->authorize('view', $customer);
        $this->authorize('create', Project::class);

        return inertia('customers/projects/create', [
            'customer' => CustomerResource::from($customer),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Customer $customer, CreateProjectData $data, CreateProjectAction $action)
    {
        $this->authorize('view', $customer);
        $this->authorize('create', Project::class);

        // Create new data object with the correct customer_id
        $projectData = new CreateProjectData(
            customer_id: $customer->id,
            name: $data->name,
            description: $data->description,
            status: $data->status,
            start_date: $data->start_date,
            end_date: $data->end_date,
            budget: $data->budget,
        );

        $project = $action->execute($projectData, request()->user()->activeCompany);

        return redirect()->route('customers.projects.index', $customer)
            ->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $this->authorize('view', $project);

        $project->load('customer');

        return inertia('projects/show', [
            'project' => ProjectResource::from($project),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $this->authorize('update', $project);

        $customers = request()->user()->activeCompany
            ->customers()
            ->orderBy('name')
            ->get();

        $project->load('customer');

        return inertia('projects/edit', [
            'project' => ProjectResource::from($project),
            'customers' => CustomerResource::collect($customers),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectData $data, Project $project, UpdateProjectAction $action)
    {
        $this->authorize('update', $project);

        $action->execute($data, $project);

        return redirect()->route('projects.show', $project)
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project, DeleteProjectAction $action)
    {
        $this->authorize('delete', $project);

        $customer = $project->customer;
        $action->execute($project);

        return redirect()->route('customers.projects.index', $customer)
            ->with('success', 'Project deleted successfully.');
    }
}
