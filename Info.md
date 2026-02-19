📝 How to Add & Update Applications
Great question! Let me show you all the ways to manage applications in your Visa Tracker.

1️⃣ Adding New Applications
Method A: Using the "Add New" Button
Step 1: Click "Add New" button in the Navbar
OR
Go to Applications page → Click "Add New" button (top right)

Step 2: Fill out the form:
Yes, please notify admissions@ecu.edu.au
Field	Required	Description
Lodge Date	✅ Yes	When visa was lodged
Applicant Name	✅ Yes	Full name
Further Assessment Date	❌ No	If applicable
University	✅ Yes	Select from dropdown
Course	✅ Yes	Select from dropdown
Status	✅ Yes	Under Process / Granted / Refused
Finalised Date	⚠️ Conditional	Required if Granted or Refused
Step 3: Click "Save" button

The application is automatically saved to localStorage (browser storage).

2️⃣ Editing Existing Applications
Step 1: Go to Applications page

Step 2: Find the application in the table

Step 3: Click the ✏️ Edit button (yellow icon) in the Actions column

Step 4: Update the fields you want to change

Step 5: Click "Update" button

3️⃣ Deleting Applications
Step 1: Go to Applications page

Step 2: Find the application

Step 3: Click the 🗑️ Delete button (red icon)

Step 4: Confirm deletion in the popup

4️⃣ Viewing Application Details
Step 1: Go to Applications page

Step 2: Click the 👁️ View button (blue icon)

Step 3: A modal popup shows all details

5️⃣ Bulk Import/Export (Settings Page)
Export Data (Backup)
Go to Settings page
Click "Export as JSON" or "Export as CSV"
File downloads to your computer
Import Data (Restore/Bulk Add)
Go to Settings page
Click "Import from File"
Select your JSON or CSV file
Data replaces current applications
📊 CSV Format for Bulk Import
If you want to add many applications at once, create a CSV file like this:

csv

"ID","Lodge Date","Applicant Name","Further Assessment Date","University","Course","Status","Finalised Date"
"","2026-02-18","John Doe","","Edith Cowan University","Bachelor of IT","Under Process",""
"","2026-02-17","Jane Smith","2026-02-25","Curtin University","Master of Business","Granted","2026-02-17"
"","2026-02-15","Bob Wilson","","RMIT","Bachelor of Engineering","Refused","2026-02-16"
Notes:

Leave ID empty (system generates it)
Date format: YYYY-MM-DD
Status must be exactly: Under Process, Granted, or Refused
Leave Finalised Date empty for "Under Process"
6️⃣ Adding New Universities to Dropdown
If you need to add more universities, update this file:

src/utils/helpers.js
Find the universityLogoMap object and add new entries:

JavaScript

const universityLogoMap = {
  // ... existing universities ...
  
  // Add new ones:
  'Australian Catholic University': 'Australian Catholic University.png',
  'Bond University': 'Bond University.png',
  'Swinburne University': 'Swinburne University.png'
}
Then:

Add the logo image to public/logos/ folder
Name it exactly as specified in the mapping
7️⃣ Adding New Courses to Dropdown
Find the courseList array in src/utils/helpers.js:

JavaScript

export const courseList = [
  // ... existing courses ...
  
  // Add new ones:
  'Master of Finance',
  'Bachelor of Medicine',
  'Graduate Certificate in Project Management',
  'Diploma of Hospitality'
].sort()
💾 Where is Data Stored?
Storage	Location	Persistence
localStorage	Browser	Stays until cleared
applications.json	Source code	Default/Reset data
Important:

Data is stored in YOUR browser only
Different browsers = different data
Clearing browser data = loses applications
Always export backup before deploying!
🔄 Quick Workflow Summary
text

┌─────────────────────────────────────────────────────┐
│                    YOUR WORKFLOW                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  📥 Initial Load                                     │
│     └── Data from applications.json                 │
│         └── Saved to localStorage                   │
│                                                      │
│  ➕ Add Application                                  │
│     └── Form → localStorage                         │
│                                                      │
│  ✏️ Edit Application                                 │
│     └── Form → localStorage                         │
│                                                      │
│  🗑️ Delete Application                              │
│     └── Removed from localStorage                   │
│                                                      │
│  📤 Export (Backup)                                  │
│     └── localStorage → JSON/CSV file               │
│                                                      │
│  📥 Import (Restore)                                 │
│     └── JSON/CSV file → localStorage               │
│                                                      │
│  🔄 Reset to Default                                 │
│     └── applications.json → localStorage            │
│                                                      │
└─────────────────────────────────────────────────────┘
⚠️ Before Deploying to Netlify
Important Notes:
localStorage is per-device - Each visitor has their own data
Default data - New visitors see applications.json data
No sync - Changes don't sync between devices
Recommended Pre-Deploy Actions:
Update applications.json with your real data (this becomes default for all visitors)
Test locally with npm run dev
Export a backup from Settings page
