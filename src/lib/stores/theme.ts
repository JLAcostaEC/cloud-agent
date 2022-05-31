import {browser} from '$app/env'
import {session} from '$app/stores'
import type {Theme} from '$lib/types/types'
import type {Writable} from 'svelte/store'
import {derived} from 'svelte/store'

export const theme = derived<Writable<App.Session>, Theme>(
	session,
	($session, set) => {
		if ($session.theme) {
			set($session.theme)
		} else if (browser) {
			set(
				window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'
			)
		}
	}
)

// Set the theme on demand.
export const setTheme = (theme: Theme) => {
	session.update(($session) => ({...$session, theme}))
	fetch('/theme', {method: 'PUT', body: theme})
}
