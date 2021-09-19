import refs from './refs.js';
import countryCard from '../templates/country.hbs'
const { countryInfo } = refs;

export default function renderCountries(countriesArray) {
  if (countriesArray.status === 404) {
    return
  }
  const markup = countryCard(countriesArray)
  countryInfo.innerHTML = markup;
};