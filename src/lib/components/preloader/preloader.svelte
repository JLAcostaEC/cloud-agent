<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	import Logo from './logo.svelte';

	let visible = false;
	onMount(() => {
		visible = true;
	});
</script>

<div
	class="preloader w-full h-screen bg-white dark:bg-neutral-900 fixed top-0 left-0 flex flex-col justify-center items-center pb-24 z-[9999] transition-all duration-300"
>
	{#if visible}
		<Logo />
		<h4
			class="text-5xl font-bold mt-8 text-zinc-700 dark:text-white tracking-wide"
			transition:fly={{ x: -100, duration: 500, delay: 500 }}
		>
			Cloud<span class="text-yellow-500">Agent</span>
		</h4>
	{/if}
</div>
