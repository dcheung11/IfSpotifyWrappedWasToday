import {
  Button,
  Card,
  Col,
  Empty,
  Layout,
  List,
  Row,
  Space,
  Typography,
} from 'antd';
import React from 'react';
import messages from './messages';
import { useEffect, useState } from 'react';
import {
  searchArtistsRequest,
  userTopItemsRequest,
} from '../../utils/api/spotifyApi';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { LoginOutlined } from '@ant-design/icons';
import { render } from 'react-testing-library';

export default function HomePage() {
  const CLIENT_ID = '921b749a90e640a1bdd1ce31c4abda39';
  const REDIRECT_URI = 'http://localhost:3000/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPE = 'user-top-read';

  const [token, setToken] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);

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
    topTracks(e);
    topArtists(e);
  };

  const topTracks = async e => {
    e.preventDefault();
    const top = await userTopItemsRequest(token, 'tracks');
    console.log('top', top.items);
    setTracks(top.items);
  };
  const topArtists = async e => {
    e.preventDefault();
    const top = await userTopItemsRequest(token, 'artists');
    console.log('top', top.items);
    setArtists(top.items);
  };

  const renderTracks = () => {
    return tracks.map((track, k) => (
      <div key={track.id}>
        {k + 1 + '. ' + track.name + ' by ' + track.artists[0].name}
      </div>
    ));
  };

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={'100%'} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  return (
    <div>
      <header className="App-header">
        <Layout>
          <Header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: '100%',
              height: 96,
              color: '#191414',
            }}
          >
            <Row>
              <Space size={'large'}>
                <Typography.Title style={{ color: '#1DB954' }}>
                  If Spotify Wrapped Was Today...
                </Typography.Title>
                {!token ? (
                  <Button
                    className="login-button"
                    style={{
                      marginTop: '22px',
                      backgroundColor: '#1DB954',
                      borderColor: '#1DB954',
                      color: '#191414',
                    }}
                    size="large"
                    shape="round"
                    href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
                  >
                    Login to Spotify
                  </Button>
                ) : (
                  <Button
                    className="logout-button"
                    style={{
                      marginTop: '22px',
                      backgroundColor: '#1DB954',
                      borderColor: '#1DB954',
                      color: '#191414',
                    }}
                    size="large"
                    shape="round"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                )}
              </Space>
            </Row>
          </Header>
          <Content
            style={{
              padding: '50px 50px',
            }}
          >
            <Card>
              <div
                style={{
                  height: '10vh',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {!token ? (
                  <Empty
                    image={<LoginOutlined style={{ fontSize: '96px' }} />}
                    // imageStyle={{ height: 60 }}
                    description={
                      <span>
                        <h2>Login to see your Spotify Wrapped!</h2>
                      </span>
                    }
                  />
                ) : (
                  <>
                    <Button
                      style={{
                        alignItems: 'center',
                        height: '75px',
                        width: '75px',
                        backgroundColor: '#1DB954',
                        borderColor: '#1DB954',
                        color: '#191414',
                      }}
                      size="large"
                      shape="circle"
                      onClick={handleGo}
                    >
                      Go!
                    </Button>
                  </>
                )}
              </div>
            </Card>
            {/* {renderArtists()} */}
            <List
              size="small"
              header={<h3>Top Tracks of 2023</h3>}
              bordered
              dataSource={renderTracks()}
              renderItem={(item, index) => <List.Item>{item}</List.Item>}
            />
            <List
              itemLayout="horizontal"
              size="large"
              header={<h3>Top Artists of 2023</h3>}
              bordered
              dataSource={renderArtists()}
              renderItem={(item, index) => <List.Item>{item}</List.Item>}
            />
          </Content>
        </Layout>
      </header>
    </div>
  );
}
