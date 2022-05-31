<script lang="ts">
	import { goto } from '$app/navigation';
	import { page, session } from '$app/stores';

	$: isActive = $page.url.pathname === $$props.href;


	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const currentDateIndex = new Date().getDay();
	const dayAfterTomorrow =
		days[
			currentDateIndex === days.length - 2
				? 0
				: currentDateIndex === days.length - 1
				? 1
				: currentDateIndex + 2
		];
</script>

<nav class="w-[calc(100%-1rem)] h-11 mx-4 self-center bg-zinc-700 my-2 rounded-xl flex p-1 dark:bg-white">
	<ul class="w-full flex justify-between gap-2">
		<li
			on:click={() => goto('/')}
			class={`flex items-center w-1/2 justify-center rounded-lg px-3 font-medium text-white hover:bg-white hover:text-zinc-700 ${$page.url.pathname == '/' ? 'bg-white text-zinc-700' : ''} dark:text-zinc-800 dark:hover:bg-zinc-700 dark:hover:text-white`}
		>
			Today
		</li>
		<li
			on:click={() => goto('/tomorrow')}
			class={`flex items-center w-1/2 justify-center rounded-lg px-3 font-medium text-white hover:bg-white hover:text-zinc-700 ${$page.url.pathname == '/tomorrow' ? 'bg-white text-zinc-700' : ''} dark:text-zinc-800 dark:hover:bg-zinc-700 dark:hover:text-white`}
		>
			Tomorrow
		</li>
		<li
			on:click={() => goto('/' + dayAfterTomorrow)}
			class={`flex items-center w-1/2 justify-center rounded-lg px-3 font-medium text-white hover:bg-white hover:text-zinc-700 ${$page.url.pathname == '/' + dayAfterTomorrow ? 'bg-white text-zinc-700' : ''} dark:text-zinc-800 dark:hover:bg-zinc-700 dark:hover:text-white`}
		>
			{dayAfterTomorrow}
		</li>
	</ul>
</nav>
