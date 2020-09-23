const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const Sequelize = require('sequelize');
const { user } = require('./models');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.js')[env];

var sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const errorController = require('./controllers/error');

const app = express();

var myStore = new SequelizeStore({
    db: sequelize,
});
app.use(
        session({
            secret: "my secret",
            store: myStore,
            resave: false,
            proxy: true,
        })
);
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: myStore }));
myStore.sync();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    user.findByPk(1)
    .then(user => {
        req.user = user;
        return next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

app.listen(3000);