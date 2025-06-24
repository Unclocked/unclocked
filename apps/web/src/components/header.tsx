import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
	return (
		<div className="flex flex-1 items-center justify-between">
			<h1 className="font-semibold text-lg">Unclocked</h1>
			<div className="flex items-center gap-2">
				<ModeToggle />
				<UserMenu />
			</div>
		</div>
	);
}
