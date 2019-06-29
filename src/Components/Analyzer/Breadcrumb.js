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
      <div className='breadcrumb animated fadeIn slower'>
        <nav className='breadcrumb__nav'>
          {
            this.getAllParent().map((item, index) => {
              return (
                <div
                  className='breadcrumb__item'
                  key={index}
                  onClick={() => this.handleNode(item)}
                >
                  <span className='breadcrumb__sep'>
                    <FontAwesomeIcon icon={faFolder} size='sm' />
                  </span>
                  <span className='breadcrumb__name'>{item.name}</span>
                </div>
              );
            })
          }
          <div className='breadcrumb__item'>
            <span className='breadcrumb__sep'>
              <FontAwesomeIcon icon={faFolder} size='sm' />
            </span>
            <span className='breadcrumb__name'>{this.props.node.name}</span>
          </div>
        </nav>
      </div>
    );
  }
}
