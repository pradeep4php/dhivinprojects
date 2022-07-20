
import React, { Component, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';

import { startWebCrawler, getStatus, currentServiceId, progressStatus, campGroundEmails, getDraftEmail, reset } from '../../feature/draftEmailSlice';
import { searchCampGround, currentCampGround } from '../../feature/campGroundSlice';
import TextField from '@mui/material/TextField';

import './EmailScrapView.css';
import ClockLoader from "react-spinners/ClockLoader";
import SearchAppBar from '../../SearchAppBar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Typography, Switch, Box, Card, Divider, Chip, IconButton } from '@mui/material';



export default function EmailScrapView() {
  const dispatch = useDispatch();
  const [searchItem, setSearchItem] = useState();
  const [webUrl, setWebUrl] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [timerHandle, setTimerHandle] = useState();
  const [searchHandle, setSearchHandle] = useState();
  const serviceId = useSelector(currentServiceId);
  const status = useSelector(progressStatus);
  const campGround = useSelector(currentCampGround);
  const currentEmailList = useSelector(campGroundEmails);


  const startPolling = () => {
    dispatch(getStatus(serviceId
    ));
  }

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(reset());

    dispatch(startWebCrawler({
      url: webUrl
    }));
    console.log('You clicked submit.');


  }

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(searchCampGround(searchItem));
    console.log('You clicked submit.');


  }

  useEffect(() => {
    if (serviceId != 0)
      setTimerHandle(setInterval(startPolling, 30000));
  }, [serviceId])

  useEffect(() => {
    if (status === "complete") {
      clearInterval(timerHandle);
      dispatch(getDraftEmail(serviceId));
    }
  }, [status])

  const isSpinning = () => {
    return !(status === "" || status === "complete");
  }

  const onSearchTextChange = (e) => {
    setSearchItem(e.target.value);
    if (e.target.value.length > 2)
      setSearchHandle(setTimeout(startSearch, 3000));

  }

  const startSearch = () => {
    clearTimeout(searchHandle);
    dispatch(searchCampGround(searchItem));
  }


  return <>
    <SearchAppBar onChange={onSearchTextChange}></SearchAppBar>
    <ClockLoader loading={isSpinning()} />
    <div className="row">
      <div className="row">
        <div className="col">
          <h2>Get Email</h2>
        </div>

      </div>
      <div className="row g-3">
        <div className="col-6 ">
          <div className='EmailContainer'>

            <TextField sx={{ width: '50ch' }} id="outlined-basic" label="Url" variant="outlined" value={webUrl} onChange={(e) => setWebUrl(e.target.value)} />

            <Button variant="contained" onClick={handleClick} disabled={webUrl.length == 0}>Find Email</Button>


          </div>
        </div>
        <div className="col">
          <div className="search">

            {campGround.id != 0 && <>
            <Card>
              <Box sx={{ p: 2, display: 'flex' }}>
                <Avatar variant="rounded" src="https://img.icons8.com/ios-filled/50/000000/rv-campground.png" />
                <Stack spacing={0.5}>
                  <Typography fontWeight={700}>{campGround.name}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    <img src="https://img.icons8.com/plumpy/24/1A1A1A/marker.png" />
                    Scranton, PA
                  </Typography>
                </Stack>

              </Box>
              <Divider />

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
              >
                <Button variant="contained" >Assign Email</Button>
              </Stack>


            </Card>

           
            </>}
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
          {
            currentEmailList && currentEmailList.map(function (key) {
              return <div className="row" id="emailRow"><div className='col-md-6'>{key} </div><div className='col-md-5 offset-md-1'>
                <a href=''><img src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png" /></a>
              </div></div>
            })
          }
        </div>

        <div className="col-md-3 offset-md-1" id="newEmail">
          <b>New Emails Added</b>
          <div className="row" id="emailRow">
            <div className='col-md-6'>
              Email Address
            </div>
            <div className='col-md-5 offset-md-1'>
              <a href=''><img src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png" /></a>
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