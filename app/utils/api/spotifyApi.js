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
        limit: 49, // Number of items to return
      },
    },
  );
  return data;
};
export const userTopItemsSecondRequest = async (
  token,
  itemType,
  timePeriod,
) => {
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
        offset: 49,
      },
    },
  );
  return data;
};

export const getArtists = async (token, artistIds) => {
  const n = (!!artistIds && artistIds.join(',')) || undefined;
  // console.log(n);
  const { data } = await axios.get(`https://api.spotify.com/v1/artists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ids: n,
    },
  });
  return data;
};

export const getTrackFeatures = async (token, trackIds) => {
  const n = (!!trackIds && trackIds.join(',')) || undefined;
  // console.log(n);
  const { data } = await axios.get(
    `https://api.spotify.com/v1/audio-features`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ids: n,
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
  limit,
  // target_acoustics,
  // target_danceability,
  // target_energy,
) {
  console.log(token);

  const params = {
    limit: limit,
    seed_artists:
      (!!values.seed_artists && values.seed_artists.join(',')) || undefined,
    seed_tracks:
      (!!values.seed_tracks && values.seed_tracks.join(',')) || undefined,
    seed_genres:
      (!!values.seed_genres && values.seed_genres.join(',')) || undefined,
    min_acousticness: values.acousticness ? values.acousticness[0] : undefined,
    max_acousticness: values.acousticness ? values.acousticness[1] : undefined,
    min_danceability: values.danceability ? values.danceability[0] : undefined,
    max_danceability: values.danceability ? values.danceability[1] : undefined,
    min_energy: values.energy ? values.energy[0] : undefined,
    max_energy: values.energy ? values.energy[1] : undefined,
    min_instrumentalness: values.instrumentalness
      ? values.instrumentalness[0]
      : undefined,
    max_instrumentalness: values.instrumentalness
      ? values.instrumentalness[1]
      : undefined,
    // min_liveness: values.liveness ? values.liveness[0] : undefined,
    // max_liveness: values.liveness ? values.liveness[1] : undefined,
    // min_loudness: values.loudness ? values.loudness[0] : undefined,
    // max_loudness: values.loudness ? values.loudness[1] : undefined,
    min_popularity: values.popularity ? values.popularity[0] : undefined,
    max_popularity: values.popularity ? values.popularity[1] : undefined,
    min_speechiness: values.speechiness ? values.speechiness[0] : undefined,
    max_speechiness: values.speechiness ? values.speechiness[1] : undefined,
    min_tempo: values.tempo ? values.tempo[0] : undefined,
    max_tempo: values.tempo ? values.tempo[1] : undefined,
    min_valence: values.valence ? values.valence[0] : undefined,
    max_valence: values.valence ? values.valence[1] : undefined,
  };
  console.log(params);
  const { data } = await axios.get(
    `https://api.spotify.com/v1/recommendations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
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
