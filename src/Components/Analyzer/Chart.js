import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import prettyBytes from 'pretty-bytes';

import Helper from '../../Helper';

export default class Chart extends Component {
  static propTypes = {
    rawData: PropTypes.object.isRequired,
    getChartInstance: PropTypes.func.isRequired,
    handleNode: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.chartContainerRef = React.createRef();
    this.chartRef = React.createRef();
    this.chart = null;
    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    this.chart = this.chartRef.current.getEchartsInstance();
  }

  shouldComponentUpdate (nextProps, nextState) {
    // Render Chart once with raw data and use
    // the processed data afterward.
    // Chart update in click on its own.
    if (this.state.rendered === true) {
      return false;
    }
    return true;
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
            <b class='txt-primary'>SIZE:</b> <span>${prettyBytes(d.size)}</span><br/>
            <span class='txt-muted txt-sm'>${d.path}</span>`
          );
        }
      },
      series: [{
        data: [this.props.rawData],
        name: 'space-analyzer',
        type: 'treemap',
        visibleMin: 300,
        width: '95%',
        height: '90%',
        left: 'left',
        top: 'top',
        // colorMappingBy: 'value',
        breadcrumb: {
          show: false
        },
        label: {
          show: true,
          // Show data `name`
          // property.
          formatter: '{b}'
        },
        upperLabel: {
          normal: {
            show: true,
            height: 30
          }
        },
        itemStyle: {
          normal: {
            borderColor: '#959595'
          }
        },
        levels: [
          {
            itemStyle: {
              normal: {
                borderColor: 'transparent',
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
                borderColor: '#b2a429',
                borderWidth: 5,
                gapWidth: 1
              },
              emphasis: {
                borderColor: '#ffeb3b'
              }
            },
            upperLabel: {
              emphasis: {
                color: '#212121'
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

  // handleReset = () => {
  //   this.chart.dispatchAction({
  //     type: 'dataZoom',
  //     start: 0,
  //     end: 0
  //   });
  // }

  handleChartReady = () => {
    this.setState({
      rendered: true
    }, () => {
      // Send chart instance.
      this.props.getChartInstance(this.chart);
    });
  }

  handleClick = (params, e) => {
    let rootNode = Helper.getRootNode(e);
    if (params.data.kind === 'File') {
      // Send parent which contain the file.
      this.props.handleNode(rootNode.getNodeById(params.data.parent));
    } else {
      // Send current dir.
      this.props.handleNode(rootNode.getNodeById(params.data.id));
    }
  }

  render () {
    const height = !this.chartContainerRef.current ? '500px' : `${this.chartContainerRef.current.clientHeight}px`;
    return (
      <div className='chart' ref={this.chartContainerRef}>
        <ReactEcharts
          theme='light'
          notMerge
          ref={this.chartRef}
          option={this.getOption()}
          style={{ height: height, width: '100%' }}
          showLoading={!this.state.rendered}
          onChartReady={this.handleChartReady}
          onEvents={{
            'click': this.handleClick
          }}
          loadingOption={{
            text: '',
            color: '#f5f5f5',
            textColor: '#f5f5f5',
            maskColor: '#303030',
            zlevel: 0
          }}
        />
      </div>
    );
  }
}
