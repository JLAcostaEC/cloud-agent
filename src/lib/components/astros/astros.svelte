<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	export let dayIndex = 0;

	const forecast = $session.activeLocationData.forecast.forecastday;

	let astroTop;
	let astroLeft;

	onMount(() => {
		let time = new Date();
		let currentHour = time.getHours();

		switch (true) {
			case currentHour === 0:
				astroTop = '98%';
				astroLeft = '4%';
				break;
			case currentHour === 2:
				astroTop = '93%';
				astroLeft = '9%';
				break;
			case currentHour === 3:
				astroTop = '88%';
				astroLeft = '12%';
				break;
			case currentHour >= 4 && currentHour < 7:
				astroTop = '40%';
				astroLeft = '25.5%';
				break;
			case currentHour >= 7 && currentHour < 9:
				astroTop = '25%';
				astroLeft = '30%';
				break;
			case currentHour >= 10 && currentHour < 12:
				astroTop = '12%';
				astroLeft = '38%';
				break;
			case currentHour >= 12 && currentHour < 13:
				astroTop = '0%';
				astroLeft = '50%';
				break;
			case currentHour >= 13 && currentHour < 15:
				astroTop = '12%';
				astroLeft = '65%';
				break;
			case currentHour >= 15 && currentHour < 18:
				astroTop = '25%';
				astroLeft = '71%';
				break;
			case currentHour >= 18 && currentHour < 21:
				astroTop = '40%';
				astroLeft = '75.5%';
				break;
			case currentHour >= 21 && currentHour <= 23:
				astroTop = '88%';
				astroLeft = '89%';
				break;

			default:
				astroTop = '0%';
				astroLeft = '50%';
				break;
		}
	});
</script>

<div class="astro-wrapper">
	<div class="flex w-full justify-between px-5">
		<h4 class="text-center">
			Sunrise: <br /> <span class="font-medium">{forecast[dayIndex].astro.sunrise}</span>
		</h4>
		<h4 class="text-center">
			Sunset: <br /> <span class="font-medium">{forecast[dayIndex].astro.sunset}</span>
		</h4>
	</div>
	<div
		class="astro w-full h-max relative -mt-3"
		style={`--astro-top: ${astroTop}; --astro-left: ${astroLeft};`}
	>
		<svg
			width="420"
			height="178"
			viewBox="0 0 420 178"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M101.221 85.7852C74.2942 130.937 50.675 177.058 0 177.058V85.7852H101.221C127.04 42.492 155.899 0.0898438 214.566 0.0898438C273.233 0.0898438 300.785 42.492 324.837 85.7852H419.998V177.058C371.2 177.058 349.922 130.937 324.837 85.7852H101.221Z"
				fill="url(#paint0_linear_152_214)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_152_214"
					x1="209.999"
					y1="0.0898437"
					x2="209.999"
					y2="177.058"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#EFCC71" stop-opacity="0.53" />
					<stop offset="0.483918" stop-color="#EFCC71" stop-opacity="0.5" />
					<stop offset="0.484018" stop-color="#501997" stop-opacity="0.5" />
					<stop offset="1" stop-color="#501997" stop-opacity="0.5" />
				</linearGradient>
			</defs>
		</svg>
	</div>
	<h4 class="text-center -mt-5">
		Moon Phase: <br /><span class="font-medium">{forecast[dayIndex].astro.moon_phase}</span>
	</h4>
</div>

<style>
	.astro:after {
		content: '';
		position: absolute;
		top: var(--astro-top);
		left: var(--astro-left);
		transform: translateX(-50%) translateY(-50%);
		width: 32px;
		height: 32px;
		background-image: url('images/sun.png');
		background-size: cover;
		border-radius: 100px;
	}
</style>
