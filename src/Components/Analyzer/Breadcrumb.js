import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

export default function Breadcrumb (props) {
  const getAllParent = () => {
    let parents = props.node.getAncestors();
    // Remove first element
    // which is `space-analyzer`.
    parents.shift();
    return parents;
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
              <div className='breadcrumb' key={index} onClick={() => handleNode(item)}>
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
          <span className='item'>{props.node.name}</span>
        </div>
      </nav>
    </div>
  );
}

Breadcrumb.propTypes = {
  node: PropTypes.object.isRequired,
  handleNode: PropTypes.func.isRequired
};
