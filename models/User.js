const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    // an array of ids that reference the blogs that the user has made
    blogs: [
      {
        // tell mongoose that this is a reference
        type: mongoose.Schema.Types.ObjectId,
        // tell mongoose what is being reference
        ref: 'Blog'
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)
