import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

import Helper from '../../Helper';

export default class Breadcrumb extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    handleNode: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.breadcrumbsRef = React.createRef();
  }

  componentDidMount () {
    this.breadcrumbsRef.current.addEventListener('animationend', () => {
      this.breadcrumbsRef.current.classList.remove('fadeIn');
    });
  }

  componentWillUnmount () {
    this.breadcrumbsRef.current.removeEventListener('animationend', Helper.noop());
  }

  componentDidUpdate () {
    // Play animation whenever comp is updated.
    this.breadcrumbsRef.current.classList.add('fadeIn');
  }

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
      <div className='breadcrumbs animated fadeIn' ref={this.breadcrumbsRef}>
        <nav className='nav'>
          {
            this.getAllParent().map((item, index) => {
              return (
                <div className='breadcrumb' key={index} onClick={() => this.handleNode(item)}>
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
