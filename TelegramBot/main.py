import os
import telebot
from dotenv import load_dotenv
load_dotenv()
# or os.environ('KEY_HERE)
API_KEY = os.getenv('API_KEY')
bot = telebot.TeleBot(API_KEY)

@bot.message_handler(commands=['Greet'])
def greet(message):
    bot.reply_to(message, "Hey! How are you?")

bot.polling()