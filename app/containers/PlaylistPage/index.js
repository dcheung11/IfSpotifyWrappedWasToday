import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  Empty,
  Form,
  Image,
  Layout,
  List,
  Menu,
  Modal,
  Radio,
  Row,
  Slider,
  Space,
  Tabs,
  Typography,
} from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  getUser,
  searchArtistsRequest,
  userTopItemsRequest,
} from '../../utils/api/spotifyApi';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { LoginOutlined } from '@ant-design/icons';
import { render } from 'react-testing-library';
import TopItemsList from '../../components/TopItemsList';
import { PieChartComponent } from '../../components/PieChartComponent';
import { capitalizeFirstLetters, toCamelCase } from '../../utils/transformers';
import SpotifyLogoBlack from '../../images/spotify-logo.png';
import SpotifyLogoGreen from '../../images/spotify-logo-green.png';
import LoginModal from '../../components/LoginModal';
import SpotifyHeader from '../../components/SpotifyHeader';
import { withRouter } from 'react-router-dom';

const contentStyle = {
  height: '100vh',
  color: '#fff',
  // lineHeight: '480px',
  // textAlign: 'center',
  // background: '#1DB954',
  background: '#FFFFFF',
  // background: '#2c343c',
};

function PlaylistPage(props) {
  const CLIENT_ID = '921b749a90e640a1bdd1ce31c4abda39';
  const REDIRECT_URI = 'http://localhost:3000/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPE = 'user-top-read';
  // ,user-read-private,user-read-email';

  const [token, setToken] = useState('');
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

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

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  const handleGo = e => {
    console.log(e);
    topTracks(e);
    topArtists(e);
  };

  const topTracks = async e => {
    e.preventDefault();
    const top = await userTopItemsRequest(token, 'tracks', e.target.value);
    console.log('top', top.items);
    setTracks(top.items);
  };

  const topArtists = async e => {
    e.preventDefault();
    const top = await userTopItemsRequest(token, 'artists', e.target.value);
    console.log('top', top.items);
    setArtists(top.items);
  };
  const goToStatsPage = () => {
    history.replace('stats');
  };
  const goToHomePage = () => {
    history.replace('');
  };
  const goToPlaylistPage = () => {
    history.replace('playlist');
  };
  const style = {
    display: 'inline-block',
    height: 300,
    marginLeft: 70,
  };

  return (
    <div>
      <header className="App-header">
        <Layout>
          <SpotifyHeader
            token={token}
            goToHomePage={goToHomePage}
            goToStatsPage={goToStatsPage}
            goToPlaylistPage={goToPlaylistPage}
            logout={logout}
          />
          <Content
            style={{
              padding: '50px 50px',

              ...contentStyle,
            }}
          >
            <Form>
              <Form.Item>
                <div style={style}>
                  <Slider
                    vertical
                    range={{
                      draggableTrack: true,
                    }}
                    defaultValue={[20, 50]}
                  />
                </div>
              </Form.Item>
              <Form.Item>
                <Button>Create Playlist</Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </header>
    </div>
  );
}
export default withRouter(PlaylistPage);
