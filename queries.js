const mongoose = require('mongoose');
const reviews = require('./Reviews.js');

mongoose.connect(
  'mongodb://localhost:27018/',
  { useNewUrlParser: true },
  () => console.log('connected to DB!')
);

const query = {
  getReviews: (id, cb) => {
    reviews.find({ product_id: id }, (err, docs) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, docs);
      }
    });
  },

  markHelpful: (reviewId, cb) => {
    reviews.findOneAndUpdate({ review_id: reviewId }, { $inc: {helpful: 1} }, { new: true }, (err, docs) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, docs);
      }
    });
  },

  addReview: (reviewFormObj, cb) => {
    new reviews({
      "product_id": reviewFormObj.product_id,
      "recommended": reviewFormObj.recommend,
      "star_rating": reviewFormObj.rating,
      "helpful": 0,
      "summary": reviewFormObj.summary,
      "body": reviewFormObj.body,
      "response": '',
      "nickname": reviewFormObj.name,
      "photos": reviewFormObj.photos
    }).save((err, docs) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, docs);
      }
    });
  }

  // I have not included 'reported' in my shcema. Teddi told me which ones to include for now
  // and that did not include reported.
  // reportReview: (reviewId, cb) => {
  //   reviews.findOneAndUpdate({ review_id: reviewId }, { $set: {reported: true} }, { new: true }, (err, docs) => {
  //     if (err) {
  //       cb(err, null);
  //     } else {
  //       cb(null, docs);
  //     }
  //   });
  // }
}

module.exports = query;

// const getNextPage = async (page, id, sort) => {
//   // console.log('from inner recursive get next page func: ', sort)
//   const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/?sort=${sort}&page=${page}&count=500&product_id=${id}`;
//   // console.log(url)
//   const response = await axios.get(url);
//   return response.data.results;
// };

// const getReviews = async (id, sort) => {
//   // console.log(sort)

//     const reviews = [];
//     let page = 0;

//     try {
//       do {
//         var onePage = await getNextPage(page + 1, id, sort);
//         reviews.push(onePage);
//         page++;
//       } while (onePage.length > 0);

//       return reviews.flat();
//     }
//     catch (error) {
//       console.log(error);
//     }

// };

// const getReviewsMeta = async (id) => {
//   try {
//     const response = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/meta?product_id=${id}`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const markHelpful = (reviewId, cb) => {
//   axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/${reviewId}/helpful`)
//     .then((response) => {
//       cb(null, response);
//     })
//     .catch((err) => {
//       cb(err, null);
//     });
// };

// const reportReview = (reviewId, cb) => {
//   axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/${reviewId}/report`)
//     .then((response) => {
//       cb(null, response);
//     })
//     .catch((err) => {
//       cb(err, null);
//     });
// };

// const addReview = (reviewFormObj, cb) => {
//   console.log(reviewFormObj);
//   axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews', reviewFormObj)
//     .then((response) => {
//       cb(null, response);
//     })
//     .catch((err) => {
//       cb(err, null);
//     })
// }
