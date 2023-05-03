import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  Empty,
  Layout,
  List,
  Menu,
  Radio,
  Row,
  Space,
  Tabs,
  Typography,
} from 'antd';
import React from 'react';
import messages from './messages';
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
import { Helmet } from 'react-helmet';
import { capitalizeFirstLetters, toCamelCase } from '../../utils/transformers';
import PopularityList from '../../components/PopularityList';
const contentStyle = {
  height: '100vh',
  color: '#fff',
  // lineHeight: '480px',
  // textAlign: 'center',
  // background: '#1DB954',
  background: '#FFFFFF',
  // background: '#2c343c',
};

export default function HomePage() {
  const CLIENT_ID = '921b749a90e640a1bdd1ce31c4abda39';
  const REDIRECT_URI = 'http://localhost:3000/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPE = 'user-top-read';
  // ,user-read-private,user-read-email';

  const [token, setToken] = useState('');
  const [searchKey, setSearchKey] = useState('');
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

  // useEffect(() => {

  //     const profile = getUser(token);
  //     console.log(profile); // Profile data logs to console

  // }, [token]);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  const handleGo = e => {
    console.log(e);
    topTracks(e);
    topArtists(e);
  };

  // const getArtist = async id => {
  //   // e.preventDefault();
  //   const artist = await getArtist(token, id);
  //   return artist;
  // };

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

  useEffect(() => {
    let genreCount = {};
    artists.forEach(artist => {
      artist.genres.forEach(genre => {
        genreCount[genre] = (!!genreCount[genre] && genreCount[genre] + 1) || 1;
      });
    });
    let genreCountNew = []; // initialize an empty array to hold the transformed data

    for (const [genre, count] of Object.entries(genreCount)) {
      genreCountNew.push({ name: genre, value: count });
    }
    // tracks.forEach(track => {
    //   track.artists.forEach(artist => {
    //     // let genres = getArtist(artist.id);
    //     // console.log(genres);
    //   });
    // });
    console.log(genreCount);
    setGenres(genreCountNew);
  }, [artists, tracks]);

  const getTrackDescription = m => {
    let description;
    if (m.artists.length === 1) {
      description = m.artists[0].name;
    } else {
      description = m.artists[0].name + ' with ';
      for (let i = 1; i < m.artists.length; i++) {
        description += m.artists[i].name;
        // If this is not the last artist, add a comma and space
        if (i < m.artists.length - 1) {
          description += ', ';
        }
      }
    }
    return <h3>{description}</h3>;
  };
  const getTrackImage = m => {
    return !!m.album.images && m.album.images.length ? (
      <Avatar
        size={{
          xs: 24,
          sm: 32,
          md: 64,
          lg: 80,
          xl: 120,
          xxl: 140,
        }}
        width={'100%'}
        src={m.album.images[0].url}
        shape="square"
      />
    ) : (
      <div>No Image</div>
    );
  };

  const getArtistDescription = m => {
    let description = '';
    for (let i = 0; i < m.genres.length; i++) {
      description += m.genres[i];
      // If this is not the last artist, add a comma and space
      if (i < m.genres.length - 1) {
        description += ', ';
      }
    }
    return <h3>{capitalizeFirstLetters(description)}</h3>;
  };

  const getArtistImage = m => {
    return !!m.images && m.images.length ? (
      <Avatar
        size={{
          xs: 24,
          sm: 32,
          md: 64,
          lg: 80,
          xl: 120,
          xxl: 140,
        }}
        width={'100%'}
        src={m.images[0].url}
      />
    ) : (
      <div>No Image</div>
    );
  };

  const menu = [
    { key: 0, label: 'Spotfiy Wrapped Mini' },
    { key: 1, label: 'Playlist Wizard' },
  ];

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
                <Menu
                  // style={{ height: 'flex' }}
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  items={menu}
                />
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
              ...contentStyle,
            }}
          >
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
                <div style={{ textAlign: 'center' }}>
                  <Radio.Group onChange={handleGo} defaultValue="medium_term">
                    {/* <Space direction="vertical"> */}
                    <Radio.Button value="short_term">1 month</Radio.Button>
                    <Radio.Button value="medium_term">6 month</Radio.Button>
                    <Radio.Button value="long_term">All time</Radio.Button>
                    {/* </Space> */}
                  </Radio.Group>
                </div>
              )}
            </div>
            <Tabs
              tabBarStyle={{}}
              centered
              defaultActiveKey="1"
              type="card"
              size="large"
              items={[
                {
                  label: `Top Tracks`,
                  key: '1',
                  children: (
                    <div>
                      {/* <h3 style={contentStyle}> */}
                      <TopItemsList
                        itemType="Tracks"
                        // renderItem={renderTracks()}
                        data={tracks}
                        getDescription={getTrackDescription}
                        getImage={getTrackImage}
                      />
                      {/* </h3> */}
                    </div>
                  ),
                },
                {
                  label: 'Top Artists',
                  key: '2',
                  children: (
                    <div>
                      {/* <h3 style={contentStyle}> */}
                      <TopItemsList
                        itemType="Artists"
                        // renderItem={renderTracks()}
                        data={artists}
                        getDescription={getArtistDescription}
                        getImage={getArtistImage}
                      />
                      {/* </h3> */}
                    </div>
                    // <div>
                    //   {/* <h3 style={contentStyle}> */}
                    //   <List
                    //     pagination
                    //     size="small"
                    //     header={<h3>Top a of 2023</h3>}
                    //     bordered
                    //     dataSource={renderArtists()}
                    //     renderItem={(item, index) => (
                    //       <List.Item>
                    //         <div key={index}>
                    //           <Row>
                    //             <List.Item.Meta
                    //               avatar={item.avatar}
                    //               // title={item.name}
                    //               // description={item.name}
                    //             />
                    //             {index + 1} . {item.name}
                    //           </Row>
                    //         </div>
                    //       </List.Item>
                    //     )}
                    //   />
                    //   {/* </h3> */}
                    // </div>
                  ),
                },
                {
                  label: 'Top Genres',
                  key: '3',
                  children: (
                    <div>
                      <PieChartComponent
                        data={genres
                          .sort(function(a, b) {
                            return a.value - b.value;
                          })
                          .slice(genres.length - 10, genres.length)}
                      />
                    </div>
                  ),
                },
                {
                  label: 'Popularity',
                  key: '4',
                  children: (
                    <div>
                      <PopularityList />
                    </div>
                  ),
                },
              ]}
            />
          </Content>
        </Layout>
      </header>
    </div>
  );
}
