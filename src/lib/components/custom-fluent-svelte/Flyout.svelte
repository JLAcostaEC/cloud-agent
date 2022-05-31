<script>

import { Flyout } from "fluent-svelte";
import FlyoutSurface from "fluent-svelte/Flyout/FlyoutSurface.svelte";

export let open;

</script>
<div class="absolute bottom-0 left-1/2">
    <Flyout bind:open placement="bottom" alignment="center" offset={10} trapFocus={false}>
        <svelte:fragment slot="override">
            <FlyoutSurface
                style="min-inline-size: 95vw; max-inline-size: 96vw; display: flex; flex-direction: column; gap: 20px"
            >
               <slot/>
            </FlyoutSurface>
        </svelte:fragment>
    </Flyout>
</div>