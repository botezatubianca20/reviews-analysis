import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import mysql.connector



mydb = mysql.connector.connect(
    host = '127.0.0.1',
    port = 3306,
    database = 'movies',
    user = 'root',
    password = ''
)

mycursor = mydb.cursor()

mycursor.execute("SELECT movie FROM movie ORDER BY id_movie desc limit 1")
myresult = mycursor.fetchone()
# print(myresult[0])

mycursor.execute("SELECT id_movie FROM movie ORDER BY id_movie desc limit 1")
id = mycursor.fetchone()
# print(id[0])


######   https://www.youtube.com/watch?v=XoTwndOgXBM
def get_title_from_index(index):
	return df[df.index == index]["title"].values[0]

def get_index_from_title(title):
	return df[df.title == title]["index"].values[0]

##Step 1: Read CSV File
df = pd.read_csv("movie_dataset.csv")
#print df.columns
##Step 2: Select Features

features = ['keywords','cast','genres','director']
##Step 3: Create a column in DF which combines all selected features
for feature in features:
	df[feature] = df[feature].fillna('')

def combine_features(row):
	try:
		return row['keywords'] +" "+row['cast']+" "+row["genres"]+" "+row["director"]
	except:
		print("Error:", row)

df["combined_features"] = df.apply(combine_features,axis=1)



##Step 4: Create count matrix from this new combined column
cv = CountVectorizer()

count_matrix = cv.fit_transform(df["combined_features"])

##Step 5: Compute the Cosine Similarity based on the count_matrix
cosine_sim = cosine_similarity(count_matrix)

movie_user_likes = myresult[0]
# movie_user_likes = "Prison"

## Step 6: Get index of this movie from its title
movie_index = get_index_from_title(movie_user_likes)


# print(get_title_from_index(movie_index).find(movie_user_likes))
# if get_title_from_index(movie_index).find("riso") >= 0:
# 	new_movie_index = get_index_from_title(movie_user_likes)
# 	print(new_movie_index)



# if get_title_from_index(movie_index).find(movie_user_likes) >= 0 :
# 	print(get_index_from_title(get_title_from_index(movie_index).find(movie_user_likes)))
# 	movie_index = get_index_from_title(get_title_from_index(movie_index).find(movie_user_likes))





similar_movies =  list(enumerate(cosine_sim[movie_index]))
# print(similar_movies)


## Step 7: Get a list of similar movies in descending order of similarity score
sorted_similar_movies = sorted(similar_movies,key=lambda x:x[1],reverse=True)
print(sorted_similar_movies[0][1])
print(sorted_similar_movies[1][1])



## Step 8: Print titles of first 50 movies
movies=''
i=0
for element in sorted_similar_movies:
	# print(get_title_from_index(element[0]))

	movies = movies + ', ' + get_title_from_index(element[0])  + "    (" + str(round(sorted_similar_movies[i][1] * 100,2))+ "%) "
    	
	i=i+1
	if i>50:
		break


movies = movies[2:]
print(movies)

sql = "UPDATE movie SET recommended_movies = %s WHERE id_movie = %s"

val = (str(movies), str(id[0]))

mycursor.execute(sql, val)

# mycursor.execute(sql)
mydb.commit()


