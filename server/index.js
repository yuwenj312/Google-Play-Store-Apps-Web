const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

require('dotenv').config();
require("./db/connectDB");

const app = express();

//import routes
//const authRoutes = require("./routes/auth");
const {verifyToken,signup, activateAccount, signin, googlelogin, facebooklogin, authJwt} = require("./controllers/auth");

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());



/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */




/* ---- (Dashboard) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.
app.get('/genres', routes.getAllGenres);






/* ---- Q1b (Dashboard) ---- */
app.get('/genres/:genre', routes.getTopInGenre); // Hint: Replace () => {} with the appropriate route handler.








/* ---- Q2 (Recommendations) ---- */
app.get('/rec/:title', routes.getRecs);





/* ---- Plot ---- */
app.get('/category', routes.getAllCategory);




app.get('/category/:category', routes.getCategoryRating);





/* ---- Search ---- */
app.get('/search/:keyword', routes.getMatchedApps);

app.get('/search/:keyword/:type', routes.getMatchedType);

app.get('/searchall', routes.getAllApps);

app.get('/searchallfree', routes.getAllFreeApps);

app.get('/searchallpaid', routes.getAllPaidApps);

app.get('/searchapp/:id', routes.getAppById);

app.get('/reviews/:id', routes.getReviewsById);

app.get('/pictures/:id', routes.getPicUrlsById);

app.get('/catpictures/:cat', routes.getPicUrlsByCat);


//middlewares
//app.use('/api', authRoutes);
app.post('/signup', signup)
app.post('/signin', signin)
app.use('/api/googlelogin', googlelogin)
app.post('/api/facebooklogin', facebooklogin)
app.use(verifyToken)




app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
