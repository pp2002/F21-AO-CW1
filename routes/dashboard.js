const router = require("express").Router();
const Patient = require("../model/Patient")
const WardAdmission = require("../model/WardAdmissions")
// global.dept = ""

// dashboard route
router.get("/", (req, res) => {
	if(req.user.designation == "clerk") {
    // global.dept = req.user.department
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

	}
});

router.post('/registerPatient', async (req, res) => {
	if (req.user.designation == "clerk") {
		const patient = new Patient({
    		name: req.body.name,
    		patient_age: req.body.patient_age,
    		patient_contact_no: req.body.patient_contact_no,
    		patient_disease: req.body.patient_disease,
    		department: req.user.department,
  		});
		try {
    const savedPatient = await patient.save();
    res.json({ error: null, data: { patientId: savedPatient._id } });
  } catch (error) {
    res.status(400).json({ error });
  }
  	}
});

router.post('/patientDetails', (req, res) => {
  if(req.user.designation == "nurse") {
    Patient.find({})
    .then(results => {
      res.json({ patients: results})
    })
  }
});

router.post('/singlePatientDetails', (req, res) => {
  if(req.user.designation == "nurse") {
    Patient.findOne({ patient_contact_no: req.body.patient_contact_no}, {name: 1, _id: 0, patient_disease: 1, department: 1})
    .then(results => {
      res.json({ patients: results})
    })
  }
});


router.post('/admitPatient', (req, res) => {
  if(req.user.designation == "nurse") {
     Patient.findOne({ patient_contact_no: req.body.patient_contact_no}, {_id: 0})
    .then( async results => {
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
      try {
    const newWardAssignment = await wardAdm.save();
    res.json({ error: null, data: { patientName: newWardAssignment.name } });
  } catch (error) {
    res.status(400).json({ error });
  }

    })
  }
});

router.post('/updateDiseaseDetails', (req, res) => {
  if(req.user.designation == "nurse") {
    Patient.updateOne({ "patient_contact_no": req.body.patient_contact_no }, {$set: { "patient_disease": req.body.disease }})
    .then( () => {
      res.json({"Update": "success"})
    })
  }  
});


module.exports = router;
