import { expoClient } from "@better-auth/expo/client";
import {
	multiSessionClient,
	organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
	baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
	plugins: [
		expoClient({
			storagePrefix: "my-better-t-app",
			storage: SecureStore,
		}),
		organizationClient(),
		adminClient(),
		multiSessionClient(),
	],
});
