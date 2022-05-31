<script lang="ts">
	import { page } from '$app/stores';
	$: isActive = $page.url.pathname === $$props.href;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a {...$$props} class:active={isActive}>
	<slot />
</a>
