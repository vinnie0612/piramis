import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from '$env/static/public';
import { writable } from 'svelte/store';
import { invalidateAll } from '$app/navigation';

export const pb = new PocketBase(PUBLIC_PB_URL);

export const user = writable(pb.authStore.model);

export const logIn = async () => {
	try {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord', scopes: ['identify', 'email', 'guilds', 'guilds.members.read'] });
		console.log(authData.meta?.accessToken)
		const atMe = await fetch("https://discord.com/api/users/@me/guilds/1144563481450905670/member", { headers: { authorization: `Bearer ${authData.meta?.accessToken}`}})

		if (atMe.status == 404) {
			if (authData.record.serverMember) {
				pb.collection("users").update(authData.record.id, { serverMember: false, rankAchieved: false })
			}
		} else {
			if (!authData.record.serverMember) {
				pb.collection("users").update(authData.record.id, { serverMember: true})
			}
			const parsed = await atMe.json()
			console.log(parsed.roles)
			const rankAchieved = parsed.roles.includes("1192166146540056617");
			if (rankAchieved != authData.record.rankAchieved) {
				pb.collection("users").update(authData.record.id, { rankAchieved: rankAchieved })
			}
		}
	} catch (e) {
		console.error(e);
	}
	invalidateAll();
};

export const logOut = async () => {
	await pb.authStore.clear();
};

pb.authStore.onChange(() => {
	user.set(pb.authStore.model);
});
