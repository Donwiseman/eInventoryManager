from flask import jsonify, request, redirect, abort
from api.v1.views import app_look
from emailVerification import Email
from database import storage
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, get_jwt_identity, \
    jwt_required
from smtplib import SMTPConnectError
import pytz


@app_look.route('/countries', methods=['GET'], strict_slashes=False)
@jwt_required()
def supported_Countries():
    """Returns a dictionary containing country names and
       respective timezones.
    """
    countries = []
    for country_code, country in pytz.country_names.items():
        try:
            timezones = pytz.country_timezones(country_code)
        except KeyError:
            timezones = []
        country_data = {
            "country": country,
            "timezones": timezones
        }
        countries.append(country_data)
    return jsonify(countries)


@app_look.route('/organizations', methods=['GET', 'POST'],
                strict_slashes=False)
@jwt_required()
def organization():
    """Handles the creating an organization by the user and retrieving
       list of those they belong to
    """
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"message": "Invalid JSON token"}), 401
    user = storage.get_user_by_id(user_id)
    if not user:
        return jsonify({"message": "Invalid JSON token claims"}), 401

    if request.method == "POST":
        kwargs = {
            "name": request.form.get('name'),
            "country": request.form.get('country'),
            "address": request.form.get('address'),
            "description": request.form.get('description'),
            "mobile": request.form.get('mobile'),
            "timezone": request.form.get('timezone'),
            "image": request.form.get('image'),
            "user_id": user_id
        }
        if not kwargs['name'] or not kwargs['country'] or not \
                kwargs['timezone']:
            return jsonify({"message": "Incomplete parameters"})
        org = storage.create_organization(**kwargs)
        resp = {
            "message": "Organization succesfully created",
            "name": org.name,
            "id": org.id,
            "created_at": org.created_at,
            "image": org.image,
            "country": org.country
        }
        return jsonify(resp)

    if request.method == "GET":
        org = []
        for asso in user.org_associations:
            organization = storage.get_org_by_id(asso.org_id)
            org_detail = {
                "name": organization.name,
                "id": organization.id,
                "user_role": organization.get_user_role(user.id)
            }
            org.append(org_detail)
        resp = {
            "message": "Returning user organizations",
            "organizations": org
        }
        return jsonify(resp)

@app_look.route('/organizations/<organization_id>', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
@jwt_required
def organization(organization_id):
    usr_id = get_jwt_identity()
    if not usr_id:
        return jsonify({"message": "Invalid token"}), 400
    usr = storage.get_user_by_id(usr_id)
    if not usr:
        return jsonify({"message": "Token is invalid"}), 400
    
    if request.method == 'GET':
        orgID = storage.get_org_by_id(organization_id)
        if not orgID:
            return jsonify({"message": "Organization dosent exist"}), 404
        
        data = [i for i in range(len(orgID))]
        return jsonify(data), 200
    
    