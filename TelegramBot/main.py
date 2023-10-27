import os
import telebot
from dotenv import load_dotenv

load_dotenv()

# Keys for Telegram's API
# api_id = os.getenv('api_id')
# api_hash = os.getenv('api_hash')

# Keys
API_KEY = os.getenv('API_KEY')

bot = telebot.TeleBot(API_KEY)
blacklist = []

@bot.message_handler(commands=['add_word'])
def add_word_to_blacklist(message):
    bl_word = message.text.split('/add_word')[1]
    blacklist.append(bl_word)
    bot.reply_to(message, f"Added{bl_word} to the blacklist.")

@bot.message_handler(commands=['remove_word'])
def remove_word_from_blacklist(message):
    bl_word = message.text.split('/remove_word')[1]
    if bl_word in blacklist:
        blacklist.remove(bl_word)
        bot.reply_to(message, f"Removed{bl_word} from the blacklist.")
    else:
        bot.reply_to(message, f"{bl_word} isn't in the blacklist")

# i think its kinda like adding words to the blackl directly. ll look into it tomorrow
@bot.message_handler(func=lambda message: any(word in message.text for word in blacklist))
def delete_blacklisted_messages(message):
    bot.delete_message(message.chat.id, message.message_id)

# Test command
@bot.message_handler(commands=['Greet'])
def greet(message):
    bot.reply_to(message, 'Hey! How is it going?')

bot.polling()
#list 1 = ['hello']
#list.text.split()
