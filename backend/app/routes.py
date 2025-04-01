from flask import Blueprint, request, jsonify
from app import db
from app.models import Municipality, Property

api = Blueprint('api', __name__)

@api.route('/municipalities', methods=['GET'])
def get_municipalities():
    municipalities = Municipality.query.all()
    return jsonify([{ 'municipal_id': m.municipal_id, 'municipal_name': m.municipal_name, 'municipal_rate': m.municipal_rate, 'education_rate': m.education_rate } for m in municipalities])

@api.route('/properties', methods=['GET'])
def get_properties():
    properties = Property.query.all()
    return jsonify([{ 'assessment_roll_number': p.assessment_roll_number, 'assessment_value': p.assessment_value, 'municipal_id': p.municipal_id } for p in properties])

@api.route('/properties', methods=['POST'])
def add_property():
    data = request.json
    new_property = Property(assessment_roll_number=data['assessment_roll_number'], assessment_value=data['assessment_value'], municipal_id=data['municipal_id'])
    db.session.add(new_property)
    db.session.commit()
    return jsonify({'message': 'Property added successfully'}), 201

@api.route('/properties/<int:roll_number>', methods=['PUT'])
def update_property(roll_number):
    property_entry = Property.query.get(roll_number)
    if not property_entry:
        return jsonify({'message': 'Property not found'}), 404
    
    data = request.json
    property_entry.assessment_value = data.get('assessment_value', property_entry.assessment_value)
    property_entry.municipal_id = data.get('municipal_id', property_entry.municipal_id)
    db.session.commit()
    return jsonify({'message': 'Property updated successfully'})

@api.route('/properties/<int:roll_number>', methods=['DELETE'])
def delete_property(roll_number):
    property_entry = Property.query.get(roll_number)
    if not property_entry:
        return jsonify({'message': 'Property not found'}), 404
    
    db.session.delete(property_entry)
    db.session.commit()
    return jsonify({'message': 'Property deleted successfully'})
