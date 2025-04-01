from app import db

class Municipality(db.Model):
    municipal_id = db.Column(db.Integer, primary_key=True)
    municipal_name = db.Column(db.String(100), nullable=False)
    municipal_rate = db.Column(db.Float, nullable=False)
    education_rate = db.Column(db.Float, nullable=False)

class Property(db.Model):
    assessment_roll_number = db.Column(db.Integer, primary_key=True)
    assessment_value = db.Column(db.Float, nullable=False)
    municipal_id = db.Column(db.Integer, db.ForeignKey('municipality.municipal_id'), nullable=False)
