<script lang="ts">
	import { logIn, logOut, user } from '$lib/pocketbase';

	import Icon from '@iconify/svelte';
</script>

{#if $user}
	<div class="flex flex-row gap-3">
		<span class="flex flex-row gap-1 items-center">
			<Icon icon="mdi:user" class="text-xl" />
			<p>{$user.username}</p>
		</span>
		<button on:click={logOut} class="text-xl border-2 p-1.5 rounded-lg border-slate-950 dark:border-slate-400 hover:border-red-600 hover:bg-red-600 transition">
			<Icon icon="material-symbols:logout-rounded" />
		</button>
	</div>
{:else}
	<button on:click={logIn} class="flex flex-row items-center gap-1 border-2 p-1.5 rounded-lg border-slate-950 dark:border-slate-400 hover:border-blue-600 hover:bg-blue-600 transition">
		<Icon icon="ic:baseline-discord" class="text-xl"/>
		Belépés
	</button>
{/if}
