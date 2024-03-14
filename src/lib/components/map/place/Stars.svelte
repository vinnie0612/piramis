<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	import Icon from '@iconify/svelte';

	export let input: number;
</script>

<td class="flex flex-row justify-between">
	{#each Array(input) as _, index (index)}
		<Icon icon="material-symbols-light:kid-star-sharp" width={20} class="text-yellow-300" />
	{/each}
	{#each Array(10 - input) as _, index (index)}
		<Icon icon="material-symbols-light:kid-star-sharp" width={20} />
	{/each}
</td>
