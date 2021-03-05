// Importing packages and schemas
const router = require("express").Router();
const Patient = require("../model/Patient")
const WardAdmission = require("../model/WardAdmissions")



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

    // Saving patient details
		try {
    const savedPatient = await patient.save();
    res.json({ error: null, data: { patientName: savedPatient.name } });
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
      res.json({ patients: results})
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
        initial_temperature: req.body.intmp,
        initial_blood_pressure: req.body.inbp,
        initial_pulse_rate: req.body.inpr,
        admitted_by: req.user.name
      });

      // Saving ward admission details
      try {
    const newWardAssignment = await wardAdm.save();
    res.json({ error: null, data: { patientName: newWardAssignment.name } });
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
    res.json({ error: "Invalid user"});
  }
});

// Exporting module
module.exports = router;
