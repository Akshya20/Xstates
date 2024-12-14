import { useState } from "react";
import { useEffect } from "react";




function States() {
    const [countries, setcountry] = useState([]);
    const [countryName1, setselectcount] = useState("");
    const [states, setstat] = useState([]);
    const [selectstat, setselectstat] = useState("");
    const [cities, setcity] = useState([]);
    const [selectcity, setseclectcity] = useState("");
    const [loading, setloading] = useState(false);
    const fetchData = async () => {
        try {
            const response = await fetch(` https://crio-location-selector.onrender.com/countries`);
            const Data = await response.json();
            setcountry(Data);
        } catch {

        }
    }
    const fetchstat = async (countryName) => {
        try {
            const response1 = await fetch(` https://crio-location-selector.onrender.com/country=${countryName}/states`);
            const Data1 = await response1.json();
            setstat(Data1);
        } catch {

        }



    }
    const fetchCity = async (countryName, stateName) => {
        try {
            const response2 = await fetch(` https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
            const Data2 = await response2.json();
            setcity(Data2);
        } catch {

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
        setloading(true);

    }
    return (

        <div>
            <select value={countryName1} onChange={handleC}>
                <option value="" disabled>
                    Select country
                </option>
                {countries.map((country) => (
                    <option key={country.key} value={country.value}>
                        {country}
                    </option>
                ))}
            </select>
            <select value={selectstat} onChange={handleC1}>
                <option value="" disabled>
                    Select state
                </option>
                {states.map((state) => (
                    <option key={state.key} value={state.value}>
                        {state}
                    </option>
                ))}
            </select>
            <select value={selectcity} onChange={handleC2}>
                <option value="" disabled>
                    Select city
                </option>
                {cities.map((city) => (
                    <option key={city.key} value={city.value}>
                        {city}
                    </option>
                ))}
            </select>
            <div>
                {
                    loading ? (
                        <p>"You Selected {selectcity}, {selectstat}, {countryName1}"</p>
                    ) : (
                        null
                    )
                }
            </div>
        </div>
    );
}

export default States;