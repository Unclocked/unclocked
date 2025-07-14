import { AlertTriangleIcon, Loader2Icon, TrashIcon } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeletionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	title: string;
	description: string;
	itemName?: string;
	isLoading?: boolean;
	destructiveAction?: string;
}

export function DeletionDialog({
	open,
	onOpenChange,
	onConfirm,
	title,
	description,
	itemName,
	isLoading = false,
	destructiveAction = "Delete",
}: DeletionDialogProps) {
	const handleConfirm = () => {
		onConfirm();
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className="sm:max-w-md">
				<AlertDialogHeader>
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
							<AlertTriangleIcon className="h-5 w-5 text-destructive" />
						</div>
						<div>
							<AlertDialogTitle className="text-left">{title}</AlertDialogTitle>
						</div>
					</div>
					<AlertDialogDescription className="text-left">
						{description}
						{itemName && (
							<>
								{" "}
								<span className="font-medium text-foreground">
									"{itemName}"
								</span>
							</>
						)}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						onClick={handleConfirm}
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								<Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
								Deleting...
							</>
						) : (
							<>
								<TrashIcon className="h-4 w-4 mr-2" />
								{destructiveAction}
							</>
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
