/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	import type { Theme } from 'src/types';
	import type { UserConfig } from 'src/types';
	// interface Platform {}
	// interface Stuff {}
	interface Locals {
		theme: Theme | null,
		userConfig?: UserConfig | null,
		activeLocationData?: Record<string, any>,
		appReady: boolean
	}
	interface Session {
		theme: Theme | null,
		userConfig?: UserConfig | null,
		activeLocationData?: Record<string, any>,
		appReady?: boolean,
	}
}
declare interface Window {
	loadStatus: 'loading' | 'loaded' | 'idle';
}