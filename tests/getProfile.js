var expect = require('chai').expect;
//var app = require('../routes/auth');
var app = require('../server');
var request = require('supertest');


//let's set up the data we need to pass to the login method
const userCredentials = {
    email: 'one@ge.com', 
    password: '123'
  }
  //now let's login the user before we run any tests
  var authenticatedUser = request.agent(app);
  before(function(done){
    authenticatedUser
      .post('/signin')
      .send(userCredentials)
      .end(function(err, response){
        expect(response.statusCode).to.equal(302);
        expect('Location', '/home');
        done();
      });
  });
  //this test says: make a POST to the /login route with the email: sponge@bob.com, password: garyTheSnail
  //after the POST has completed, make sure the status code is 200 
  //also make sure that the user has been directed to the /home page

  describe('GET /home', function(done){
    //addresses 1st bullet point: if the user is logged in we should get a 200 status code
      it('should return a 200 response if the user is logged in', function(done){
        authenticatedUser.get('/home')
        .expect(200, done);
      });
    //addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
      it('should return a 302 response and redirect to /login', function(done){
        request(app).get('/home')
        .expect('Location', '/login')
        .expect(302, done);
      });
    });