import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  Descriptions,
  Empty,
  Image,
  Layout,
  List,
  Menu,
  Modal,
  Radio,
  Row,
  Space,
  Statistic,
  Tabs,
  Typography,
} from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  getUser,
  getUserProfile,
  searchArtistsRequest,
  userTopItemsRequest,
} from '../../utils/api/spotifyApi';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { LikeOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { render } from 'react-testing-library';
import TopItemsList from '../../components/TopItemsList';
import { PieChartComponent } from '../../components/PieChartComponent';
import { capitalizeFirstLetters, toCamelCase } from '../../utils/transformers';
import SpotifyLogoBlack from '../../images/spotify-logo.png';
import SpotifyLogoGreen from '../../images/spotify-logo-green.png';
import LoginModal from '../../components/LoginModal';
import SpotifyHeader from '../../components/SpotifyHeader';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const contentStyle = {
  height: '100vh',
  color: '#fff',
  // lineHeight: '480px',
  // textAlign: 'center',
  // background: '#1DB954',
  background: '#FFFFFF',
  // background: '#2c343c',
};
function StartPage({ history }) {
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
  const [userProfile, setUserProfile] = useState([]);

  const statsPath = 'stats';
  const playlistPath = 'playlist';

  //   const navigate = useNavigate();

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
    console.log('token', token, !token);
    if (token != '') {
      getUser();
    }
  }, [token]);

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  const getUser = async () => {
    const user = await getUserProfile(token);
    console.log('top', user);
    setUserProfile(user);
  };

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

  const [switchPage, setSwitchPage] = useState(false);
  const [targetPage, setTargetPage] = useState('');

  //   useEffect(() => {
  //     if (switchPage) {
  //       history.push(targetPage);
  //     }
  //   }, [switchPage]);

  //   const goToStatsPage = () => {
  //     setTargetPage('/stats');
  //     setSwitchPage(true);
  //   };

  //   const goToPlaylistPage = () => {
  //     setTargetPage('/playlist');
  //     setSwitchPage(true);
  //   };

  const goToStatsPage = () => {
    history.replace('stats');
  };
  const goToHomePage = () => {
    history.replace('');
  };
  const goToPlaylistPage = () => {
    history.replace('playlist');
  };
  return (
    <div>
      <header className="App-header">
        <Layout>
          <SpotifyHeader
            token={token}
            setToken={setToken}
            // goToHomePage={goToHomePage}
            // goToStatsPage={goToStatsPage}
            // goToPlaylistPage={goToPlaylistPage}
            logout={logout}
          />
          <Content
            style={{
              padding: '50px 50px',
              ...contentStyle,
            }}
          >
            <Button onClick={logout}>logout</Button>
            {!token ? (
              <LoginModal />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Card
                  bordered
                  hoverable
                  style={{
                    width: 480,
                    background: '#1DB954',
                  }}
                  cover={
                    <Image
                      height={480}
                      width={480}
                      preview={false}
                      src={
                        (!!userProfile.images &&
                          !!userProfile.images[0] &&
                          userProfile.images[0].url) ||
                        null
                      }
                    />
                  }
                >
                  <Card.Meta
                    title={
                      '@' + userProfile.id + ' - ' + userProfile.display_name
                    }
                    description={
                      (!!userProfile.external_urls && (
                        <a
                          href={userProfile.external_urls.spotify}
                          target="_blank"
                        >
                          {userProfile.external_urls.spotify}
                        </a>
                      )) ||
                      'NA'
                    }
                  />
                </Card>
                <Row
                  style={{
                    width: 480,
                  }}
                >
                  <Button
                    style={{
                      width: 240,
                      background: '#1DB954',
                    }}
                    key="/stats"
                    // onClick={goToStatsPage}

                    onClick={() => history.replace(`/${statsPath}`)}
                  >
                    Stats
                  </Button>
                  <Button
                    style={{
                      width: 240,
                      background: '#1DB954',
                    }}
                    // onClick={goToPlaylistPage}
                    onClick={() => history.replace(`/${playlistPath}`)}
                    key="/playlist"
                  >
                    Playlist Wizard
                  </Button>
                </Row>
              </div>
            )}
          </Content>
        </Layout>
      </header>
    </div>
  );
}
export default withRouter(StartPage);
