<script lang="ts">
    import { session } from "$app/stores";
    import { onMount } from "svelte";
    import { setTheme, theme } from "$lib/stores/theme";
    
    // Components
    import { Button } from 'fluent-svelte';
	import CustomFlyout from '../custom-fluent-svelte/Flyout.svelte';

    // Icons
    import Moon from 'svelte-bootstrap-icons/lib/Moon';
	import BrightnessHigh from 'svelte-bootstrap-icons/lib/BrightnessHigh';

    // Props
    let usingSystemTheme = false;
	let colorScheme;
	let currentScheme;

    // Reactive statement for open/close modal (Flyout)
	$: open = false;

	const handleFlayout = () => {
        open = !open;
	};

    const handleTheme = (targetTheme) => {
        setTheme(targetTheme);
    };

    onMount(() => {
        // Handle system theme changes
		colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
		currentScheme = colorScheme.matches ? 'dark' : 'light';
		colorScheme.addEventListener('change', (i) => {
			currentScheme = i.matches ? 'dark' : 'light';
			usingSystemTheme ? handleTheme(currentScheme) : null;
		});
	});
</script>

<li class="flex" on:click={handleFlayout}>
    {#if $session.theme !== 'dark'}
        <Moon class="w-5 fill-zinc-800 dark:fill-white xs:w-7" />
    {:else}
        <BrightnessHigh class="w-5 fill-zinc-800 dark:fill-white xs:w-7" />
    {/if}
    <CustomFlyout bind:open>
        <h4 class="text-lg text-center">Config Your Theme</h4>
        <Button
            variant={$theme === 'dark' && !usingSystemTheme ? 'accent' : 'standard'}
            class="!text-lg !font-medium"
            on:click={() => {
                usingSystemTheme = false;
                handleTheme('dark');
            }}>Dark</Button
        >
        <Button
            variant={$theme === 'light' && !usingSystemTheme ? 'accent' : 'standard'}
            class="!text-lg !font-medium"
            on:click={() => {
                usingSystemTheme = false;
                handleTheme('light');
            }}
        >
            Ligth
        </Button>
        <Button
            variant={usingSystemTheme ? 'accent' : 'standard'}
            class="!text-lg !font-medium"
            on:click={() => {
                if (!usingSystemTheme) {
                    console.log('usingSystemTheme: ', currentScheme, 'Applyed Theme: ',$theme);
                    handleTheme(currentScheme);
                    usingSystemTheme = true;
                    console.log('usingSystemTheme: ', currentScheme, 'Applyed Theme: ',$theme);
                }
                return;
            }}>Auto</Button
        >
    </CustomFlyout>
</li>