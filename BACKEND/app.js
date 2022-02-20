const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require("path");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const nocache = require("nocache")


const userRoutes = require("./routes/user.routes")
// const commentRoutes = require("./routes/comment.routes")
// const postRoutes = require("./routes/post.routes")

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(helmet())
app.use(cookieSession({
    name: 'session',
    keys: process.env.COOKIE_KEYS,
    cookie: {
        secure: true,
        httpOnly: true
    }
}));
app.use(nocache())
const db = require("./models")
db.sequelize.sync()


app.use("/images", express.static(path.join(__dirname, "images")))
app.use('/api/auth', userRoutes); //pour tout les routes utilisateur mettre api/auth
// app.use('/api/post', postRoutes);
// app.use('/api/comments', commentRoutes);

module.exports = app;