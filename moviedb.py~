import scraper
import sqlite3

conn = sqlite3.connect('movieinfo.sqlite')
cur = conn.cursor()

cur.execute('''
DROP TABLE IF EXISTS Actors''')

cur.execute('''
DROP TABLE IF EXISTS Movies''')

cur.execute('''
DROP TABLE IF EXISTS Movies_Actors''')

cur.execute('''CREATE TABLE Movies (
    id  INTEGER NOT NULL PRIMARY KEY UNIQUE,
    name    TEXT UNIQUE
)''')

cur.execute('''CREATE TABLE Actors (
    id  INTEGER NOT NULL PRIMARY KEY UNIQUE,
    name    TEXT UNIQUE
)''')

cur.execute('''CREATE TABLE Movies_Actors (
    movie_id  INTEGER,
    actor_id  INTEGER,
    PRIMARY KEY (movie_id, actor_id)
)''')

fh = open("movie_list.txt")
for line in fh:
    movie = line.strip()
    movie_data = scraper.imdb_scraper(movie)
    actors = movie_data['Actors'].split(', ')

    cur.execute('''INSERT OR IGNORE INTO Movies (name)
        VALUES ( ? )''', (movie_data['Title'], ))
    cur.execute('SELECT id FROM Movies WHERE name = ? ',
                (movie_data['Title'], ))
    movie_id = cur.fetchone()[0]

    for actor in actors:
        cur.execute('''INSERT OR IGNORE INTO Actors (name)
        VALUES ( ? )''', (actor, ))
        cur.execute('SELECT id FROM Actors WHERE name = ? ', (actor, ))
        actor_id = cur.fetchone()[0]

        cur.execute('''INSERT OR REPLACE INTO Movies_Actors
        (movie_id, actor_id) VALUES (?, ?)''',
                    (movie_id, actor_id))

conn.commit()
