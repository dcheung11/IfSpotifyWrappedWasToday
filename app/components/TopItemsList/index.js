import React from 'react';
import { Avatar, Empty, List, Pagination, Skeleton } from 'antd';

const paginationProps = {
  showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 5,
  count: 5,
  total: 10,
  // current: this.state.current,
  onChange: (page, pageSize) => {
    console.log(page);
    // this.setState({
    //   current: page,
    // });
    // this.props.dispatch({
    //   type: 'list/fetch',
    //   payload: {
    //     count: 5,
    //     page,
    //     pageSize,
    //   },
    // });
  },
};
export default function TopItemsList(props) {
  console.log(props);

  const getDescription = m => {
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

  return (
    <List
      pagination={paginationProps}
      size="small"
      // header={<h2 style={{alignText: "center"}}>Top {props.itemType} of 2023</h2>}
      // bordered
      // dataSource={props.renderItem}
      // renderItem={(item, index) => <List.Item>{item}</List.Item>}
    >
      {props.data.map((m, k) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                size={{
                  xs: 24,
                  sm: 32,
                  md: 40,
                  lg: 64,
                  xl: 150,
                  xxl: 120,
                }}
                src={m.album.images[0].url}
                shape="square"
              />
            }
            title={
              <a href={m.external_urls.spotify} target="_blank">
                <h2>
                  {k + 1}. {m.name}
                </h2>
              </a>
            }
            description={getDescription(m)}
          />
        </List.Item>
      ))}
    </List>
  );
}
