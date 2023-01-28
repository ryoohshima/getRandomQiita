const express = require('express');
const router = new express.Router();
const axios = require('axios');

router.get('/', async(req, res) => {
  const accessToken = process.env.ACCESS_TOKEN;
  const endpint = process.env.ENDPOINT;
  const today = new Date();
  const lastYear = `${today.getFullYear() - 1}-${today.getMonth() + 1}-${today.getDate()}`
  const query = encodeURI(`created:>${lastYear} stocks:>50`);
  const options = {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
  }
  try {
    const response = await axios.get(`${endpint}?page=1&per_page=100&query=${query}`, options);
    const data = response.data.map(item => {
      return {
        id: item.id,
        title: item.title,
        url: item.url,
      }
    });
    const returnData = data[Math.floor(Math.random() * data.length)]
    res.json(returnData);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;