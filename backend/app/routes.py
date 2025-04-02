from flask import Blueprint, request, jsonify
from app import db
from app.models import Municipality, Property

api = Blueprint('api', __name__)

# Endpoint to get all municipalities
@api.route('/municipalities', methods=['GET'])
def get_municipalities():
    search_term = request.args.get('search', '')  # Get search query
    municipalities = Municipality.query.filter(
        Municipality.municipal_name.ilike(f'{search_term}%')
    ).all()
    
    return jsonify([{
        'municipal_id': m.municipal_id,
        'municipal_name': m.municipal_name,
        'municipal_rate': m.municipal_rate,
        'education_rate': m.education_rate
    } for m in municipalities])

# Endpoint to get all properties
@api.route('/properties', methods=['GET'])
def get_properties():
    search_term = request.args.get('search', '')  # Get search query
    properties = Property.query.filter(
        Property.assessment_roll_number.ilike(f'{search_term}%')
    ).all()

    return jsonify([{
        'assessment_roll_number': p.assessment_roll_number,
        'assessment_value': p.assessment_value,
        'municipal_id': p.municipal_id
    } for p in properties])

# Endpoint to get a single municipality by its ID
@api.route('/municipalities/<int:municipal_id>', methods=['GET'])
def get_municipality_by_id(municipal_id):
    municipality = Municipality.query.get(municipal_id)
    if not municipality:
        return jsonify({'message': 'Municipality not found'}), 404
    
    return jsonify({
        'municipal_id': municipality.municipal_id,
        'municipal_name': municipality.municipal_name,
        'municipal_rate': municipality.municipal_rate,
        'education_rate': municipality.education_rate
    })

# Endpoint to get a single property by its roll number
@api.route('/properties/<int:roll_number>', methods=['GET'])
def get_property_by_roll_number(roll_number):
    property_entry = Property.query.get(roll_number)
    if not property_entry:
        return jsonify({'message': 'Property not found'}), 404

    return jsonify({
        'assessment_roll_number': property_entry.assessment_roll_number,
        'assessment_value': property_entry.assessment_value,
        'municipal_id': property_entry.municipal_id
    })

# Endpoint to add a new municipality
@api.route('/municipalities', methods=['POST'])
def add_municipality():
    data = request.json
    new_municipality = Municipality(
        municipal_id=data['municipal_id'],
        municipal_name=data['municipal_name'],
        municipal_rate=data['municipal_rate'],
        education_rate=data['education_rate']
    )
    db.session.add(new_municipality)
    db.session.commit()
    return jsonify({'message': 'Municipality added successfully'}), 201

# Endpoint to add a new property
@api.route('/properties', methods=['POST'])
def add_property():
    data = request.json
    new_property = Property(
        assessment_roll_number=data['assessment_roll_number'],
        assessment_value=data['assessment_value'],
        municipal_id=data['municipal_id']
    )
    db.session.add(new_property)
    db.session.commit()
    return jsonify({'message': 'Property added successfully'}), 201

# Endpoint to update a municipality's rate information
@api.route('/municipalities/<int:municipal_id>', methods=['PUT'])
def update_municipality(municipal_id):
    municipality = Municipality.query.get(municipal_id)
    if not municipality:
        return jsonify({'message': 'Municipality not found'}), 404
    
    data = request.json
    municipality.municipal_rate = data.get('municipal_rate', municipality.municipal_rate)
    municipality.education_rate = data.get('education_rate', municipality.education_rate)
    
    db.session.commit()
    return jsonify({'message': 'Municipality updated successfully'})

# Endpoint to update a property’s value
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

# Endpoint to delete a municipality
@api.route('/municipalities/<int:municipal_id>', methods=['DELETE'])
def delete_municipality(municipal_id):
    municipality = Municipality.query.get(municipal_id)
    if not municipality:
        return jsonify({'message': 'Municipality not found'}), 404
    
    db.session.delete(municipality)
    db.session.commit()
    return jsonify({'message': 'Municipality deleted successfully'})

# Endpoint to delete a property
@api.route('/properties/<int:roll_number>', methods=['DELETE'])
def delete_property(roll_number):
    property_entry = Property.query.get(roll_number)
    if not property_entry:
        return jsonify({'message': 'Property not found'}), 404
    
    db.session.delete(property_entry)
    db.session.commit()
    return jsonify({'message': 'Property deleted successfully'})

# Endpoint to search for municipalities by name (partial match)
@api.route('/municipalities/search', methods=['GET'])
def search_municipalities():
    search_string = request.args.get('query', '')  # Get the query string from the URL params
    if not search_string:
        return jsonify({'message': 'No search query provided'}), 400

    municipalities = Municipality.query.filter(
        Municipality.municipal_name.ilike(f"%{search_string}%")  # Case-insensitive match
    ).all()

    return jsonify([{
        'municipal_id': m.municipal_id,
        'municipal_name': m.municipal_name,
        'municipal_rate': m.municipal_rate,
        'education_rate': m.education_rate
    } for m in municipalities])

# Endpoint to search for properties by roll number (partial match)
@api.route('/properties/search', methods=['GET'])
def search_properties():
    search_string = request.args.get('query', '')  # Get the query string from the URL params
    if not search_string:
        return jsonify({'message': 'No search query provided'}), 400

    properties = Property.query.filter(
        Property.assessment_roll_number.like(f"%{search_string}%")
    ).all()

    return jsonify([{
        'assessment_roll_number': p.assessment_roll_number,
        'assessment_value': p.assessment_value,
        'municipal_id': p.municipal_id
    } for p in properties])
