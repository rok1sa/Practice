import os
import telebot
from dotenv import load_dotenv
import mysql.connector
from flask import Flask, render_template, jsonify
blacklist = []
API_KEY = os.getenv('API_KEY')
bot = telebot.TeleBot(API_KEY)
authorized_users = [int(user_id) for user_id in os.getenv('AUTHORIZED_USERS').split(',')]

app = Flask(__name__)
@app.route("/")
def index():
    return render_template("index.html", blacklist=blacklist)

@app.route("/get_blacklist")
def get_blacklist():
    return jsonify(blacklist)

if __name__ == '__main__':
    app.run()

load_dotenv()

# Replace these with your actual MySQL credentials
db_config = {
    "user": "root",
    "password": "PASSWORD",
    "host": "localhost",  # or the appropriate hostname if not running on localhost
    "database": "admin",
    "port": 3306,  # or the appropriate port number
}

# Handler for private messages to add blacklisted words
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
    # Connect to the MySQL server
    connection = mysql.connector.connect(**db_config)

    def connect_to_database():
        db_connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="PASSWORD",
            database="admin"
        )
        return db_connection

    def add_word_to_database(bl_word):
        db_connection = connect_to_database()
        cursor = db_connection.cursor()
        insert_query = 'INSERT INTO blacklist (word) VALUES (%s)'
        cursor.execute(insert_query, (bl_word,))
        db_connection.commit()
        db_connection.close()

    def synchronize_blacklist():
        global blacklist
        db_connection = connect_to_database()
        cursor = db_connection.cursor()
        cursor.execute('SELECT word FROM blacklist')
        blacklist = [row[0] for row in cursor.fetchall()]
        db_connection.close()

    if __name__ == '__main__':
        synchronize_blacklist()
        bot.polling()

except mysql.connector.Error as err:
    print(f"Error: {err}")
finally:
    if connection:
        connection.close()
