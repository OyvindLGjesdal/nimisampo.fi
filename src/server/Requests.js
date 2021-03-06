import axios from 'axios';
import querystring from 'querystring';

const defaultSelectHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/sparql-results+json; charset=utf-8'
};
// const defaultConstructHeaders = {
//   'Content-Type': 'application/x-www-form-urlencoded',
//   'Accept': 'text/turtle'
// };

export const runSelectQuery = async (query, endpoint, resultMapper) => {
  try {
    const response = await axios({
      method: 'post',
      headers: defaultSelectHeaders,
      url: endpoint,
      data: querystring.stringify({ query }),
    });
    const { bindings } = response.data.results;
    return bindings.length === 0 ? [] : resultMapper(bindings);
  } catch(error) {
    handleError(error);
  }
};

export const getWFSLayer = async layerID => {
  const url = 'http://avaa.tdata.fi/geoserver/kotus/ows?service=WFS&version=1.0.0&request=GetFeature&typeName='
  + layerID + '&srsName=EPSG:4326&outputformat=json';
  try {
    const response = await axios.get(url);
    return {
      layerID: layerID,
      geoJSON: response.data
    };
  } catch(error) {
    handleError(error);
  }
};


const handleError = error => {
  if (error.response) {
  // The request was made and the server responded with a status code
  // that falls out of the range of 2xx
    console.log(error.response.data);
  //console.log(error.response.status);
  //console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
  // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
};
