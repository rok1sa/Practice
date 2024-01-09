from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import mysql.connector
from main import add_word_to_database, remove_word_from_database, get_blacklist_from_database

app = Flask(__name__)
CORS(app)

# MySQL setup
db_config = {
    "user": "root",
    "password": "PASSWORD",
    "host": "localhost",
    "database": "admin",
    "port": 3306,
}

def connect_to_database():
    try:
        db_connection = mysql.connector.connect(**db_config)
        return db_connection
    except mysql.connector.Error as err:
        print(f"Error connecting to the database: {err}")
        raise

def get_blacklist_from_database():
    db_connection = connect_to_database()
    cursor = db_connection.cursor()
    cursor.execute('SELECT phrase FROM blacklist')
    blacklist = [row[0] for row in cursor.fetchall()]
    db_connection.close()
    return blacklist

@app.route('/')
def index():
    # Fetch the blacklist from the database
    blacklist = get_blacklist_from_database()
    return render_template('index.html', blacklist=blacklist)

@app.route('/add_word', methods=['POST', 'GET'])
def add_word():
    if request.method == 'POST':   
        word = request.form.get('word')
        print('Adding word:', word)
        add_word_to_database(word)
        return jsonify(success=True)
    return jsonify(error='Invalid request method')

@app.route('/remove_word', methods=['POST', 'GET'])
def remove_word():
    if request.method == 'POST':
        word = request.form.get('word')
        remove_word_from_database(word)
        return jsonify(success=True)
    return jsonify(error='Invalid request method')

if __name__ == '__main__':
    app.run(debug=True)
