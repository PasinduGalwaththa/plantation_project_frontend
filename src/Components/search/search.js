import { useState } from "react";
import {AsyncPaginate} from "react-select-async-paginate";   
import { GEO_API_URL,geoApiOptions } from "../../api"; 


// const Search = (onSearchChange) => {
//     const [Search, setSearch] = useState("null");

//     const handleOnChange = (searchdata) => {
//         setSearch(searchdata);
//         onSearchChange(searchdata);
//     }

    // const loadOptions =  (inputValue) => {
    //     try {
            
    //         //const response = await fetch(${GEO_API_URL}/sites?minPopulation=1000000&namepreFix=$(inputValue), options);
    //         const result = await response.text();
    //         console.log(result);
    //     } catch (error) {
    //         console.error(error);
    // }
    


//     return (
//         <AsyncPaginate
//             placeholder="Search for a city"
//             debounceTimeout={600}
//             value={Search}
//             onChange={handleOnChange}
//             loadOptions={loadOptions}
//         />
        
//     );


// export default Search;