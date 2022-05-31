<script lang="ts">
	import type { HandleLocation, locationState } from '../../types/types';
	import { dispatchCustomEvent } from '$lib/helpers/customEvents';
	import { session } from '$app/stores';
	import { rapidApiHandler } from '../../helpers/rapid-api-handler';

	// Components
	import CustomFlyout from '../custom-fluent-svelte/Flyout.svelte';
	import { Button, AutoSuggestBox, ProgressRing, ToggleSwitch } from 'fluent-svelte';

	// Icons
	import GeoAlt from 'svelte-bootstrap-icons/lib/GeoAlt';

	// Props
	let autoSuggestInput;
	let usingLocation = false;
	let trackingState: locationState;
	let disableDelete = false;

	console.log($session);
	// Reactive statements
	$: open = false;

	// Everytime the input changes, we need to check if the location is valid to save it - Valid scheme: "PlaceName | CountryName." width a dot at the end.
	$: autoSuggestInput,
		autoSuggestInput &&
		autoSuggestInput?.indexOf('|') != -1 &&
		autoSuggestInput.length - autoSuggestInput?.indexOf('|') > 5 &&
		autoSuggestInput?.indexOf('.') != -1
			? handleLocation('save', autoSuggestInput)
			: null;
	$: autoSuggestOptions = [
		'Santo Domingo | Dominican Republic.',
		'New York | United States of America.',
		'Madrid | Spain.',
		'London | United Kingdom.',
		'Paris | France.',
		'Berlin | Germany.',
		'Rome | Italy.',
		'Amsterdam | Netherlands.'
	];

	let savedLocations = $session.userConfig?.savedLocations;

	const handleFlayout = () => {
		open = !open;
	};

	const handleLocation: HandleLocation = async (action, location) => {
		console.log(action, location);
		if (!location || location.length < 3) return;

		if (action === 'set') {
			$session.userConfig.activeLocation = location;
			rapidApiHandler('forecast', `${location}&days=3`)
				.then((response) => {
					$session.userConfig.activeLocationData = response;
					fetch('config', {
						method: 'PUT',
						body: JSON.stringify($session.userConfig)
					});
				})
				.catch((err) => console.error(err));
		} else if (action === 'get') {
			usingLocation = false;
		} else if (action === 'save') {
			$session.userConfig.savedLocations
				? $session.userConfig.savedLocations.push(location)
				: ($session.userConfig.savedLocations = [location]);

			await fetch('config', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify($session.userConfig)
			});

			savedLocations = $session.userConfig?.savedLocations;
		} else if (action === 'current') {
			trackingState = 'getting';
			await navigator.geolocation.getCurrentPosition(
				async (position) => {
					let latitude = position.coords.latitude,
						longitude = position.coords.longitude;

					if (latitude && longitude) {
						$session.userConfig.focusLocatio = {
							location: {
								latitude,
								longitude
							}
						};
						trackingState = 'success';
						usingLocation = true;
						dispatchCustomEvent('notify', {
							title: 'Using your current Location',
							message: 'Your current location has been set.',
							severity: 'success'
						});
					}
				},
				(error) => {
					trackingState = 'error';
					dispatchCustomEvent('notify', {
						title: 'Location Error',
						message: error.message,
						severity: 'caution'
					});
				}
			);
		} else if (action === 'disable') {
			usingLocation = false;
			dispatchCustomEvent('notify', {
				title: 'Location disabled',
				message: 'Location services have been disabled',
				severity: 'information'
			});
			trackingState = undefined;
		}
		try {
			if (usingLocation) {
			} else {
			}
		} catch (error) {
			console.log(error);
		}
	};
	const removeLocation = async (index) => {
		disableDelete = true;
		$session.userConfig.savedLocations?.splice(index, 1);

		savedLocations = $session.userConfig.savedLocations;

		await fetch('config', {
			method: 'DELETE',
			body: JSON.stringify($session.userConfig)
		});

		disableDelete = false;

		dispatchCustomEvent('notify', {
			title: 'Remove Location',
			message: '',
			severity: 'caution'
		});
	};

	const autoComplete = async (data: string) => {
		rapidApiHandler('search', data)
			.then((response) => {
				let locations = [];
				response.forEach((element) => {
					const joinedName = element.name + ' | ' + element.country + '.';
					locations.push(joinedName);
				});
				return locations;
			})
			.then((locations) => {
				autoSuggestOptions = locations;
			});
	};
</script>

<li class="block" on:click={handleFlayout}>
	<GeoAlt class="w-5 fill-zinc-800 dark:fill-white xs:w-7" />
</li>
<CustomFlyout bind:open>
	<div class="flex justify-between items-center">
		<label for="location" class="text-lg font-medium"> Use my current location </label>
		{#if trackingState === 'getting'}
			<ProgressRing class="w-5 absolute right-16" />
		{/if}
		<ToggleSwitch
			id="location"
			bind:checked={usingLocation}
			on:click={async (e) => {
				if (!usingLocation) {
					// Prevent the auto-enable until the browser return the location
					e.preventDefault();
					await handleLocation('current');
				} else {
					await handleLocation('disable');
				}
			}}
		/>
	</div>
	{#if savedLocations?.length > 0}
		{#each savedLocations as item, index (item)}
			<div class="flex gap-3">
				<Button
					class="!w-[calc(100%-44px)] px-10"
					on:click={() => handleLocation('set', 'Barquisimeto')}
				>
					<span
						style="max-width: 95%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"
					>
						Use {item}
					</span>
				</Button>
				<Button
					bind:disabled={disableDelete}
					variant="accent"
					class="!bg-red-500 !w-8"
					on:click={() => removeLocation(index)}>X</Button
				>
			</div>
		{/each}
	{/if}
	<AutoSuggestBox
		placeholder="Add a place..."
		bind:items={autoSuggestOptions}
		bind:value={autoSuggestInput}
		on:input={async (e) => {
			if (autoSuggestInput.length > 3) {
				await autoComplete(autoSuggestInput);
			}
		}}
	/>
</CustomFlyout>

<style>
	/* Hide text overflow on autoSuggest options and decorate with ellipsis */
	:global(.auto-suggest-item-wrapper span.text-block.type-body) {
		max-width: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
