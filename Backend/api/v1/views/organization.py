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
app_look.route('/organizations', methods=['GET', 'POST'], strict_slashes=False)
@jwt_required()
def organizations():
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

@app_look.route('/organizations/<organization_id>',
                methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
@jwt_required
def organization(organization_id):

    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"message": "Invalid token"}), 400
    
    user = storage.get_user_by_id(user_id)
    if not user:
        return jsonify({"message": "Token is invalid"}), 400

    org = storage.get_org_by_id(organization_id)
    if not org:
        return jsonify({"message": "Organization dosent exist"}), 404
    user_role = org.get_user_role(user_id)
    if not user_role:
        return jsonify({"message": "User not in Organization"}), 401
    
    if request.method == 'GET':
        creator_name = "Craetor Account has been deleted"
        if org.creator:
            creator_name = org.creator.full_name()
        resp = {
            "name": org.name,
            "id": org.id,
            "country": org.country,
            "address": org.address,
            "description": org.description,
            "creator": creator_name,
            "image": org.image,
            "time_zone": org.time_zone,
            "created_at": org.created_at_local_time(),
            "mobile": org.mobile,
            "total_products": len(org.items),
            "user_role": user_role
        }
        return jsonify(resp)

    if request.method == 'PUT':
        if user_role != "Admin":
            msg = "Only Admins can update Organization details"
            return jsonify({"message": msg}), 401
        mobile = request.form.get('mobile')
        description = request.form.get('description')
        address = request.form.get('address')
        image = request.form.get('image')
        if not mobile and not description and not address and not image:
            mesg = "Update failed, Empty parameters"
            return jsonify({"message": mesg}), 400
        msg = []
        if mobile:
            org.mobile = mobile
            msg.append("Mobile updated")
        if description:
            org.description = description
            msg.append("Organization description Updated")
        if address:
            org.address = address
            msg.append("Organization address Updated")
        if image:
            org.image = image
            msg.append("Organization image Updated")
        storage.save()
        return jsonify({"message": ", ".join(msg)})

    if request.method == "DELETE":
        if user_role != "Admin":
            msg = "Only Admins can delete this Organization"
            return jsonify({"message": msg}), 401
        storage.delete(org)
        storage.save()
        return jsonify({"message": "Organization account is deleted"})
    