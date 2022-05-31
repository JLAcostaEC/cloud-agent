<script lang="ts">
import { onMount } from "svelte";

import LocationData from "./location-data.svelte";
import Status from "./status.svelte";

import ChevronDoubleUp from "svelte-bootstrap-icons/lib/ChevronDoubleUp";

export let height;

onMount(() => {
    const element = document.querySelector('.welcome-wrapper');
    height = element.offsetHeight;
})
</script>
<div class="welcome-wrapper w-full h-[calc(100vh-190px)] fixed top-[120px] flex flex-col justify-between">
    <LocationData />
    <Status/>
    <img src="images/sunDay.png" alt="" class="pointer-events-none -mt-5">
    <div class="flex justify-between absolute top-1/2 w-full px-6">
        <ChevronDoubleUp class="w-7 animate-swipeup fill-zinc-600 dark:fill-white"/>
        <ChevronDoubleUp class="w-7 animate-swipeup fill-zinc-600 dark:fill-white"/>
    </div>
</div>
