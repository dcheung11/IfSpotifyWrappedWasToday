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
  getArtists,
  getArtistTopTracks,
  getRelatedArtists,
  searchArtistsRequest,
} from '../../utils/api/spotifyApi';
import ArtistProfile from '../Profiles/ArtistProfile';

export default function SearchArtist(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [token, setToken] = useState('');
  const [artist, setArtist] = useState('');
  const [artistTopTracks, setArtistTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

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
      searchArtists();
    }
  }, [searchTerm]);

  const searchArtists = async e => {
    if (e) {
      e.preventDefault();
    }
    const a = await searchArtistsRequest(token, searchTerm);
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
    if (token != '' && !!token) {
      getArtist();
      getTopTracks();
      getArtistRelated();
      //   getArtistTopTracks();
    }
  }, [selectedOption]);

  const getArtist = async e => {
    if (e) {
      e.preventDefault();
    }
    const a = await getArtists(token, [selectedOption.value]);
    console.log(a);
    setArtist(a);
  };
  const getTopTracks = async e => {
    if (e) {
      e.preventDefault();
    }
    const a = await getArtistTopTracks(token, selectedOption.value.toString());
    console.log(a);
    setArtistTopTracks(a);
  };
  const getArtistRelated = async e => {
    if (e) {
      e.preventDefault();
    }
    const a = await getRelatedArtists(token, [selectedOption.value]);
    console.log(a);
    setRelatedArtists(a);
  };

  return (
    <div>
      <AutoComplete
        placeholder="Search for Spotify Artists"
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
          // display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <ArtistProfile
          artist={artist}
          artistTopTracks={artistTopTracks}
          relatedArtists={relatedArtists}
        />
      </div>
    </div>
  );
}
