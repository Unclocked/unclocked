import { createAccessControl } from "better-auth/plugins/access";

const statement = {
	customer: ["create", "read", "update", "delete"],
} as const;

const ac = createAccessControl(statement);

const member = ac.newRole({
	customer: ["read"],
});

const admin = ac.newRole({
	customer: ["create", "read", "update", "delete"],
});

const owner = ac.newRole({
	customer: ["create", "read", "update", "delete"],
});

export { ac, member, admin, owner };
