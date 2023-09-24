import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({onSearchChange}) => {

    const loadOptions = (inputvalue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputvalue}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                return {options: response.data.map((city) => {
                     return{
                        value:`${city.latitude}, ${city.longitude}`,
                        label:`${city.name}, ${city.countryCode}`,
                     }
                })
                } 
            })
            .then(null, err => console.error(err))
    }

    const [search, setSearch] = useState(null);
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData)
    }
    return (
        <AsyncPaginate
            placeholder = "Search for City"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}


export default Search;