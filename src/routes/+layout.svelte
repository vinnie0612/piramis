<script lang="ts">
	import LoadingView from '../lib/components/LoadingView.svelte';

	import { onMount } from 'svelte';

	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import '../app.postcss';

	const isLoaded = new Promise<void>((resolve) => {
		onMount(() => {
			resolve();
		});
	});
</script>

{#await isLoaded}
	<LoadingView />
{:then _}
	<div
		class="w-svw h-svh flex flex-col dark:bg-slate-900 dark:text-slate-200 text-slate-700 bg-slate-300"
	>
		<Navbar />
		<slot />
	</div>
{/await}
