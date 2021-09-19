import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js'
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import country from './fetchCountries.js';
import rendCountryList from './render-country-list.js';
import refs from './refs.js';
import debounce from 'lodash.debounce';

const {searchCountry, inputValue, countryInfo} = refs;
defaultModules.set(PNotifyMobile, {});


const BASE_URL = `https://restcountries.eu/rest/v2`;
let endPoint = `/name/`;
let url = BASE_URL + endPoint;


searchCountry.addEventListener('input', debounce(() => {
    inputValue.innerHTML = '';
    countryInfo.innerHTML = '';
    if (searchCountry.value != '') {
        fetchCountries(searchCountry.value).then((countriesArray) => {
            if (countriesArray.length > 10) {
                return showAllert()
            } else if (countriesArray.length === 1) {
                country(countriesArray)
                } 
            else if (countriesArray.length > 1 || countriesArray.length != 11) {
                rendCountryList(countriesArray)
            }
        }).catch(showError);
    };
}, 500  )
);

function showError() {
    error({
        text: `Страны "${searchCountry.value}" не существует, проверьте правильность написания`
    });
}

function showAllert() {
    alert({
        text: `Количество результатов поиска превышает допустимое значние, уточните свой запрос`
    });
}

function fetchCountries(searchQuery) {   
    return fetch(url + searchQuery).then(response => {
        return response.json();
    })
  
};

