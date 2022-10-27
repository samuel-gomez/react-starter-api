const { API_CURRENCY_URL, API_CURRENCY_KEY } = process.env;

export const baseRoute = `${API_CURRENCY_URL}/?apikey=${API_CURRENCY_KEY}`;
