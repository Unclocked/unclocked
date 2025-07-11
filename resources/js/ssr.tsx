import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import ReactDOMServer from "react-dom/server";
import { type RouteName, route } from "ziggy-js";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createServer((page) =>
	createInertiaApp({
		page,
		render: ReactDOMServer.renderToString,
		title: (title) => (title ? `${title} - ${appName}` : appName),
		resolve: (name) =>
			resolvePageComponent(
				`./pages/${name}.tsx`,
				import.meta.glob("./pages/**/*.tsx"),
			),
		setup: ({ App, props }) => {
			/* eslint-disable */
			// @ts-expect-error
			global.route = ((
				name: RouteName,
				// biome-ignore lint/suspicious/noExplicitAny: Ziggy route params can be any type
				params?: Record<string, any>,
				absolute?: boolean,
			) =>
				route(name, params, absolute, {
					// @ts-expect-error
					...page.props.ziggy,
					// @ts-expect-error
					location: new URL(page.props.ziggy.location),
				})) as typeof route<RouteName>;
			/* eslint-enable */

			return <App {...props} />;
		},
	}),
);
