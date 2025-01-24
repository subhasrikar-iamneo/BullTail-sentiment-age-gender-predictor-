import os
from twilio.rest import Client

def sendmsg(bdy):
    account_sid = "secret"
    auth_token = "secret"
    client = Client(account_sid, auth_token)

    message = client.messages.create(
    from_='whatsapp:+14155238886',
    body=bdy,
    to='whatsapp:+919014046470'
    )