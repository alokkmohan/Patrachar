// ============================================================
// PATRACHAR SHIKSHA SANSTHAN, UP
// Google Apps Script — Student Registration (Simple Form)
// ============================================================

var SHEET_ID   = '1jvuYLOyxVv_n0yvb1v4cZHXDozOFInWXPJqqiwa3w8M';
var SHEET_NAME = 'Registration Data';

// ── Main web app entry point ──
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Patrachar Shiksha — Student Registration')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ── Handle POST from GitHub Pages (CORS-compatible) ──
function doPost(e) {
  try {
    var formData = JSON.parse(e.postData.contents);
    var result   = submitForm(formData);
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Submit form data ──
// Sheet columns (18):
//   A  Submission Date
//   B  District
//   C  Centre Name
//   D  Centre Code
//   E  Class
//   F  Stream
//   G  Category
//   H  Student Name
//   I  Father Name
//   J  Mother Name
//   K  Date of Birth
//   L  Gender
//   M  Aadhaar No
//   N  Mobile No
//   O  Prev Exam
//   P  Prev Year
//   Q  Prev Board
//   R  Fees Submitted
function submitForm(formData) {
  try {
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    var now   = new Date();

    // Write header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Submission Date','District','Centre Name','Centre Code',
        'Class','Stream','Category',
        'Student Name','Father Name','Mother Name',
        'Date of Birth','Gender','Aadhaar No','Mobile No',
        'Prev Exam','Prev Year','Prev Board','Fees Submitted'
      ]);
    }

    var row = [
      Utilities.formatDate(now, 'Asia/Kolkata', 'dd/MM/yyyy HH:mm'),
      formData.district     || '',
      formData.centreName   || '',
      formData.centreCode   || '',
      formData.classYear    || '',
      formData.stream       || '',
      formData.category     || '',
      formData.studentName  || '',
      formData.fatherName   || '',
      formData.motherName   || '',
      formData.dob          || '',
      formData.gender       || '',
      formData.aadhaar      || '',
      formData.mobile       || '',
      formData.prevExam     || '',
      formData.prevYear     || '',
      formData.prevBoard    || '',
      formData.feesSubmitted || ''
    ];

    sheet.appendRow(row);

    // Basic formatting
    var newRow = sheet.getLastRow();
    sheet.getRange(newRow, 1, 1, row.length)
      .setFontSize(10)
      .setVerticalAlignment('middle');

    return { success: true };

  } catch(err) {
    return { success: false, error: err.toString() };
  }
}
