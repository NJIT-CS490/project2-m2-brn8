# Brijesh Naik app.py 
from os.path import join, dirname
from dotenv import load_dotenv
import os
import flask
import flask_sqlalchemy
import flask_socketio
import models 
import re

ADDRESSES_RECEIVED_CHANNEL = 'addresses received'

app = flask.Flask(__name__)

socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

dotenv_path = join(dirname(__file__), 'sql.env')
load_dotenv(dotenv_path)


database_uri = os.environ['DATABASE_URL']

app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app


db.create_all()
db.session.commit()

def emit_all_addresses(channel):
    all_addresses =[ db_address.address for db_address in db.session.query(models.Usps).all()]
    
    socketio.emit(channel,{
        'allAddresses': all_addresses
    })

count_usr=[]
@socketio.on('connect')
def on_connect():
    print('Someone connected!')
    conn='connect'
    count_usr.append(conn)
    finalCount=count_usr.count(conn) 
    socketio.emit('connected', {
        'test': finalCount
    })
    
    emit_all_addresses(ADDRESSES_RECEIVED_CHANNEL)
    

@socketio.on('disconnect')
def on_disconnect():
    print ('Someone disconnected!')
    conn='connect'
    count_usr.remove(conn)
    finalCount=len(count_usr)
    socketio.emit('disconnected', {
        'test': finalCount
    })

links=[]
@socketio.on('new input')
def on_new_input(data):
    print("Got an event for new address input with data:", data)
    db.session.add(models.Usps(data["address"]));
    info=data["address"]
    if info == '!! about':
        txt_about="Sawan(Bot): Thank you for joining my first chat app and I hope you like this app.";
        db.session.add(models.Usps(txt_about));
    
    if info == '!! help':
        txt_help="Sawan(Bot): There are more commands you can use like !! funtranslate and !! about.";
        db.session.add(models.Usps(txt_help));
    
    link=(re.findall(r'(https?://[^\s]+)', info))
    if (link):
        clickable=link
        links.append(clickable)
        socketio.emit('new input', {
        'test': links
    })
        
    db.session.commit();
    
    emit_all_addresses(ADDRESSES_RECEIVED_CHANNEL)

@socketio.on('new username')
def new_username(data):
    print("Got an event for new address input with data:", data)
    
    db.session.add(models.Usps(data["address"]));
    db.session.commit();
    
    emit_all_addresses(ADDRESSES_RECEIVED_CHANNEL)

@app.route('/')
def index():
    emit_all_addresses(ADDRESSES_RECEIVED_CHANNEL)

    return flask.render_template("index.html")

if __name__ == '__main__': 
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )
    