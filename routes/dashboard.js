const router = require("express").Router();
const Patient = require("../model/Patient")
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

module.exports = router;
