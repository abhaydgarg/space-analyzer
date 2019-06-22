import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isArray } from '@abhaydgarg/is';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFileAlt, faLevelUpAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippy.js/react';
import prettyBytes from 'pretty-bytes';

const icons = {
  'Directory': faFolder,
  'File': faFileAlt
};

export default class List extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    handleNode: PropTypes.func.isRequired
  };

  handleNode = (node) => {
    this.props.handleNode(node);
  }

  handleLevelUp = () => {
    // If node's parent is not a root node.
    if (this.props.node.__dataNode.parent !== null) {
      this.props.handleNode(this.props.node.__dataNode.parent.data);
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
    const node = this.props.node;
    let name = node.name;
    let size = prettyBytes(node.size);

    return (
      <div className='item root'>
        <span className='name'>{name}</span>
        <span className='size'>{size}</span>
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
    const node = this.props.node;
    let items = [];

    if (isArray(node.children)) {
      items = node.children;
    }

    // Sort items by size in descending order.
    return items.sort((a, b) => {
      return b.size - a.size;
    }).map((item, index) => {
      return (
        <Tippy
          key={index}
          a11y={false}
          animation='fade'
          animateFill={false}
          followCursor
          maxWidth='320px'
          className='list-item-tooltip'
          content={this.getTooltipContent(item)}
          onTrigger={this.handleTooltipTrigger}
          onShow={this.handleTooltipShow}
        >
          <div className='item' onClick={() => this.handleNode(item)}>
            <span className='name'>
              <FontAwesomeIcon icon={icons[item.kind]} size='sm' className='icon' />
              {item.name}
            </span>
            <span className='size'>{prettyBytes(item.size)}</span>
          </div>
        </Tippy>
      );
    });
  }

  render () {
    return (
      <Fragment>
        <div className='list'>
          {this.renderRoot()}
          {this.renderLevelUp()}
          <div className='items'>
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
