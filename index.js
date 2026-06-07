const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(express.json());

app.get('/shops', async (req, res) => {
  const token = req.headers['x-token'];
  const r = await fetch('https://api.printify.com/v1/shops.json', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await r.json();
  res.json(data);
});

app.get('/products/:shopId', async (req, res) => {
  const token = req.headers['x-token'];
  const r = await fetch(`https://api.printify.com/v1/shops/${req.params.shopId}/products.json`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await r.json();
  res.json(data);
});

app.listen(process.env.PORT || 3000);
