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

export const userTopItemsRequest = async (token, itemType, timePeriod) => {
  console.log(token);
  const { data } = await axios.get(
    `https://api.spotify.com/v1/me/top/${itemType}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        time_range: timePeriod, // Can be 'short_term', 'medium_term' or 'long_term'
        limit: 50, // Number of items to return
      },
    },
  );
  return data;
};

export const getArtist = async (token, id) => {
  console.log(token);
  const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// export const getUser = async (token) => {
//   console.log(token);
//   const { data } = await axios.get(`https://api.spotify.com/v1/me`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return data;
// };
export async function getUser(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  });
  return await result.json();
}
