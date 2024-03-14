<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Icon from '@iconify/svelte';
</script>

<div
	transition:fade={{ duration: 200 }}
	class="w-svw h-svh absolute top-0 left-0 flex justify-center items-center text-7xl dark:bg-slate-900 dark:text-slate-200 text-slate-700 bg-slate-300"
>
	<Icon icon="material-symbols:clock-loader-90" class="animate-spin" />
</div>
