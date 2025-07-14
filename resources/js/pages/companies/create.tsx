import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CreateCompanyForm } from "@/features/companies/components/create-company-form";

export default function CreateCompanyPage() {
	return (
		<div className="h-screen flex items-center justify-center w-full">
			<div className="w-full max-w-md">
				<Card>
					<CardHeader className="space-y-2">
						<CardTitle className="text-center text-2xl font-bold">
							Create Company
						</CardTitle>
						<CardDescription className="text-center">
							Create a new company to get started.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<CreateCompanyForm />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
