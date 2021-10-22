//load the modules
const express = require(`express`)
const cors = require(`cors`)
const http = require(`http`)
const path = require(`path`)

//global vars
const PORT = process.env.PORT || 5000
process.setMaxListeners(100)

//create the server app -> use the modules
let app = express()
app.use(cors())
app.use(express.json())

//create static folder with read access
app.use(express.static(__dirname + '/build/'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


//routes
app.use('/api/categories', require('./routes/categories'))
app.use('/api/users', require('./routes/users'))
app.use('/api/topics', require('./routes/topics'))
app.use('/api/comments', require('./routes/comments'))
app.use('/api/types_users', require('./routes/types_users'))

//send back the index.html in the static "build" folder
app.get(`/*`, (req, res) => res.sendFile(path.join(__dirname))) 

//apply the http server -> use the http
const server = http.createServer(app)

//run the server
server.listen(PORT, () => { console.log(`the server is live at http://localhost:${PORT}`) })


