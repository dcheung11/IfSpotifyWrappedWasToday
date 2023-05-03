import React from 'react';
import { List, Skeleton } from 'antd';

export default function PopularityList(props) {

    
  return (
    <List
      pagination
      size="small"
      header={<h3>Top {props.itemType} of 2023</h3>}
      bordered
      dataSource={props.renderItem}
      renderItem={(item, index) => <List.Item>{item}</List.Item>}
    />
  );
}
