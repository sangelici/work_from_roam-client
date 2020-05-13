import React, { useRef } from "react";
import { Row, Col } from 'react-bootstrap';

import "./MyFavorites.scss";

function MyFavorites(props) {
  const { user, isExpanded, toggleExpand } = props
  const content = useRef(null);
  const maxHeight = isExpanded ? `${content.current.scrollHeight}px` : "0px"

  console.log(props)

  const myFavoritesJsx = user.find_up_voted_items.map(workplace => (
    <li
      key={workplace.id}
      action
      href={`#workplace/${workplace.id}`}
    >
    <div className="my-favorite-card">
      <div className="card-content">
        <Row>
          <Col xs={7}>
            <div className="workplace-title"> {workplace.name}</div>
          </Col>
          <Col>
            <div className="my-favorite-stars"> {workplace.avgrating}</div>
          </Col>
        </Row>
        <Row>
          <div className="open-now">Open Now</div>
          <span className="plain-text distance">.5 miles away</span>
        </Row>
        <Row>
          <span className="plain-text address"> {workplace.address}</span>
        </Row>
        <Row>
          <span className="plain-text phone"> Phone: <u>{workplace.phone}</u></span>
        </Row>
        <Row>
          <span className="plain-text bars"> Wifi Quality: {workplace.avgwifi} </span>
        </Row>
        <Row>
          <span className="plain-text bars"> Seat Comfort: {workplace.avgseating} </span>
        </Row>
        <Row>
          <span className="plain-text bars"> Noise Level: {workplace.avgnoise} </span>
        </Row>
      </div>
    </div>
    </li>
  ))

  return (
    <div className="myfavorites-section"  onClick={toggleExpand}>
      <div className={`myfavorites myfavorites-title ${isExpanded ? 'active' : ''}`}>
        My Favorites
      </div>
      <div
        ref={content}
        style={{ maxHeight }}
        className="myfavorites-content"
      >
      <ul>
        {myFavoritesJsx}
      </ul>
      </div>
    </div>
  );
}

export default MyFavorites;
