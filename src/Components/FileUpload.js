/* global FileReader */
import { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import Toast from 'cogo-toast';

import demo from '../demo.json';

let data = null;

export default function FileUpload (props) {
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState();

  useEffect(() => {
    // Show analyzer screen
    // when 100% is completed.
    if (percentage === 100) {
      props.handleFileData(data);
    }
  }, [percentage]);

  const onDropAccepted = useCallback(acceptedFiles => {
    const reader = new FileReader();
    reader.onerror = () => {
      Toast.error('File reading has failed');
      setLoading(false);
    };
    reader.onloadstart = (e) => {
      setLoadingMessage('READING');
      setLoading(true);
    };
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        let percentLoaded = Math.round((e.loaded / e.total) * 100);
        if (percentLoaded < 100) {
          setPercentage(percentLoaded);
        }
      }
    };
    reader.onload = () => {
      try {
        setLoadingMessage('PARSING');
        data = JSON.parse(reader.result);
        setPercentage(100);
      } catch (error) {
        Toast.error('Cannot parse file');
        setLoading(false);
      }
    };
    reader.readAsText(acceptedFiles[0]);
  }, []);

  const onDropRejected = useCallback(e => {
    Toast.error('Drop valid single json file');
  });

  const handleDemoBtn = (e) => {
    e.stopPropagation();
    props.handleFileData(demo);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: 'application/json', multiple: false, onDropAccepted, onDropRejected });

  const setBorderColor = () => {
    if (isDragAccept) {
      return '#00e676';
    }
    if (isDragReject) {
      return '#ff1744';
    }
    if (isDragActive) {
      return '#2196f3';
    }
    return '#757575';
  };

  if (loading === true) {
    return (
      <div className='fileupload-loading-container'>
        <div className='content animated fadeIn faster'>
          <h1>{percentage}%</h1>
          <p className='txt-sm txt-primary'>{loadingMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className='fileupload-container animated fadeIn slow'
      style={{ borderColor: setBorderColor() }}
    >
      <div className='content'>
        <input {...getInputProps()} />
        <p>Drag 'n' drop file here, or click to select file.</p>
        <p className='txt-xs txt-muted'>Only <em className='txt-primary'>single json</em> file is accepted.</p>
        <button className='btn-demo' onClick={handleDemoBtn}>LAUNCH DEMO</button>
      </div>
    </div>
  );
}

FileUpload.propTypes = {
  handleFileData: PropTypes.func.isRequired
};
