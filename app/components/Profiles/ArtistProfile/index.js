import {
  Card,
  Col,
  Collapse,
  Descriptions,
  Empty,
  Image,
  List,
  Space,
} from 'antd';
import React, { useEffect, useState } from 'react';

export default function ArtistProfile(props) {
  console.log(props);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {props.artist ? (
        // <Col span={6}>
        // <Card>
        <Card style={{ width: 640 }}>
          {/* <Space
            direction="vertical"
            style={{ width: '100%', justifyContent: 'center' }}
          > */}
          <Image
            //   height={480}
            //   width={480}
            preview={false}
            src={
              props.artist.artists[0].images[0]
                ? props.artist.artists[0].images[0].url
                : null
            }
          />
          <br />
          <br />
          <Descriptions
            bordered
            column={1}
            title={props.artist.artists[0].name}
          >
            <Descriptions.Item label="Followers">
              {props.artist.artists[0].followers.total.toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Genres">
              {props.artist.artists[0].genres.join(', ')}
            </Descriptions.Item>
            <Descriptions.Item label="Popularity">
              {props.artist.artists[0].popularity}
            </Descriptions.Item>
          </Descriptions>
          {props.relatedArtists.artists || props.artistTopTracks.tracks ? (
            <Collapse bordered={false}>
              {props.artistTopTracks.tracks ? (
                <Collapse.Panel header="Top Songs" key="1">
                  <List
                    grid={{ column: 3 }}
                    dataSource={props.artistTopTracks.tracks.slice(0, 9)}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <a
                              href={item.external_urls.spotify}
                              target="_blank"
                            >
                              {item.name}
                            </a>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Collapse.Panel>
              ) : null}
              {props.relatedArtists.artists ? (
                <Collapse.Panel header="Related Artists" key="2">
                  <List
                    grid={{ column: 3 }}
                    dataSource={props.relatedArtists.artists.slice(8)}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <a
                              href={item.external_urls.spotify}
                              target="_blank"
                            >
                              {item.name}
                            </a>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Collapse.Panel>
              ) : null}
            </Collapse>
          ) : null}
          {/* </Space> */}
        </Card>
      ) : (
        // </Col>
        // <Col span={6}>
        <Card style={{ width: 640 }}>
          <Empty description="Search for an Artist" />
        </Card>
        // </Col>
      )}
    </div>
  );
}
