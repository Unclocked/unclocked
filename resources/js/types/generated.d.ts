declare namespace App.Data.Requests {
	export type CreateCompanyData = {
		name: string;
		slug: string;
	};
	export type CreateEmployeeData = {
		user_id: string;
		name: string;
		email: string;
		role: App.Enums.EmployeeRole;
	};
	export type UpdateCompanyData = {
		name: string;
		slug: string;
	};
	export type UpdateEmployeeData = {
		name: string;
		email: string;
		role: App.Enums.EmployeeRole;
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
	export type EmployeeRole = "owner" | "admin" | "employee";
	export type UserRole = "user" | "admin";
}
