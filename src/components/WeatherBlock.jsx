import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card } from "reactstrap";
import { getMonth } from "../utils/months";

function WeatherBlock(props) {
  const { date, icon, minTemp, maxTemp, wind } = props;
  const windSpeed = (wind * 3600) / 1000;
  const windSpeedRound = Math.round(windSpeed * 100) / 100;
  const splidetDate = date.split("-");
  const month = getMonth(splidetDate[1] - 1);
  const day = splidetDate[2];

  return (
    <Card className="weather-block__card">
      <Row>
        <Col>
          <h3 className="weather-block__title text--blue">{month}</h3>
          <h4 className="weather-block__subtitle text--blue">{day}</h4>
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            height="100"
            alt={`weather icon ${icon}`}
          />
          <span className="weather-block__info text--blue">Min</span>
          <h6 className="text--blue">{minTemp}º</h6>

          <span className="weather-block__info text--blue">Max</span>
          <h6 className="text--blue">{maxTemp}º</h6>

          <span className="weather-block__info text--blue">Wind Speed</span>
          <h6 className="text--blue">
            {windSpeedRound}
            <span className="weather-block__info text--blue"> km/h</span>
          </h6>
        </Col>
      </Row>
    </Card>
  );
}

WeatherBlock.defaultProps = {
  date: "",
  icon: "",
  minTemp: 0,
  maxTemp: 0,
};

WeatherBlock.propTypes = {
  date: PropTypes.string,
  icon: PropTypes.string,
  minTemp: PropTypes.number,
  maxTemp: PropTypes.number,
};

export default WeatherBlock;
