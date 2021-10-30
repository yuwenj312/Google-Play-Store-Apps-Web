const mongoose = require('mongoose');

//connect to db
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useFindAndModify: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).then(() => console.log("nosql db connected established"))
.catch(err => console.log("nosql db connection error: ", err))
