require("dotenv").config();
const axios = require("axios");
const dayjs = require("dayjs");

const readToken = process.env.READ_TOKEN;

// TODO: Feed

function shuffle(array) {
  // Iterate from the last element down to the second element
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements using array destructuring
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function trending() {
  const url = "https://api.themoviedb.org/3/trending/all/week";

  const options = {
    method: "GET",
    url: url,
    params: {
      language: "en-US",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${readToken}`,
    },
  };

  try {
    const response = await axios(options);

    return response.data.results.filter((item) =>
      ["movie", "tv"].includes(item.media_type),
    );
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
async function topRated() {
  const movieUrl = "https://api.themoviedb.org/3/movie/top_rated";
  const tvUrl = "https://api.themoviedb.org/3/tv/top_rated";

  const options = {
    method: "GET",
    params: {
      language: "en-US",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${readToken}`,
    },
  };

  try {
    const movieResponse = (await axios(movieUrl, options)).data;
    const tvResponse = (await axios(tvUrl, options)).data;

    const results = [...movieResponse.results, ...tvResponse.results].map(
      (item) => ({
        ...item,
        media_type: item?.first_air_date ? "tv" : "movie",
      }),
    );

    const uniqueResults = Array.from(
      new Map(results.map((item) => [item.id, item])).values(),
    );

    return shuffle(uniqueResults);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
async function movies() {
  const popular = "https://api.themoviedb.org/3/movie/popular";
  const upcoming = "https://api.themoviedb.org/3/movie/upcoming";

  const options = {
    method: "GET",
    params: {
      language: "en-US",
      page: 1,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${readToken}`,
    },
  };

  try {
    const popularResponse = (await axios(popular, options)).data;
    const upcomingResponse = (await axios(upcoming, options)).data;

    const results = [
      ...popularResponse.results,
      ...upcomingResponse.results,
    ].map((item) => ({
      ...item,
      media_type: "movie",
    }));

    const uniqueResults = Array.from(
      new Map(results.map((item) => [item.id, item])).values(),
    );

    return shuffle(uniqueResults);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

async function tvShows() {
  const popular = "https://api.themoviedb.org/3/tv/popular";
  const onAir = "https://api.themoviedb.org/3/tv/on_the_air";

  const options = {
    method: "GET",
    params: {
      language: "en-US",
      page: 1,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${readToken}`,
    },
  };

  try {
    const popularResponse = (await axios(popular, options)).data;
    const onAirResponse = (await axios(onAir, options)).data;

    const results = [...popularResponse.results, ...onAirResponse.results].map(
      (item) => ({
        ...item,
        media_type: "tv",
      }),
    );

    const uniqueResults = Array.from(
      new Map(results.map((item) => [item.id, item])).values(),
    );

    return shuffle(uniqueResults);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

async function searchMulti(query) {
  const url = "https://api.themoviedb.org/3/search/multi";

  // const url = `https://api.themoviedb.org/3/search/movie`;

  const options = {
    method: "GET",
    url: url,
    params: {
      query,
      page: 1,
      language: "en-US",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${readToken}`,
    },
  };

  try {
    const response = await axios(options);

    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
  }
}

async function getMovie(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}`;

  const options = {
    method: "GET",
    url,
    params: {
      language: "en-US",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${readToken}`,
    },
  };

  try {
    const response = await axios(options);

    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
  }
}
async function getTv(id) {
  const url = `https://api.themoviedb.org/3/tv/${id}`;

  const options = {
    method: "GET",
    url,
    params: {
      language: "en-US",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${readToken}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching TV Show data:", error.message);
  }
}

async function getTvVideos(id) {
  const url = `https://api.themoviedb.org/3/tv/${id}/videos`;

  const options = {
    method: "GET",
    url,
    params: {
      language: "en-US",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${readToken}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching TV Show Videos:", error.message);
  }
}
async function getMovieVideos(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos`;

  const options = {
    method: "GET",
    url,
    params: {
      language: "en-US",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${readToken}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching Movie Videos:", error.message);
  }
}

module.exports = {
  searchMulti,
  getMovie,
  getTv,
  getTvVideos,
  getMovieVideos,
  trending,
  topRated,
  movies,
  tvShows,
};
