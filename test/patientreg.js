let mongoose = require("mongoose");
const Patient = require("../model/Patient");


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

var expect = require('chai').expect;

chai.use(chaiHttp);


describe('Patient Registration', () => {

    it('should work only if all valid details entered by clerk', () => {
        let patient = {
            name: "Ram",
            patient_age: "22",
            patient_contact_no: "987654321",
            patient_disease: "TBEFGH",
        }
      chai.request(server)
      .post('/api/dashboard/registerPatient')
      .send(patient)
      .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwgc3YiLCJkZXNpZ25hdGlvbiI6ImNsZXJrIiwiZGVwYXJ0bWVudCI6IkFFIiwiaWQiOiI2MDVjZmFkNTdmYTY2MzQyNzRmM2E2YjciLCJpYXQiOjE2MTY3MDYyODV9.kh_uPErGhJ5hjJTnJgRB2US37Yt-zACOplkM6bWOYKM')
      .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.include({error: null});
          expect(res.body).to.have.property("data");
      })
      .catch(function (err) {
          console.log(err.message);
      });

     
    });

    it('should not work if invalid details entered by clerk', () => {
        let patient = {
            name: "Mehra",
            patient_age: "10",
            patient_contact_no: "123456789",
            patient_disease: "TBEFGH",
        }
      chai.request(server)
      .post('/api/dashboard/registerPatient')
      .send(patient)
      .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwgc3YiLCJkZXNpZ25hdGlvbiI6ImNsZXJrIiwiZGVwYXJ0bWVudCI6IkFFIiwiaWQiOiI2MDVjZmFkNTdmYTY2MzQyNzRmM2E2YjciLCJpYXQiOjE2MTY3MDYyODV9.kh_uPErGhJ5hjJTnJgRB2US37Yt-zACOplkM6bWOYKM')
      .then(function (res) {
          expect(res).to.have.status(400);
          expect(res.body).to.include({error: "Patient already exists"});
      })
      .catch(function (err) {
          console.log(err.message);
      });

     
    });
    

});


