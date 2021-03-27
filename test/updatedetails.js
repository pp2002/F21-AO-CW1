let mongoose = require("mongoose");
const WardAdmin = require("../model/WardAdmissions");



let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

var expect = require('chai').expect;
chai.use(chaiHttp);


describe('Update disease details', () => {

    it('should work only if all valid disease details entered by nurse or doctor', () => {
        let update = {
            patient_contact_no: "232425",
            disease: "Changed to viral fever"
        }
      chai.request(server)
      .post('/api/dashboard/updateDiseaseDetails')
      .send(update)
      .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFodWwgc3ZtIiwiZGVzaWduYXRpb24iOiJkb2N0b3IiLCJkZXBhcnRtZW50IjoiT1BEIiwiaWQiOiI2MDQyMzAyMjYyMTNlNDQ1YTRhZjZkN2QiLCJpYXQiOjE2MTY3MDY2Mjd9.MQ7r8doLsrSFRhj8CXjiC_EUEkYBlIbmz7FOztkimns')
      .then(function (res) {
          expect(res.body).to.include({"Patient details updated": "success"});
      })
      .catch(function (err) {
          console.log(err.message);
      });

     
    });


    
    

});


