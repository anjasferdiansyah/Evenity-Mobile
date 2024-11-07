export const fetchCities = async ({setError, setIsLoading, selectedProvinceId, setAvailableCities, isMounted}) => {
    setError(null);
    setIsLoading(true);

    try {
        if (!selectedProvinceId) return;
        const response = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinceId}.json`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
            setAvailableCities(data);
        }
    } catch (error) {
        if (isMounted) {
            setError(`Error fetching cities: ${error.message}`);
            console.error("Error fetching cities:", error);
        }
    } finally {
        if (isMounted) {
            setIsLoading(false);
        }
    }
};

export const fetchDistricts = async ({setError, setIsLoading, selectedCityId, isMounted, setAvailableDistricts}) => {
    setError(null);
    setIsLoading(true);

    try {
        if (!selectedCityId) return;
        const response = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedCityId}.json`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
            setAvailableDistricts(data);
        }
    } catch (error) {
        if (isMounted) {
            setError(`Error fetching districts: ${error.message}`);
            console.error("Error fetching districts:", error);
        }
    } finally {
        if (isMounted) {
            setIsLoading(false);
        }
    }
}

export const provinceData = [
    {label: "JAWA BARAT", value: "32", name: "JAWA BARAT"},
    {label: "JAWA TENGAH", value: "33", name: "JAWA TENGAH"},
    {label: "JAWA TIMUR", value: "35", name: "JAWA TIMUR"},
    {label: "DKI JAKARTA", value: "31", name: "DKI JAKARTA"},
    {label: "D.I YOGYAKARTA", value: "34", name: "D.I YOGYAKARTA"},
];
