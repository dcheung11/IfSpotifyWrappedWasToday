import React from 'react';
import {
  Col,
  List,
  Progress,
  Rate,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd';

export default function PopularityList(props) {
  console.log(props);
  // {
  //   "60%": 'yellow',
  //   "100%": '#1DB954',
  // }}

  const getPopularityColour = p => {
    // console.log(p);
    if (p < 45) {
      return 'red';
    } else if (p < 60) {
      return '#FFBF00';
    } else if (p < 80) {
      return;
    } else if (p < 95) {
      return '#9ACD32';
    } else {
      return '#1DB954';
    }
  };

  const shortenString = n => {
    let newN;
    if (n.length > 40) {
      newN = n.slice(0, 25);
      newN += '...';
      return n;
    }
    return n;
  };
  return (
    <List
      size="small"
      header={<h3>{props.header}</h3>}
      // bordered
      dataSource={props.data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={props.getImage(item)}
            title={
              <a href={item.external_urls.spotify} target="_blank">
                {index + 1}. {shortenString(item.name)}
              </a>
            }
            description={
              <Progress
                strokeColor={getPopularityColour(item.popularity)}
                size="small"
                percent={item.popularity}
                format={percent => percent}
              />
            }
          />
        </List.Item>
      )}
    />
  );
}
