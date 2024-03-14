<script lang="ts">
	import PlaceStats from '../lib/components/map/place/PlaceStats.svelte';

	import { logIn, pb } from '$lib/pocketbase';
	import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/components/map/Leaflet.svelte';
	import Marker from '$lib/components/map/Marker.svelte';
	import Popup from '$lib/components/map/Popup.svelte';
	import Icon from '@iconify/svelte';
	import dayjs from 'dayjs';
	import LoadingView from '$lib/components/LoadingView.svelte';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import 'dayjs/locale/hu';

	dayjs.locale('hu');
	dayjs.extend(relativeTime);

	const truncateString = (str: string) => {
		if (str.length > 15) {
			return str.slice(0, 15) + '...';
		} else {
			return str;
		}
	};

	const initialView: LatLngExpression = [47.4813274, 18.9654974];

	const pocketBasePromise = pb
		.collection('places')
		.getFullList({ expand: 'type,stats,stats.updated_by' });
</script>

{#await pocketBasePromise}
	<LoadingView />
{:then data}
	<div class="w-full h-full">
		<Leaflet view={initialView} zoom={14}>
			{#each data as dataEntry}
				<Marker
					coord_lat={dataEntry.coord_lat}
					coord_lon={dataEntry.coord_lon}
					width={40}
					height={40}
				>
					<p class="shadow-lg w-12">{truncateString(dataEntry.name)}</p>
					<Icon
						class=" text-slate-700 bg-slate-50 rounded-lg"
						icon={dataEntry.expand?.type.icon}
						width={25}
					/>

					<Popup>
						<span class="text-lg">{dataEntry.name}</span>
						<p class="text-pretty">{dataEntry.description}</p>
						<PlaceStats {dataEntry} />
					</Popup>
				</Marker>
			{/each}
		</Leaflet>
	</div>
{:catch error}
	<p>{error.message}</p>
{/await}
