// Google Apps Script: 랜딩페이지의 신청/이벤트를 스프레드시트에 기록합니다.
// 사용법은 README.md 참고.

const SIGNUP_HEADERS = ["time", "role", "email", "name/insta", "category", "goal/followers", "comment", "lang", "sid", "ref"];
const EVENT_HEADERS = ["time", "name", "sample", "answer/on", "lang", "sid", "ref", "ua"];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (d.type === "signup") {
      sheet_(ss, "signups", SIGNUP_HEADERS).appendRow([
        d.ts, d.role, d.email, d.name, d.category, d.extra, d.comment, d.lang, d.sid, d.ref,
      ].map(safe_));
    } else if (d.type === "event") {
      sheet_(ss, "events", EVENT_HEADERS).appendRow([
        d.ts, d.name, d.sample, d.answer !== undefined ? d.answer : d.on, d.lang, d.sid, d.ref, d.ua,
      ].map(safe_));
    }
    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error: " + err);
  }
}

function sheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
  }
  return sh;
}

// 수식 주입 방지: = + - @ 로 시작하는 값은 앞에 ' 를 붙입니다.
function safe_(v) {
  if (v === undefined || v === null) return "";
  const s = String(v).slice(0, 1000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
