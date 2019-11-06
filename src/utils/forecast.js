const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/c20eff0e9a1e366cb241b2449696c4c4/' +
    latitude +
    ',' +
    longitude +
    '?lang=pt&units=si';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        'Não foi possível conectar ao serviço meteorológico!',
        undefined
      );
    } else if (body.error) {
      callback('Localização não encontrada', undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ' It is currently ' +
          body.currently.temperature +
          ' graus. Existe ' +
          body.currently.precipProbability +
          '% de probabilidade de chover.'
      );
    }
  });
};

module.exports = forecast;
