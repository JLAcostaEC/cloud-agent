<script lang="ts">
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import { theme } from '../stores/theme';

	import Chart from 'chart.js/auto/auto';
	import ChartDataLabels from 'chartjs-plugin-datalabels';

	// Export Options
	export let dayIndex;
	export let maxItems = 4;

	// Export Function for external component Calls
	export const updateChartData = async (target) => {
		chartUpdate(target.target);
	};

	// Create Internal Ref for Function what will update the chart
	let chartUpdate;

	const forecast = $session.activeLocationData.forecast.forecastday;

	let outScopedItems = maxItems + 2;
	let labels = [];
	let data = [];
	const time = new Date();
	const currentHour = time.getHours();

	function getReadableHour(hour) {
		let am_pm = 'AM';

		if (hour > 12) {
			hour -= 12;
			am_pm = 'PM';
		}
		if (hour == 0) {
			hour = 12;
			am_pm = 'AM';
		}
		return hour.toString() + am_pm;
	}

	const chainNextDay = () => {
		for (let i = 0; i <= 23; i++) {
			if (data.length > outScopedItems) {
				break;
			}

			labels.push(getReadableHour(i));
			data.push(Math.round(forecast[dayIndex + 1].hour[i].temp_c));
		}
	};

	const addOutScopedItems = (i) => {
		labels.push(getReadableHour(i));
		data.push(Math.round(forecast[dayIndex].hour[i].temp_c));
	};

	for (let i = currentHour; i <= 23; i++) {
		if (data.length > outScopedItems) {
			break;
		}
		if (data.length == 0 || !data.length) {
			addOutScopedItems(i);
		}

		labels.push(getReadableHour(i));
		data.push(Math.round(forecast[dayIndex].hour[i].temp_c));

		if (i == 23) {
			chainNextDay();
		}
		if (data.length == outScopedItems - 1) {
			addOutScopedItems(i);
		}
	}

	let canvaId = 'canva_' + parseInt((Math.random() * 109999).toString());

	onMount(() => {
		const ctx = (document.querySelector(`#${canvaId}`) as HTMLCanvasElement).getContext('2d');

		let gradient = ctx.createLinearGradient(0, 0, 0, 200);
		gradient.addColorStop(0, 'rgba(255, 195, 155, 0.8)');
		gradient.addColorStop(0.87, '#ffffff00');
		gradient.addColorStop(1, '#ffffff00');

		let negativeGradient = ctx.createLinearGradient(0, 0, 0, 300);
		negativeGradient.addColorStop(0, 'rgba(0, 195, 155, 1)');
		negativeGradient.addColorStop(0.5, 'rgba(0, 195, 155, 0)');
		negativeGradient.addColorStop(1, 'rgba(0, 100, 0,0)');

		let chartElement = new Chart(ctx, {
			type: 'line',

			data: {
				labels,
				datasets: [
					{
						data: data,
						borderColor: 'transparent',
						backgroundColor: gradient,
						fill: {
							target: 'origin',
							below: negativeGradient
						},
						tension: 0.4
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				filler: {
					propagate: true
				},
				layout: {
					padding: {
						top: 40
					}
				},
				elements: {
					point: {
						radius: 0
					}
				},
				scales: {
					x: {
						grid: {
							display: false,
							borderColor: 'transparent'
						},
						ticks: {
							padding: 20,
							callback: function hideOutScopeItems(value, index) {
								if (index === outScopedItems || index === 0) {
									return '';
								} else {
									return this.getLabelForValue(value);
								}
							},
							color: $theme == 'dark' ? '#ffffff' : '#000000'
						},
						offset: false
					},
					y: {
						grid: {
							display: false,
							borderColor: 'transparent'
						},
						ticks: {
							display: false,
							padding: 0
						},
						beginAtZero: true,
						min: 10
					}
				},
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: false
					},
					datalabels: {
						borderRadius: 4,
						align: 'top',
						anchor: 'center',
						offset: 10,
						color: $theme == 'dark' ? '#ffffff' : '#000000',
						font: {
							weight: '500',
							size: '16',
							family: ['selawik', 'Open Sans', 'Helvetica Neue', 'sans-serif']
						},
						padding: 0,
						formatter: function (value, context) {
							if (context.dataIndex == 0 || context.dataIndex == outScopedItems) {
								return null;
							} else {
								return value + '°';
							}
						}
					}
				}
			},
			plugins: [
				ChartDataLabels,
				{
					afterDraw: (chart) => {
						var ctx = chart.ctx;
						var xAxis = chart.scales.x;
						var yAxis = chart.scales.y;
						xAxis.ticks.forEach((value, index) => {
							if (index === outScopedItems || index === 0) {
								value.label = '';
							} else {
								var x = xAxis.getPixelForTick(index);
								var image = new Image();
								(image.src = 'https://i.stack.imgur.com/2RAv2.png'),
									ctx.drawImage(image, x - 12, yAxis.bottom - 8, 28, 28);
								value = value.label;
							}
						});
					}
				}
			]
		});

		theme.subscribe((val) => {
			chartElement.options.plugins.datalabels.color = val == 'dark' ? '#ffffff' : '#000000';
			chartElement.options.scales.x.ticks.color = val == 'dark' ? '#ffffff' : '#000000';
			chartElement.update();
		});
	});
</script>

<div class="flex flex-col w-full overflow-hidden mt-10">
	<canvas id={canvaId} class="w-[100%] -mx-12" height="250" />
</div>
<hr class="h-1 bg-yellow-400 border-none" />
<h4 class="flex justify-center py-4 text-lg font-medium dark:text-white">
	{forecast[dayIndex].day.daily_chance_of_rain}% chance of precipitation today
</h4>
