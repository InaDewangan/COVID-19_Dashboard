// Fetch covid data for selected country
export const fetchCovidData = async (countryCode) => {
    try {
        const response = await fetch(
            `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=1500`
        );
        if (!response.ok) throw new Error("Failed to fetch COVID data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching COVID data:", error);
        return null;
    }
};

// Fetch countires list for dropdown
export const fetchCountries = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();

        // List format: { name: "India", code: "in" }
        return data.map((country) => ({
            name: country.name.common,
            code: country.cca2.toLowerCase(),
        }));
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
};




