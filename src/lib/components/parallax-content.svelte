<script>
	export let marginTop;
</script>

<div
	class="parallax bg-white dark:bg-zinc-900 w-full min-h-screen z-10 relative dark:after:bg-white"
	style={`margin-top: calc(128px + ${marginTop ? marginTop + 'px' : ''})`}
>
	<slot />
</div>

<style>
	.parallax {
		box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.2);
	}
	:global(.dark .parallax) {
		box-shadow: 0 -5px 25px -10px rgba(255, 255, 255, 0.3);
	}
	.parallax::after{
		content: '';
		position: absolute;
		top: 15px;
		left: 50%;
		width: 40px;
		height: 6px;
		background-color: rgba(0, 0, 0, 0.329);
		border-radius: 100px;
		transform: translateX(-50%);
	}
	/* .parallax::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100px;
		background-image: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.8) 50%,
			rgba(255, 255, 255, 1) 100%
		);
		top: -100px;
		left: 0;
	} */
</style>
