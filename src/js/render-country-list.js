import refs from './refs.js';
const { inputValue} = refs;

export default function renderCountriesArray(countries) {
    countries.map((country) => {
        inputValue.insertAdjacentHTML('beforeend', `
            <ul>
                <li>${country.name}</li>
            </ul>
        `);
    })
}