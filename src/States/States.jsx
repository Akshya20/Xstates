import { useState } from "react";
import { useEffect } from "react";




function States() {
    const [countries, setcountry] = useState([]);
    const [countryName1, setselectcount] = useState("");
    const [states, setstat] = useState([]);
    const [selectstat, setselectstat] = useState("");
    const [cities, setcity] = useState([]);
    const [selectcity, setseclectcity] = useState("");
    const fetchData = async () => {
        try {
            const response = await fetch(` https://crio-location-selector.onrender.com/countries`);
            const Data = await response.json();
            setcountry(Data);
        }  catch (error) {
            console.error("Error fetching countries:", error);
        }
    }
    const fetchstat = async (countryName) => {
        try {
            const response1 = await fetch(` https://crio-location-selector.onrender.com/country=${countryName}/states`);
            const Data1 = await response1.json();
            setstat(Data1);
        } catch (error) {
            console.error("Error fetching states:", error);
        }



    }
    const fetchCity = async (countryName, stateName) => {
        try {
            const response2 = await fetch(` https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
            const Data2 = await response2.json();
            setcity(Data2);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }


    }
    useEffect(() => {
        fetchData();



    }, []);
    const handleC = (e) => {
        const countryName = e.target.value;
        setselectcount(countryName);
        setstat([]);
        setcity([]);
        fetchstat(countryName);
    }
    const handleC1 = (e) => {
        const stateName = e.target.value;
        setselectstat(stateName);
        setcity([]);
        fetchCity(countryName1, stateName);
    }
    const handleC2 = (e) => {
        setseclectcity(e.target.value);
        

    }
    return (

        <div>
            <select value={countryName1} onChange={handleC}>
                <option value="" disabled>
                    Select country
                </option>
                {countries.map((country,index) => (
                    <option key={index} value={country}>
                        {country}
                    </option>
                ))}
            </select>
            <select value={selectstat} onChange={handleC1} >
                <option value="" disabled>
                    Select state
                </option>
                {states.map((state,index) => (
                    <option key={index} value={state}>
                        {state}
                    </option>
                ))}
            </select>
            <select value={selectcity} onChange={handleC2} >
                <option value="" disabled>
                    Select city
                </option>
                {cities.map((city,index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            {selectcity && selectstat && countryName1 && (
                <div>
                    <p>
                        You selected {selectcity}, {selectstat}, {countryName1}
                    </p>
                </div>
            )}
        </div>
    );
}

export default States;
