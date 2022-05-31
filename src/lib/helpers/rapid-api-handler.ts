import type { RapidApiHandler } from '../types/types';

export const rapidApiHandler: RapidApiHandler = async (api, query) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                'X-RapidAPI-Key': '58a30d7f9dmsh854868c34305d88p1c403cjsn43adeb73eaf2'
            }
        };

        return fetch(`https://weatherapi-com.p.rapidapi.com/${api}.json?q=${query}`, options)
            .then((response) => response.json())
            .then((response) => {
                return Promise.resolve(response);
            })
            .catch((err) => {
                return Promise.reject(err);
            });

}