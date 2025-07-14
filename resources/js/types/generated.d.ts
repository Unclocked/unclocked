declare namespace App.Data.Requests {
	export type CreateCompanyData = {
		name: string;
		slug: string;
	};
	export type CreateCustomerData = {
		name: string;
		email: string | null;
		phone: string | null;
		address: string | null;
		notes: string | null;
		status: App.Enums.CustomerStatus;
	};
	export type CreateEmployeeData = {
		user_id: string;
		name: string;
		email: string;
		role: App.Enums.EmployeeRole;
	};
	export type CreateProjectData = {
		customer_id: string;
		name: string;
		description: string | null;
		status: App.Enums.ProjectStatus;
		start_date: string | null;
		end_date: string | null;
		budget: number | null;
	};
	export type UpdateCompanyData = {
		name: string;
		slug: string;
	};
	export type UpdateCustomerData = {
		name: string;
		email: string | null;
		phone: string | null;
		address: string | null;
		notes: string | null;
		status: App.Enums.CustomerStatus;
	};
	export type UpdateEmployeeData = {
		name: string;
		email: string;
		role: App.Enums.EmployeeRole;
	};
	export type UpdateProjectData = {
		customer_id: string;
		name: string;
		description: string | null;
		status: App.Enums.ProjectStatus;
		start_date: string | null;
		end_date: string | null;
		budget: number | null;
	};
}
declare namespace App.Data.Resources {
	export type CompanyResource = {
		id: string;
		name: string;
		slug: string;
		created_by_id: string;
		created_at: string;
		updated_at: string;
	};
	export type CustomerResource = {
		id: string;
		company_id: string;
		name: string;
		email: string | null;
		phone: string | null;
		address: string | null;
		notes: string | null;
		status: App.Enums.CustomerStatus;
		created_at: string;
		updated_at: string;
	};
	export type EmployeeResource = {
		id: string;
		company_id: string;
		user_id: string;
		name: string;
		email: string;
		role: App.Enums.EmployeeRole;
		created_at: string;
		updated_at: string;
	};
	export type ProjectResource = {
		id: string;
		company_id: string;
		customer_id: string;
		name: string;
		description: string | null;
		status: App.Enums.ProjectStatus;
		start_date: string | null;
		end_date: string | null;
		budget: number | null;
		created_at: string;
		updated_at: string;
		customer: App.Data.Resources.CustomerResource | null;
	};
	export type UserResource = {
		id: string;
		name: string;
		email: string;
		role: App.Enums.UserRole;
		created_at: string;
		updated_at: string;
	};
}
declare namespace App.Enums {
	export type CustomerStatus = "active" | "inactive" | "archived";
	export type EmployeeRole = "owner" | "admin" | "employee";
	export type ProjectStatus = "active" | "on_hold" | "completed" | "cancelled";
	export type UserRole = "user" | "admin";
}
