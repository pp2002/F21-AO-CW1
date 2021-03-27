// Importing packages and schemas
const router = require("express").Router();
const Patient = require("../model/Patient")
const WardAdmission = require("../model/WardAdmissions")
const User = require("../model/User")
const { registrationValidation, loginValidation, patientValidation, wardAdminValidation} = require("../validation");



router.get("/", (req, res) => {
	if(req.user.designation == "clerk") {
    // Displaying dashboard for clerk
		res.json({
    	error: null,
    	data: {
      	title: "My clerk dashboard",
      	content: "clerk content",
      	user: req.user,
    	}
  	}); 
	}
	else if (req.user.designation == "doctor") {
    // Displaying dashboard for doctor
		res.json({
    	error: null,
    	data: {
      	title: "My doctor dashboard",
      	content: "doctor content",
      	user: req.user,
    	}
  	}); 
	}
	else if (req.user.designation == "nurse") {
    // Displaying dashboard for nurse
		res.json({
    	error: null,
    	data: {
      	title: "My nurse dashboard",
      	content: "nurse content",
      	user: req.user,
    	}
  	}); 
	}
	else {
    res.json({
      error: "Invalid user"
    });
	}
});

// Register patient endpoint - accessible by clerks only
router.post('/registerPatient', async (req, res) => {
	if (req.user.designation == "clerk") {
    // Assigning values to patient schema
		const patient = new Patient({
    		name: req.body.name,
    		patient_age: req.body.patient_age,
    		patient_contact_no: req.body.patient_contact_no,
    		patient_disease: req.body.patient_disease,
    		department: req.user.department,
  		});
      const { error } = patientValidation(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const isContactExist = await Patient.findOne({ patient_contact_no: req.body.patient_contact_no });

    // If email exists, error thrown
    if (isContactExist)
      return res.status(400).json({ error: "Patient already exists" });
    // Saving patient details
		try {
    const savedPatient = await patient.save();
    res.status(200).json({ error: null, data: { patientName: savedPatient.name } });
  } catch (error) {
    res.status(400).json({ error });
  }
  	}
    else {
    res.json({ error: "Invalid user"});
  }
});

// Displaying patient details endpoint - accessible by nurses and doctors
router.post('/patientDetails', (req, res) => {
  if(req.user.designation == "nurse" || req.user.designation == "doctor") {
    Patient.find({}, {name: 1, _id: 0, patient_disease: 1, department: 1})
    .then(results => {
      res.json({ patients: results})
    })
  }
  else {
    res.json({ error: "Invalid user"});
  }
});

// Retrieving patient details of one patient - accessible by nurses and doctors - requires them to enter patient contact no
router.post('/singlePatientDetails', (req, res) => {
  if(req.user.designation == "nurse" || req.user.designation == "doctor") {
    Patient.findOne({ patient_contact_no: req.body.patient_contact_no}, {name: 1, _id: 0, patient_disease: 1, department: 1})
    .then(results => {
      res.status(200).json({ patients: results})
    })
  }
  else {
    res.json({ error: "Invalid user"});
  }
});

// Ward admissions endpoint - accessible by nurses and doctors
router.post('/admitPatient', (req, res) => {
  if(req.user.designation == "nurse" || req.user.designation == "doctor") {
     Patient.findOne({ patient_contact_no: req.body.patient_contact_no}, {_id: 0})
    .then( async results => {
      // Assigning inputs to WardAdmission schema
      const wardAdm = new WardAdmission({
        name: results.name,
        patient_age: results.patient_age,
        patient_contact_no: req.body.patient_contact_no,
        patient_disease: results.patient_disease,
        department: req.user.department,
        ward: req.body.ward,
        initial_temperature: req.body.initial_temperature,
        initial_blood_pressure: req.body.initial_blood_pressure,
        initial_pulse_rate: req.body.initial_pulse_rate,
        admitted_by: req.user.name
      });

      const { error } = wardAdminValidation(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const isContactExist = await WardAdmission.findOne({ patient_contact_no: req.body.patient_contact_no });

    // If email exists, error thrown
    if (isContactExist)
      return res.status(400).json({ error: "Patient already exists" });

      // Saving ward admission details
      try {
    const newWardAssignment = await wardAdm.save();
    res.status(200).json({ error: null, data: { patientName: newWardAssignment.name } });
  } catch (error) {
    res.status(400).json({ error });
  }
    })
  }
  else {
    res.json({ error: "Invalid user"});
  }
});


// Updating patient disease details - accessible by nurses and doctors using patient contact no
router.post('/updateDiseaseDetails', (req, res) => {
  if(req.user.designation == "nurse" || req.user.designation == "doctor") {
    Patient.updateOne({ "patient_contact_no": req.body.patient_contact_no }, {$set: { "patient_disease": req.body.disease }})
    .then( () => {
    res.json({"Patient details updated": "success"})
      WardAdmission.updateOne({ "patient_contact_no": req.body.patient_contact_no }, {$set: { "patient_disease": req.body.disease }})
    .then( () => {
      res.json({"Patient and ward details updated": "success"})
    })
    })
  }
  else {
    res.status(400).json({ error: "Invalid user"});
  }
});


router.post('/delete', async (req, res) => {
  WardAdmission.updateOne({"patient_contact_no": "232425"}, {$set: { "patient_disease": "Tubercolosis" }})
  .then(() => {
    
  })

  Patient.updateOne({"patient_contact_no": "232425"}, {$set: { "patient_disease": "Tubercolosis" }})
  .then(() => {
    
  })

  Patient.deleteOne({"patient_contact_no": "987654321"})
  .then(() => {
    
  })

  User.deleteOne({"email": "rahulsgd12345@gmail.com"})
  .then(() => {
    res.json({"cleanup": "success"})
  })

})

// Exporting module
module.exports = router;
