# 🏡 Property Assessment Tracker

## 📘 Introduction

The **Property Assessment Tracker** is a full-stack web application designed to manage property assessment data. It allows users to:

- View, add, edit, and delete property records  
- Dynamically calculate annual property tax based on municipal and education rates

---

## 🛠️ Technology Stack

- **Frontend:** React + TypeScript + Tailwind CSS  
- **Backend:** Flask (Python)  
- **Database:** SQLite (CSV data imported into a database)  
- **Version Control:** GitHub  

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

- Node.js, npm, Next.js, Tailwind CSS, Recharts (for PieChart)
- Python 3.x, Flask
- SQLite (comes pre-installed with Python)

---

## 🐍 Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/SafwanS143/Property-Tax-Calculator
cd Property-Tax-Calculator

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate         # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Initialize the database from CSV files
python transfer.py

# 5. Run the Flask server
python run.py
```
## 🌐 **Frontend Setup**
# From the root directory or frontend/
npm install
npm run dev
The frontend will be accessible at: http://localhost:3000/

## 🗂️ Data Storage and Management
CSV files (municipalities.csv, properties.csv) are loaded into an SQLite database using initialize_db.py.

## 🧩 **Database Schema**
📑 Municipalities Table
Field	Type	Description
municipal_id	Primary Key	Unique ID
municipal_name	Text	Name of the municipality
municipal_rate	Float	Municipal tax rate
education_rate	Float	Education tax rate

## 🏘️ **Properties Table**

Field	Type	Description
assessment_roll_number	Primary Key	Unique property ID
assessment_value	Integer	Assessed value of the property
municipal_id	Foreign Key	Links to municipalities.municipal_id

## 📁 **Project Structure**
property-assessment-tracker/
├── backend/
│   ├── data/                 # CSV files
│   ├── app.py                # Main Flask application
│   ├── models.py             # Database models
│   ├── routes.py             # API endpoints
│   ├── transfer.py           # CSV to DB import script
│   ├── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── styles/           # Tailwind/CSS styles
│   │   ├── pages/            # Page layouts
│   │   ├── services/         # API interaction logic
│   │   ├── page.tsx          # Root component
│   │   ├── index.tsx         # Entry point
│   ├── package.json          # Frontend dependencies
├── README.md                 # Documentation


## 🧪 **API Endpoints**
📍 Municipalities
GET /municipalities
Fetch all municipalities and their tax rates.

🏠 **Properties**
GET /properties
Retrieve all property records with associated municipality data.

POST /properties
Add a new property record.
Example Property:
{
  "assessment_roll_number": "123456789",
  "assessment_value": 500000,
  "municipal_id": 1
}
PUT /properties/<assessment_roll_number>
Update an existing property record.

DELETE /properties/<assessment_roll_number>
Delete a property record.

## 📐 **Key Assumptions and Design Choices**
Property tax is calculated as:

municipal_tax = assessment_value * municipal_rate
education_tax = assessment_value * education_rate
Data is stored in a relational database (SQLite) for easy querying and updates.

API follows RESTful principles for all CRUD operations.
