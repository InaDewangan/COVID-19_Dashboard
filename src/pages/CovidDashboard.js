import React, { useEffect, useState } from "react";
import {
    fetchHistoricalData,
    fetchCountries,
    fetchCountryDetails,
} from "../utils/api";
import Navbar from "./Navbar";
import LineChartCard from "../components/LineChartCard";
import PieChartCard from "../components/PieChartCard";
import StatCards from "../components/StatCards";
import "./CovidDashboard.css";

const CovidDashboard = ({ currentUser }) => {
    const [selectedCountry, setSelectedCountry] = useState("us");
    const [countries, setCountries] = useState([]);
    const [covidData, setCovidData] = useState(null);
    const [countryInfo, setCountryInfo] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch list of countries on first render
    useEffect(() => {
        const loadCountries = async () => {
            const data = await fetchCountries();
            setCountries(data);
        };
        loadCountries();
    }, []);

    // Fetch COVID data and country details when selected country changes
    useEffect(() => {
        const loadData = async () => {
            const covid = await fetchHistoricalData(selectedCountry);
            const info = await fetchCountryDetails(selectedCountry);
            setCovidData(covid);
            setCountryInfo(info);
        };
        if (selectedCountry) loadData();
    }, [selectedCountry]);

    // Auto-select country based on search term match
    useEffect(() => {
        const matched = countries.find(
            (c) => c.name.toLowerCase() === searchTerm.toLowerCase()
        );
        if (matched) {
            setSelectedCountry(matched.code);
            alert(`Country selected: ${matched.name}`);
        }
    }, [searchTerm, countries]);

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    // Get the most recent date in the dataset
    const lastUpdated = covidData?.timeline?.cases
        ? Object.keys(covidData.timeline.cases).slice(-1)[0]
        : "N/A";

    // Build chart data from timeline
    const generateChartData = () => {
        const { cases, deaths, recovered } = covidData?.timeline || {};
        if (!cases || !deaths || !recovered) return [];

        return Object.keys(cases).map((date) => ({
            date,
            cases: cases[date],
            deaths: deaths[date],
            recovered: recovered[date],
        }));
    };

    const chartData = generateChartData();

    // Get the latest stats (cases, deaths, recovered) for stat cards
    const latestStats =
        chartData.length > 0 ? chartData[chartData.length - 1] : {};

    // Prepare pie chart data using latest stats and population
    const getPieData = () => {
        if (!countryInfo || !latestStats) return [];
        const totalCases = latestStats.cases || 0;
        const deaths = latestStats.deaths || 0;
        const recovered = Math.round((totalCases - deaths) * 0.9);
        latestStats.recovered = recovered;

        return [
            { name: "Total Cases", value: totalCases > 0 ? totalCases : 0 },
            { name: "Recovered", value: recovered > 0 ? recovered : 0 },
            { name: "Deaths", value: deaths > 0 ? deaths : 0 },
        ];
    };

    const pieData = getPieData();

    return (
        <div className="dashboard-container">
            <Navbar currentUser={currentUser} />
            <h1 className="dashboard-title">🌍 COVID-19 Dashboard</h1>

            {/* Country search and selector */}
            <div className="selector">
                <label>Search Country:</label>
                <input
                    type="text"
                    placeholder="Type country name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={selectedCountry} onChange={handleCountryChange}>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Stat cards showing latest data */}
            <StatCards
                cases={latestStats.cases}
                recoveries={latestStats.recovered}
                deaths={latestStats.deaths}
                population={countryInfo?.population}
                capital={countryInfo?.capital}
                region={countryInfo?.region}
            />

            {/* Charts Section */}
            <div className="charts-row">
                <LineChartCard chartData={chartData} />
                <PieChartCard data={pieData} />
            </div>

            {/* Last updated date */}
            <p className="updated-time">Last Updated: {lastUpdated}</p>
        </div>
    );
};

export default CovidDashboard;
