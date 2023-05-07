import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Image,
  List,
  Menu,
  Modal,
  Progress,
  Rate,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import SpotifyLogoBlack from '../../images/spotify-logo.png';
import { Header } from 'antd/es/layout/layout';
import { withRouter } from 'react-router-dom';
import './styles.css';
function SpotifyHeader(props) {
  const CLIENT_ID = '921b749a90e640a1bdd1ce31c4abda39';
  const REDIRECT_URI = 'http://localhost:3000/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPE = 'user-top-read';

  return (
    <Header
      style={{
        // position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        height: 96,
        color: '#191414',
      }}
    >
      <Row>
        {/* <Space size={'large'}> */}
        <Typography.Title style={{ color: '#1DB954' }}>
          Spotify Top 99
        </Typography.Title>
        <Button
          className="custom-button-hover"
          style={{
            marginTop: '22px',
            color: '#1DB954',
            // borderColor: '#1DB954',
            // backgroundColor: '#191414',
          }}
          size="large"
          shape="round"
          onClick={() => props.history.replace(`/`)}
        >
          Home
        </Button>
        <Button
          className="custom-button-hover"
          style={{
            marginTop: '22px',
            color: '#1DB954',
            // borderColor: '#1DB954',
            // backgroundColor: '#191414',
          }}
          size="large"
          shape="round"
          onClick={() => props.history.replace(`/stats`)}
        >
          Stats
        </Button>{' '}
        <Button
          className="custom-button-hover"
          style={{
            marginTop: '22px',
            color: '#1DB954',
            // borderColor: '#1DB954',
            // backgroundColor: '#191414',
          }}
          size="large"
          shape="round"
          onClick={() => props.history.replace(`/playlist`)}
        >
          Playlist
        </Button>
        <Button
          className="custom-button-hover"
          style={{
            marginTop: '22px',
            color: '#1DB954',
            // borderColor: '#1DB954',
            // backgroundColor: '#191414',
          }}
          size="large"
          shape="round"
          onClick={() => props.history.replace(`/explore`)}
        >
          Explore
        </Button>
        {/* {props.token ? (
            <Button
              // icon={}
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
              onClick={props.logout}
            >
              Logout
            </Button>
          )} */}
        {/* </Space> */}
      </Row>
    </Header>
  );
}
export default withRouter(SpotifyHeader);
