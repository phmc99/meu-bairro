import axios from 'axios';

export const getNeighborhood = async (cep: string) => {
  const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

  if (data.bairro) {
    return data.bairro;
  }

  return;
};

export const getNearestNeighborhood = async (lat: number, lng: number) => {
  const token = process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN;

  if (!lat && !lng) {
    return;
  }

  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${lng}&key=${token}`
  );

  if (data.results) {
    const { results } = data;
    if (results.length > 0) {
      if (results[0].address_components) {
        const { address_components } = results[0];
        if (address_components[2]) {
          const { long_name } = address_components[2];
          if (long_name) {
            return long_name;
          }
        }
      }
    }
  }

  // const neighborhood = data.results[0].address_components[2].long_name;

  return;
};
