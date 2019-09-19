const express = require('express')
const server = express()
const port = 3000
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
const morgan = require('morgan')
const helmet = require('helmet')

server.use(helmet())


var session = require("express-session")

server.use(express.static("public"))
server.use(passport.initialize())
server.use(passport.session())

server.get('/', (req, res) => res.send())


var strategy = new LocalStrategy({ usernameField: 'email' },
    function (email, password, done) {
     console.log(email)
    }
)

passport.use(strategy);

server.post('/login',
  passport.authenticate('local', { failureRedirect: '/main.html' }),
  function(req, res) {
    res.redirect('/main.html');
  });



server.post('/signUp', passport.authenticate('local'),
  passport.authenticate('local', { failureRedirect: '/main.html' }),
  function(req, res) {
    res.redirect('/main.html');
  });

var listener = server.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

server.post('/record',
            morgan.token('type', function (req, res) { return req.headers[':date[web]'] }))
