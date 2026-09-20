
const Favorite = require('./models/Favorite');


require('dotenv').config();
const mongoose = require('mongoose');


const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());



const PORT = 3000;
app.get('/', (req, res) => {
  res.send('Server radi!');
});

app.get('/favorites', async (req, res) => {
  const favorites = await Favorite.find();
  res.json(favorites);
});

app.post('/favorites', async (req, res) => {

     const existing = await Favorite.findOne({ movieId: req.body.movieId });


    if (existing) {
  return res.json({ message: 'Film je već u favoritima' });
}
  const newFavorite = await Favorite.create(req.body);
  res.json(newFavorite);

  
});

app.delete('/favorites/:id', async (req, res) => {
  const favoriteId = await Favorite.findByIdAndDelete(req.params.id);
  res.json(favoriteId);

 
});


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Povezano sa MongoDB bazom'))
  .catch((error) => console.log('Greška pri povezivanju:', error));

app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});