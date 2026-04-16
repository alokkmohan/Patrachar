# Patrachar Shiksha Sansthan, UP — Project Progress

## Project Overview
Building a digital registration system for UP Patrachar Shiksha (correspondence education) under UP Madhyamik Shiksha Vibhag.

---

## Current Status: ✅ Phase 1 Complete

### What's Done

#### 1. Strategy Document
- Bilingual (Hindi + English) one-page strategy note created
- Plan A (UPSOSB Website) + Plan B (Google Form + Dashboard) clearly documented

#### 2. Google Sheet Setup ✅
- **Sheet ID:** `1jvuYLOyxVv_n0yvb1v4cZHXDozOFInWXPJqqiwa3w8M`
- **URL:** https://docs.google.com/spreadsheets/d/1jvuYLOyxVv_n0yvb1v4cZHXDozOFInWXPJqqiwa3w8M/edit
- **5 Tabs created:**
  - `Registration Data` — 34 columns, headers, dropdowns, formatting
  - `Centre List` — All 396 centres, 75 districts
  - `Subject List` — All subjects with codes (Humanities/Science/Commerce)
  - `Fee Structure` — Class/Stream/Category wise fees
  - `Dashboard` — Live formula-based analytics

#### 3. Google Apps Script Web App ✅
- **Script ID:** `1RHYLV6tNefs3Voazsfxf4XMkyQAwwv1YHuLbWDIu8D5UN6n_3rzT1jzn`
- **Live URL:** https://script.google.com/macros/s/AKfycbzZhmxWV-J2bkm9FlPIgkTczbH5bpTm8lD5Djhxdkqv2lWaibXevruyzZ7Wx4ivGq8ijA/exec
- **Files:**
  - `Code.gs` — Backend (form submit → Sheet)
  - `Index.html` — Frontend form (English UI, 5-step wizard)
  - `appsscript.json` — Permissions

#### 4. Form Features ✅
- 5-step registration wizard (fully in English)
- 75 Districts → 396 Centres cascading dropdown
- Stream-wise subject selection (Humanities/Science/Commerce)
- Auto fee calculation based on Class + Stream + Category
- Registration Number auto-generated (format: `PAT-XXX-2026-XXXXX`)
- Data submitted directly to Google Sheet
- Access: Anyone with Google Account (`ANYONE` + `USER_DEPLOYING`)

---

## appsscript.json (Current Working Config)
```json
{
  "timeZone": "Asia/Kolkata",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "ANYONE"
  },
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
}
```

---

## Google Sheet — Column Mapping (Registration Data)

| Col | Field |
|-----|-------|
| A | Submission Date |
| B | District |
| C | Centre Name |
| D | Registration No |
| E | Student Name |
| F | Father Name |
| G | Mother Name |
| H | Date of Birth |
| I | Aadhaar No |
| J | Mobile No |
| K | Class |
| L | Stream |
| M | Subject 1 |
| N | Subject 2 |
| O | Subject 3 |
| P | Subject 4 |
| Q | Subject 5 (Hindi - Compulsory) |
| R | Prev Exam |
| S | Prev Year |
| T | Prev Board |
| U | Category |
| V | Fee Amount |
| W | Challan No |
| X | Bank Name |
| Y | Address |
| Z | Village |
| AA | Post |
| AB | Res District |
| AC | Pin Code |
| AD | Gender |
| AE | Centre Code |
| AF | Challan Date |
| AG | Submitted By (Email) |
| AH | Sr No |

---

## Fee Structure

| Class | Stream | General | OBC | SC/ST |
|-------|--------|---------|-----|-------|
| Class 12 (One Year) | Humanities | ₹800 | ₹800 | ₹500 |
| Class 12 (One Year) | Commerce | ₹800 | ₹800 | ₹500 |
| Class 12 (One Year) | Science | ₹1000 | ₹1000 | ₹700 |
| Class 11 (Two Year) | Humanities | ₹420 | ₹420 | ₹270 |
| Class 11 (Two Year) | Commerce | ₹420 | ₹420 | ₹270 |
| Class 11 (Two Year) | Science | ₹520 | ₹520 | ₹370 |

---

## Known Issues / Pending Fixes

- [ ] Test form submission end-to-end (data in Sheet verification)
- [ ] Verify Registration Number format in Sheet
- [ ] Check Dashboard formulas after first real submission
- [ ] "Google hasn't verified this app" warning — normal for Apps Script, centres need to click "Go to Patrachar (unsafe)"

---

## Next Steps — Phase 2 (GitHub Dashboard)

### Plan
Build a static HTML dashboard hosted on GitHub Pages that reads data from Google Sheet and shows:

1. **State Overview**
   - Total registrations
   - Class-wise (11/12) bar chart
   - Stream-wise pie chart
   - Category-wise breakdown
   - Daily trend line chart

2. **District-wise Analysis**
   - District-wise count (bar chart)
   - Top 10 / Bottom 10 districts
   - Zero registration centres list

3. **Centre-level View**
   - Centre-wise count table
   - Filterable by district

### Tech Stack for Dashboard
- Pure HTML + CSS + JavaScript
- Chart.js for charts
- Google Sheets published as CSV / JSON API as data source
- Hosted on GitHub Pages (free)

### How to connect Sheet to Dashboard
1. In Google Sheet → File → Share → Publish to web
2. Choose `Registration Data` sheet → CSV format → Publish
3. Copy the published CSV URL
4. Use that URL in dashboard JS to fetch data

---

## Files Reference

| File | Location | Purpose |
|------|----------|---------|
| `Code.gs` | Apps Script | Backend — handles form submit, generates reg no, writes to sheet |
| `Index.html` | Apps Script | Frontend — 5-step registration form |
| `appsscript.json` | Apps Script | Permissions and webapp config |
| `SheetSetup.gs` | Apps Script (can delete) | One-time sheet setup — no longer needed |
| `Patrachar_Sheet_Structure.xlsx` | Local | Reference Excel with same structure |
| `Ranniti_Note_v2.pdf` | Local | Strategy document (bilingual) |

---

## Source Data
- **Excel file:** `Information_UPSOSB.xlsx`
- **Sheets used:**
  - `पत्राचार शिक्षा पंजीकरण केंद्रो` → 396 centres, 75 districts
  - `शैक्षणिक शाखा.Stream, Subject c` → Subject codes
  - `Fees Details` → Fee structure
  - `Class 11 Recognition Board` → 25 boards
  - `Class 12 Recognition Board` → 22 boards

---

## Deployment Info

| Item | Value |
|------|-------|
| Sheet ID | `1jvuYLOyxVv_n0yvb1v4cZHXDozOFInWXPJqqiwa3w8M` |
| Script ID | `1RHYLV6tNefs3Voazsfxf4XMkyQAwwv1YHuLbWDIu8D5UN6n_3rzT1jzn` |
| Web App URL | https://script.google.com/macros/s/AKfycbzZhmxWV-J2bkm9FlPIgkTczbH5bpTm8lD5Djhxdkqv2lWaibXevruyzZ7Wx4ivGq8ijA/exec |
| Execute as | USER_DEPLOYING |
| Access | ANYONE (any Google account) |
| Timezone | Asia/Kolkata |

---

*Last updated: April 16, 2026*
*Project: Patrachar Shiksha Sansthan, UP — Digital Registration System*
