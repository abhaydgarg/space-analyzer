import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

export default class Breadcrumb extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    handleNode: PropTypes.func.isRequired
  };

  getAllParent = () => {
    let parents = this.props.node.getAncestors();
    // Remove first element
    // which is `space-analyzer`.
    parents.shift();
    return parents;
  }

  handleNode = (node) => {
    this.props.handleNode(node);
  }

  render () {
    return (
      <div className='breadcrumbs animated fadeIn slower'>
        <nav className='nav'>
          {
            this.getAllParent().map((item, index) => {
              return (
                <div
                  className='breadcrumb'
                  key={index}
                  onClick={() => this.handleNode(item)}
                >
                  <span className='sep'>
                    <FontAwesomeIcon icon={faFolder} size='sm' />
                  </span>
                  <span className='item'>{item.name}</span>
                </div>
              );
            })
          }
          <div className='breadcrumb'>
            <span className='sep'>
              <FontAwesomeIcon icon={faFolder} size='sm' />
            </span>
            <span className='item'>{this.props.node.name}</span>
          </div>
        </nav>
      </div>
    );
  }
}
