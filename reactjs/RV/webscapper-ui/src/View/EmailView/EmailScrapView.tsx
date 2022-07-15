import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
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
            <div className="search">
              <input type="text" placeholder="Search Campground" name="search" id="search"></input>
                <button className='buttonSearch'>
                  Search
                </button>
                <div className='CampGroundDetails'>
                  <p> Campground Name </p>
                  <p> Website </p>
                  <p> Address </p>
                </div>
                <Button>
                  Assign Emails
                </Button>
            </div>
          </div> 
        </div>
      </div>

      <div className="row">
        <div className="Result">
          <b> RESULTS </b>
        </div>
      </div>
      <div className='container'>
        <div className="row">

          <div className="col-md-3" id="currentEmail">
            <b>Current Emails</b>
            <div className="row" id="emailRow">
              <div className='col-md-6'>
                Email Address
              </div>
              <div className='col-md-5 offset-md-1'>
                <a href=''>Remove</a>
              </div>
            </div>
          </div>

          <div className="col-md-3 offset-md-1" id="newEmail">
            <b>New Emails Added</b>
            <div className="row" id="emailRow">
              <div className='col-md-6'>
                Email Address
              </div>
              <div className='col-md-5 offset-md-1'>
                <a href=''>Remove</a>
              </div>
            </div>
          </div>

          <div className="col-md-4 offset-md-1" id="validateEmail">
            <b>Emails to Validate</b>
            <div className="row" id="emailRow">
              <div className='col-md-9'>
                Email Address
              </div>
              <div className='col-md-1'>
                <a href=''>Add</a>
              </div>
              <div className='col-md-2'>
                <a href=''>Remove</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  }
}

export default EmailScrapView;