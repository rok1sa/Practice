import subprocess
import os

# Start Flask app
flask_cmd = ["/usr/local/bin/python3", "/Users/rokisa/Documents/GitHub/Practice/TgBot/my_flask_app.py"]
flask_process = subprocess.Popen(flask_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

# Start Telegram bot
bot_cmd = ["/usr/local/bin/python3", "/Users/rokisa/Documents/GitHub/Practice/TgBot/main.py"]
bot_process = subprocess.Popen(bot_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

# Wait for both processes to finish
flask_out, flask_err = flask_process.communicate()
bot_out, bot_err = bot_process.communicate()

# Print the output and errors
print("Flask Process Output:", flask_out.decode())
print("Flask Process Errors:", flask_err.decode())
print("Bot Process Output:", bot_out.decode())
print("Bot Process Errors:", bot_err.decode())
