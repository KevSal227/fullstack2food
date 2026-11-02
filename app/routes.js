
const ObjectId = require('mongoose').Types.ObjectId

module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            messages: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// message board routes ===============================================================

    // old post from the boilerplate, it saved a msg but i need the food name and a pic now
    // app.post('/messages', (req, res) => {
    //   db.collection('messages').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
    //     if (err) return console.log(err)
    //     console.log('saved to database')
    //     res.redirect('/profile')
    //   })
    // })

    // posting a new food, name is what the food is and pic is the image link, every food starts at 0 votes
    app.post('/messages', (req, res) => {
      db.collection('messages').insertOne({name: req.body.name, pic: req.body.pic, thumbUp: 0, thumbDown: 0}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    // old thumbs up, it found the post by name and msg so it could grab the wrong one
    // app.put('/messages', (req, res) => {
    //   db.collection('messages')
    //   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    //     $inc: {
    //       thumbUp: 1
    //     }
    //   }, {
    //     sort: {_id: -1},
    //     upsert: true
    //   }, (err, result) => {
    //     if (err) return res.send(err)
    //     res.send(result)
    //   })
    // })

    // thumbs up, finds the food by its id and adds 1 to thumbUp
    app.put('/messages/thumbUp', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({_id: new ObjectId(req.body.id)}, {
        $inc: {
          thumbUp: 1
        }
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    // old thumb down, it took 1 away from thumbUp instead of having its own count
    //    app.put('/messagesDown', (req, res) => {
    //   db.collection('messages')
    //   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    //     $inc: {
    //       thumbUp: -1
    //     }
    //   }, {
    //     sort: {_id: -1},
    //     upsert: true
    //   }, (err, result) => {
    //     if (err) return res.send(err)
    //     res.send(result)
    //   })
    // })

    // thumb down, finds the food by its id and adds 1 to its own thumbDown count
    app.put('/messages/thumbDown', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({_id: new ObjectId(req.body.id)}, {
        $inc: {
          thumbDown: 1
        }
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    // old delete, same problem it found the post by name and msg
    // app.delete('/messages', (req, res) => {
    //   db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    //     if (err) return res.send(500, err)
    //     res.send('Message deleted!')
    //   })
    // })

    // trash, deletes the food with that id
    app.delete('/messages', (req, res) => {
      db.collection('messages').findOneAndDelete({_id: new ObjectId(req.body.id)}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}