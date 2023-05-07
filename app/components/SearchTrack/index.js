import React, { useEffect, useState } from 'react';
import {
  AutoComplete,
  Avatar,
  Button,
  Card,
  Descriptions,
  Empty,
  Image,
  Input,
  List,
  Pagination,
  Radio,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import {
  getRecommendations,
  getTrack,
  getTrackFeatures,
  searchTrackRequest,
} from '../../utils/api/spotifyApi';
import ArtistProfile from '../Profiles/ArtistProfile';
import TrackProfile from '../Profiles/TrackProfile';

export default function SearchTrack(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [token, setToken] = useState('');
  const [track, setTrack] = useState('');
  const [trackFeatures, setTrackFeatures] = useState('');
  const [recommendations, setRecommendations] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');
    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find(elem => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }
    setToken(token);
  }, []);

  useEffect(() => {
    if (token != '') {
      searchTracks();
    }
  }, [searchTerm]);

  const searchTracks = async e => {
    if (e) {
      e.preventDefault();
    }
    const a = await searchTrackRequest(token, searchTerm);
    console.log(a);
    setOptions(
      a.map(a => {
        return {
          label: a.name,
          value: a.id,
        };
      }),
    );
  };

  const [selectedOption, setSelectedOption] = useState('');

  const onSelect = (data, option) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    console.log('onSelect', data, option);
  };

  const onChange = (data, option) => {
    setSearchTerm(data);
    // setSelectedOption(option);
    console.log('onChange', data, option);
  };

  useEffect(() => {
    if (token != '') {
      getTrackInfo();
      getTrackAudioFeatures();
      getRecommended();
      //   getArtistTopTracks();
    }
  }, [selectedOption]);

  const getTrackInfo = async e => {
    if (e) {
      e.preventDefault();
    }
    const a = await getTrack(token, [selectedOption.value]);
    console.log(a);
    setTrack(a);
  };

  const getTrackAudioFeatures = async e => {
    if (e) {
      e.preventDefault();
    }
    const a = await getTrackFeatures(token, [selectedOption.value]);
    console.log(a);
    setTrackFeatures(a);
  };

  const getRecommended = async e => {
    if (e) {
      e.preventDefault();
    }
    const a = await getRecommendations(
      token,
      { seed_tracks: [selectedOption.value] },
      9,
    );
    console.log(a);
    setRecommendations(a);
  };

  return (
    <div>
      <AutoComplete
        placeholder="Search for Spotify Tracks"
        value={searchTerm}
        options={options}
        autoFocus={true}
        style={{ width: 480 }}
        filterOption={(searchTerm, option) =>
          option.label.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1
        }
        onSelect={onSelect}
        onChange={onChange}
      />
      <br />
      <br />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <TrackProfile
          track={track}
          recommendations={recommendations}
          trackFeatures={trackFeatures}
        />
      </div>
    </div>
  );
}
