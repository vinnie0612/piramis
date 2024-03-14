<script lang="ts">
	import User from '$lib/components/navbar/User.svelte';
</script>

<nav class="flex flex-row px-4 py-3 bg-slate-950 justify-between">
	<h1>home</h1>
	<div class="flex flex-row gap-2">
		<p>all</p>
		<p>the</p>
		<p>other</p>
		<p>shit</p>
		<User />
	</div>
</nav>
