let mongoose = require("mongoose");
const User = require("../model/User");



let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

var expect = require('chai').expect;
chai.use(chaiHttp);


describe('Registration', () => {

    it('it should POST the user details if they are valid', () => {
        let user = {
            name: "rahul sgdipd",
            email: "rahulsgd12345@gmail.com",
            password: "rahul1234567",
            designation: "nurse",
            department: "AE"
        }
      chai.request(server)
      .post('/api/user/register')
      .send(user)
      .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.include({error: null});
          expect(res.body).to.have.property("data");
          User.deleteOne({email: "rahulsgd12345@gmail.com"})
      })
      .catch(function (err) {
          console.log(err.message);
      });

     
    });

    it('it should not POST the user details if they are invalid', () => {
        let user = {
            name: "rahul sgdipdfgh",
            email: "rahulsgd123456@gmail.com",
            password: "ra",
            designation: "nurse",
            department: "AE"
        }
      chai.request(server)
      .post('/api/user/register')
      .send(user)
      .then(function (res) {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error");
          expect(res.body).to.not.have.property("data");
      })
      .catch(function (err) {
        console.log(err.message);
      });

     
    });
    

});


