import axios from 'axios';
import { isArray } from 'lodash';

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
        limit: 100, // Number of items to return
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
export async function getUserProfile(token) {
  const result = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  return await result.json();
}

export async function getRecommendations(
  token,
  values,
  // target_acoustics,
  // target_danceability,
  // target_energy,
) {
  console.log(token);
  // console.log(values);
  // const filteredDict = Object.fromEntries(
  //   Object.entries(values)
  //     .filter(([key, value]) => value !== undefined)
  //     .map(([key, value]) => {
  //       if (Array.isArray(value)) {
  //         value = value.join(',');
  //       }
  //       return [key, value];
  //     }),
  // );
  // const w = Object.fromEntries(entries);
  // console.log('val', filteredDict);

  const { data } = await axios.get(
    `https://api.spotify.com/v1/recommendations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        seed_artists: values.seed_artists.join(','),
        seed_tracks: values.seed_tracks.join(','),
        seed_genres: values.seed_genres.join(','),
        target_acousticness: values.target_acousticness,
        target_danceability: values.target_danceability,
        target_energy: values.target_energy,
        target_instrumentalness: values.target_instrumentalness,
        target_liveness: values.target_liveness,
        target_loudness: values.target_loudness,
        target_popularity: values.target_popularity,
        target_speechiness: values.target_speechiness,
        target_tempo: values.target_tempo,
        target_valence: values.target_valence,
      },
    },
  );
  return data;
}

export const getGenreSeeds = async token => {
  console.log(token);
  const { data } = await axios.get(
    `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data.genres;
};

export const createPlaylist = async (token, playlistName, userId) => {
  try {
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      { name: playlistName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addItemsToPlaylist = async (token, playlistId, uris) => {
  try {
    const response = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks
      `,
      { uris: uris },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
