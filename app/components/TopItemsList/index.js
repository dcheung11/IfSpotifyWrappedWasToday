import React from 'react';
import { Avatar, Empty, List, Pagination, Skeleton } from 'antd';

// const paginationProps = {
//   showSizeChanger: true,
//   showQuickJumper: true,
//   pageSize: 33,
//   count: 3,
//   total: 99,
//   // current: this.state.current,
//   onChange: (page, pageSize) => {
//     console.log(page);
//     // this.setState({
//     //   current: page,
//     // });
//     // this.props.dispatch({
//     //   type: 'list/fetch',
//     //   payload: {
//     //     count: 5,
//     //     page,
//     //     pageSize,
//     //   },
//     // });
//   },
// };
export default function TopItemsList(props) {
  console.log(props);
  return (
    <List
      // pagination={paginationProps}
      size="small"
      grid={{ column: 3 }}
      // header={<h2 style={{alignText: "center"}}>Top {props.itemType} of 2023</h2>}
      // bordered
      dataSource={props.data}
      renderItem={(m, k) => (
        <List.Item>
          <List.Item.Meta
            avatar={props.getImage(m)}
            title={
              <a href={m.external_urls.spotify} target="_blank">
                <h2>
                  {k + 1}. {m.name}
                </h2>
              </a>
            }
            description={props.getDescription(m)}
          />
        </List.Item>
      )}
    />
  );
}
