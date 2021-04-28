const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/postManagerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
err => {
  if (!err) {
    console.log('Mongodb connection success');
  }
  else {
    console.log('Error while connecting Mongodb :' + JSON.stringify(err,undefined,2));
  }
})
