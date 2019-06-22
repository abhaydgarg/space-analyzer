import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippy.js/react';

export default function Footer (props) {
  const handleHelpBtn = () => {
    window.open('https://github.com/abhaydgarg/space-analyzer/blob/master/README.md#how-to-use', '__blank');
  };

  const handleUploadBtn = () => {
    props.handleUploadBtn();
  };

  return (
    <footer className='footer'>
      <div className='left-container'>
        <img className='logo' src='./static/icon-black.svg' />
        <span className='site-title'>Space analyzer</span>
      </div>
      <div className='right-container'>
        <Tippy
          content='Upload'
          animateFill={false}
          animation='scale'
          className='tooltip'
        >
          <button className='btn-upload' onClick={handleUploadBtn}>
            <FontAwesomeIcon icon={faUpload} size='lg' />
          </button>
        </Tippy>
        <Tippy
          content='How to use'
          animateFill={false}
          animation='scale'
          className='tooltip'
        >
          <button className='btn-help' onClick={handleHelpBtn}>
            <FontAwesomeIcon icon={faInfoCircle} size='lg' />
          </button>
        </Tippy>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  handleUploadBtn: PropTypes.func.isRequired
};
