export interface Project {
	id: string;
	company_id: string;
	customer_id: string;
	name: string;
	description?: string;
	status: App.Enums.ProjectStatus;
	start_date?: string;
	end_date?: string;
	budget?: number;
	created_at: string;
	updated_at: string;
	customer?: App.Data.Resources.CustomerResource;
}

export interface CreateProjectFormData {
	customer_id: string;
	name: string;
	description?: string;
	status: App.Enums.ProjectStatus;
	start_date?: string;
	end_date?: string;
	budget?: number;
}

export interface UpdateProjectFormData extends CreateProjectFormData {}
