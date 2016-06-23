import sqlite3
import csv

conn = sqlite3.connect('movieinfo.sqlite')
cur = conn.cursor()
genre_count = dict()
cur.execute("SELECT Genre.name FROM Genre")
all_genres = cur.fetchall()

for genre in all_genres:
    cur.execute(
        "SELECT COUNT(*) FROM Movies JOIN Genre JOIN Movies_Genre WHERE Movies.id=Movies_Genre.movie_id AND Genre.id=Movies_Genre.genre_id AND Genre.name= ?", (genre[0],))
    count = cur.fetchone()[0]
    genre_count[genre[0]] = count

print genre_count

writer = csv.writer(open('genrecount.csv', 'wb'))
writer.writerow(("genre", "count"))
for key, value in genre_count.items():
    writer.writerow([key, value])
