let mongoose = require("mongoose");
const Patient = require("../model/Patient");



let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

var expect = require('chai').expect;
chai.use(chaiHttp);


describe('Patient Details', () => {

    it('should work only if valid contact number is entered by nurse or doctor', () => {
        let patient_deets = {
            patient_contact_no: "232425"
        }
      chai.request(server)
      .post('/api/dashboard/singlePatientDetails')
      .send(patient_deets)
      .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwgc3ZtIiwiZGVzaWduYXRpb24iOiJkb2N0b3IiLCJkZXBhcnRtZW50IjoiT1BEIiwiaWQiOiI2MDQyMzAyMjYyMTNlNDQ1YTRhZjZkN2QiLCJpYXQiOjE2MTY3MDY2Mjd9.MQ7r8doLsrSFRhj8CXjiC_EUEkYBlIbmz7FOztkimns')
      .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("patients");
      })
      .catch(function (err) {
          console.log(err.message);
      });

     
    });

    it('should return null only if invalid contact number is entered by nurse or doctor', () => {
        let patient_deets = {
            patient_contact_no: "9876"
        }
      chai.request(server)
      .post('/api/dashboard/singlePatientDetails')
      .send(patient_deets)
      .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwgc3ZtIiwiZGVzaWduYXRpb24iOiJkb2N0b3IiLCJkZXBhcnRtZW50IjoiT1BEIiwiaWQiOiI2MDQyMzAyMjYyMTNlNDQ1YTRhZjZkN2QiLCJpYXQiOjE2MTY3MDY2Mjd9.MQ7r8doLsrSFRhj8CXjiC_EUEkYBlIbmz7FOztkimns')
      .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.include({patients: null});
      })
      .catch(function (err) {
          console.log(err.message);
      });

     
    });
    

});


