import mysql.connector

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

# Test the function
if __name__ == "__main__":
    word_to_add = "test_word"
    add_word_to_database(word_to_add)
