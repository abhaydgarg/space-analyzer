import { Component } from 'react';
import PropTypes from 'prop-types';

import Helper from '../../Helper';
import Breadcrumb from './Breadcrumb';
import Chart from './Chart';
import List from './List';

export default class Analyzer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.chartInstance = null;
    this.state = {
      isChartRendered: false,
      node: null
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    // Do not update if node is same.
    if (this.state.node === nextState.node) {
      return false;
    }
    return true;
  }

  handleChartInstance = (chartInstance) => {
    this.chartInstance = chartInstance;
    // Get processed data from Echarts.
    const rootNode = Helper.getRootNode(this.chartInstance);
    this.setState({
      isChartRendered: true,
      node: rootNode
    });
  }

  handleNode = (node) => {
    const data = Helper.getData(node);
    if (data.kind === 'Directory') {
      this.setState({
        node: node
      });
    }
    this.chartInstance.dispatchAction({
      type: 'highlight',
      node: node
    });
  }

  render () {
    return (
      <div className='analyzer'>
        <div className='analyzer__breadcrumb'>
          {this.state.node !== null &&
            <Breadcrumb
              node={this.state.node}
              handleNode={this.handleNode}
            />
          }
        </div>
        <div className='analyzer__main'>
          <div className='analyzer__chart animated bounce'>
            <Chart
              rendered={this.state.isChartRendered}
              rawData={this.props.data}
              getChartInstance={this.handleChartInstance}
              handleNode={this.handleNode}
            />
          </div>
          <div className='analyzer__list'>
            {this.state.node !== null &&
              <List
                node={this.state.node}
                handleNode={this.handleNode}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}
