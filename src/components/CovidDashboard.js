// src/App.js
import React, { useEffect, useState } from "react";
import Header from "./Header";
import StatCard from "./StatCard";
import LineChartCard from "./LineChartCard";
import PieChartCard from "./PieChartCard";
import { fetchCovidData, fetchCountries } from "../utils/api";

function CovidDashboard() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("us");
    const [chartData, setChartData] = useState([]);
    const [totalCases, setTotalCases] = useState(0);

    // Load country list once
    useEffect(() => {
        const getCountries = async () => {
            const countryList = await fetchCountries();
            setCountries(countryList);
        };
        getCountries();
    }, []);

    // Load COVID data when country changes
    useEffect(() => {
        const getCovidData = async () => {
            const data = await fetchCovidData(selectedCountry);
            if (!data || !data.timeline) return;

            const timeline = data.timeline;
            const dates = Object.keys(timeline.cases);
            const years = {};

            dates.forEach((date) => {
                const year = new Date(date).getFullYear();
                if (!years[year]) {
                    years[year] = { year, cases: 0, recoveries: 0, deaths: 0 };
                }
                years[year].cases += timeline.cases[date];
                years[year].recoveries += timeline.recovered[date];
                years[year].deaths += timeline.deaths[date];
            });

            setChartData(Object.values(years));
            const lastDate = dates[dates.length - 1];
            setTotalCases(timeline.cases[lastDate]);
        };

        getCovidData();
    }, [selectedCountry]);

    return (
        <div className="min-h-screen bg-blue-100 p-4">
            <h1 className="text-2xl font-bold mb-4">COVID-19 and Population Dashboard</h1>
            <Header
                countries={countries}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
            />

            {/* Stats */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <StatCard title="Total Cases" value="5M" color="blue" />
                <StatCard title="Recoveries" value="4.2M" color="green" />
                <StatCard title="Deaths" value="0.2M" color="red" />
            </div>

            {/* Charts */}
            <div className="flex flex-col md:flex-row gap-4">
                <LineChartCard data={chartData} />
                <PieChartCard total={totalCases} />
            </div>
        </div>
    );
}

export default CovidDashboard;


// // src/App.js

// import React, { useEffect, useState } from "react";
// import { fetchCovidData, fetchCountries } from "../utils/api";
// import "../App.css";
// import LineChart from "./LineChartCard";
// import PieChart from "./PieChartCard";

// function CovidDashboard() {
//     const [countries, setCountries] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState("usa");
//     const [covidData, setCovidData] = useState(null);
//     const [countryInfo, setCountryInfo] = useState({});
//     const [startDate, setStartDate] = useState("2020-01-01");
//     const [endDate, setEndDate] = useState("2024-12-31");

//     // Fetch countries on load
//     useEffect(() => {
//         const loadCountries = async () => {
//             const data = await fetchCountries();
//             setCountries(data);
//             const defaultInfo = data.find((c) => c.code === "us");
//             setCountryInfo(defaultInfo);
//         };
//         loadCountries();
//     }, []);

//     // Fetch COVID data when country changes
//     useEffect(() => {
//         const loadCovidData = async () => {
//             const data = await fetchCovidData(selectedCountry);
//             setCovidData(data);

//             const info = countries.find((c) => c.code === selectedCountry);
//             if (info) setCountryInfo(info);
//         };
//         if (countries.length > 0) {
//             loadCovidData();
//         }
//     }, [selectedCountry, countries]);

//     return (
//         <div className="container">
//             <h1>COVID-19 and Population Dashboard</h1>

//             {/* Country Dropdown */}
//             <div className="filters">
//                 <input
//                     type="text"
//                     placeholder="Search Country"
//                     list="countries"
//                     onChange={(e) => setSelectedCountry(e.target.value.toLowerCase())}
//                 />
//                 <datalist id="countries">
//                     {countries.map((country) => (
//                         <option value={country.code} key={country.code}>
//                             {country.name}
//                         </option>
//                     ))}
//                 </datalist>

//                 <input
//                     type="date"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                 />
//                 <input
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                 />
//             </div>

//             {/* Cards for Stats */}
//             <div className="cards">
//                 <div className="card blue">
//                     <h3>Total Cases</h3>
//                     <p>{covidData ? covidData.timeline.cases[Object.keys(covidData.timeline.cases).slice(-1)[0]].toLocaleString() : "0"}</p>
//                 </div>
//                 <div className="card green">
//                     <h3>Recoveries</h3>
//                     <p>{covidData ? covidData.timeline.recovered[Object.keys(covidData.timeline.recovered).slice(-1)[0]].toLocaleString() : "0"}</p>
//                 </div>
//                 <div className="card red">
//                     <h3>Deaths</h3>
//                     <p>{covidData ? covidData.timeline.deaths[Object.keys(covidData.timeline.deaths).slice(-1)[0]].toLocaleString() : "0"}</p>
//                 </div>
//             </div>

//             {/* Country Info */}
//             <div className="country-info">
//                 <h2>Country Information</h2>
//                 {countryInfo && (
//                     <ul>
//                         <li><strong>Country:</strong> {countryInfo.name}</li>
//                         <li><strong>Capital:</strong> {countryInfo.capital}</li>
//                         <li><strong>Region:</strong> {countryInfo.region}</li>
//                         <li><strong>Population:</strong> {countryInfo.population?.toLocaleString()}</li>
//                         <li><strong>Languages:</strong> {countryInfo.languages}</li>
//                         {countryInfo.flag && <img src={countryInfo.flag} alt="flag" width="100" />}
//                     </ul>
//                 )}
//             </div>

//             {/* Charts */}
//             <div className="charts">
//                 <div className="chart-box">
//                     <h3>Line Chart</h3>
//                     <LineChart data={covidData} startDate={startDate} endDate={endDate} />
//                 </div>
//                 <div className="chart-box">
//                     <h3>Pie Chart</h3>
//                     <PieChart data={covidData} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CovidDashboard;
