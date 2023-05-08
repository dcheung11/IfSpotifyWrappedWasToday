import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  Empty,
  Form,
  Image,
  Input,
  Layout,
  List,
  Menu,
  Modal,
  Radio,
  Row,
  Select,
  Slider,
  Space,
  Tabs,
  Typography,
} from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  addItemsToPlaylist,
  createPlaylist,
  getGenreSeeds,
  getRecommendations,
  getUser,
  getUserProfile,
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
import { get } from 'lodash';
import RecommendationForm from '../../components/RecommendationForm';
import SearchArtist from '../../components/SearchArtist';
import SearchTrack from '../../components/SearchTrack';
import { Helmet } from 'react-helmet';
const contentStyle = {
  height: '100vh',
  color: '#fff',
  // lineHeight: '480px',
  textAlign: 'center',
  // background: '#1DB954',
  background: '#FFFFFF',
  // background: '#2c343c',
};
function ExplorePage(props) {
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
  const [seedInfo, setSeedInfo] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState([]);

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
  return (
    <div>
      <header className="App-header">
        <Helmet>
          <title>MySpotify99 - Explore</title>
        </Helmet>
        <Layout>
          <SpotifyHeader
            token={token}
            // goToHomePage={goToHomePage}
            // goToStatsPage={goToStatsPage}
            // goToPlaylistPage={goToPlaylistPage}
            // logout={logout}
          />
          <Content
            style={{
              padding: '50px 50px',

              ...contentStyle,
            }}
          >
            <Typography.Title>Discover New</Typography.Title>
            <Typography.Paragraph>
              Get detailed breakdowns and music recommendations for the entire
              Spotify database! Search and find some new tracks and artists!
            </Typography.Paragraph>

            <br />
            <Card>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  // alignItems: 'center',
                  // height: '100%',
                }}
              >
                <SearchArtist />
                <SearchTrack />
              </div>
            </Card>
          </Content>
        </Layout>
      </header>
    </div>
  );
}
export default withRouter(ExplorePage);
