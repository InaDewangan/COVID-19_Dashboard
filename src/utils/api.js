// Fetch historical covid data
export const fetchHistoricalData = async (countryCode = "usa") => {
    try {
        const response = await fetch(
            `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=1500`
        );
        const data = await response.json();
        if (!data || !data.timeline) return null;
        return data;
    } catch (error) {
        console.error("Failed to fetch historical data", error);
        return null;
    }
};

// Fetch all countries with name/code
export const fetchCountries = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        if (!Array.isArray(data)) return [];

        // Sort by name A-Z
        return data
            .map((country) => ({
                name: country.name.common,
                code: country.cca2?.toLowerCase() || "us",
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error("Failed to fetch countries", error);
        return [];
    }
};

// Fetch country detail (capital, population etc)
export const fetchCountryDetails = async (countryCode = "us") => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = await response.json();
        const country = data[0];
        return {
            capital: country.capital?.[0] || "N/A",
            population: country.population || "N/A",
            region: country.region || "N/A",
        };
    } catch (error) {
        console.error("Failed to fetch country details", error);
        return null;
    }
};
