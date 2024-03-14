<script lang="ts">
	import { logIn, logOut, user } from '$lib/pocketbase';
</script>

{#if $user}
	<p>Logged in as {$user.username}</p>
	<button on:click={logOut}>Log out</button>
{:else}
	<p>Not logged in</p>
	<button on:click={logIn}>Log in</button>
{/if}
