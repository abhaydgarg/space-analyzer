import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFileAlt, faLevelUpAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippy.js/react';
import prettyBytes from 'pretty-bytes';

import Helper from '../../Helper';

const icons = {
  'Directory': faFolder,
  'File': faFileAlt
};

export default class List extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    handleNode: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.listItemsRef = React.createRef();
  }

  componentDidMount () {
    this.listItemsRef.current.addEventListener('animationend', () => {
      this.listItemsRef.current.classList.remove('animated', 'fadeIn');
    });
  }

  componentWillUnmount () {
    this.listItemsRef.current.removeEventListener('animationend', Helper.noop());
  }

  componentDidUpdate () {
    // Play animation whenever comp is updated.
    this.listItemsRef.current.classList.add('animated', 'fadeIn');
  }

  handleNode = (node) => {
    this.props.handleNode(node);
  }

  handleLevelUp = () => {
    // If node's parent is not a root node.
    // `space-analyzer` has dataIndex = 0
    if (this.props.node.parentNode.dataIndex !== 0) {
      this.props.handleNode(this.props.node.parentNode);
    }
  }

  handleTooltipShow = (instance) => {
    if (instance.shouldBeShown !== true) {
      return false;
    }
    // Reset for not showing without
    // pressing ctrl key.
    instance.shouldBeShown = undefined;
  }

  handleTooltipTrigger = (instance, e) => {
    // Hack: Append custom property to instance
    // which tells if tooltip should be shown.
    if (e.ctrlKey === true) {
      instance.shouldBeShown = true;
    }
  }

  getTooltipContent = (d) => {
    return (
      <Fragment>
        <b className='txt-primary'>KIND:</b> <span>{d.kind}</span><br />
        <b className='txt-primary'>NAME:</b> <span>{d.name}</span><br />
        <b className='txt-primary'>SIZE:</b> <span>{prettyBytes(d.size)}</span><br />
        <span className='txt-muted txt-sm'>{d.path}</span>
      </Fragment>
    );
  }

  renderRoot = () => {
    return (
      <div className='item root'>
        <span className='name'>{this.props.node.name}</span>
        <span className='size'>{prettyBytes(this.props.node.getValue())}</span>
      </div>
    );
  }

  renderLevelUp = () => {
    return (
      <div className='item level-up' onClick={this.handleLevelUp}>
        <FontAwesomeIcon icon={faLevelUpAlt} size='sm' />
        <FontAwesomeIcon icon={faEllipsisH} size='sm' />
      </div>
    );
  }

  renderItems = () => {
    let items = [];

    if (this.props.node.children) {
      items = this.props.node.children;
    }

    items.sort((a, b) => b.getValue() - a.getValue());

    return items.map((item) => {
      const data = Helper.getData(item);
      return (
        <Tippy
          key={data.id}
          a11y={false}
          animation='fade'
          animateFill={false}
          followCursor
          maxWidth='320px'
          className='list-item-tooltip'
          content={this.getTooltipContent(data)}
          onTrigger={this.handleTooltipTrigger}
          onShow={this.handleTooltipShow}
        >
          <div className='item' onClick={() => this.handleNode(item)}>
            <span className='name'>
              <FontAwesomeIcon icon={icons[data.kind]} size='sm' className='icon' />
              {item.name}
            </span>
            <span className='size'>{prettyBytes(data.size)}</span>
          </div>
        </Tippy>
      );
    });
  }

  render () {
    return (
      <Fragment>
        <div className='list animated fadeIn slow'>
          {this.renderRoot()}
          {this.renderLevelUp()}
          <div className='items' ref={this.listItemsRef}>
            {this.renderItems()}
          </div>
          <div className='help'>
            Press and hold <b>CONTROL</b> key and hover mouse over list above for detail view.
          </div>
        </div>
      </Fragment>
    );
  }
}
