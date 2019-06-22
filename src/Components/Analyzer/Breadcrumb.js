import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

export default function Breadcrumb (props) {
  const getAllParent = () => {
    let stack = [];
    let curNode = props.node.__dataNode;
    while (curNode !== null) {
      stack.unshift(curNode);
      curNode = curNode.parent;
    }
    return stack;
  };

  const handleNode = (node) => {
    props.handleNode(node);
  };

  return (
    <div className='breadcrumbs'>
      <nav className='nav'>
        {
          getAllParent().map((item, index) => {
            return (
              <div className='breadcrumb' key={index} onClick={() => handleNode(item.data)}>
                <span className='sep'>
                  <FontAwesomeIcon icon={faFolder} size='sm' />
                </span>
                <span className='item'>{item.data.name}</span>
              </div>
            );
          })
        }
      </nav>
    </div>
  );
}

Breadcrumb.propTypes = {
  node: PropTypes.object.isRequired,
  handleNode: PropTypes.func.isRequired
};
