import { Card, Collapse, Descriptions, Empty, Image, List, Space } from 'antd';
import React, { useEffect, useState } from 'react';

export default function TrackProfile(props) {
  console.log(props);
  function filterSpotifyTuningValues(obj) {
    const tuningValues = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'loudness',
      'speechiness',
      'tempo',
      'valence',
    ];
    const filteredObj = {};
    Object.keys(obj).forEach(key => {
      if (tuningValues.includes(key)) {
        filteredObj[key] = obj[key];
      }
    });
    return filteredObj;
  }
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
      {props.track ? (
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
              props.track.album.images[0]
                ? props.track.album.images[0].url
                : null
            }
          />
          <br />
          <br />

          <Descriptions bordered column={1} title={props.track.name}>
            <Descriptions.Item label="Album">
              {props.track.album.name}
            </Descriptions.Item>
            <Descriptions.Item label="Artists">
              {props.track.artists.map(a => a.name).join(', ')}
            </Descriptions.Item>
            <Descriptions.Item label="Popularity">
              {props.track.popularity}
            </Descriptions.Item>
          </Descriptions>
          {props.trackFeatures || props.recommendations ? (
            <Collapse bordered={false}>
              {props.trackFeatures ? (
                <Collapse.Panel header="Track Features" key="1">
                  <List
                    grid={{ column: 3 }}
                    dataSource={Object.entries(
                      filterSpotifyTuningValues(
                        props.trackFeatures.audio_features[0],
                      ),
                    )}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          title={<h2 style={{ fontSize: 12 }}>{item[0]}</h2>}
                          description={item[1].toFixed(2)}
                        />
                      </List.Item>
                    )}
                  />
                </Collapse.Panel>
              ) : null}
              {props.recommendations ? (
                <Collapse.Panel header="Songs You Might Also Enjoy... " key="2">
                  <List
                    grid={{ column: 3 }}
                    dataSource={props.recommendations.tracks}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <a
                              href={
                                item.external_urls
                                  ? item.external_urls.spotify
                                  : null
                              }
                              target="_blank"
                            >
                              <h2 style={{ fontSize: 12 }}>{item.name}</h2>
                            </a>
                          }
                          description={item.artists.map(a => a.name).join(', ')}
                        />
                        <a />
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
        <Card style={{ width: 640 }}>
          <Empty description="Search for a Track" />
        </Card>
      )}
    </div>
  );
}
