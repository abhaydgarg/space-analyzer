import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleOrdinal, schemePaired } from 'd3';
import prettyBytes from 'pretty-bytes';

export default class Chart extends Component {
  static propTypes = {
    chart: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount () {
    const chartRef = this.chartRef.current;
    const color = scaleOrdinal(schemePaired);
    this.props.chart
      .minSegmentWidth(0.8)
      .orientation('bu')
      .width(chartRef.clientWidth)
      .height(chartRef.clientHeight)
      .sort((a, b) => b.value - a.value) // sort descending by size
      .label('name')
      .size('size')
      .color(d => color(d.name))
      // .color((d, parent) => color(parent ? parent.data.name : null))
      .tooltipContent((d, node) => {
        return (
          `<b class='txt-primary'>KIND:</b> <span>${d.kind}</span><br/>
           <b class='txt-primary'>NAME:</b> <span>${d.name}</span><br/>
           <b class='txt-primary'>SIZE:</b> <span>${prettyBytes(d.size)}</span><br/>
           <span class='txt-muted txt-sm'>${d.path}</span>`
        );
      })(chartRef);
  }

  render () {
    return <div className='chart' ref={this.chartRef} />;
  }
}
