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
      <div className='analyzer-container animated fadeIn slow'>
        {this.state.node !== null &&
          <Breadcrumb
            node={this.state.node}
            handleNode={this.handleNode}
          />
        }
        <div className='content'>
          <Chart
            rawData={this.props.data}
            getChartInstance={this.handleChartInstance}
            handleNode={this.handleNode}
          />
          {this.state.node !== null &&
            <List
              node={this.state.node}
              handleNode={this.handleNode}
            />
          }
        </div>
      </div>
    );
  }
}
