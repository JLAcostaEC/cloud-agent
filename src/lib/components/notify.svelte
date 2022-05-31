<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	// Components
	import { InfoBar } from 'fluent-svelte';

    // Reactive Props
	$: notifications = [];

	onMount(() => {
		// Handle Notifications
		window.addEventListener('notify', (e: CustomEvent) => {
            // Add an id to the notification details 
            const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
            e.detail.id = id;

            // reactivity is triggered by assignments so don't use Array.push()
			notifications = [...notifications, e.detail];

            // Remove notification after 5 seconds
            setTimeout(() => {
                // Use findIndex to prevent a splice error at the moment of removal
                const index = notifications.findIndex(notification => notification.id === id);
                notifications.splice(index, 1);

                // We need to trigger a re-render to remove the notification
                notifications = notifications
            }, 5000)
		});
	});
</script>

<div
	class="fixed left-0 top-0 w-screen pointer-events-none h-screen flex flex-col gap-5 justify-end items-end px-4 py-10 z-[9999]"
>
	{#each notifications as item (item)}
		<div class="notify pointer-events-auto" in:fly={{ x: 200, duration: 400 }} out:fly={{ x: 200, duration: 400 }}>
			<InfoBar
				title={item.title || 'Notification'}
				message={item.message || ''}
				severity={item.severity || 'information'}
			/>
		</div>
	{/each}
</div>
