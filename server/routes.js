var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  var query = `
    SELECT DISTINCT Category AS genre
    FROM new_table;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  var inputGenre = req.params.genre;
  var query = `SELECT P.App, P.Rating,
         CASE WHEN U.Average_Polarity > 0 then "Positive"
              WHEN U.Average_Polarity = 0 then "Neutral" 
              ELSE "Negative" END AS Average_Sentiment_Polarity
     FROM new_table P JOIN (SELECT App, AVG(Sentiment_Polarity) as Average_Polarity FROM User_review GROUP BY App) U ON P.App=U.App
     WHERE P.Category = '${inputGenre}'
     ORDER BY P.Reviews DESC, P.Rating DESC, P.Installs DESC
     LIMIT 10;
   `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  var inputVal = req.params.title;
  var query = `
  WITH temp AS (SELECT App, Rating, Category FROM schema_1.Play_store WHERE App LIKE '%${inputVal}%' ORDER BY Rating DESC LIMIT 1),
  S AS (SELECT App, Category, Rating, Reviews FROM schema_1.Play_store WHERE Rating>=4.5),
  p2 AS (SELECT App, Category, Rating, Reviews, Price FROM schema_1.Play_store),
  Q AS (SELECT AVG(S.Reviews) AS Reviews FROM S JOIN temp AS T ON S.Category = T.Category)
  SELECT DISTINCT p2.App AS App, p2.Category AS Category, p2.Rating AS Rating, p2.Price AS Price
  FROM Q JOIN  p2 
  ON p2.Reviews>=Q.Reviews
  ORDER BY p2.Rating DESC, p2.Price
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- Plot part ---- */
function getAllCategory(req, res) {
  var query = `
    SELECT DISTINCT Category AS genre
    FROM Play_store;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getCategoryRating(req, res) {
  var inputCategory = req.params.category;
  var query = `
  SELECT Rating FROM schema_1.Play_store
  WHERE Category = '${inputCategory}'
   `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};



/* ----Search ---- */
function getMatchedApps(req, res) {
  var inputKeyword = req.params.keyword;
  var query = `
    SELECT App, Category, Rating, Price, App_id
    FROM schema_1.new_table
    WHERE App LIKE "%${inputKeyword}%"
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getMatchedType(req, res) {
  var inputKeyword = req.params.keyword;
  var type = req.params.type;
  console.log(type);
  if (type == "free"){
    var query = `
      SELECT App, Category, Rating, Price, App_id
      FROM schema_1.new_table
      WHERE App LIKE "%${inputKeyword}%" AND Price = 0
    `;
  } else if (type == "paid"){
    var query = `
      SELECT App, Category, Rating, Price, App_id
      FROM schema_1.new_table
      WHERE App LIKE "%${inputKeyword}%" AND Price <> 0
    `;
  }

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function getAllApps(req, res) {
  var query = `
    SELECT App, Category, Rating, Price, App_id
    FROM schema_1.new_table
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function getAllFreeApps(req, res) {
  var query = `
    SELECT App, Category, Rating, Price, App_id
    FROM schema_1.new_table
    WHERE Price = 0
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function getAllPaidApps(req, res) {
  var query = `
    SELECT App, Category, Rating, Price, App_id
    FROM schema_1.new_table
    WHERE Price <> 0
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function getAppById(req, res) {
  var inputAppId = req.params.id;
  var query = `
    SELECT * 
    FROM schema_1.new_table
    WHERE App_id=${inputAppId};
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function getReviewsById(req, res) {
  var inputAppId = req.params.id;
  var query = `
    SELECT Translated_Review
    FROM schema_1.new_table p JOIN schema_1.User_review u ON p.App=u.App
    WHERE p.App_id=${inputAppId}
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function getPicUrlsById(req, res) {
  var inputAppId = req.params.id;
  var query = `
    SELECT url
    FROM schema_1.new_table a
    JOIN schema_1.App_pics b ON INSTR(b.Category, a.Category) > 0
    WHERE a.App_id=${inputAppId};
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getPicUrlsByCat(req, res) {
  var inputAppCat = req.params.cat;
  var query = `
    SELECT url
    FROM schema_1.App_pics a
    WHERE a.Category like '%${inputAppCat}%';
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};



// The exported functions, which can be accessed in index.js.
module.exports = {
  getAllGenres: getAllGenres,
  getTopInGenre: getTopInGenre,
  getRecs: getRecs,
  getAllCategory: getAllCategory,
  getCategoryRating: getCategoryRating,
  getMatchedApps: getMatchedApps,
  getMatchedType: getMatchedType,
  getAllApps: getAllApps,
  getAllFreeApps: getAllFreeApps,
  getAllPaidApps: getAllPaidApps,
  getAppById: getAppById,
  getReviewsById: getReviewsById,
  getPicUrlsById: getPicUrlsById,
  getPicUrlsByCat: getPicUrlsByCat
}
