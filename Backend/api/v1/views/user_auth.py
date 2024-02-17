#!/usr/bin/python3
from flask import jsonify, request, redirect, abort
from api.v1.views import app_look
from emailVerification import Email
from database import storage
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, get_jwt_identity,\
    jwt_required
from smtplib import SMTPConnectError

Mail = Email()

@app_look.route('/signup', methods=['POST'], strict_slashes=False)
def reg_users():
    """Registers a user"""
    kwargs = {
        "first_name": request.form.get('firstName'),
        "last_name": request.form.get('lastName'),
        "email": request.form.get('email'),
        "password": request.form.get('password'),
        "mobile": request.form.get('mobile')
    }

    if kwargs["email"] is None or kwargs["password"] is None or\
            kwargs['first_name'] is None or kwargs['last_name'] is None:
        return jsonify({'message': 'Signup details is incomplete'}), 400
    user = storage.get_user_by_email(kwargs["email"])
    if user:
        return jsonify({'message': "email already exits"}), 400
    new_user = storage.register_user(**kwargs)
    message = "Signup successful. Verification email sent."
    try:
        passW = Mail.generate_password()
        Mail.send_mail(kwargs['email'], passW)
        new_user.active_token = passW
        new_user.token_expiry = datetime.utcnow() + timedelta(minutes=10)
    except SMTPConnectError:
        message = "Signup successful but verification email could not be sent"
    access_token = create_access_token(identity=new_user.id)
    storage.save()
    resp = {
        'message': message,
        "jwt": access_token,
        "fullName": f"{new_user.first_name} {new_user.last_name}",
        "organization": new_user.organizations,
    }
    return jsonify(resp), 200


@app_look.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """Logs the user to the site"""
    email = request.form.get('email')
    password = request.form.get('password')
    user = storage.get_user_by_email(email)
    if not user:
        return jsonify({'message': "Wrong email"}), 401
    if not user.validate_password(password):
        return jsonify({'message': "Wrong password"}), 401
    access_token = create_access_token(identity=user.id)
    resp = {
        'message': "Login Succesful",
        "jwt": access_token,
        "fullName": f"{user.first_name} {user.last_name}",
        "organization": user.organizations,
    }
    return jsonify(resp), 200
    

@app_look.route('/verify-code', methods=['POST'], strict_slashes=False)
@jwt_required()
def get_code():
    """Gets the verification code"""
    code = request.form.get('code')

    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"message": "Invalid token"}), 400
    user = storage.get_user_by_id(user_id)
    if not user:
        return jsonify({"message": "Invalid token claims"}), 400
    if user.token_expiry < datetime.utcnow():
        try:
            passW = Mail.generate_password()
            Mail.send_mail(user.email, passW)
            user.active_token = passW
            user.token_expiry = datetime.utcnow() + timedelta(minutes=10)
            msg = "Verification code expired, new code has been resent"
            storage.save()
        except SMTPConnectError:
            msg = "Verification code expired but error occurred resending code"
        return jsonify({"message": msg}), 400
    if code != user.active_token:
        return jsonify({"message": "Wrong verification code"}), 400
    user.email_verified = True
    user.active_token = None
    user.token_expiry = None
    storage.save()
    return jsonify({"message": "Email Verified"}), 200
