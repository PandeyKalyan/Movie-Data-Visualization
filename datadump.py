import sqlite3
import csv
from operator import itemgetter

conn = sqlite3.connect('movieinfo.sqlite')
cur = conn.cursor()

genre_count = dict()
actors_count = list()
cur.execute("SELECT Genre.name FROM Genre")
all_genres = cur.fetchall()

cur.execute("SELECT Actors.name FROM Actors")
all_actors = cur.fetchall()

cur.execute("SELECT id, name, rating FROM Movies")
movie_ratings = cur.fetchall()

for actor in all_actors:
    cur.execute(
        "SELECT COUNT(*) FROM Movies JOIN Actors JOIN Movies_Actors WHERE Movies.id=Movies_Actors.movie_id AND Actors.id=Movies_Actors.actor_id AND Actors.name= ?", (actor[0],))
    count = cur.fetchone()[0]
    actors_count.append((actor[0], count))

actors_count = sorted(actors_count, key=itemgetter(1), reverse=True)
actors_count = actors_count[0:20]

for genre in all_genres:
    cur.execute(
        "SELECT COUNT(*) FROM Movies JOIN Genre JOIN Movies_Genre WHERE Movies.id=Movies_Genre.movie_id AND Genre.id=Movies_Genre.genre_id AND Genre.name= ?", (genre[0],))
    count = cur.fetchone()[0]
    genre_count[genre[0]] = count

writer1 = csv.writer(open('genrecount.csv', 'wb'))
writer2 = csv.writer(open('actorcount.csv', 'wb'))
writer3 = csv.writer(open('movierating.csv', 'wb'))
writer1.writerow(("genre", "count"))
writer2.writerow(("actor", "count"))
writer3.writerow(("id", "name", "rating"))

for key, value in genre_count.items():
    writer1.writerow([key, value])

for actor_count in actors_count:
    writer2.writerow(actor_count)

for movie_rating in movie_ratings:
    writer3.writerow(movie_rating)
