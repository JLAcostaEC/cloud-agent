import type {RequestHandler} from '@sveltejs/kit'
import {isTheme} from '$lib/types/types'

export const put: RequestHandler = async ({request}) => {
	const theme = await request.text()

	if (!isTheme(theme)) {
		return {
			status: 400,
			body: `not a valid theme value: ${theme}`,
		}
	}

	return {
		headers: {
			'Set-Cookie': `theme=${theme}; SameSite=Strict; HttpOnly; Path=/`,
		},
	}
}

export const del: RequestHandler = async () => ({
	status: 204,
	headers: {
		'Set-Cookie': `theme= ; Max-Age=0; SameSite=Strict; HttpOnly; Path=/`,
	},
})
