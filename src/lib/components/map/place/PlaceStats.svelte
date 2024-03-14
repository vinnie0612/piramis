<script lang="ts">
	import Stars from './Stars.svelte';
	import type { RecordModel } from 'pocketbase';
	import Icon from '@iconify/svelte';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import 'dayjs/locale/hu';

	dayjs.locale('hu');
	dayjs.extend(relativeTime);

	export let dataEntry: RecordModel;
</script>

<div>
	<div class="flex justify-between mb-2 items-center">
		<span class="text-base">
			{dayjs(dataEntry.expand?.stats.updated).fromNow()} -
			{dataEntry.expand?.stats.expand.updated_by.username} frissítette
		</span>
		<button
			class="border-slate-800 border p-1 rounded-lg hover:bg-blue-400 transition hover:shadow-xl active:bg-blue-700"
		>
			<Icon class="text-xl" icon="material-symbols-light:edit" />
		</button>
	</div>
</div>

<table class="w-full">
	<tr>
		<td class="text-base">Állapot</td>
		<Stars input={dataEntry.expand?.stats.condition} />
	</tr>
	<tr>
		<td class="text-base">Bejutás</td>
		<Stars input={dataEntry.expand?.stats.entry} />
	</tr>
	<tr>
		<td class="text-base">Őrzés</td>
		<Stars input={dataEntry.expand?.stats.guarding} />
	</tr>
</table>
