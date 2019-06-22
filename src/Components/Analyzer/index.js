import { Component } from 'react';
import PropTypes from 'prop-types';
import Icicle from 'icicle-chart';

import Breadcrumb from './Breadcrumb';
import Chart from './Chart';
import List from './List';

export default class Analyzer extends Component {
  constructor (props) {
    super(props);
    // Create chart instance.
    // We use data in other comps after
    // it is passed through chart comp.
    this.chart = Icicle().data(this.props.data).onClick(this.handleChart);
    this.state = {
      // chartKey: 0,
      node: this.chart.data()
    };
  }

  // componentDidMount () {
  //   // HACK: To remount Chart component
  //   // when window resizes. `Icicle` API
  //   // does not provide any method to redraw
  //   // chart when window resizes.
  //   window.addEventListener('resize', () => {
  //     this.setState({
  //       chartKey: Math.floor(Math.random() * 6) + 1
  //     });
  //   });
  // }

  // componentWillUnmount () {
  //   window.removeEventListener('resize', () => console.log('Resize event has removed'));
  // }

  shouldComponentUpdate (nextProps, nextState) {
    // Do not update if node is same.
    if (this.state.node === nextState.node) {
      return false;
    }
    return true;
  }

  handleChart = (node) => {
    // node is null when chart is
    // reset to initial state.
    if (node !== null) {
      this.chart.zoomToNode(node);
      if (node.kind === 'File') {
        // Send parent dir which contain the file.
        this.setState({
          node: node.__dataNode.parent.data
        });
      } else {
        // Send current dir.
        this.setState({
          node: node
        });
      }
    } else {
      this.chart.zoomReset();
      // Set back to initial state.
      this.setState({
        node: this.props.data
      });
    }
  }

  handleNode = (node) => {
    if (node.kind === 'Directory') {
      this.setState({
        node: node
      });
    }
    if (node.size > 0) {
      this.chart.zoomToNode(node);
    }
  }

  render () {
    return (
      <div className='analyzer-container animated fadeIn slow'>
        <Breadcrumb
          node={this.state.node}
          handleNode={this.handleNode}
        />
        <div className='content'>
          <Chart
            // key={this.state.chartKey}
            chart={this.chart}
          />
          <List
            node={this.state.node}
            handleNode={this.handleNode}
          />
        </div>
      </div>
    );
  }
}

Analyzer.propTypes = {
  data: PropTypes.object.isRequired
};
