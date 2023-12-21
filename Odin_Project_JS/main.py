message_text = 'Message: /add_word word1 /add_word word2'

bl_word = message_text.split('add_word', 1)[1].strip()
print(bl_word)
