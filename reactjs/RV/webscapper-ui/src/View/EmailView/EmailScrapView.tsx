import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


class EmailScrapView extends Component {
  render() {
    return <>
      <div className="row">
        <div className="row">
          <div className="col">
            <h2>Get Email</h2>
          </div>
          <div className="col">
            <text values='pradeep'></text>
          </div>
        </div>
        <div className="row">
          <div className="col">
            Website
            <text></text>
            <Button>Find Emails</Button>
          </div>
          <div className="col">
            2 of 3
          </div>
          
        </div>
      </div>
    </>
  }
}

export default EmailScrapView;