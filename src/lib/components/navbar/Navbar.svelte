<script lang="ts">
	import User from '$lib/components/navbar/User.svelte';
</script>

<nav class="flex flex-row items-center px-4 py-3 dark:bg-slate-950 bg-slate-400 justify-between">
	<div>
		<span class="text-xl">
			Urbexer
		</span>
		<span class="text-sm">by nemvince</span>
	</div>
	<div class="flex flex-row gap-2">
		<User />
	</div>
</nav>
