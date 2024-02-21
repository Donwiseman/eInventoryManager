from flask import jsonify, request, redirect, abort
from api.v1.views import app_look
from emailVerification import Email
from database import storage
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, get_jwt_identity, \
    jwt_required
from smtplib import SMTPConnectError


@app_look.route('/user', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
def user():
    """Endpoint to handle the user resource"""
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"message": "Invalid JSON token"}), 401
    user = storage.get_user_by_id(user_id)
    if not user:
        return jsonify({"message": "Invalid JSON token claims"}), 401

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
        created_org = []
        for organization in user.org_created:
            org_detail = {
                "name": organization.name,
                "id": organization.id,
                "created_at": organization.created_at
            }
            created_org.append(org_detail)
        user_dict = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "email_verified": user.email_verified,
            "mobile": user.mobile,
            "mobile_verified": user.mobile_verified,
            "organizations": org,
            "created_at": user.created_at,
            "organizations_created": created_org
        }
        return jsonify(user_dict)
    return jsonify({"message": "Not yet implemented"})
    # if request.method == "PUT":
