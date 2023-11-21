import os
import telebot
from dotenv import load_dotenv
import mysql.connector
from flask import Flask, render_template, jsonify
import threading
import socket

load_dotenv()
API_KEY = os.getenv('API_KEY')
bot = telebot.TeleBot(API_KEY)
blacklist = []
authorized_users = [int(user_id) for user_id in os.getenv('AUTHORIZED_USERS').split(',')]

#Ports
def find_available_port(start_port, end_port):
    for port in range(start_port, end_port + 1):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('127.0.0.1', port)) != 0:
                return port
    return None

start_port = 5000
end_port = 6000

available_port = find_available_port(start_port, end_port)

if available_port is not None:
    print(f'Available port found: {available_port}')
else:
    print("No available ports found in the specified range.")


#Flask 
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", blacklist=blacklist)

@app.route("/get_blacklist")
def get_blacklist():
    return jsonify(blacklist)

def run_flask_app():
    app.run(port=available_port)

def run_telegram_bot():
    bot.polling(none_stop=True)


#For the connection to the mysql db
db_config = {
    "user": "root",
    "password": "PASSWORD",
    "host": "localhost",  
    "database": "admin",
    "port": 3306,  
}

def connect_to_database():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="PASSWORD",
        database="admin"
    )

def add_word_to_database(bl_word):
    try:
        db_connection = connect_to_database()
        cursor = db_connection.cursor()
        print(f'Adding word to database: {bl_word}')
        insert_query = 'INSERT INTO blacklist (phrase) VALUES (%s)'
        cursor.execute(insert_query, (bl_word,))
        db_connection.commit()
        db_connection.close()
    except mysql.connector.Error as err:
        print(f'Error adding word to database: {err}')

def synchronize_blacklist():
    global blacklist
    db_connection = connect_to_database()
    cursor = db_connection.cursor()
    cursor.execute('SELECT phrase FROM blacklist')
    blacklist = [row[0] for row in cursor.fetchall()]
    db_connection.close()

if __name__ == '__main__':
    synchronize_blacklist()

    # Run Flask in the main thread

    flask_thread = threading.Thread(target=run_flask_app)
    flask_thread.start()
    # Run the Telegram bot polling in the main thread
    telegram_thread = threading.Thread(target=run_telegram_bot)
    telegram_thread.start()

    flask_thread.join()
    telegram_thread.join()

#The bot commands:
@bot.message_handler(func=lambda message: message.chat.type == 'private', commands=['add_word'])
def add_word_to_blacklist_private(message):
    user_id = message.from_user.id
    if user_id in authorized_users:
        # Extract the entire message text
        bl_word = message.text.split('/add_word', 1)[1].strip()
        if bl_word:
            add_word_to_database(bl_word)
            blacklist.append(bl_word)
            bot.reply_to(message, f"Added '{bl_word}' to the blacklist.")
        else:
            bot.reply_to(message, 'Please provide a sentence to add to the blacklist')
    else:
        bot.reply_to(message, 'You are not authorized to use this command.')

# Handler for group messages to moderate blacklisted words
@bot.message_handler(func=lambda message: message.chat.type == 'group' or message.chat.type == 'supergroup')
def moderate_group_messages(message):
    message_text = message.text.lower()

    for word in blacklist:
        if word in message.text:
            bot.delete_message(message.chat.id, message.message_id)
            break

@bot.message_handler(func=lambda message: message.chat.type == 'private', commands=['remove_word'])
def remove_word_from_blacklist(message):
    user_id = message.from_user.id
    if user_id in authorized_users:
        bl_word = message.text.split('/remove_word')[1].strip().lower()
        if bl_word in blacklist:
            removed_word = blacklist.remove(bl_word)
            bot.reply_to(message, f"Removed '{bl_word}' from the blacklist.")
        else:
            bot.reply_to(message, f"'{bl_word}' isn't in the blacklist.")
    else:
        bot.reply_to(message, "You are not authorized to use this command.")

# Handler for private messages (I think?)
@bot.message_handler(func=lambda message: any(word in message.text for word in blacklist))
def delete_blacklisted_messages(message):
    bot.delete_message(message.chat.id, message.message_id)

@bot.message_handler(commands=['show_list'])
def show_list(message):
    if not blacklist:
        bot.send_message(message.chat.id, 'The blacklist is empty.')
    else:
        blacklist_text = '\n'.join(blacklist)
        bot.send_message(message.chat.id, f'Blacklist:\n{blacklist_text}')

# Test command
@bot.message_handler(commands=['Greet'])
def greet(message):
    bot.reply_to(message, 'Hey! How is it going?')

try:
    bot.polling(none_stop=True)
except Exception as e:
    print(f"Error: {e}")
    
@bot.message_handler(func=lambda message: True)
def echo_all(message):
    print(f'Received message: {message.text}')