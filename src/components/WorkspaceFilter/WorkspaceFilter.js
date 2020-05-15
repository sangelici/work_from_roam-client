import React, { Fragment, useState  } from 'react'

// npm package imports
import { Button, Modal, Container, Row, Col } from 'react-bootstrap'
import Media from 'react-media'
import mapValues from 'lodash/mapValues'

// Custom component import
import { ApplyFilter } from './ApplyFilter.js'
// import filteredCall from '../../api/workspaceFilter.js'
import magGlass from './SearchVector.svg'

// Styling imports
import './WorkspaceFilter.scss'

export const WorkspaceFilter = props => {
  const [rejection, setRejection] = useState(false)
  const [show, setShow] = useState(false)
  const [filter, setFilter] = useState({
    // Main filters
    fastWifi: false,
    lotsOfSeats: false,
    quiet: false,
    lively: false,
    outlets: false,
    openNow: false,
    openEarly: false,
    openLate: false,
    cowork: false,
    library: false,
    cafe: false,
    food: false,
    coffee: false,
    alcohol: false,
    // Secondary filters
    pets: false,
    comfiness: false,
    parking: false,
    goodForGroups: false,
    outdoorSpace: false
  })

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Functions to reset the filters and to close/show the dropdown
  const clearFilter = () => {
    setFilter(filter => mapValues(filter, () => false))
    setRejection(false)
  }

  const toggleShow = () => setShow(!show)
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const handleSelect = event => {
    event.persist()
    switch(event.target.name) {
      // Venue
      case 'cafe':
        setFilter(filter => ({...filter, cafe : !filter.cafe }))
        break
      case 'cowork':
        setFilter(filter => ({...filter, cowork : !filter.cowork }))
        break
      case 'restaurant':
        setFilter(filter => ({...filter, restaurant : !filter.restaurant }))
        break
      case 'library':
        setFilter(filter => ({...filter, library : !filter.library }))
        break
      // Refreshments
      case 'alcohol':
        setFilter(filter => ({...filter, alcohol : !filter.alcohol }))
        break
      case 'coffee':
        setFilter(filter => ({...filter, coffee : !filter.coffee }))
        break
      case 'food':
        setFilter(filter => ({...filter, food : !filter.food }))
        break
      // Amenities
      case 'fastWifi':
        setFilter(filter => ({...filter, fastWifi : !filter.fastWifi}))
        break
      case 'bathrooms':
        setFilter(filter => ({...filter, bathrooms : !filter.bathrooms }))
        break
      case 'comfiness':
        setFilter(filter => ({...filter, comfiness : !filter.comfiness }))
        break
      case 'goodForGroups':
        setFilter(filter => ({...filter, goodForGroups : !filter.goodForGroups }))
      break
      case 'lotsOfSeats':
        setFilter(filter => ({...filter, lotsOfSeats : !filter.lotsOfSeats }))
        break
      case 'outdoorSpace':
        setFilter(filter => ({...filter, outdoorSpace : !filter.outdoorSpace }))
        break
      case 'outlets':
        setFilter(filter => ({...filter, outlets : !filter.outlets }))
        break
      case 'pets':
        setFilter(filter => ({...filter, pets : !filter.pets }))
        break
      // Noise
      case 'quiet':
        setFilter(filter => ({...filter, quiet : !filter.quiet }))
        break
      case 'lively':
        setFilter(filter => ({...filter, lively : !filter.lively }))
        break
      //Hours
      case 'openEarly':
        setFilter(filter => ({...filter, openEarly : !filter.openEarly }))
        break
      case 'openLate':
        setFilter(filter => ({...filter, openLate : !filter.openLate }))
        break
      default:
        console.log('Failed to apply filters!')
    }
  }

  const handleSubmit = () => {
    doFiltering()
      .then(resolve => props.filterWorkspaces(resolve))
      .then(resolve => handleClose())
      .then(setRejection(false))
      .catch(reject => handleReject())
  }

  const doFiltering = () => {
    return new Promise((resolve, reject) => {
      let array = ApplyFilter(filter, props.data, props.userLocation)
      if (array.length > 0) {
        resolve(array)
      } else {
        reject('No results!')
      }
    })
  }

  const handleClose = () => {
    setShow(false)
  }

  const handleReject = () => {
    setRejection(true)
  }

  return (
    <Fragment>
      <img src={magGlass} alt='Mag Glass' onClick={toggleShow}/>

      <Media queries={{
          small: '(max-width: 450px)',
          large: '(min-width: 451px)'
        }}>

        {matches => (
          <Fragment>

            {matches.small &&
              <div>
                <Modal className='filter-modal' show={show} onHide={handleClose} style={{top: '10vh'}}>
                    <Modal.Body className='filter-modal-body'>
                      <div className='main-div'>
                        <Button className='select-button' id={filter.fastWifi ? 'clicked' : 'unclicked'} name='fastWifi' onClick={handleSelect}>Fast WiFi</Button>
                        <Button className='select-button' id={filter.lotsOfSeats ? 'clicked' : 'unclicked'} name='lotsOfSeats' onClick={handleSelect}>Lots of seats</Button >
                        <Button className='select-button' id={filter.quiet ? 'clicked' : 'unclicked'} name='quiet' onClick={handleSelect}>Quiet</Button >
                        <Button className='select-button' id={filter.outlets ? 'clicked' : 'unclicked'} onClick={handleSelect} name='outlets'>Outlets</Button>
                        <Button className='select-button' id={filter.openNow ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='openNow'>Open Now</Button>
                        <Button className='select-button' id={filter.openLate ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='openLate'>Open Late</Button>
                        <Button className='select-button' id={filter.cowork ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='cowork'>Co-work Space</Button>
                        <Button className='select-button' id={filter.library ? 'clicked' : 'unclicked'} onClick={handleSelect} name='library'>Library</Button>
                        <Button className='select-button' id={filter.cafe ? 'clicked' : 'unclicked'} onClick={handleSelect} name='cafe'>Cafe</Button >
                        <Button className='select-button' id={filter.food ? 'clicked' : 'unclicked'} onClick={handleSelect} name='food'>Food</Button>
                        <Button className='select-button' id={filter.coffee ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='coffee'>Coffee</Button>
                        <Button className='select-button' id={filter.alcohol ? 'clicked' : 'unclicked'} name='alcohol' onClick={handleSelect}>Beer + Wine</Button >
                      </div>
                      <div className='secondary-div'>
                        <Button className='small-button' id={filter.pets ? 'clicked' : 'unclicked'} onClick={handleSelect} name='pets'>Pet-Friendly</Button>
                        <Button className='small-button' id={filter.comfiness ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='comfiness'>Comfy Chairs</Button>
                        <Button className='small-button' id={filter.parking ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='parking'>Parking</Button>
                        <Button className='small-button' id={filter.goodForGroups ? 'clicked' : 'unclicked'} onClick={handleSelect} name='goodForGroups'>Good for Groups</Button>
                        <Button className='small-button' id={filter.outdoorSpace ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='outdoorSpace'>Outdoor Space</Button>
                      </div>
                      <div className='footer-div'>
                        <div>
                          <p onClick={clearFilter}>Clear Filters</p>
                        </div>
                        <Button className='submit-button' onClick={handleSubmit}>Apply Filters</Button>
                      </div>
                      <div className='rejection-message' id={rejection ? 'show' : 'hide'}>
                        <p>No matches found! Please apply different filters and try again.</p>
                      </div>
                    </Modal.Body>
                </Modal>
              </div>
            }

            {matches.large &&
              <Fragment>
                <Modal className='filter-modal' centered show={show} onHide={handleClose}>
                  <Modal.Body className='filter-modal-body'>

                    <Container className='modal-container'>
                      <h6>Venue</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.cafe ? 'clicked' : 'unclicked'} onClick={handleSelect} name='cafe'>cafe</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.cowork ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='cowork'>cowork space</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.restaurant ? 'clicked' : 'unclicked'} onClick={handleSelect} name='restaurant'>restaurant</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.library ? 'clicked' : 'unclicked'} onClick={handleSelect} name='library'>library</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Refreshments</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.alcohol ? 'clicked' : 'unclicked'} name='alcohol' onClick={handleSelect}>beer + wine</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.coffee ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='coffee'>coffee</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.food ? 'clicked' : 'unclicked'} onClick={handleSelect} name='food'>food</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Amenities</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.bathrooms ? 'clicked' : 'unclicked'} name='bathrooms' onClick={handleSelect}>bathrooms</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.comfiness ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='comfiness'>comfy chairs</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.goodForGroups ? 'clicked' : 'unclicked'} onClick={handleSelect} name='goodForGroups'>good for groups</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.lotsOfSeats ? 'clicked' : 'unclicked'} name='lotsOfSeats' onClick={handleSelect}>lots of seats</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.outdoorSpace ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='outdoorSpace'>outdoor space</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.outlets ? 'clicked' : 'unclicked'} onClick={handleSelect} name='outlets'>outlets</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.pets ? 'clicked' : 'unclicked'} onClick={handleSelect} name='pets'>pet friendly</Button>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.fastWifi ? 'clicked' : 'unclicked'} onClick={handleSelect} name='fastWifi'>fast WiFi</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Noise</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.quiet ? 'clicked' : 'unclicked'} name='quiet' onClick={handleSelect}>quiet</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.lively ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='lively'>lively</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container'>
                      <h6>Hours</h6>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.openEarly ? 'clicked' : 'unclicked'} name='openEarly' onClick={handleSelect}>open early</Button >
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='select-button' id={filter.openLate ? 'clicked' : 'unclicked'}  onClick={handleSelect} name='openLate'>open late</Button>
                        </Col>
                      </Row>
                    </Container>

                    <Container className='modal-container' style={{background: 'white'}}>
                      <Row>
                        <Col sm={6} className='button-col'>
                          <p onClick={clearFilter}>Clear Filters</p>
                        </Col>
                        <Col sm={6} className='button-col'>
                          <Button className='submit-button' onClick={handleSubmit}>Apply Filters</Button>
                        </Col>
                      </Row>
                    </Container>


                  </Modal.Body>
                </Modal>
              </Fragment>
            }

          </Fragment>
        )}
      </Media>
    </Fragment>
  )

}
