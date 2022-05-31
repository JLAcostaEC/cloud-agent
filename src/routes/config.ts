import cookie from 'cookie';
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler = async ({ request, locals }) => {
    const body = await request.json();
    console.log(body)
    console.log(locals)

    locals.userConfig = body
    
    return {
        status: 200,
        headers: {
            'Set-cookie': cookie.serialize('userConfig', JSON.stringify(locals.userConfig), {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7, // 1 week
                secure: true,
                path: '/',
                sameSite: 'lax'
            })
        }
    }
}

export const del: RequestHandler = async ({request, locals}) => {
    const body = await request.json();
    
    console.log('Delete body: ', body, 'locals: ', locals)
    
    locals.userConfig = body
        
    console.log('Delete body: ', body, 'locals: ', locals)
    
    return {
        status: 200,
        headers: {
            'Set-cookie': cookie.serialize('userConfig', JSON.stringify(locals.userConfig), {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7, // 1 week
                secure: true,
                path: '/',
                sameSite: 'lax'
            })
        },
    }
}
