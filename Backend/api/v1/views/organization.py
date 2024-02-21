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
            "name": country,
            "timezones": timezones
        }
        countries.append(country_data)
    return jsonify(countries)


@app_look.route('/organization', methods=['GET', 'POST', 'PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
def organization():
    """Handles the resource for each organization"""
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
    return jsonify({"message": "Not yet implemented"})
