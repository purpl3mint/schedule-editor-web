const express = require('express')
const config = require('config')
const bcrypt = require('bcrypt')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')
const { model } = require('./db')

const app = express()
app.use(cors())
app.use(express.json())

app.use(fileUpload({}))
app.use('/api', router)

//Middlewares
app.use(errorHandler)

//For production environment
if (process.env.NODE_ENV === 'production') {
  app.use("/", express.static('client/build'));
  app.get("/stat/:file", (req, res) => {
    res.sendFile(path.join(__dirname + '/static/' + req.params.file));
  })
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });

}

//Static files
app.use("/stat", express.static(path.resolve(__dirname, 'static')))

const PORT = process.env.PORT || config.get('port') || 80

const seed = async () => {
  const { count, rows } = await models.User.findAndCountAll()

  if (count === 0) {
    const hashPassword = await bcrypt.hash('password', 5)
    await models.User.create({
      username: 'admin',
      password: hashPassword,
      type: 'admin'
    })
  }

}

const start = async () => {
  try {
    //UNCOMMENT ONLY AFTER INITIALIZING CREDENTIALS IN CONFIG FOR DB
    await sequelize.authenticate()
    await sequelize.sync()
    await seed()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e);
    throw e;
  }
}

start()