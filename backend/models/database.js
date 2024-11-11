const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log('MongoDB is successfully connected');
})
.catch(err => {
    console.log(`Error in DB Connection: ${err}`);
});

module.exports = mongoose;
