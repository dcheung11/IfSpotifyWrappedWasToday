import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  InputNumber,
  List,
  Menu,
  Modal,
  Progress,
  Rate,
  Row,
  Select,
  Skeleton,
  Slider,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import SpotifyLogoBlack from '../../images/spotify-logo.png';
import { Header } from 'antd/es/layout/layout';
import { withRouter } from 'react-router-dom';
function RecommendationForm(props) {
  const CLIENT_ID = '921b749a90e640a1bdd1ce31c4abda39';
  const REDIRECT_URI = 'http://localhost:3000/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPE = 'user-top-read';

  const tuners = {
    acousticness: ['Acousticness🎸', 1],
    danceability: ['Danceability💃', 1],
    energy: ['Energy🔋', 1],
    instrumentalness: ['Instrumentalness🎷', 1],
    // liveness: ['Liveness☀', 1],
    // loudness: ['Loudness🔊', 1],
    popularity: ['Popularity😎', 100],
    speechiness: ['Speechiness💬', 1],
    tempo: ['Tempo🥁', 200],
    valence: ['Valence➕', 1],
  };
  const tunersDescriptions = {
    acousticness:
      'A confidence measure from 0.0 to 1.0 of whether the track is acoustic.',
    danceability:
      'Describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.',
    energy:
      'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.',
    instrumentalness:
      'Predicts whether a track contains no vocals. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content.',
    popularity:
      'The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.',
    speechiness: 'Speechiness detects the presence of spoken words in a track.',
    tempo:
      'Overall estimated tempo of a track in beats per minute (BPM). Tempo is the speed or pace of a given piece.',
    valence:
      'Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).',
  };
  const items = Object.entries(tuners);
  const grid = [];

  for (let i = 0; i < items.length; i += 2) {
    const item1 = items[i];
    const item2 = items[i + 1];
    const max1 = item1[1][1];
    const max2 = item2[1][1];
    const marks1 = {
      0: '0',
      [max1]: String(max1),
    };
    const marks2 = {
      0: '0',
      [max2]: String(max2),
    };

    grid.push(
      <Row key={i}>
        <Col span={1} />
        <Col span={10}>
          <Tooltip title={tunersDescriptions[item1[0]]}>
            <Typography.Text style={{ fontSize: '16px' }}>
              {item1 && <div>{item1[1][0]}</div>}
            </Typography.Text>

            <Form.Item name={item1[0]}>
              <Slider
                range={{
                  draggableTrack: true,
                }}
                marks={marks1}
                max={item1[1][1]}
                step={item1[1][1] / 100}
                defaultValue={[0, max1]}
              />
            </Form.Item>
          </Tooltip>
        </Col>
        <Col span={2} />
        <Col span={10}>
          <Tooltip title={tunersDescriptions[item2[0]]}>
            <Typography.Text style={{ fontSize: '16px' }}>
              {item2 && <div>{item2[1][0]}</div>}
            </Typography.Text>

            <Form.Item name={item2[0]}>
              <Slider
                range={{
                  draggableTrack: true,
                }}
                marks={marks2}
                step={item2[1][1] / 100}
                max={item2[1][1]}
                defaultValue={[0, max2]}
              />
            </Form.Item>
          </Tooltip>
        </Col>
      </Row>,
    );
  }

  const handlePlaylistSize = value => {
    console.log('changed', value);
  };

  return (
    <Form
      name="basic"
      style={{
        maxWidth: '100%',
      }}
      //   initialValues={{
      //     remember: true,
      //   }}

      onFinish={props.onFinish}
      onFinishFailed={props.onFinish}
      //   onFinishFailed={onFinishFailed}
      autoComplete="off"
      //   validateMessages={'Must >5'}
    >
      <Card style={{ textAlign: 'center' }}>
        <Typography.Title>Playlist Wizard</Typography.Title>
        <Typography.Text style={{ fontSize: '20px' }}>
          1. Choose a combination of 5 artists, tracks, and genres
        </Typography.Text>
        <br />
        <br />
        <Row>
          <Col span={1} />

          <Col span={6}>
            <Typography.Text style={{ fontSize: '16px' }}>
              Artists
            </Typography.Text>
            <Form.Item name="seed_artists">
              <Select
                mode="multiple"
                closable
                // disabled={
                //   artistsSelected + genresSelected + tracksSelected >= 5
                // }
                style={{
                  width: '100%',
                }}
                placeholder="Please select"
                //   defaultValue={}
                options={props.artists.map(a => {
                  return {
                    label: a.name,
                    value: a.id,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col span={2} />

          <Col span={6}>
            <Typography.Text style={{ fontSize: '16px' }}>
              Genres
            </Typography.Text>
            <Form.Item name="seed_genres">
              <Select
                mode="multiple"
                closable
                // disabled={
                //   artistsSelected + genresSelected + tracksSelected >= 5
                // }
                style={{
                  width: '100%',
                }}
                placeholder="Please select"
                options={props.genres.map(a => {
                  return {
                    label: a,
                    value: a,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col span={2} />
          <Col span={6}>
            <Typography.Text style={{ fontSize: '16px' }}>
              Tracks
            </Typography.Text>

            <Form.Item
              name="seed_tracks"
              //   rules={[
              //     {
              //       validator: (rule, value, callback, ...rest) => {
              //         if (
              //           artistsSelected +
              //             genresSelected +
              //             tracksSelected >
              //           5
              //         ) {
              //           value.pop();
              //           message('No more then two members are allowed.');
              //         }
              //       },
              //       message:
              //         'Up to 5 seed values may be provided in any combination of seed_artists, seed_tracks and seed_genres.',
              //     },
              //   ]}
            >
              <Select
                mode="multiple"
                closable
                // disabled={
                //   artistsSelected + genresSelected + tracksSelected >= 5
                // }
                style={{
                  width: '100%',
                }}
                placeholder="Please select"
                //   defaultValue={}
                options={props.tracks.map(a => {
                  return {
                    label: a.name,
                    value: a.id,
                  };
                })}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card style={{ textAlign: 'center' }}>
        <Typography.Text style={{ fontSize: '20px' }}>
          2. Get more specific tracks by tuning your playlist!
        </Typography.Text>
        <br />
        <br />

        {grid}
        <Typography.Text style={{ fontSize: '20px' }}>
          3. Set a song limit and get your recommendations!
        </Typography.Text>
        <br />
        <br />

        <InputNumber
          min={1}
          max={50}
          defaultValue={20}
          onChange={props.setPlaylistLimit}
        />
        <br />
        <br />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Get Recommendations
          </Button>
        </Form.Item>
      </Card>
    </Form>
  );
}
export default withRouter(RecommendationForm);
