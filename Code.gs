/*
  ASTU Muslim Students Jemea
  Google Apps Script backend

  SETUP:
  1. Create a Google Sheet.
  2. Rename the first sheet to: Students
  3. Put these headers in row 1:
     Timestamp | Registration ID | Full Name | Phone | Email | Telegram |
     UGR / Student ID | Department / Program | Year | Interests | Note
  4. Open Extensions -> Apps Script.
  5. Paste this code.
  6. Deploy -> New deployment -> Web app.
  7. Execute as: Me
  8. Who has access: Anyone
  9. Copy the /exec URL into script.js as SCRIPT_URL.
*/

const SHEET_NAME = "Students";

function doPost(e) {
  try {
    const sheet = getSheet_();
    const params = e && e.parameter ? e.parameter : {};

    // Basic honeypot protection.
    if (params.website) {
      return jsonResponse_({ success: false, message: "Rejected." });
    }

    const fullName = clean_(params.fullName);
    const phone = clean_(params.phone);
    const email = clean_(params.email).toLowerCase();

    if (!fullName || !phone || !email) {
      return jsonResponse_({
        success: false,
        message: "Required fields are missing."
      });
    }

    const registrationId = createRegistrationId_();

    sheet.appendRow([
      new Date(),
      registrationId,
      fullName,
      phone,
      email,
      clean_(params.telegram),
      clean_(params.studentId),
      clean_(params.department),
      clean_(params.year),
      clean_(params.interests),
      clean_(params.note)
    ]);

    return jsonResponse_({
      success: true,
      registrationId
    });

  } catch (error) {
    console.error(error);

    return jsonResponse_({
      success: false,
      message: "Server error."
    });
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);

    sheet.appendRow([
      "Timestamp",
      "Registration ID",
      "Full Name",
      "Phone",
      "Email",
      "Telegram",
      "UGR / Student ID",
      "Department / Program",
      "Year",
      "Interests",
      "Note"
    ]);
  }

  return sheet;
}

function createRegistrationId_() {
  const random = Math.floor(1000 + Math.random() * 9000);
  const date = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyyMMdd"
  );

  return `ASTU-${date}-${random}`;
}

function clean_(value) {
  return String(value || "").trim();
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
