import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
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
    target_acousticness: 'Acousticness🎸',
    target_danceability: 'Danceability💃',
    target_energy: 'Energy🔋',
    target_instrumentalness: 'Instrumentalness🎷',
    target_liveness: 'Liveness☀',
    target_loudness: 'Loudness🔊',
    target_popularity: 'Popularity😎',
    target_speechiness: 'Speechiness💬',
    target_tempo: 'Tempo🥁',
    target_valence: 'Valence➕',
  };
  const items = Object.entries(tuners);
  const grid = [];
  const marks = {
    0: '0',
    1: '1',
  };

  for (let i = 0; i < items.length; i += 2) {
    const item1 = items[i];
    const item2 = items[i + 1];
    grid.push(
      <Row key={i}>
        <Col span={1} />
        <Col span={10}>
          <Typography.Text style={{ fontSize: '16px' }}>
            {item1 && <div>{item1[1]}</div>}
          </Typography.Text>
          <Form.Item name={item1[0]}>
            <Slider marks={marks} step={0.01} max={1} defaultValue={0} />
          </Form.Item>
        </Col>
        <Col span={2} />
        <Col span={10}>
          <Typography.Text style={{ fontSize: '16px' }}>
            {item2 && <div>{item2[1]}</div>}
          </Typography.Text>
          <Form.Item name={item2[0]}>
            <Slider marks={marks} step={0.01} max={1} defaultValue={0} />
          </Form.Item>
        </Col>
      </Row>,
    );
  }

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
          2. Adjust Target Tuners from 0-1
        </Typography.Text>
        <br />
        <br />

        {/* {Object.keys(tuners).map(name => {
          return (
            <Col span={12}>
              {tuners[name]}
              <Form.Item name={name}>
                <Slider step={0.01} max={1} defaultValue={0} />
              </Form.Item>
            </Col>
          );
        })} */}
        {grid}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Card>
    </Form>
  );
}
export default withRouter(RecommendationForm);
