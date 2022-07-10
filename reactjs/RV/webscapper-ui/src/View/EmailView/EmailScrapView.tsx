import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import './EmailScrapView.css';

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
        <div className="row g-3">
          <div className="col-6 ">
          <div className='EmailContainer'>
            Website
            <input className='form-control' type="text" id="fname" name="fname"></input>
            <Button>Find Email</Button>
            </div>
          </div>
          <div className="col">
           
          </div>
          
        </div>
      </div>
    </>
  }
}

export default EmailScrapView;