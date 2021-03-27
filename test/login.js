let mongoose = require("mongoose");
const User = require("../model/User");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

var expect = require('chai').expect;
chai.use(chaiHttp);


describe('Login', () => {

    it('should be performed when valid credentials are entered', () => {
        let user = {
            email: "rahul@gmail.com",
            password: "rahul123"
        }
      chai.request(server)
      .post('/api/user/login')
      .send(user)
      .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.include({error: null});
          expect(res.body).to.have.property("data");
      })
      .catch(function (err) {
          console.log(err.message);
      });

     
    });

    it('should not be performed when invalid credentials are entered', () => {
        let user = {
            email: "rahul@gmail.com",
            password: "rahul12"
        }
      chai.request(server)
      .post('/api/user/login')
      .send(user)
      .then(function (res) {
          expect(res).to.have.status(400);
          expect(res.body).to.include({error: "Incorrect password"});
          expect(res.body).to.not.have.property("data"); 
      })
      .catch(function (err) {
          console.log(err.message);
      });

     
    });

});



