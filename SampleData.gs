// ============================================================
// SAMPLE DATA GENERATOR — Run once to populate 100 test records
// After dashboard is built, delete this file or just don't run it again
// ============================================================

function insertSampleData() {
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  // ── Reference Data ──
  var districts = [
    { name: "लखनऊ (Lucknow)",        centres: [{code:901,name:"राजकीय जुबली इन्टर कालेज, लखनऊ"},{code:902,name:"राजकीय इन्टर कालेज, हुसैनाबाद, लखनऊ"},{code:951,name:"राजकीय बालिका इण्टर कालेज, सिंगारनगर, लखनऊ"}] },
    { name: "आगरा (Agra)",            centres: [{code:901,name:"राजकीय इन्टर कालेज, आगरा"},{code:902,name:"गांधी स्मारक किसान इण्टर कालेज, किरावली, आगरा"},{code:951,name:"केदारनाथ सेक्सरिया बालिका इण्टर कालेज, बेलनगंज, आगरा"}] },
    { name: "वाराणसी (Varanasi)",     centres: [{code:901,name:"राजकीय क्वींस इन्टर कालेज, वाराणसी"},{code:902,name:"सुभद्रा कुमार इन्टर कालेज, बसनी, वाराणसी"},{code:951,name:"राजकीय बालिका इन्टर कालेज, वाराणसी"}] },
    { name: "प्रयागराज (Prayagraj)",  centres: [{code:901,name:"राजकीय इन्टर कालेज, प्रयागराज"},{code:902,name:"मेवालाल अयोध्या प्रसाद गुप्ता स्मारक इन्टर कालेज, सोरांव, प्रयागराज"},{code:951,name:"राजकीय बालिका इन्टर कालेज, प्रयागराज"}] },
    { name: "कानपुर नगर (Kanpur Nagar)", centres: [{code:901,name:"राजकीय इन्टर कालेज, कानपुर"},{code:902,name:"बिल्हौर इन्टर कालेज, बिल्हौर कानपुर"},{code:951,name:"पूर्णा देवी खन्ना बालिका इण्टर कालेज, कानपुर"}] },
    { name: "गोरखपुर (Gorakhpur)",    centres: [{code:901,name:"राजकीय जुबली इन्टर कालेज, गोरखपुर"},{code:902,name:"गांधी इन्टर कालेज, महुआपर बड़हलगंज, गोरखपुर"},{code:951,name:"ए0 डी0 राजकीय बालिका इन्टर कालेज, गोरखपुर"}] },
    { name: "मेरठ (Meerut)",          centres: [{code:901,name:"राजकीय इण्टर कालेज, मेरठ"},{code:902,name:"कृषक इण्टर कालेज, मवाना, मेरठ"},{code:951,name:"देवती देवी वीरेन्द्र कुमार, राजकीय कन्या इण्टर कालेज, माधवपुरम्, मेरठ"}] },
    { name: "बरेली (Bareilly)",        centres: [{code:901,name:"राजकीय इन्टर कालेज, बरेली"},{code:902,name:"एम.जी.एम. इन्टर कालेज, बहेड़ी, बरेली"},{code:951,name:"राजकीय बालिका इन्टर कालेज, बरेली"}] },
    { name: "अलीगढ़ (Aligarh)",       centres: [{code:901,name:"नारसिंगी लाल राजकीय इण्टर कालेज, अलीगढ़"},{code:902,name:"के.एम.बी. इण्टर कालेज, अतरौली, अलीगढ़"},{code:951,name:"उदयसिंह कन्या इण्टर कालेज, अलीगढ़"}] },
    { name: "आजमगढ़ (Azamgarh)",      centres: [{code:901,name:"शिवली नेशनल इन्टर कालेज, आजमगढ़"},{code:902,name:"उद्योग विद्यालय इन्टर कालेज, कोयलसा, आजमगढ़"},{code:951,name:"राजकीय बालिका इन्टर कालेज, आजमगढ़"}] },
    { name: "झांसी (Jhansi)",         centres: [{code:901,name:"राजकीय इन्टर कालेज, झांसी"},{code:902,name:"आदर्श इन्दर कालेज, मोंठ, झांसी"},{code:951,name:"सूरज प्रसाद राजकीय बालिका इन्टर कालेज, झांसी"}] },
    { name: "मुरादाबाद (Moradabad)",  centres: [{code:901,name:"राजकीय इन्टर कालेज, मुरादाबाद"},{code:902,name:"एस.डी.एच. इन्टर कालेज, ठाकुरद्वारा, मुरादाबाद"},{code:951,name:"आर्य कन्या इन्टर कालेज, मुरादाबाद"}] },
    { name: "सहारनपुर (Saharanpur)",  centres: [{code:901,name:"राजकीय इण्टर कालेज, सहारनपुर"},{code:902,name:"डी.सी.जैन इण्टर कालेज, सरसावां, सहारनपुर"},{code:951,name:"दिगम्बर जैन कन्या इण्टर कालेज, सहारनपुर"}] },
    { name: "रायबरेली (Raebareli)",   centres: [{code:901,name:"राजकीय इन्टर कालेज, रायबरेली"},{code:902,name:"हरनारायण इन्टर कालेज, ऊंचाहार, रायबरेली"},{code:951,name:"राजकीय बालिका इन्टर कालेज, रायबरेली"}] },
    { name: "गाजियाबाद (Ghaziabad)", centres: [{code:901,name:"राजकीय इण्टर कालेज, नन्दग्राम, गाजियाबाद"},{code:902,name:"पी.बी.ए.एस. इण्टर कालेज, मोदीनगर, गाजियाबाद"},{code:951,name:"राजकीय कन्या इण्टर कालेज, विजयनगर, गाजियाबाद"}] }
  ];

  var maleNames   = ["Rahul","Amit","Suresh","Rajesh","Vikram","Arun","Deepak","Manoj","Sandeep","Pankaj","Ravi","Ajay","Vijay","Rakesh","Sanjay","Rohit","Nitin","Gaurav","Ankit","Sachin","Pradeep","Dinesh","Naveen","Mohit","Vinod","Shyam","Ram","Krishna","Yogesh","Abhishek"];
  var femaleNames = ["Priya","Sunita","Rekha","Geeta","Anjali","Pooja","Kavita","Neha","Seema","Anita","Sushma","Meena","Radha","Sita","Pushpa","Renu","Vandana","Archana","Shweta","Komal","Asha","Nisha","Mamta","Savita","Usha","Kiran","Sangeeta","Deepika","Preeti","Meenakshi"];
  var fatherNames = ["Ram Prasad","Shyam Lal","Hari Singh","Mohan Lal","Rajendra","Suresh Kumar","Anil Kumar","Vinod Kumar","Ramesh","Mahesh","Santosh","Dinesh","Prakash","Devendra","Umesh","Ganesh","Naresh","Brijesh","Arvind","Bharat"];
  var motherNames = ["Savitri Devi","Kamla Devi","Sunita Devi","Urmila Devi","Shanti Devi","Meena Devi","Geeta Devi","Rekha Devi","Pushpa Devi","Anita Devi","Sushila Devi","Parvati Devi","Saroj Devi","Usha Devi","Kiran Devi"];
  var boards      = ["UP Board","UP Board","UP Board","UP Board","CBSE","ICSE","MP Board","Bihar Board"];
  var streams     = ["Humanities","Humanities","Humanities","Science","Science","Commerce"]; // weighted
  var categories  = ["General","General","OBC","OBC","SC","ST"]; // weighted
  var classes     = ["Class 11","Class 11","Class 12","Class 12","Class 12"]; // weighted
  var genders     = ["Male","Male","Male","Female","Female"]; // weighted

  // Fee lookup
  var feeMap = {
    "Class 12": { "Humanities": {General:800,OBC:800,SC:500,ST:500}, "Commerce": {General:800,OBC:800,SC:500,ST:500}, "Science": {General:1000,OBC:1000,SC:700,ST:700} },
    "Class 11": { "Humanities": {General:420,OBC:420,SC:270,ST:270}, "Commerce": {General:420,OBC:420,SC:270,ST:270}, "Science": {General:520,OBC:520,SC:370,ST:370} }
  };

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function randomDate(start, end) {
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return Utilities.formatDate(d, 'Asia/Kolkata', 'dd/MM/yyyy');
  }

  function randomDOB() {
    // Age 16–30
    var year = 1995 + Math.floor(Math.random() * 14);
    var month = 1 + Math.floor(Math.random() * 12);
    var day   = 1 + Math.floor(Math.random() * 28);
    return year + '-' + String(month).padStart(2,'0') + '-' + String(day).padStart(2,'0');
  }

  function randomMobile() {
    var prefixes = ['9','8','7','6'];
    var num = pick(prefixes);
    for (var i = 0; i < 9; i++) num += Math.floor(Math.random() * 10);
    return num;
  }

  function randomAadhaar() {
    var n = '';
    for (var i = 0; i < 12; i++) n += Math.floor(Math.random() * 10);
    return n;
  }

  // Submission dates spread over last 30 days
  var now   = new Date();
  var start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  var rows = [];
  for (var i = 0; i < 100; i++) {
    var dist     = pick(districts);
    var centre   = pick(dist.centres);
    var cls      = pick(classes);
    var stream   = pick(streams);
    var cat      = pick(categories);
    var gender   = pick(genders);
    var name     = gender === 'Male' ? pick(maleNames) : pick(femaleNames);
    var fee      = feeMap[cls][stream][cat] || '';
    var prevYear = 2018 + Math.floor(Math.random() * 7); // 2018–2024

    rows.push([
      randomDate(start, now),       // A - Submission Date
      dist.name,                    // B - District
      centre.name,                  // C - Centre Name
      centre.code,                  // D - Centre Code
      cls,                          // E - Class
      stream,                       // F - Stream
      cat,                          // G - Category
      name + ' ' + pick(fatherNames).split(' ')[0], // H - Student Name
      pick(fatherNames),            // I - Father Name
      pick(motherNames),            // J - Mother Name
      randomDOB(),                  // K - Date of Birth
      gender,                       // L - Gender
      randomAadhaar(),              // M - Aadhaar No
      randomMobile(),               // N - Mobile No
      'High School (Class 10)',     // O - Prev Exam
      prevYear,                     // P - Prev Year
      pick(boards),                 // Q - Prev Board
      fee                           // R - Fees Submitted
    ]);
  }

  // Batch insert all 100 rows at once (fast)
  var startRow = sheet.getLastRow() + 1;
  sheet.getRange(startRow, 1, rows.length, rows[0].length).setValues(rows);
  sheet.getRange(startRow, 1, rows.length, rows[0].length)
    .setFontSize(10)
    .setVerticalAlignment('middle');

  Logger.log('✅ 100 sample records inserted starting row ' + startRow);
}
