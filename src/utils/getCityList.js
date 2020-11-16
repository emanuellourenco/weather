import axios from "axios";

export function getCityList(search, loadedOptions) {
  return axios.get("data/cityList.json").then(({ data }) => {
    const offset = !!loadedOptions ? loadedOptions.length : 0;
    const totalCount = data.length;
    const filteredData = !!search
      ? data.filter((city) => city.name.includes(search))
      : data;
    const size = 20;
    const items = filteredData.slice(offset, offset + size).map((i) => {
      return i;
    });
    const hasMore = totalCount > offset + items.length;
    const options = setCityOptions(items);

    return {
      options,
      hasMore,
    };
  });
}

export function setCityOptions(cities) {
  return cities.map((city) => {
    return { value: city.id, label: `${city.name}, ${city.country}` };
  });
}
