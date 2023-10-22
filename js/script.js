// Import required modules
const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

// Set up a route to handle thumbnail requests 
app.get('/thumbnail', async (req, res) => {

  // Get video ID from request parameters
  const videoId = req.query.v;
  
  // Use ytdl to fetch thumbnail URL 
  const thumbnailUrl = ytdl.getURLVideoID(videoId).thumb;

  // Set thumbnail as response
  res.redirect(thumbnailUrl);

});
// Add ability to search videos
const ytsr = require('ytsr');

app.get('/search', async (req, res) => {

  const searchTerm = req.query.q;
  
  const searchResults = await ytsr(searchTerm);
  
  // Send top 5 results
  res.send(searchResults.items.slice(0, 5));

});
// Allow choosing thumbnail size

app.get('/thumbnail', async (req, res) => {

    const videoId = req.query.v;
    const size = req.query.size || 'medium';
  
    let thumbnailUrl;
  
    if (size === 'small') {
      thumbnailUrl = ytdl.getURLVideoID(videoId).thumb_120; 
    } else if (size === 'large') {
      thumbnailUrl = ytdl.getURLVideoID(videoId).thumb_480;
    } else {  
      thumbnailUrl = ytdl.getURLVideoID(videoId).thumb; // medium
    }
  
    res.redirect(thumbnailUrl);
  
  });
  // Cache thumbnails

const thumbnailCache = {};

app.get('/thumbnail', async (req, res) => {

  const videoId = req.query.v;
  const size = req.query.size;
  
  const cacheKey = `${videoId}_${size}`;

  if (thumbnailCache[cacheKey]) {
    res.redirect(thumbnailCache[cacheKey]);
    return;
  }

  // Fetch and cache
  // ...

  thumbnailCache[cacheKey] = thumbnailUrl;
  res.redirect(thumbnailUrl);

});

// Serve static CSS and image files
app.use(express.static('public')); 

// Start the server
app.listen(3000);