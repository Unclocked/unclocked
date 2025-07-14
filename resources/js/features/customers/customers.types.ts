export interface Customer {
	id: string;
	company_id: string;
	name: string;
	email?: string;
	phone?: string;
	address?: string;
	notes?: string;
	status: App.Enums.CustomerStatus;
	created_at: string;
	updated_at: string;
}

export interface CreateCustomerFormData {
	name: string;
	email?: string;
	phone?: string;
	address?: string;
	notes?: string;
	status: App.Enums.CustomerStatus;
}

export interface UpdateCustomerFormData extends CreateCustomerFormData {}
