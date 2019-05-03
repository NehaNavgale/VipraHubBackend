var mongoose = require('mongoose');

let uri = 'mongodb+srv://naveena:naveena@cluster0-6rknx.mongodb.net/viprahub?retryWrites=true';
mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on("connected", () => {
  console.log("Connection Sucessfull");
});
