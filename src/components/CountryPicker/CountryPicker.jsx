import React, { useState, useEffect } from 'react';
import { Select, FormControl } from '@material-ui/core';
//import {NativeSelect, InputLabel, FormHelperText} from '@material-ui/core';

import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';


const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([])

    useEffect(() => {
        const fetchCountriesAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }


        fetchCountriesAPI();
    }, [setFetchedCountries]);

    console.log(fetchedCountries);

    return (
        <FormControl variant="outlined" className={styles.formControl}>
            {/* <InputLabel htmlFor="country-picker-simple">Country</InputLabel> */}
            <Select
                native
                onChange={(e) => handleCountryChange(e.target.value)}
                //label = "Select Country"
                inputProps={{
                    name: 'country',
                    id: 'country-picker-simple',
                }}
            >
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </Select>

            {/* <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
               <option value ="">Global</option>
               {fetchedCountries.map((country,i) => <option key={i} value={country}>{country}</option>)}
           </NativeSelect> */}
        </FormControl>
    );
}

export default CountryPicker;

