import { createApi } from 'unsplash-js';

// on your node server
const unsplashAPI = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,

});

const getUrl = (latLong, limit) => {
    return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=coffee&limit=${limit}`
}
const getPhotos = async () => {
    const photos = await unsplashAPI.search.getPhotos({
        query: 'coffee shop',
        perPage: 30,

    });
    const unsplashResults = await photos.response.results;
    const photosResponse = unsplashResults.map(el => el.urls["small"])
    return photosResponse
}
export const fetchCoffeeStores = async (latLong = "43.6532,-79.3832") => {
    const photos = await getPhotos()
    const response = await fetch(getUrl(latLong, 6),
        {
            "headers": {
                'Authorization': process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
            }
        }
    );
    const data = await response.json()
    return data.results.map((el, idx) => {
        return {
            ...el,
            imgUrl: photos[idx]
        }
    })
}