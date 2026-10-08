require("dotenv").config();
const axios = require("axios");
const dayjs = require("dayjs");

const readToken = process.env.READ_TOKEN;

// TODO: Feed

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
};
