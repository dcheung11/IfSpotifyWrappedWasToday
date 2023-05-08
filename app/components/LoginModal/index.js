import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Image,
  List,
  Modal,
  Progress,
  Rate,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import SpotifyLogoBlack from '../../images/spotify-logo.png';

export default function LoginModal(props) {
  const CLIENT_ID = '921b749a90e640a1bdd1ce31c4abda39';
  const REDIRECT_URI = 'https://spotify-top-99.web.app/';

  // const REDIRECT_URI = 'http://localhost:3000/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPE = ['user-top-read', 'playlist-modify-public'];
  // ,user-read-private,user-read-email';

  const [token, setToken] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      // style={{ height: '100vh' }}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Card
        style={{
          height: '45vh',
          color: '#fff',
          // lineHeight: '480px',
          textAlign: 'center',
          background: '#FFFFFF',
        }}
      >
        <List size="small" header={<h2>Login to access your...</h2>}>
          <List.Item style={{ textAlign: 'center' }}>
            {'      '}&#x2022; Top artists, tracks, and genres
          </List.Item>
          <List.Item style={{ textAlign: 'center' }}>
            {'      '}&#x2022; Spotify listening popularity score
          </List.Item>
          <List.Item style={{ textAlign: 'center' }}>
            {'      '}&#x2022; Playlist building tool
          </List.Item>
        </List>

        <Button
          icon={
            <>
              Login to Spotify
              <Image
                src={SpotifyLogoBlack}
                preview={false}
                height="26px"
                width="26px"
              />
            </>
          }
          className="login-button"
          style={{
            marginTop: '22px',
            backgroundColor: 'black',
            borderColor: 'black',
            color: 'white',
          }}
          size="large"
          shape="round"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
        >
          {/* Login */}
        </Button>
      </Card>
    </Modal>
  );
}
