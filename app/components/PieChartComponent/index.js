import React, { memo, useEffect, useMemo, useState } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { Card, Collapse, Divider, Empty, Spin, Tag, Tooltip } from 'antd';
import { withRouter } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';

export function PieChartComponent(props) {
  console.log(props);

  const option = {
    backgroundColor: '#2c343c',
    title: {
      text: 'Your Most Frequently Appearing Genres',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    visualMap: {
      show: false,
      min: -20,
      max: 100,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: props.data,
        // data: [
        //   { value: 300, name: 'rap' },
        //   { value: 310, name: 'trap' },
        //   { value: 274, name: 'melodic Ads' },
        //   { value: 235, name: 'hip Ads' },
        //   { value: 150, name: 'Search Engine' },
        // ].sort(function(a, b) {
        //   return a.value - b.value;
        // }),
        // roseType: 'radius',
        label: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        itemStyle: {
          color: '#1DB954',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function(idx) {
          return Math.random() * 200;
        },
      },
    ],
  };

  return <ReactECharts option={option} />;
}
