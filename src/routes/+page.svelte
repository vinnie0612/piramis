<script lang="ts">
	import PlaceStats from '../lib/components/map/place/PlaceStats.svelte';

	import { logIn, pb, user } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
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
		if (str.length > 20) {
			return str.slice(0, 20) + '...';
		} else {
			return str;
		}
	};

	const initialView: LatLngExpression = [47.4813274, 18.9654974];

	let pocketBasePromise = pb
		.collection('places')
		.getFullList({ expand: 'type,stats,stats.updated_by' });

	$: {
		$user;
		pocketBasePromise = pb
			.collection('places')
			.getFullList({ expand: 'type,stats,stats.updated_by' });
	};
</script>

{#if $user}
	{#if $user.rankAchieved && $user.serverMember}
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
							<div class="flex flex-row w-64 gap-1 ml-2 transition" id="map-marker">
								<Icon
									class="text-slate-50 w-[25px] bg-slate-900 p-1 bg-opacity-70 rounded-lg"
									icon={dataEntry.expand?.type.icon}
									width={25}
								/>
								<p
									class="shadow-lg w-32 transition font-extrabold bg-slate-900 bg-opacity-70 p-1 mb-1 rounded-lg"
								>
									{truncateString(dataEntry.name)}
								</p>
							</div>

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
	{:else}
		<div class="flex justify-center items-center h-full flex-col">
			<Icon class="text-6xl" icon="material-symbols-light:error" />
			{#if !$user.serverMember}
				<h1 class="text-lg">Nem vagy bent NotMe Discord szerverében!</h1>
				<a
					href="https://discord.gg/xjJCdtcFsQ"
					target="_blank"
					class="flex flex-row mt-1 items-center gap-1 border-2 p-1.5 rounded-lg border-slate-950 dark:border-slate-400 hover:border-blue-600 hover:bg-blue-600 transition"
				>
					<Icon icon="ic:baseline-discord" class="text-xl" />
					Meghívó
				</a>
			{:else}
				<h1 class="text-lg">
					A térkép elérése NotMe Discord szerverén legalább <b>Irógép</b> ranghoz kötött!
				</h1>
				<h2>
					Ha már megvan a rang, de a térképet még mindig nem tudod elérni, kérlek lépj be újra!
				</h2>
			{/if}
		</div>
	{/if}
{:else}
	<div class="flex justify-center items-center h-full flex-col">
		<Icon class="text-6xl" icon="material-symbols-light:error" />
		<h2 class="text-xl">Nem vagy belépve!</h2>
	</div>
{/if}
