import csv
import sys
import os

# Add the parent directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import db
from app.models import Municipality, Property
from app import create_app

app = create_app()

with app.app_context():
    def import_data():
        # Absolute paths relative to the current script
        base_path = os.path.join(os.path.dirname(__file__), 'data')  # Get the path of the 'data' folder
        municipalities_file = os.path.join(base_path, 'municipalities.csv')
        properties_file = os.path.join(base_path, 'properties.csv')

        # Check if the CSV files exist
        if not os.path.exists(municipalities_file) or not os.path.exists(properties_file):
            return

        # Clear existing data from the tables
        try:
            db.session.query(Municipality).delete()
            db.session.query(Property).delete()
            db.session.commit()
        except Exception:
            return

        # Import Municipalities
        try:
            with open(municipalities_file, newline='') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    try:
                        m = Municipality(
                            municipal_id=int(row['municipal_id']),
                            municipal_name=row['name_municipal_w_type'],
                            municipal_rate=float(row['municipal_rate']),
                            education_rate=float(row['education_rate'])
                        )
                        db.session.add(m)
                    except Exception:
                        continue
                db.session.commit()
        except Exception:
            return

        # Import Properties
        try:
            with open(properties_file, newline='') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    try:
                        p = Property(
                            assessment_roll_number=int(row['assessment_roll_number']),
                            assessment_value=float(row['assessment_value']),
                            municipal_id=int(row['municipal_id'])
                        )
                        db.session.add(p)
                    except Exception:
                        continue
                db.session.commit()
        except Exception:
            return

    import_data()
