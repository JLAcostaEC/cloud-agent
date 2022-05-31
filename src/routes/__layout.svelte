<script lang="ts">
	import '../app.css';
	import 'fluent-svelte/theme.css';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import { theme } from '$lib/stores/theme';

	// Components
	import Header from '$lib/components/header/header.svelte';
	import Preloader from '$lib/components/preloader/preloader.svelte';
	import Notify from '$lib/components/notify.svelte';

	onMount(() => {
		setTimeout(() => {
			// Get Preloader to fade out before destroy it
			let preloader = document.querySelector('.preloader');
			preloader?.classList.add('opacity-0', 'pointer-events-none');
	
			setTimeout(() => {
				// Make sure that the preloader dont show again & destroy it
				$session.appReady = true;
			}, 300);
		}, 1500);
	});
</script>

<div
	id="theme-container"
	class={`min-h-screen ${$theme === 'dark' ? $theme + ' bg-zinc-900' : $theme} flex flex-col`}
>
	{#if !$session.appReady}
		<Preloader />
	{/if}
	<Header />
	<div id="app-content">
		<main class="flex flex-grow flex-col items-center justify-center">
			<slot />
		</main>
	</div>
	<Notify />
</div>

<style>
	/* :global(#theme-container) {
		--fds-accent-light-3: 191, 98%, 80%;
		--fds-accent-light-2: 199, 99%, 69%;
		--fds-accent-light-1: 205, 100%, 49%;
		--fds-accent-base: 206, 100%, 42%;
		--fds-accent-dark-1: 209, 100%, 36%;
		--fds-accent-dark-2: 215, 100%, 29%;
		--fds-accent-dark-3: 226, 100%, 20%;
		background-color: hsl(191, 98%, 80%);
		background-color: hsl(199, 99%, 69%);
		background-color: hsl(205, 100%, 49%);

		background-color: hsl(206, 100%, 42%);

		background-color: hsl(209, 100%, 36%);
		background-color: hsl(215, 100%, 29%);
		background-color: hsl(226, 100%, 20%);
	} */
</style>
