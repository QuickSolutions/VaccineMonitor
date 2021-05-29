class Criteria {
  constructor(
    minDoses = 0,
    min_age_limit = 18,
    isDose1 = true,
    vaccine = "COVISHIELD",
    refresh_sec = 30,
    district_id = 363
  ) {
    (this.minDoses = minDoses),
      (this.min_age_limit = min_age_limit),
      (this.isDose1 = isDose1),
      (this.vaccine = vaccine),
      (this.refresh_sec = refresh_sec),
      (this.district_id = district_id);
  }

  setMinDoses(minDoses) {
    this.minDoses = minDoses;
  }

  getMinDoses() {
    return this.minDoses == undefined || this.minDoses == 0 ? 1 : this.minDoses;
  }

  setMinAge(minAge) {
    this.min_age_limit = minAge;
  }

  setDose1(isDose1) {
    this.isDose1 = isDose1;
  }

  setVaccine(vaccine) {
    this.vaccine = vaccine;
  }

  getRefreshDuration() {
    return this.refresh_sec == undefined || this.refresh_sec < 30
      ? 30
      : this.refresh_sec;
  }
}

function dataHeaderDateCol(dateStr, cnt) {
  let th$Date = document.createElement("th");
  th$Date.setAttribute("scope", "col");
  th$Date.classList.add("col-3");
  th$Date.innerHTML = dateStr;
  return th$Date;
}

function dataDetailsHospCol(hospital) {
  let hospCOl = document.createElement("Th");
  hospCOl.setAttribute("scope", "row");
  hospCOl.classList.add("col-3");
  hospCOl.innerHTML = `
                <th scope='row' class='col-3'>
                    ${hospital.name} <BR>
                    ${hospital.address} <BR>
                    ${hospital.pincode}
                </th>            
            `;
  return hospCOl;
}

function dataDetailsDateCol(vaccineDetails) {
  let dateCOl = document.createElement("Td");
  dateCOl.classList.add("col-3");
  dateCOl.classList.add("fs-6");
  let vaccineDetailsStr;
  vaccineDetails.forEach((vaccineDetail) => {
    vaccineDetailsStr =
      vaccineDetailsStr == undefined ? "" : vaccineDetailsStr + "<BR>";
    vaccineDetailsStr = vaccineDetailsStr + vaccineDetail;
  });
  dateCOl.innerHTML = `<d class='col-3 fs-6'>${vaccineDetailsStr}</td>`;
  return dateCOl;
}

function sessionVaccineDetails(session, criteria) {
  let vacInfo;
  switch (criteria.isDose1) {
    case true:
      if (session.available_capacity_dose1 >= criteria.getMinDoses()) {
        vacInfo =
          "<BR> <span id='blink' class='blink'> Dose 1:" +
          session.available_capacity_dose1 +
          "</span>";
      } else {
        vacInfo =
          "<BR> <span> Dose 1:" + session.available_capacity_dose1 + "</span>";
      }
      break;
    case false:
      if (session.available_capacity_dose2 >= criteria.getMinDoses()) {
        vacInfo =
          "<BR> <span id='blink' class='blink'> Dose 2:" +
          session.available_capacity_dose2 +
          "</span>";
      } else {
        vacInfo =
          "<BR> <span> Dose 2:" + session.available_capacity_dose2 + "</span>";
      }
      break;
    default:
      if (session.available_capacity_dose1 >= criteria.getMinDoses()) {
        vacInfo =
          "<BR> <span id='blink' class='blink'>Dose 1:" +
          session.available_capacity_dose1 +
          "</span>";
      } else {
        vacInfo =
          " <BR> <span> Dose 1:" + session.available_capacity_dose1 + "</span>";
      }
      if (session.available_capacity_dose2 >= criteria.getMinDoses()) {
        vacInfo =
          "<BR> <span id='blink' class='blink'> Dose 2:" +
          session.available_capacity_dose2 +
          "</span>";
      } else {
        vacInfo =
          "<BR> <span> Dose 2:" + session.available_capacity_dose2 + "</span>";
      }
      break;
  }
  return `              
                      ${session.vaccine} - 
                      ${session.min_age_limit}                      
                      ${vacInfo}  
              `;
}

export {
  Criteria,
  dataHeaderDateCol,
  dataDetailsHospCol,
  dataDetailsDateCol,
  sessionVaccineDetails,
};
