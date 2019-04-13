import sentiment_mod as s
import mysql.connector
import sys

mydb = mysql.connector.connect(
    host = '127.0.0.1',
    port = 3306,
    database = 'movies',
    user = 'root',
    password = ''
)

mycursor = mydb.cursor()

mycursor.execute("SELECT content FROM reviews ORDER BY id_review desc limit 1")
myresult = mycursor.fetchone()
# print(myresult)

mycursor.execute("SELECT id_review FROM reviews ORDER BY id_review desc limit 1")
id = mycursor.fetchone()
print(id[0])

result = s.sentiment(str(myresult))
print(result[0])

if result[0] == 'neg':
    sql = "UPDATE reviews SET sentiment = -1 WHERE id_review = " + str(id[0])
elif result[0] == 'pos':
    sql = "UPDATE reviews SET sentiment = 1 WHERE id_review = " + str(id[0])

mycursor.execute(sql)
mydb.commit()

# print("Output from Python") 
# print(sys.argv) 
