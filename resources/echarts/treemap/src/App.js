import React, { Component, Fragment } from 'react';
import ReactEcharts from 'echarts-for-react';

import './App.css';

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
      // Global textStyle.
      textStyle: {
        fontFamily: 'Iceberg',
        fontSize: 12,
        color: '#f5f5f5'
      },
      tooltip: {
        confine: true,
        backgroundColor: 'rgba(33,33,33, 0.9)',
        textStyle: {
          fontSize: 12
        },
        formatter: function (info) {
          const d = info.data;
          return (
            `<b class='txt-primary'>KIND:</b> <span>${d.kind}</span><br/>
            <b class='txt-primary'>NAME:</b> <span>${d.name}</span><br/>
            <b class='txt-primary'>SIZE:</b> <span>${d.size}</span><br/>
            <span class='txt-muted txt-sm'>${d.path}</span>`
          );
        }
      },
      series: [{
        data: [this.props.data],
        name: 'space-analyzer',
        type: 'treemap',
        visibleMin: 300,
        // colorMappingBy: 'value',
        breadcrumb: {
          show: false
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
            borderColor: '#565656'
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
    setTimeout(() => {
      this.setState({
        rendering: false
      });
    }, 0);
  }

  handleClick = (params, e) => {
    // Send to List and Breadcrumb comps.
    // List comp can simply use `children`
    // property to render items.
    // Breadcrumb has to use `parent` property
    // and backtrack till parent is `null` to
    // list items.

    // console.log(params.data);
  }

  // `id` is a glue among Chart, List and Breadcrumb
  // components.
  handleZoomToNode = (id) => {
    const instance = this.chart.current.getEchartsInstance();
    instance.dispatchAction({
      type: 'highlight',
      id: id
    });
  }

  handleReset = () => {
    const instance = this.chart.current.getEchartsInstance();
    instance.dispatchAction({
      type: 'dataZoom',
      start: 0,
      end: 0
    });

  }

  render() {
    // "root/npm/_cacache/content-v2/sha512/54"
    // id: 9957
    // dataIndex = 9958
    // RESULT: Should see 63 node in center.
    const nodeIdToZoomTo = 9957;
    return (
      <Fragment>
        <div className='demo-links'>
          <span
            className='demo-link-txt'
            onClick={() => this.handleZoomToNode(nodeIdToZoomTo)}
          >
            Zoom to node
          </span>
          <span
            className='demo-link-txt'
            onClick={() => this.handleReset()}
          >
            Reset
          </span>
        </div>
        <ReactEcharts
          notMerge
          ref={this.chart}
          option={this.getOption()}
          style={{ height: '500px', width: '100%' }}
          showLoading={this.state.rendering}
          loadingOption={{
            text: '',
            color: '#f5f5f5',
            textColor: '#f5f5f5',
            maskColor: '#303030',
            zlevel: 0
          }}
          onChartReady={this.handleChartReady}
          onEvents={{
            'click': this.handleClick
          }}
        />
      </Fragment>
    );
  }
}
