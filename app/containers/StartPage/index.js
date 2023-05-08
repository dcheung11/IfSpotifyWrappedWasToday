import { Button, Card, Col, Empty, Image, Layout, Typography } from 'antd';
// import { useEffect, useState }

import { Content } from 'antd/es/layout/layout';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import {
  getUserProfile,
  userTopItemsRequest,
} from '../../utils/api/spotifyApi';

import LoginModal from '../../components/LoginModal';
import SpotifyHeader from '../../components/SpotifyHeader';

const contentStyle = {
  height: '100vh',
  color: '#fff',
  // lineHeight: '480px',
  textAlign: 'center',
  // background: '#1DB954',
  background: '#FFFFFF',
  // background: '#2c343c',
};
function StartPage({ history }) {
  const CLIENT_ID = '921b749a90e640a1bdd1ce31c4abda39';
  const REDIRECT_URI = 'https://spotify-top-99.web.app/';

  // const REDIRECT_URI = 'http://localhost:3000/';
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
    const { hash } = window.location;
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

  // useEffect(() => {
  //   console.log(userProfile);
  //   if (!userProfile.display_name && userProfile != []) {
  //     logout();
  //   }
  // }, [userProfile]);
  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };
  // window.localStorage.removeItem('token');

  return (
    <div>
      <header className="App-header">
        <Helmet>
          <title>Spotify Top 99 - Home</title>
        </Helmet>
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
            <Typography.Title>
              {userProfile.display_name
                ? `${userProfile.display_name}'s Home Page`
                : 'Home Page'}
            </Typography.Title>
            <Typography.Paragraph>
              Check your listening stats, generate custom-made playlists, or
              explore Spotify's database in detail!
            </Typography.Paragraph>
            <br /> <br /> <br /> <br /> <br /> <br />
            {/* <Row
            // style={{
            //   width: 480,
            // }}
            > */}
            {!token ? (
              <LoginModal />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '80%',
                }}
              >
                {userProfile.images ? (
                  <>
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
                        title={`@${userProfile.id}`}
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
                    <br />
                    <br />
                    <div
                      style={{
                        display: 'flex',
                        // flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // height: '80%',
                        // alignItems: 'center',
                      }}
                    >
                      <Col span={6}>
                        <Button
                          shape="round"
                          style={{
                            width: 120,
                            height: 40,

                            background: '#1DB954',
                          }}
                          key="/stats"
                          // onClick={goToStatsPage}

                          onClick={() => history.replace(`/${statsPath}`)}
                        >
                          Stats
                        </Button>
                      </Col>
                      <Col span={6}>
                        <Button
                          shape="round"
                          style={{
                            width: 120,
                            height: 40,

                            background: '#1DB954',
                          }}
                          // onClick={goToPlaylistPage}
                          onClick={() => history.replace(`/${playlistPath}`)}
                          key="/playlist"
                        >
                          Playlist
                        </Button>
                      </Col>

                      <Col span={6}>
                        <Button
                          shape="round"
                          style={{
                            width: 120,
                            height: 40,

                            background: '#1DB954',
                          }}
                          key="/stats"
                          // onClick={goToStatsPage}

                          onClick={() => history.replace(`/explore`)}
                        >
                          Explore
                        </Button>
                      </Col>
                      <Col span={6}>
                        <Button
                          shape="round"
                          style={{
                            width: 120,
                            height: 40,

                            background: '#1DB954',
                          }}
                          key="/stats"
                          // onClick={goToStatsPage}

                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </Col>
                    </div>
                    <br /> <br /> <br />
                    xs
                  </>
                ) : (
                  <>
                    <Empty description="" />{' '}
                    <Button
                      shape="round"
                      style={{
                        width: 120,
                        height: 40,

                        background: '#1DB954',
                      }}
                      key="logi"
                      // onClick={goToStatsPage}
                      href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
                    >
                      Login
                    </Button>
                    {/* <Button
                      shape="round"
                      style={{
                        width: 120,
                        height: 40,

                        background: '#1DB954',
                      }}
                      key="logi"
                      onClick={logout}
                      // href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
                    >
                      Logout
                    </Button> */}
                  </>
                )}
              </div>
            )}
          </Content>
        </Layout>
      </header>
    </div>
  );
}
export default withRouter(StartPage);
