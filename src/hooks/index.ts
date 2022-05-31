import cookie from 'cookie';
import { isTheme, type UserConfig } from '../lib/types/types'
import type { GetSession, Handle } from '@sveltejs/kit'
import { rapidApiHandler } from '../lib/helpers/rapid-api-handler';

export const handle: Handle = async ({ event, resolve }) => {
    
    const theme = cookie.parse(await event.request.headers.get('cookie') || '')?.theme;
    const userConfig: UserConfig = JSON.parse(cookie.parse(await event.request.headers.get('cookie') || '')?.userConfig || null);

    let initialConfig

    if (!userConfig) {

        const defaultUserConfig: UserConfig = {
            userData: {
                useLocation: false,
            },
            activeLocation: 'Santo Domingo | Dominican Republic.',
            selectedDay: 0,
            userPreferences: {
                metrics: 'metric',
                temperature: 'celsius',
            }
        }

        // Create a cookie with the blank user config
        initialConfig = await cookie.serialize('userConfig', JSON.stringify(defaultUserConfig), {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 1 week
            secure: true,
            path: '/',
            sameSite: 'lax'
        });

        // Set server-side userConfig
        event.locals.userConfig = defaultUserConfig;
        
        
    } else {
        // Set server-side userConfig
        event.locals.userConfig = userConfig;
    }
    // Set server-side theme
    event.locals.theme = isTheme(theme) ? theme : 'light';

    // Before get RESPONSE => Preprocess
    const response = await resolve(event);
    // After get RESPONSE => Postprocess

    const themeCookie = await cookie.serialize('theme', event.locals.theme, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        secure: true,
        path: '/',
        sameSite: 'lax'
    });

    // if cookies aren't set, set them
    !isTheme(theme) || !userConfig ? response.headers.set('Set-Cookie', `${themeCookie}, ${initialConfig ? initialConfig : ''};`) : null;

    return response
}

export const getSession: GetSession = async ({ locals }) => {
    // Here we set the server-side session from handle() function
    const theme = locals.theme;
    const userConfig = locals.userConfig;
    const activeLocationData = await rapidApiHandler('forecast', userConfig.activeLocation + "&days=3").then(res => res)

    return { theme, userConfig, activeLocationData }
}