const cors = require("cors");
const express = require("express");
const {
  searchMulti,
  getMovie,
  getMovieVideos,
  getTv,
  getTvVideos,
  trending,
  topRated,
  movies,
  tvShows,
  tvCredits,
  movieCredits,
} = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

// Search
app.get("/api/search/multi", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const data = await searchMulti(query, 1);
    res.json(data);
  } catch (error) {
    console.log("Faild to fetch data");
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Trending
app.get("/api/trending", async (req, res) => {
  try {
    const data = await trending();
    res.json(data);
  } catch (error) {
    console.log("Error loading trending", error);
    res.status(500).json({ error });
  }
});
// Top Rated
app.get("/api/top_rated", async (req, res) => {
  try {
    const data = await topRated();
    res.json(data);
  } catch (error) {
    console.log("Error loading Top Rated media", error);
    res.status(500).json({ error });
  }
});

// Movies:

app.get("/api/movies", async (req, res) => {
  try {
    const data = await movies();
    res.json(data);
  } catch (error) {
    console.log("Error loading movies", error);
    res.status(500).json({ error });
  }
});

// Get the details of a Movie.
app.get("/api/movie/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getMovie(id);
    res.json(data);
  } catch (error) {
    console.log("failed to fetch the movie", error);
    res.status(500).json({ error: "failed to fetch the movie" });
  }
});

// credits
app.get("/api/movie/credits/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await movieCredits(id);
    res.json(data);
  } catch (error) {
    console.log("failed to fetch videos", error);
    res.status(500).json({ error: "failed to fetch videos" });
  }
});

// Get the videos that belong to a movie.
app.get("/api/movie/videos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getMovieVideos(id);
    res.json(data);
  } catch (error) {
    console.log("failed to fetch movie videos", error);
    res.status(500).json({ error: "failed to fetch movie videos" });
  }
});

// TV Shows:

app.get("/api/tvshows", async (req, res) => {
  try {
    const data = await tvShows();
    res.json(data);
  } catch (error) {
    console.log("Error loading TV Shows", error);
    res.status(500).json({ error });
  }
});

// Get the details of a TV show.
app.get("/api/tv/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getTv(id);
    res.json(data);
  } catch (error) {
    console.log("failed to fetch the TV show", error);
    res.status(500).json({ error: "failed to fetch the TV show" });
  }
});

// Get the videos that belong to a TV show.
app.get("/api/tv/videos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getTvVideos(id);
    res.json(data);
  } catch (error) {
    console.log("failed to fetch videos", error);
    res.status(500).json({ error: "failed to fetch videos" });
  }
});

app.get("/api/tv/credits/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await tvCredits(id);
    res.json(data);
  } catch (error) {
    console.log("failed to fetch videos", error);
    res.status(500).json({ error: "failed to fetch videos" });
  }
});

app.listen(4000, () => {
  console.log("🔥 Server running on http://localhost:4000");
});
