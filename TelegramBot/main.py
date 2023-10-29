import os
import telebot
from dotenv import load_dotenv

load_dotenv()

# Keys
API_KEY = os.getenv('API_KEY')

bot = telebot.TeleBot(API_KEY)
blacklist = []
authorized_users = [int(user_id) for user_id in os.getenv('AUTHORIZED_USERS').split(',')]

# Handler for private messages to add blacklisted words
@bot.message_handler(func=lambda message: message.chat.type == 'private', commands=['add_word'])
def add_word_to_blacklist_private(message):
    user_id = message.from_user.id
    if user_id in authorized_users:
        bl_word = message.text.split('/add_word')[1].strip()
        if bl_word:
            blacklist.append(bl_word)
            bot.reply_to(message, f"Added '{bl_word}' to the blacklist.")
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

bot.polling()
