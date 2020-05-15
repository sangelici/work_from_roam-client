/** @jsx jsx **/
import React, { useState, useRef, useEffect } from 'react'
import { Dropdown, Container, Row, Col } from 'react-bootstrap'
import { css, jsx } from '@emotion/core'
import { GoogleApiWrapper } from 'google-maps-react'


// Custom component imports
import WorkspaceSlider from './WorkspaceSlider'
import { Slide } from './Slide';
import { Arrow } from './Arrow'
import { Dots } from './Dots'
import { ClickOutside } from '../ClickOutside/ClickOutside.js'

// Styling imports
import './ListView.scss'

const ListView = props => {
  const [isListOpen, setIsListOpen] = useState(false)
  const [slider, setSlider] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.5
  })
  const [width, setWidth] = useState()

  const workspaceArray = props.workspaces[0].slice(0, 5)

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Reference and function that listens for events outside of the ListView component, and closes it
  const ref = useRef()

  ClickOutside(ref, () => {
    setIsListOpen(false)
  })
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Gets and sets the dynamic width of the ListView component
  const sliderWidth = useRef()

  useEffect(() => {
    setWidth(sliderWidth.current.getBoundingClientRect().width)
  }, [])
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  let isVisible = 'hide'

  if (isListOpen === true) {
    isVisible = 'show'
  }

  const toggleListView = () => {
    setIsListOpen(!isListOpen)
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Functions to advance/decrement the slides
  const { translate, transition, activeIndex } = slider

  const nextSlide = () => {
    if (activeIndex === workspaceArray.length - 1) {
      return setSlider({
        ...slider,
        translate: 0,
        activeIndex: 0
      })
    }

    setSlider({
      ...slider,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * width
    })
  }

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setSlider({
        ...slider,
        translate: (workspaceArray.length - 1) * width,
        activeIndex: workspaceArray.length - 1
      })
    }

    setSlider({
      ...slider,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * width
    })
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (

    <Container className='list-container' fluid id={isVisible}>
      <Row className='list-row'>
        <Col className='list-column' sm={6} md={5} lg={4} ref={ref}>
          <div className='list-header' onClick={toggleListView} >
            <p>List View</p>
          </div>
          <Dropdown
            onSelect={eventKey => props.sortWorkspaces(eventKey)}>
            <Dropdown.Toggle css={dropdownCSS}>
              Sort by...
            </Dropdown.Toggle>
            <Dropdown.Menu css={menuCSS}>
              <Dropdown.Item eventKey='avg_rating'>Highest Rated</Dropdown.Item>
              <Dropdown.Item eventKey='distance'>Closest</Dropdown.Item>
              <Dropdown.Item eventKey='avg_wifi'>Best WiFi</Dropdown.Item>
              <Dropdown.Item eventKey='avg_noise'>Quietest</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div css={sliderCSS} ref={sliderWidth}>
            <WorkspaceSlider
              translate={translate}
              transition={transition}
              width={width * workspaceArray.length}
            >
              {workspaceArray.map(workspace => (
                <Slide key={workspace.id}
                  content={workspace}
                  activeIndex={activeIndex}
                  width={width} />
              ))}
            </WorkspaceSlider>
            <Dots slides={workspaceArray} width={width} activeIndex={activeIndex}/>
          </div>
          <Arrow direction='left' handleClick={prevSlide} />
          <Arrow direction='right' handleClick={nextSlide} />
        </Col>
      </Row>
    </Container>
  )
}

const dropdownCSS = css`
  color: #000;
  width: 324px;
  background: #fff;
  height: 36px;
  border-radius: 18px;
  font-size: 15px;
  font-weight: 300;
  font-family: 'Roboto'
`

const menuCSS = css`
  border-radius: 18px;
  color: #000;
  background: #fff;
  margin-top: 1em;
  width: 324px;
`

const sliderCSS = css`
  height: 100%;
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(ListView)
