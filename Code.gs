// ============================================================
// PATRACHAR SHIKSHA SANSTHAN, UP
// Google Apps Script — Student Registration
// ============================================================

var SHEET_ID        = '1jvuYLOyxVv_n0yvb1v4cZHXDozOFInWXPJqqiwa3w8M';
var SHEET_NAME      = 'Registration Data';
var DASHBOARD_NAME  = 'Dashboard';

// ── Setup Dashboard sheet with live KPI cards ──
// Run this once (or re-run anytime to refresh layout)
function setupDashboardSheet() {
  var ss   = SpreadsheetApp.openById(SHEET_ID);
  var dash = ss.getSheetByName(DASHBOARD_NAME);
  if (!dash) { dash = ss.insertSheet(DASHBOARD_NAME); }

  dash.clearContents();
  dash.clearFormats();

  var reg = "'" + SHEET_NAME + "'";

  // ── Title ──
  dash.getRange('A1:H1').merge()
    .setValue('📊 पत्राचार शिक्षा संस्थान — लाइव डैशबोर्ड')
    .setBackground('#1F4E79').setFontColor('#ffffff')
    .setFontSize(14).setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  dash.setRowHeight(1, 40);

  // ── Row 2: last updated ──
  dash.getRange('A2:H2').merge()
    .setFormula('="अंतिम अपडेट: "&TEXT(NOW(),"dd/mm/yyyy hh:mm")')
    .setBackground('#d6e4f0').setFontColor('#1F4E79')
    .setFontSize(10).setHorizontalAlignment('center');
  dash.setRowHeight(2, 24);

  // ── Helper: make a KPI card across merged columns ──
  // Each card: label row + value row, spanning 2 columns
  function kpiCard(labelCell, valueCell, label, formula, bg, fg) {
    var lRange = dash.getRange(labelCell);
    lRange.setValue(label)
      .setBackground(bg).setFontColor(fg)
      .setFontSize(10).setFontWeight('bold')
      .setHorizontalAlignment('center').setVerticalAlignment('middle');

    var vRange = dash.getRange(valueCell);
    vRange.setFormula(formula)
      .setBackground(bg).setFontColor(fg)
      .setFontSize(22).setFontWeight('bold')
      .setHorizontalAlignment('center').setVerticalAlignment('middle');
  }

  // ── Row 4-5: Main KPI cards (4 cards across A-H, 2 cols each) ──
  dash.setRowHeight(3, 10); // spacer
  dash.setRowHeight(4, 28);
  dash.setRowHeight(5, 44);

  // Merge pairs
  dash.getRange('A4:B4').merge(); dash.getRange('A5:B5').merge();
  dash.getRange('C4:D4').merge(); dash.getRange('C5:D5').merge();
  dash.getRange('E4:F4').merge(); dash.getRange('E5:F5').merge();
  dash.getRange('G4:H4').merge(); dash.getRange('G5:H5').merge();

  kpiCard('A4','A5','📋 कुल पंजीकरण',
    '=COUNTA('+reg+'!A:A)-1', '#1F4E79','#ffffff');
  kpiCard('C4','C5','📅 आज के पंजीकरण',
    '=COUNTIF('+reg+'!A:A,TEXT(TODAY(),"dd/mm/yyyy")&"*")', '#27ae60','#ffffff');
  kpiCard('E4','E5','🏫 सक्रिय केंद्र',
    '=SUMPRODUCT(('+reg+'!C2:C<>"")/COUNTIF('+reg+'!C2:C,'+reg+'!C2:C&""))', '#e67e22','#ffffff');
  kpiCard('G4','G5','⚠️ निष्क्रिय केंद्र',
    '=395-SUMPRODUCT(('+reg+'!C2:C<>"")/COUNTIF('+reg+'!C2:C,'+reg+'!C2:C&""))', '#e74c3c','#ffffff');

  // ── Row 7-8: Class KPI cards ──
  dash.setRowHeight(6, 10); // spacer
  dash.setRowHeight(7, 28);
  dash.setRowHeight(8, 44);

  dash.getRange('A7:B7').merge(); dash.getRange('A8:B8').merge();
  dash.getRange('C7:D7').merge(); dash.getRange('C8:D8').merge();
  dash.getRange('E7:F7').merge(); dash.getRange('E8:F8').merge();
  dash.getRange('G7:H7').merge(); dash.getRange('G8:H8').merge();

  kpiCard('A7','A8','🔢 कक्षा 9',
    '=COUNTIF('+reg+'!E:E,"Class 9")', '#8e44ad','#ffffff');
  kpiCard('C7','C8','🔢 कक्षा 10',
    '=COUNTIF('+reg+'!E:E,"Class 10")', '#c0392b','#ffffff');
  kpiCard('E7','E8','🔢 कक्षा 11',
    '=COUNTIF('+reg+'!E:E,"Class 11")', '#2E75B6','#ffffff');
  kpiCard('G7','G8','🔢 कक्षा 12',
    '=COUNTIF('+reg+'!E:E,"Class 12")', '#27ae60','#ffffff');

  // ── Column widths ──
  for (var c = 1; c <= 8; c++) dash.setColumnWidth(c, 110);

  // ── Link to live dashboard ──
  dash.setRowHeight(9, 10);
  dash.getRange('A10:H10').merge()
    .setValue('🔗 विस्तृत डैशबोर्ड: pctrack.dataimpact.in')
    .setBackground('#f0f4f8').setFontColor('#1F4E79')
    .setFontSize(10).setHorizontalAlignment('center')
    .setFontStyle('italic');
  dash.setRowHeight(10, 24);

  SpreadsheetApp.flush();
  Logger.log('Dashboard sheet setup complete!');
}

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
