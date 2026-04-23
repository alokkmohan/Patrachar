// ============================================================
// PATRACHAR SHIKSHA SANSTHAN, UP
// Google Apps Script — Student Registration
// ============================================================

var SHEET_ID   = '1jvuYLOyxVv_n0yvb1v4cZHXDozOFInWXPJqqiwa3w8M';
var SHEET_NAME = 'Registration Data';

// ── Main web app entry point ──
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Patrachar Shiksha — Student Registration')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ── Handle POST (JSON body OR iframe form parameters) ──
function doPost(e) {
  try {
    var formData;
    try { formData = JSON.parse(e.postData.contents); } catch(x) {}
    if (!formData || !formData.studentName) {
      formData = e.parameter || {};
    }
    var result = submitForm(formData);
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Add new columns to existing sheet (run once — does NOT delete data) ──
function addNewColumns() {
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  var newHeaders = [
    'Email',
    'Perm Address', 'Perm District', 'Perm State', 'Perm Pin',
    'Temp Address', 'Temp District', 'Temp State', 'Temp Pin'
  ];

  var lastCol = sheet.getLastColumn();
  sheet.getRange(1, lastCol + 1, 1, newHeaders.length).setValues([newHeaders]);
  sheet.getRange(1, lastCol + 1, 1, newHeaders.length)
    .setBackground('#1F4E79')
    .setFontColor('white')
    .setFontWeight('bold')
    .setFontSize(11);
  sheet.autoResizeColumns(lastCol + 1, newHeaders.length);

  Logger.log('New columns added: S to AA');
}

// ── One-time full sheet setup (clears all data — use only on fresh sheet) ──
function setupSheet() {
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  sheet.clearContents();

  var headers = [
    'Submission Date', 'District', 'Centre Name', 'Centre Code',
    'Class', 'Stream', 'Category',
    'Student Name', 'Father Name', 'Mother Name',
    'Date of Birth', 'Gender', 'Aadhaar No', 'Mobile No',
    'Prev Exam', 'Prev Year', 'Prev Board', 'Fees Submitted',
    'Email',
    'Perm Address', 'Perm District', 'Perm State', 'Perm Pin',
    'Temp Address', 'Temp District', 'Temp State', 'Temp Pin'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#1F4E79')
    .setFontColor('white')
    .setFontWeight('bold')
    .setFontSize(11);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);

  Logger.log('Sheet setup complete!');
}

// ── Submit form data ──
// Sheet columns (27):
//   A  Submission Date      B  District           C  Centre Name
//   D  Centre Code          E  Class               F  Stream
//   G  Category             H  Student Name        I  Father Name
//   J  Mother Name          K  Date of Birth       L  Gender
//   M  Aadhaar No           N  Mobile No           O  Prev Exam
//   P  Prev Year            Q  Prev Board          R  Fees Submitted
//   S  Email
//   T  Perm Address         U  Perm District       V  Perm State
//   W  Perm Pin
//   X  Temp Address         Y  Temp District       Z  Temp State
//   AA Temp Pin
function submitForm(formData) {
  try {
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    var now   = new Date();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Submission Date','District','Centre Name','Centre Code',
        'Class','Stream','Category',
        'Student Name','Father Name','Mother Name',
        'Date of Birth','Gender','Aadhaar No','Mobile No',
        'Prev Exam','Prev Year','Prev Board','Fees Submitted',
        'Email',
        'Perm Address','Perm District','Perm State','Perm Pin',
        'Temp Address','Temp District','Temp State','Temp Pin'
      ]);
    }

    var row = [
      Utilities.formatDate(now, 'Asia/Kolkata', 'dd/MM/yyyy HH:mm'),
      formData.district      || '',
      formData.centreName    || '',
      formData.centreCode    || '',
      formData.classYear     || '',
      formData.stream        || '',
      formData.category      || '',
      formData.studentName   || '',
      formData.fatherName    || '',
      formData.motherName    || '',
      formData.dob           || '',
      formData.gender        || '',
      formData.aadhaar       || '',
      formData.mobile        || '',
      formData.prevExam      || '',
      formData.prevYear      || '',
      formData.prevBoard     || '',
      formData.feesSubmitted || '',
      formData.email         || '',
      formData.permAddr1     || '',
      formData.permDistrict  || '',
      formData.permState     || '',
      formData.permPin       || '',
      formData.tempAddr1     || '',
      formData.tempDistrict  || '',
      formData.tempState     || '',
      formData.tempPin       || ''
    ];

    sheet.appendRow(row);

    var newRow = sheet.getLastRow();
    sheet.getRange(newRow, 1, 1, row.length)
      .setFontSize(10)
      .setVerticalAlignment('middle');

    return { success: true };

  } catch(err) {
    return { success: false, error: err.toString() };
  }
}
