import React from 'react';
import { Alert, Col, List, Row, Skeleton, Statistic, Typography } from 'antd';
import PopularityList from '../PopularityList';
import { PopularityScatter } from '../PopularityScatter';
import SearchArtist from '../SearchArtist';
import SearchTrack from '../SearchTrack';

export default function TrackAnalysisPassport(props) {
  console.log('TrackAnalysisPassport props', props);
  //   const formatter = value => <CountUp end={value} separator="," />;
  const audioFeatures = props.trackAnalysis.audio_features;
  let featureAverages = {
    acousticness: 0,
    danceability: 0,
    energy: 0,
    instrumentalness: 0,
    speechiness: 0,
    tempo: 0,
    valence: 0,
    duration_ms: 0,
  };

  (audioFeatures ? audioFeatures : []).forEach(track => {
    Object.keys(featureAverages).forEach(feature => {
      featureAverages[feature] += track[feature] / audioFeatures.length;
    });
  });
  console.log('f a,', featureAverages);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography.Title style={{fontSize: 24}}>Your Track Averages</Typography.Title>
      <Typography.Paragraph>
        Check your listening analysis breakdown and your mainstream and niche tracks and artists!
      </Typography.Paragraph>
      <Row gutter={[16, 40]}>
        <Col span={6}>
          <Statistic
            title="Acousticness"
            value={featureAverages.acousticness.toFixed(2)}
          />
          {/* <Alert message="Success Text" type="success" /> */}
        </Col>
        <Col span={6}>
          <Statistic
            title="Danceability"
            value={featureAverages.danceability.toFixed(2)}
          />
        </Col>
        <Col span={6}>
          <Statistic title="Energy" value={featureAverages.energy.toFixed(2)} />
        </Col>
        <Col span={6}>
          <Statistic
            title="Instrumentalness"
            value={featureAverages.instrumentalness.toFixed(2)}
          />
        </Col>
      </Row>
      <Row gutter={[16, 40]}>
        <Col span={6}>
          <Statistic
            title="Speechiness"
            value={featureAverages.speechiness.toFixed(2)}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Tempo (BPM)"
            value={featureAverages.tempo.toFixed(2)}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Valence"
            value={featureAverages.valence.toFixed(2)}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Duration (s)"
            value={millisToMinutesAndSeconds(featureAverages.duration_ms)}
          />
        </Col>
      </Row>
      <br />
      <br />
    </div>
  );
}
