from flask import jsonify, request, redirect, abort
from api.v1.views import app_look
from emailVerification import Email
from database import storage
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, get_jwt_identity, \
    jwt_required
from smtplib import SMTPConnectError
import pytz
from models.items import Item
item = Item()

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
@jwt_required()
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
            "created_at": org.created_at_local_time_strf(),
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
    
@app_look.route('/organizations/<organization_id>/sales', methods=['GET', 'POST'], strict_slashes=False)
@jwt_required()
def sales(organization_id):
    """Gets and creates sales for an organization"""
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"message": "Invalid token"}), 400
    get_usr = storage.get_user_by_id(user_id)
    if not get_usr:
        return jsonify({"message": "Invalid access"}), 400
    get_org = storage.get_org_by_id(organization_id)
    if not get_org:
        return jsonify({"message": "Invalid access"}), 400
    if request.method == 'POST':
        org = request.get_json()
        items = org.get('items')
        for item in range(len(items)):
            get_item = storage.get_item_by_id(item['id'])
            if not get_item:
                return jsonify({"message": "Item dosen't exist in database"}), 400
            get_quantity = item['quantity']
            get_time = get_org.created_at_local_time_strf
            get_username = get_usr.full_name
            get_description = item['description']
            makeSale = get_item.remove(get_quantity, get_time, get_username, get_description)
        return jsonify(makeSale), 200
    
@app_look.route('/organizations/<organization_id>/products', methods=['GET', 'POST'], strict_slashes=False)
@jwt_required()
def products(organization_id):
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"message": "Invalid token"}), 400
    
    get_usr = storage.get_user_by_id(user_id)
    if not get_usr:
        return jsonify({"message": "Invalid access"}), 400
    org_id = storage.get_org_by_id(organization_id)
    if not org_id:
        return jsonify({"message": "Invalid organization"}), 400
    
    if request.method == "GET":
        all_list = []
        for count in org_id.items:
            resp = {
                'id': count.id,
                'name': count.name,
                'quantity': count.quantity,
                'sale_price': count.sale_price,
                'cost_price': count.cost_price,
                'unit': count.unit,
                'created_by': count.created_by
            }
            all_list.append(resp)
        return jsonify(all_list)
    
    if request.method == 'POST':
        kwarg = {
            'name': request.form.get('name'),
            'cost_price': request.form.get('costPrice'),
            'sale_price': request.form.get('salePrice'),
            'unit': request.form.get('unit'),
            'quantity': request.form.get('quantity'),
            'full_name': get_usr.full_name
        }

        if not kwarg["name"] or not kwarg["cost_price"] or not kwarg["sale_price"] \
            or not kwarg["quantity"] or not kwarg["image"]:
            return jsonify({"message": "Incomplete data"}), 400
        params = org_id.create_item(**kwarg)
        return jsonify(params)
    