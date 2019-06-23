import React, { Component } from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

import './App.css';

import data from './data';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
    this.state = {
      rendering: true
    }
  }

  getOption = () => {
    const option = {
      textStyle: {
        fontFamily: 'Iceberg',
        fontSize: 12,
        color: '#f5f5f5'
      },
      tooltip: {
        formatter: function (info) {
          var value = info.value;
          var treePathInfo = info.treePathInfo;
          var treePath = [];

          for (var i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name);
          }
          return [
            '<div class="tooltip-title">' + echarts.format.encodeHTML(treePath.join('/')) + '</div>',
            'Disk Usage: ' + echarts.format.addCommas(value) + ' KB',
          ].join('');
        }
      },
      series: [{
        data: data,
        name: 'space-analyzer',
        type: 'treemap',
        visibleMin: 300,
        breadcrumb: {
          show: true
        },
        label: {
          show: true,
          // Show data `name` property.
          formatter: '{b}',
        },
        upperLabel: {
          normal: {
            show: true,
            height: 30
          }
        },
        itemStyle: {
          normal: {
            borderColor: '#fff'
          }
        },
        levels: [
          {
            itemStyle: {
              normal: {
                borderColor: '#777',
                borderWidth: 0,
                gapWidth: 1
              }
            },
            upperLabel: {
              normal: {
                show: false
              }
            }
          },
          {
            itemStyle: {
              normal: {
                borderColor: '#555',
                borderWidth: 5,
                gapWidth: 1
              },
              emphasis: {
                borderColor: '#ddd'
              }
            }
          },
          {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
              normal: {
                borderWidth: 5,
                gapWidth: 1,
                borderColorSaturation: 0.6
              }
            }
          }
        ]
      }]
    };
    return option;
  }

  handleChartReady = () => {
    this.setState({
      rendering: false
    });
  }

  handleClick = (params, e) => {
    //console.log(params);
  }

  zoomToNode = () => {
    const instance = this.chart.current.getEchartsInstance();

  }

  render() {
    return (
      <div>
        <ReactEcharts
          ref={this.chart}
          option={this.getOption()}
          style={{ height: '500px', width: '100%' }}
          className='treemap-chart'
          notMerge
          showLoading={this.state.rendering}
          hideLoading={this.state.rendering}
          loadingOption={{
            text: '',
            color: '#f5f5f5',
            textColor: '#e0e0e0',
            maskColor: '#303030',
            zlevel: 0
          }}
          onChartReady={this.handleChartReady}
          onEvents={{
            'click': this.handleClick
          }}
        />
      </div>
    );
  }
}
