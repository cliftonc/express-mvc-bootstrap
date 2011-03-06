var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var User = new Schema({

  email: {
    type: String,
    index: { unique: true }
  },
  name: String,
  groups: [String],
  roles: [String]
  
});

mongoose.model('User', User);
