<script lang="ts">
	import { session } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';

	import GeoAlt from 'svelte-bootstrap-icons/lib/GeoAlt';

	const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
	const currentDay = new Date().getDate();
    
    let currentTime;
    let timeInterval;

    let getActiveLocation = $session.userConfig.activeLocation;

    getActiveLocation = getActiveLocation.substring(0, getActiveLocation.indexOf('|') - 1);

    function showTime() {
		let time = new Date();
		let hour = time.getHours();
		let min = time.getMinutes();
		let sec = time.getSeconds();
		let am_pm = 'AM';
		let readableHour;
		let readableMin;
		let readableSec;

		if (hour > 12) {
			hour -= 12;
			am_pm = 'PM';
		}
		if (hour == 0) {
			hour = 12;
			am_pm = 'AM';
		}
		readableHour = hour < 10 ? '0' + hour.toString() : hour;
		readableMin = min < 10 ? '0' + min.toString() : min;
		readableSec = sec < 10 ? '0' + sec.toString() : sec;

		return currentTime = readableHour + ':' + readableMin + ' ' + am_pm;
	}

    currentTime = showTime();

	onMount(() => {
		timeInterval = setInterval(showTime, 1000);
	});
	onDestroy(() => {
		clearInterval(timeInterval);
	});
</script>

<section class="flex w-full py-2 px-4 justify-between items-center">
	<div class="w-1/2 flex flex-col">
		<span class="text-lg text-neutral-700 leading-4 dark:text-white">{currentTime}</span>
		<span class="text-lg tracking-tighter text-neutral-700 leading-7 dark:text-white"
			>{currentMonth} / {currentDay}</span
		>
		<span
			class="text-base tracking-normal text-neutral-700 font-medium flex items-center dark:text-white"
			><GeoAlt
				class="w-auto inline mr-1 fill-neutral-800 dark:fill-white"
			/>{getActiveLocation}</span
		>
	</div>
	<img src="/images/world-map.png" alt="World Map" class="world-map w-1/2 contrast-[0.3] self-start dark:invert dark:contrast-75" />
</section>
<style>
</style>