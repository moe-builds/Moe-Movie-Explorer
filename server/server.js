require("dotenv").config();
const cors = require("cors");
const express = require("express");
const {
  searchMulti,
  getMovie,
  getMovieVideos,
  getTv,
  getTvVideos,
} = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

// Search and discover
app.get("/api/search/multi", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const data = await searchMulti(query);
    res.json(data);
  } catch (error) {
    console.log("Faild to fetch data");
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Movies:

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

app.listen(4000, () => {
  console.log("🔥 Server running on http://localhost:4000");
});
