import smtplib
import getpass
import random


class Email:
    def __init__(self) -> None:
        self.verify_code = None

    def generate_password(self):
        self.verify_code = str(random.randint(100000, 999999))
        return self.verify_code

    def send_mail(self, email, vCode):
        subject = 'Email Verification Code'
        body = f'Your email verification code is {vCode}'

        sender_mail = 'udehdinobi@gmail.com'
        sender_pass = 'xcpp mdno byuu ovlu'

        message2 = f'Subject: {subject}\n\n{body}'

        session = smtplib.SMTP('smtp.gmail.com', 587)
        session.ehlo()
        session.starttls()
        session.login(sender_mail, sender_pass)
        session.sendmail(
            from_addr=sender_mail,
            to_addrs=email,
            msg=message2
        )
        session.quit()
