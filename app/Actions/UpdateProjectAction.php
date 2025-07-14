<?php

namespace App\Actions;

use App\Data\Requests\UpdateProjectData;
use App\Models\Project;

class UpdateProjectAction
{
    public function execute(UpdateProjectData $data, Project $project): Project
    {
        $project->update([
            'customer_id' => $data->customer_id,
            'name' => $data->name,
            'description' => $data->description,
            'status' => $data->status,
            'start_date' => $data->start_date,
            'end_date' => $data->end_date,
            'budget' => $data->budget,
        ]);

        return $project->fresh();
    }
}
