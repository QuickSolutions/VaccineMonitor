import {
  Criteria,
  dataHeaderDateCol,
  dataDetailsHospCol,
  dataDetailsDateCol,
  sessionVaccineDetails,
} from "./Structures.js";
import { hasValidSession, isValidSession, getDateArray } from "./Utils.js";

var xmlhttp = new XMLHttpRequest();

function generateDataHeaderDateCol() {
  let dataHeader = document.getElementById("dataHeader");

  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let today = new Date();
  for (let cnt = 0; cnt < 7; cnt++) {
    dataHeader.appendChild(
      dataHeaderDateCol(today.toLocaleString("en-IN", options), cnt)
    );
    today.setDate(today.getDate() + 1);
  }
}

generateDataHeaderDateCol();

var criteria = new Criteria();

var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var coWinResponse = JSON.parse(this.responseText);

    let hospWithDoseSessions = coWinResponse.centers.filter(
      (hospital) => hasValidSession(hospital.sessions, criteria) == true
    );

    let dataDetails = document.getElementById("dataDetails");

    hospWithDoseSessions.forEach((hospital) => {
      hospital.sessions = hospital.sessions.filter(
        (session) => isValidSession(session, criteria) == true
      );

      let hospRow = document.createElement("TR");
      hospRow.appendChild(dataDetailsHospCol(hospital));
      hospRow = getDataDetailsDateCol(hospital, hospRow);
      dataDetails.appendChild(hospRow);
    });

    let playSoundColl = document.querySelectorAll(".blink");
    if (playSoundColl.length > 0) {
      let auditTag = document.createElement("audio");
      auditTag.autoplay = true;
      auditTag.setAttribute("src", "Dance.mp3");
      auditTag.setAttribute("type", "audio/mp3");
      document.getElementById("demo").append(auditTag);
    }
  }
};

function getDataDetailsDateCol(hospWithDoseSessions, hospRow) {
  //let dateCollection = getDateArray();
  var dateCollection = new Array();

  var today = new Date();
  var todayStr =
    today.getFullYear() +
    (today.getMonth() > 9
      ? today.getMonth() + 1
      : "0" + (today.getMonth() + 1)) +
    (today.getDate() > 9 ? today.getDate() : "0" + today.getDate());

  hospWithDoseSessions.sessions.forEach((session) => {
    var dateStr = session.date;
    dateStr =
      dateStr.substring(6, 10) +
      dateStr.substring(3, 5) +
      dateStr.substring(0, 2);

    console.log(dateStr - todayStr);
    let dataColl = dateCollection[dateStr - todayStr];
    if (dataColl == undefined) {
      dataColl = new Array();
    }
    dataColl.push(sessionVaccineDetails(session, criteria));
    dateCollection[dateStr - todayStr] = dataColl;
  });

  console.log(hospWithDoseSessions.name);

  dateCollection.forEach((dateData) => {
    hospRow.appendChild(dataDetailsDateCol(dateData));
  });
  console.log(hospRow);
  return hospRow;
}

var today = new Date();
var todayStr =
  today.getDate() + "-0" + (today.getMonth() + 1) + "-" + today.getFullYear();

xmlhttp.open(
  "GET",
  "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=" +
    criteria.district_id +
    "&date=" +
    todayStr,
  true
);
xmlhttp.send();

setTimeout("location.reload(true);", 1000 * criteria.getRefreshDuration());
