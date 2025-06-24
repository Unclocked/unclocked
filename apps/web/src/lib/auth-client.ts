import {
	adminClient,
	multiSessionClient,
	organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_SERVER_URL,
	plugins: [organizationClient(), adminClient(), multiSessionClient()],
});

// TODO: add organization ac and roles
