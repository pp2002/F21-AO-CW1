let mongoose = require("mongoose");
const WardAdmin = require("../model/WardAdmissions");



let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

var expect = require('chai').expect;
chai.use(chaiHttp);


describe('Ward Admission', () => {

    it('should work only if all valid details entered by nurse or doctor', () => {
        let wardadmin = {
            patient_contact_no: "123456789",
            ward: "Radiology - ICU",
            initial_temperature: 60,
            initial_blood_pressure: 68,
            initial_pulse_rate: 20
        }
      chai.request(server)
      .post('/api/dashboard/admitPatient')
      .send(wardadmin)
      .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwgc3ZtIiwiZGVzaWduYXRpb24iOiJkb2N0b3IiLCJkZXBhcnRtZW50IjoiT1BEIiwiaWQiOiI2MDQyMzAyMjYyMTNlNDQ1YTRhZjZkN2QiLCJpYXQiOjE2MTY3MDY2Mjd9.MQ7r8doLsrSFRhj8CXjiC_EUEkYBlIbmz7FOztkimns')
      .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.include({error: null});
          expect(res.body).to.have.property("data");
      })
      .catch(function (err) {
          console.log(err.message);
      });

     
    });


    
    it('should work only if all valid details entered by nurse or doctor', () => {
        let wardadmin = {
            patient_contact_no: "232425",
            ward: "Radiology - ICU",
            initial_temperature: 60,
            initial_blood_pressure: 68,
            initial_pulse_rate: 20
        }
      chai.request(server)
      .post('/api/dashboard/admitPatient')
      .send(wardadmin)
      .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwgc3ZtIiwiZGVzaWduYXRpb24iOiJkb2N0b3IiLCJkZXBhcnRtZW50IjoiT1BEIiwiaWQiOiI2MDQyMzAyMjYyMTNlNDQ1YTRhZjZkN2QiLCJpYXQiOjE2MTY3MDY2Mjd9.MQ7r8doLsrSFRhj8CXjiC_EUEkYBlIbmz7FOztkimns')
      .then(function (res) {
          expect(res).to.have.status(400);
          expect(res.body).to.include({error: "Patient already exists"});
          expect(res.body).to.not.have.property("data");
      })
      .catch(function (err) {
        console.log(err.message);
      });

     
    });
    

});


