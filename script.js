import patientData from "./patients.json" assert { type: "json" };
import doctorData from "./doctors.json" assert { type: "json" };

const patients = patientData.patients;
const doctors = doctorData.doctors;
let doctorsArray = [];
let selectedDoctorData;

document.getElementById("day").disabled = true;
document.getElementById("time-dropdown").disabled = true;
document.getElementById("doctor-dropdown").disabled = true;

let outputPatients = document.getElementById("patient-dropdown");
document.getElementById("patient-dropdown").onchange = function () {
  selectPatient();
};
let outputDoctors = document.getElementById("doctor-dropdown");
document.getElementById("doctor-dropdown").onchange = function () {
  selectDoctor();
};

let timeSlot = document.getElementById("time-dropdown");

document.getElementById("submit").onclick = function () {
  submitData();
};

for (var i = 0; i < patients.length; i++) {
  var optn = patients[i];
  var el = document.createElement("option");
  el.textContent = optn.patientName;
  el.value = optn.patientName;
  outputPatients.appendChild(el);
}

function selectPatient() {
  document.getElementById("doctor-dropdown").disabled = false;
  document.getElementById("day").disabled = false;
  document.getElementById("time-dropdown").disabled = false;
  let dropdown = document.getElementById("patient-dropdown");
  let docId = "";
  doctorsArray = [];
  let selectedIndex = dropdown.selectedIndex;
  let selectedValue = dropdown.options[selectedIndex].text;
  let availableSlot;

  for (var i = 0; i < patients.length; i++) {
    var optn = patients[i];
    if (optn.patientName == selectedValue) {
      docId = optn.doctorId;
    }
  }

  while (outputDoctors.options.length) {
    outputDoctors.remove(0);
  }

  while (timeSlot.options.length) {
    timeSlot.remove(0);
  }

  for (var i = 0; i < doctors.length; i++) {
    var optn = doctors[i];
    doctorsArray.push(doctors[i].doctorName);
    if (doctors[i].doctorId == docId) {
      selectedDoctorData = doctors[i];
      availableSlot = doctors[i].available.time;
    }
  }

  doctorsArray = doctorsArray.filter((item) => item !== docId);
  doctorsArray.splice(0, 0, docId);

  for (var i = 0; i < doctorsArray.length; i++) {
    var optn = doctorsArray[i];
    var el = document.createElement("option");
    el.textContent = optn;
    el.value = optn;

    outputDoctors.appendChild(el);
  }

  for (var i = 0; i < availableSlot.length; i++) {
    var optn = availableSlot[i];
    var el = document.createElement("option");
    el.textContent = optn;
    el.value = optn;

    timeSlot.appendChild(el);
  }
}

function selectDoctor() {
  let dropdown = document.getElementById("doctor-dropdown");
  let selectedIndex = dropdown.selectedIndex;
  let selectedValue = dropdown.options[selectedIndex].text;

  let availableSlot;

  while (timeSlot.options.length) {
    timeSlot.remove(0);
  }

  for (var i = 0; i < doctors.length; i++) {
    var optn = doctors[i];

    if (optn.doctorName == selectedValue) {
      selectedDoctorData = doctors[i];
      availableSlot = optn.available.time;
    }
  }

  for (var i = 0; i < availableSlot.length; i++) {
    var optn = availableSlot[i];
    var el = document.createElement("option");
    el.textContent = optn;
    el.value = optn;

    timeSlot.appendChild(el);
  }
}

function submitData() {
  let submit = document.getElementById("submit");

  let day = document.getElementById("day");

  if(selectedDoctorData.available.date.includes(day.value)){
    alert('Appointment successfully booked!');
    window.location.reload();
  }else{
    alert('Doctor is not available in selected date and time, Please select a different date');
  }

}
