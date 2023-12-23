import os
import telebot
from dotenv import load_dotenv
import mysql.connector
from flask import Flask, render_template, request, jsonify
import socket
import threading
import atexit


load_dotenv()
API_KEY = os.getenv('API_KEY')
bot = telebot.TeleBot(API_KEY)
blacklist = []
authorized_users = [int(user_id) for user_id in os.getenv('AUTHORIZED_USERS').split(',')]


#fff im not sure if this will work.
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


def add_word_to_database(bl_word):
    try:
        db_connection = connect_to_database()
        cursor = db_connection.cursor()
        print(f'Adding word to database: {bl_word}')

        insert_query = 'INSERT INTO blacklist (phrase) VALUES (%s)'
        cursor.execute(insert_query, (bl_word,))

        db_connection.commit()
        db_connection.close()
        print(f'Successfully added word: {bl_word}')
    except mysql.connector.Error as err:
        print(f'Error adding word to the database: {err}')
        raise  # Re-raise the exception to indicate a critical error

def remove_word_from_database(bl_word):
    try:
        db_connection = connect_to_database()
        cursor = db_connection.cursor()
        print(f'Removing word from the database: {bl_word}')

        delete_query = 'DELETE FROM blacklist WHERE phrase = %s'
        cursor.execute(delete_query, (bl_word,))

        db_connection.commit()
        db_connection.close()
        print(f'Successfully removed word: {bl_word}')
    except mysql.connector.Error as err:
        print(f'Error removing word to the database: {err}')
        raise

def synchronize_blacklist():
    global blacklist
    db_connection = connect_to_database()
    cursor = db_connection.cursor()
    cursor.execute('SELECT phrase FROM blacklist')
    blacklist_db = [row[0] for row in cursor.fetchall()]
    db_connection.close()

    blacklist = blacklist_db

### fff

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


@bot.message_handler(func=lambda message: message.chat.type == 'private', commands=['remove_word'])
def remove_word_from_blacklist(message):
    user_id = message.from_user.id
    if user_id in authorized_users:
        bl_word = message.text.split('/remove_word', 1)[1].strip()
        if bl_word in blacklist:
            remove_word_from_database(bl_word)
            blacklist.remove(bl_word)
            bot.reply_to(message, f"Removed '{bl_word}' from the blacklist.")
            # or this will sync both blacklists every time the word is added to the bl.
            # remove_word_from_database(bl_word)
            #synchronize_blacklist()
            #bot.reply_to(message, f"Removed '{bl_word}' from the blacklist.")
        else:
            bot.reply_to(message, f"'{bl_word}' isn't in the blacklist.")
    else:
        bot.reply_to(message, "You are not authorized to use this command.")

# Handler for group messages to moderate blacklisted words
@bot.message_handler(func=lambda message: message.chat.type == 'group' or message.chat.type == 'supergroup')
def moderate_group_messages(message):
    message_text = message.text.lower()

    for word in blacklist:
        if word in message.text:
            bot.delete_message(message.chat.id, message.message_id)
            break
# Handler for private messages (I think?)
@bot.message_handler(func=lambda message: any(word in message.text for word in blacklist))
def delete_blacklisted_messages(message):
    bot.delete_message(message.chat.id, message.message_id)

@bot.message_handler(commands=['show_list'])
def show_list(message):
    synchronize_blacklist()
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

# Handle cleanup on script termination
def cleanup():
    print("Cleaning up...")
    bot.stop_polling()

# Register cleanup function
atexit.register(cleanup)