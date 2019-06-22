import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default function NoFileReader (props) {
  return (
    <div className='no-filereader-container'>
      <div className='content animated jackInTheBox'>
        <h3><FontAwesomeIcon icon={faExclamationTriangle} /> Outdated browser</h3>
        <p>Browser does not support <strong><i>FileReader</i></strong> methods of reading the contents of a file. Please upgrade browser to the latest version.</p>
      </div>
    </div>
  );
}
