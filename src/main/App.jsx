import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import WeatherBlock from "../components/WeatherBlock";
import { getWeather } from "../utils/getWeather";
import { getCityList } from "../utils/getCityList";
import { Card, Row, Col } from "reactstrap";
import Modal from "../components/Modal";
import { FaTools } from "react-icons/fa";

function App() {
  // Get initial city from local storage
  const initialCity = localStorage.getItem("city")
    ? JSON.parse(localStorage.getItem("city"))
    : "";
  const [city, setCity] = useState(initialCity);
  // Open modal if dont have any city selected
  const [modalOpen, setModalOpen] = useState(!initialCity);
  const [weather, setWeather] = useState([]);

  /**
   * Get weather based on selected option
   * @param {Object} option
   */
  const getCityWeather = async (option) => {
    const weather = await getWeather(option.value);
    setWeather(weather);
  };

  /**
   * Save selected city in local storage and in component state
   * @param {Object} option
   */
  const selectCity = (option) => {
    // Save city option in local storage
    localStorage.setItem("city", JSON.stringify(option));
    setModalOpen(false);
    setCity(option);
    getCityWeather(option);
  };

  /**
   * Get initial weather if city was selected
   */
  useEffect(() => {
    if (!!city) {
      getCityWeather(city);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row className="app__row">
      <Col sm={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }}>
        <Card className="app__card">
          {!!city && (
            <h1 className="app__title">
              {city.label}'s Weather{" "}
              <FaTools
                className="app__tile__icon"
                onClick={() => setModalOpen(true)}
              />
            </h1>
          )}
          <Row>
            {weather.map((w, index) => {
              return (
                <Col key={index} xs="12" sm="6" md="4" lg="2">
                  <WeatherBlock
                    date={w.date}
                    icon={w.icon}
                    minTemp={w.minTemp}
                    maxTemp={w.maxTemp}
                    wind={w.wind}
                  />
                </Col>
              );
            })}

            <Modal
              title="Select location"
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              showCloseButton={!!city}
            >
              <AsyncPaginate
                value={city}
                loadOptions={getCityList}
                onChange={selectCity}
                className="app__select"
                classNamePrefix="reac-select"
                debounceTimeout={500}
                menuColor="purple"
              />
            </Modal>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default App;
