const db = require('./models')

const embeddedCrud = async () => {
  try {
    // upsert a blog to add comments to
    const newBlog = await db.Blog.findOneAndUpdate(
      { header: 'I love Mongoose! 🖤' },
      { body: 'you should really try mongoose, it is the bees knees' },
      { upsert: true, new: true }
    )

    // console.log('new blog:', newBlog)

    // CREATE a comment
    // define a new comment object
    // const newComment = {
    //     title: "OMG So true!",
    //     content: 'I am in love with mongoose too!!!!!!'
    // }
    // push the new comment into the subdocument array inside blog
    // newBlog.comments.push(newComment)
    // save the parent doc (this is async)
    // await newBlog.save() // actually save the state of the blog to the db
    // READ a comment
    // finding a subdocument by id (not async)
    // const foundComment = newBlog.comments.id("63d2c24dbc5c1aa6a58092c5")
    // console.log('comment found by id:', foundComment)

    // // UPDATE a comment
    // // modify the comment data (not async)
    // foundComment.title += ' 🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈'
    // // save the parent doc (async)
    // await newBlog.save()

    // DESTROY a comment
    // .remove() is a subdoc instance method, causes a subdoc to self destruct
    // delete the first comment
    newBlog.comments[0].remove() // self destruct sequence initiated
    // save the parent doc (async)
    await newBlog.save() // the comment is removed
  } catch (err) {
    console.log(err)
  }
}

// embeddedCrud()

const referenceCrud = async () => {
  try {
    // CREATE (associate a blog and a user)
    // const newUser = await db.User.findOneAndUpdate(
    //     { name: 'Weston' },
    //     {},
    //     { upsert: true, new: true }
    // )

    // // find a blog to associate
    // const foundBlog = await db.Blog.findOne({}) // find the first blog

    // // in mongoose, we have to manually associate references
    // newUser.blogs.push(foundBlog._id) // ._id avoids wierd express bug
    // foundBlog.blogger = newUser._id // add id to blogger field
    // // when finished we have to save both documents
    // await newUser.save()
    // await foundBlog.save()
    // READing -- query population
    const foundUser = await db.User.findOne({}) // blogs are not populated =(
    // console.log('found user:', foundUser)
    const populatedUser = await db.User.findOne({}).populate('blogs') // pass in a string on the field we want to populate
    // console.log('populated user:', populatedUser)
    const popoulatedBlogger = await db.User.findOne({}).populate({
      path: 'blogs', // field to populate related to user
      populate: {
        path: 'blogger'
      }
    })
    // console.log(popoulatedBlogger.blogs[0].blogger)
    const populatedBlog = await db.Blog.findOne({}).populate('blogger')
    console.log(populatedBlog)
  } catch (err) {
    console.log(err)
  }
}

referenceCrud()
