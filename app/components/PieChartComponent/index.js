import React, { memo, useEffect, useMemo, useState } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { Card, Collapse, Divider, Empty, Spin, Tag, Tooltip } from 'antd';
import { withRouter } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';

export function PieChartComponent(props) {
  console.log(props);

  const option = {
    backgroundColor: '#FFFFFF',
    title: {
      text: 'Your Most Frequently Appearing Genres',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#191414',
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
        name: 'Genre ',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: props.data.sort(function(a, b) {
          return a.value - b.value;
        }),

        // roseType: 'radius',
        label: {
          color: '#191414',
        },
        labelLine: {
          lineStyle: {
            color: '#191414',
          },
          smooth: 0.2,
          length: 40,
          length2: 70,
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

  return <ReactECharts option={option} style={{ height: '100vh' }} />;
}
