import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public';
import { writable } from 'svelte/store';

export const pb = new PocketBase(PUBLIC_PB_URL);

export const user = writable(pb.authStore.model);

export const logIn = async () => {
	try {
		await pb.collection('users').authWithOAuth2({ provider: 'discord' });
	} catch (e) {
		console.error(e);
	}
};

export const logOut = async () => {
	await pb.authStore.clear();
};

pb.authStore.onChange(() => {
	user.set(pb.authStore.model);
});
