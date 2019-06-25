/**
 * First visual component in the app.
 * It is the ancestor of all other screens and components.
 */
import { Component, Fragment } from 'react';

import Footer from './Components/Footer';
import FileUpload from './Components/FileUpload';
import Analyzer from './Components/Analyzer';

export default class RootContainer extends Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   showAnalyzer: false,
    //   data: null
    // };
    /* Use fixture and show analyzer screen on refresh */
    this.state = {
      showAnalyzer: true,
      data: require('./fixture.json')
    };
  }

  handleUploadBtn = () => {
    this.setState({
      showAnalyzer: false
    });
  }

  handleFileData = (data) => {
    this.setState({
      showAnalyzer: true,
      data: data
    });
  }

  renderMain = () => {
    if (this.state.showAnalyzer === true) {
      return <Analyzer data={this.state.data} />;
    }
    return <FileUpload handleFileData={this.handleFileData} />;
  }

  render () {
    return (
      <Fragment>
        <main className='main'>
          {this.renderMain()}
        </main>
        <Footer handleUploadBtn={this.handleUploadBtn} />
      </Fragment>
    );
  }
}
