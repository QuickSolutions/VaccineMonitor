export function isValidSession(session, criteria) {
  if (
    (criteria.min_age_limit == undefined ||
      session.min_age_limit == criteria.min_age_limit) &&
    (criteria.vaccine == undefined || session.vaccine == criteria.vaccine) &&
    (criteria.minDoses == undefined ||
      (criteria.isDose1 &&
        session.available_capacity_dose1 >= criteria.minDoses) ||
      (!criteria.isDose1 &&
        session.available_capacity_dose2 >= criteria.minDoses))
  ) {
    return true;
  } else {
    return false;
  }
}

export function hasValidSession(sessions, criteria) {
  let returnCode = false;
  sessions.forEach((session) => {
    if (!returnCode && isValidSession(session, criteria)) {
      returnCode = true;
    }
  });
  return returnCode;
}

export function getDateArray() {
  var dateArray = new Array();
  var today = new Date();
  for (let cnt = 0; cnt < 7; cnt++) {
    var todayStr =
      today.getFullYear() +
      (today.getMonth() > 9
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1)) +
      (today.getDate() > 9 ? today.getDate() : "0" + today.getDate());

    dateArray[todayStr] = new Array();
    today.setDate(today.getDate() + 1);
  }
  return dateArray;
}
