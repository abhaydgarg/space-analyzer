import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import prettyBytes from 'pretty-bytes';

import Helper from '../../Helper';

export default class Chart extends Component {
  static propTypes = {
    rendered: PropTypes.bool.isRequired,
    rawData: PropTypes.object.isRequired,
    getChartInstance: PropTypes.func.isRequired,
    handleNode: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.chartRef = React.createRef();
    this.chart = null;
  }

  componentDidMount () {
    this.chart = this.chartRef.current.getEchartsInstance();
    this.props.getChartInstance(this.chart);
  }

  shouldComponentUpdate (nextProps, nextState) {
    // Render Chart once with raw data.
    if (nextProps.rendered === true) {
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
        width: '100%',
        height: '100%',
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
    return (
      <div className='chart animated bounce'>
        <ReactEcharts
          theme='light'
          notMerge
          ref={this.chartRef}
          option={this.getOption()}
          style={{ height: '100%', width: '100%' }}
          onEvents={{
            'click': this.handleClick
          }}
        />
      </div>
    );
  }
}
