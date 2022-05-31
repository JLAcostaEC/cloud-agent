<script lang="ts">
	import { session } from '$app/stores';
	import Thermometer from 'svelte-bootstrap-icons/lib/Thermometer';
	import ThermometerHigh from 'svelte-bootstrap-icons/lib/ThermometerHigh';
</script>

<div class="w-full flex flex-col items-center">
	<img src="/images/sun.png" alt="Current Time Icon" class="status-icon w-[30%] relative" />
	<span class="text-xl font-medium text-zinc-600 dark:text-white"
		>{$session.activeLocationData.current.condition.text}</span
	>
	<span class="text-[50px] font-semibold tracking-tighter leading-[1.2] dark:text-white"
		>{$session.activeLocationData.current.temp_c}°</span
	>
	<span class="text-zinc-600 text-lg font-normal dark:text-white">
		Feels like {$session.activeLocationData.current.feelslike_c}</span
	>
	<div class="w-10/12 flex justify-between my-4">
		<span class="text-zinc-600 text-xl flex  items-center font-medium dark:text-white"
			><Thermometer class="w-5 inline mr-1 fill-sky-700 xs:w-7" />Min: {$session
				.activeLocationData.forecast.forecastday[0].day.mintemp_c}°
		</span>
		<span class="text-zinc-600 text-xl flex  items-center font-medium dark:text-white"
			><ThermometerHigh class="w-5 inline mr-1 fill-red-700 xs:w-7" />Max: {$session
				.activeLocationData.forecast.forecastday[0].day.maxtemp_c}°</span
		>
	</div>
</div>
