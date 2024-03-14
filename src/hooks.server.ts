import type { Handle } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = pb;

	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();

			event.locals.user = structuredClone(event.locals.pb.authStore.model);
		}
	} catch (e) {
		event.locals.pb.authStore.clear();
	}

	const res = await resolve(event);

	const isProd = process.env.NODE_ENV === 'production' ? true : false;
	res.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: isProd, sameSite: 'lax' })
	);

	return res;
};
