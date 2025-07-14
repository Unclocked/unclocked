<?php

namespace App\Actions;

use App\Data\Requests\CreateProjectData;
use App\Models\Company;
use App\Models\Project;

class CreateProjectAction
{
    public function execute(CreateProjectData $data, Company $company): Project
    {
        return Project::create([
            'company_id' => $company->id,
            'customer_id' => $data->customer_id,
            'name' => $data->name,
            'description' => $data->description,
            'status' => $data->status,
            'start_date' => $data->start_date,
            'end_date' => $data->end_date,
            'budget' => $data->budget,
        ]);
    }
}
