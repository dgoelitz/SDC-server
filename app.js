const express = require('express');
const query = require('./queries.js')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES
app.get('/reviews/:reviewId/helpful', (req, res) => {
  query.markHelpful(req.params.reviewId, (err, result) => {
    if (err) {
      console.log('error:', err);
    } else {
      res.send(result);
    }
  });
});

app.get('/reviews', (req, res) => {
  query.getReviews(req.query.product_id, (err, result) => {
    if (err) {
      console.log('error:', err);
    } else {
      res.send(result);
    }
  });
});

app.post('/reviews', (req, res) => {
  query.addReview(req.body, (err, result) => {
    if (err) {
      console.log('error:', err);
    } else {
      res.send(result);
    }
  })
})

app.listen(3000);
