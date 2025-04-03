**Introduction**

The Property Assessment Tracker is a full-stack web application designed to manage property assessment data. It allows users to view, add, edit, 
and delete property records while dynamically calculating annual property tax based on municipal and education rates.

**Technology Stack**

Frontend: React + TypeScript + Tailwind

Backend: Flask (Python)

Database: SQLite (CSV data imported into a database)

Version Control: GitHub

Setup Instructions

**Prerequisites**

Node.js, npm, next.js, Tailwind CSS, PieChart

Python 3.x, Flask

SQLite (pre-installed with Python)

**Backend Setup**

1 - Clone the repository:
git clone (https://github.com/SafwanS143/Ontario-Ministry-Property-Tax)
cd Ontario-Ministry-Property-Tax

2 - Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate  # Windows

3 - Install dependencies
pip install -r requirements.txt

4 - Initialize the database from CSV files
python transfer.py

5 - Run Flask
python run.py

**Frontend Setup**

Install required libraries/frameworks
npm run dev

The frontend will be accessible at http://localhost:3000/

Data Storage and Management

CSV Import: municipalities.csv and properties.csv are loaded into an SQLite database using initialize_db.py.

**Database Schema:**

Municipalities Table:

municipal_id (Primary Key)

municipal_name

municipal_rate

education_rate

Properties Table:

assessment_roll_number (Primary Key)

assessment_value

municipal_id (Foreign Key referencing Municipalities)

**Project Structure**

property-assessment-tracker/
│── backend/
│   ├── data  # csv files
│   ├── app.py  # Main Flask application
│   ├── models.py  # Database models
│   ├── routes.py  # API endpoints
│   ├── transfer.py  # CSV to DB import script
│   ├── requirements.txt  # Python dependencies
│── frontend/
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── styles/  # CSS/Tailwind styles
│   │   ├── pages/  # Page layouts
│   │   ├── services/  # API interaction logic
│   │   ├── page.tsx  # Root component
│   │   ├── index.tsx  # Entry point
│   ├── package.json  # Frontend dependencies
│── README.md  # Documentation


**Endpoints**

GET /municipalities

Fetch all municipalities and their tax rates.

GET /properties

Retrieve all property records with associated municipality data.

POST /properties

Add a new property record.

Expected payload:

{
  "assessment_roll_number": "123456789",
  "assessment_value": 500000,
  "municipal_id": 1
}

PUT /properties/<assessment_roll_number>

Update an existing property record.

DELETE /properties/<assessment_roll_number>

Delete a property record.

**Key Assumptions and Design Choices**

The property tax is calculated as:

municipal tax = assessment_value * municipal_rate
education tax = assessment_value * education_rate

Property data is stored in a relational database (SQLite) for easy querying and updates.

API follows RESTful principles for CRUD operations.

**Future Enhancements**

Implement authentication for secured access.

Add search enhanced and filtering options for properties.

Export property data as CSV or PDF.

Deploy backend and frontend using cloud services (e.g., AWS, Vercel).


