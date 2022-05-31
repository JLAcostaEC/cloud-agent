
const themes = ['light', 'dark'] as const
export type Theme = typeof themes[number]

export const isTheme = (theme: string): theme is Theme =>
	themes.includes(theme as Theme)

export type userCoordinates = {
	lat: number,
	lng: number,
}
export type UserConfig = {
	userData?: {
		useLocation?: boolean,
		userLocation?: userCoordinates,
	},
	savedLocations?: string[],
	activeLocation?: string,
	selectedDay?: 0 | 1 | 2,
	userPreferences?: {
		metrics: 'metric' | 'imperial',
		temperature: 'celsius' | 'fahrenheit',

	}
}

export type customEvent = {
	title: string,
	message: string,
	severity: 'information' | 'attention' | 'success' | 'caution' | 'critical',
}

export type locationState =  'getting' | 'success' | 'error' | undefined

export type HandleLocation = (action: 'get' | 'set' | 'current' | 'disable' | 'save', location?: string, coordinates?: userCoordinates) => void

export type RapidApiHandler = (api: string, query: string) => Promise<any>