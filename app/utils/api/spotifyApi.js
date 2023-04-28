import axios from 'axios';

export const searchArtistsRequest = async (token, searchKey) => {
  const { data } = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: searchKey,
      type: 'artist',
    },
  });
  return data.artists.items;
};

export const userTopItemsRequest = async (token, itemType) => {
  console.log(token);
  const { data } = await axios.get(
    `https://api.spotify.com/v1/me/top/${itemType}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        time_range: 'medium_term', // Can be 'short_term', 'medium_term' or 'long_term'
        limit: 10, // Number of items to return
      },
    },
  );
  return data;
};
