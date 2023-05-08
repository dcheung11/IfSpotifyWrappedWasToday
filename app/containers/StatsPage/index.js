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
  getArtists,
  getTrackFeatures,
  getUser,
  searchArtistsRequest,
  userTopItemsRequest,
  userTopItemsSecondRequest,
} from '../../utils/api/spotifyApi';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { LoginOutlined } from '@ant-design/icons';
import { render } from 'react-testing-library';
import TopItemsList from '../../components/TopItemsList';
import { PieChartComponent } from '../../components/PieChartComponent';
import { capitalizeFirstLetters, toCamelCase } from '../../utils/transformers';
import PopularityPassport from '../../components/PopularityPassport';
import './styles.css';
import { withRouter } from 'react-router-dom';
import SpotifyHeader from '../../components/SpotifyHeader';
import TrackAnalysisPassport from '../../components/TrackAnalysisPassport';
import { Helmet } from 'react-helmet';
const contentStyle = {
  height: '100vh',
  color: '#fff',
  // lineHeight: '480px',
  // textAlign: 'center',
  // background: '#1DB954',
  background: '#FFFFFF',
  // background: '#2c343c',
};

function StatsPage() {
  const [token, setToken] = useState('');
  const [tracks, setTracks] = useState([]);
  const [trackArtists, setTrackArtists] = useState([]);

  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [timePeriod, setTimePeriod] = useState('long_term');
  const [trackAnalysis, setTrackAnalysis] = useState([]);

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
      topTracks();
      topArtists();
    }
  }, [token]);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  const handleGo = e => {
    setTimePeriod(e.target.value);
    // console.log(e);
    // topTracks(e);
    // topArtists(e);
  };
  useEffect(() => {
    if (token != '') {
      topTracks();
      topArtists();
    }
  }, [timePeriod]);

  const topTracks = async e => {
    if (e) {
      e.preventDefault();
    }
    const topTracks1 = await userTopItemsRequest(token, 'tracks', timePeriod);
    const topTracks2 = await userTopItemsSecondRequest(
      token,
      'tracks',
      timePeriod,
    );

    const topTracks = Array.isArray(topTracks1.items)
      ? topTracks1.items.concat(topTracks2.items)
      : [];
    const myDict = topTracks.reduce((acc, curr, index) => {
      acc[index + 1] = curr;
      return acc;
    }, {});
    // console.log('top99Tracks', myDict);
    setTracks(myDict);
  };

  const topArtists = async e => {
    if (e) {
      e.preventDefault();
    }
    const topArtists1 = await userTopItemsRequest(token, 'artists', timePeriod);
    const topArtists2 = await userTopItemsSecondRequest(
      token,
      'artists',
      timePeriod,
    );
    const topArtists = Array.isArray(topArtists1.items)
      ? topArtists1.items.concat(topArtists2.items)
      : [];

    const myDict = topArtists.reduce((acc, curr, index) => {
      acc[index + 1] = curr;
      return acc;
    }, {});
    // console.log('top99Tracks', myDict);
    setArtists(myDict);
  };

  const trackFeatures = async () => {
    // console.log(tracks);
    const trackIds = Object.values(tracks).map(track => track.id);

    const trackInfo = await getTrackFeatures(token, trackIds);

    setTrackAnalysis(trackInfo);
  };

  const getTrackArtistsGenres = async artistIds => {
    const trackInfo = await getArtists(token, artistIds);
    setTrackArtists(trackInfo);
  };

  useEffect(() => {
    let tempGenres = genres;
    const genreCount = tempGenres.reduce((acc, curr) => {
      acc[curr.name] = curr.value;
      return acc;
    }, {});
    console.log('tr', trackArtists);

    (trackArtists.artists ? trackArtists.artists : []).forEach(artist => {
      artist.genres.forEach(genre => {
        genreCount[genre] = (!!genreCount[genre] && genreCount[genre] + 1) || 1;
      });
    });
    // console.log('genreco', genreCount);
    let genreCountNew = []; // initialize an empty array to hold the transformed data

    for (const [genre, count] of Object.entries(genreCount)) {
      genreCountNew.push({ name: genre, value: count });
    }
    setGenres(genreCountNew);
  }, [trackArtists]);

  useEffect(() => {
    if (tracks != [] && !!tracks) {
      trackFeatures();
    }
    let genreCount = {};
    let trackArtistsSet = [];
    Object.values(tracks).forEach(track => {
      track.artists.forEach(a => {
        trackArtistsSet.push(a.id);
      });
    });
    if (artists != [] && !!artists) {
      getTrackArtistsGenres(trackArtistsSet.slice(0, 49));
    }
    Object.values(artists).forEach(artist => {
      artist.genres.forEach(genre => {
        genreCount[genre] = (!!genreCount[genre] && genreCount[genre] + 1) || 1;
      });
    });

    let genreCountNew = []; // initialize an empty array to hold the transformed data

    for (const [genre, count] of Object.entries(genreCount)) {
      genreCountNew.push({ name: genre, value: count });
    }
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
  const getTrackImage = (m, size) => {
    return !!m.album.images && m.album.images.length ? (
      <Avatar
        size={size}
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

  const getArtistImage = (m, size) => {
    return !!m.images && m.images.length ? (
      <Avatar size={size} width={'100%'} src={m.images[0].url} />
    ) : (
      <div>No Image</div>
    );
  };

  return (
    <div>
      <header className="App-header">
        <Helmet>
          <title>Spotify Top 99 - Stats</title>
        </Helmet>
        <Layout>
          <SpotifyHeader
            token={token}
            // goToHomePage={goToHomePage}
            // goToStatsPage={goToStatsPage}
            // goToPlaylistPage={goToPlaylistPage}
            logout={logout}
          />{' '}
          <Content
            style={{
              padding: '50px 50px',

              ...contentStyle,
            }}
          >
            <Card style={{ textAlign: 'center' }}>
              <Typography.Title>Spotify Top 99 Stats</Typography.Title>
              <Typography.Paragraph>
                Check your listening stats about your top 99 artists and tracks!
              </Typography.Paragraph>
              <br />

              <Radio.Group
                // style={{ backgroundColor: 'black' }}
                className="custom-radio-style"
                buttonStyle="solid"
                size="large"
                onChange={handleGo}
                defaultValue="long_term"
              >
                {/* <Space direction="vertical"> */}
                <Radio.Button
                  style={{
                    backgroundColor:
                      timePeriod == 'short_term' ? '#1DB954' : 'white',
                    color: timePeriod == 'short_term' ? 'black' : '#1DB954',
                    borderColor:
                      timePeriod == 'short_term' ? 'white' : '#1DB954',
                  }}
                  // style={{ backgroundColor: 'black' }}
                  value="short_term"
                >
                  Short Term
                </Radio.Button>
                <Radio.Button
                  style={{
                    backgroundColor:
                      timePeriod == 'medium_term' ? '#1DB954' : 'white',
                    color: timePeriod == 'medium_term' ? 'black' : '#1DB954',
                    borderColor:
                      timePeriod == 'medium_term' ? 'white' : '#1DB954',
                  }}
                  value="medium_term"
                >
                  Medium Term
                </Radio.Button>
                <Radio.Button
                  style={{
                    backgroundColor:
                      timePeriod == 'long_term' ? '#1DB954' : 'white',
                    color: timePeriod == 'long_term' ? 'black' : '#1DB954',
                    borderColor:
                      timePeriod == 'long_term' ? 'white' : '#1DB954',
                  }}
                  value="long_term"
                >
                  Long Term
                </Radio.Button>
              </Radio.Group>
            </Card>
            <br />
            <Tabs
            // tabBarStyle={{
            //   color: '#1DB954',
            //   // backgroundColor:
            //   //   timePeriod == 'long_term' ? '#1DB954' : 'white',
            //   // color: timePeriod == 'long_term' ? 'black' : '#1DB954',
            //   // borderColor: timePeriod == 'long_term' ? 'white' : '#1DB954',
            // }}
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
                    <TopItemsList
                      handleGo={handleGo}
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
                      handleGo={handleGo}
                      itemType="Artists"
                      // renderItem={renderTracks()}
                      data={artists}
                      getDescription={getArtistDescription}
                      getImage={getArtistImage}
                    />
                    {/* </h3> */}
                  </div>
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
                    <TrackAnalysisPassport trackAnalysis={trackAnalysis} />

                    <PopularityPassport
                      tracks={tracks}
                      artists={artists}
                      getArtistImage={getArtistImage}
                      getTrackImage={getTrackImage}
                    />
                  </div>
                ),
              },
              // {
              //   label: 'Analysis',
              //   key: '5',
              //   children: (
              //     <div>
              //       <TrackAnalysisPassport trackAnalysis={trackAnalysis} />
              //     </div>
              //   ),
              // },
            ]}
            />
          </Content>
          {/* <Footer /> */}
        </Layout>
      </header>
    </div>
  );
}
export default withRouter(StatsPage);
