import scraper
import sqlite3
import time

conn = sqlite3.connect('movieinfo.sqlite')
cur = conn.cursor()


cur.execute('''CREATE TABLE IF NOT EXISTS Movies (
    id  INTEGER NOT NULL PRIMARY KEY UNIQUE,
    name    TEXT UNIQUE,
    year    INTEGER,
    runtime TEXT,
    director_id INTEGER,
    rating FLOAT
)''')

cur.execute('''CREATE TABLE IF NOT EXISTS Actors (
    id  INTEGER NOT NULL PRIMARY KEY UNIQUE,
    name    TEXT UNIQUE
)''')

cur.execute('''CREATE TABLE IF NOT EXISTS Directors (
    id  INTEGER NOT NULL PRIMARY KEY UNIQUE,
    name    TEXT UNIQUE
)''')

cur.execute('''CREATE TABLE IF NOT EXISTS Genre (
    id  INTEGER NOT NULL PRIMARY KEY UNIQUE,
    name    TEXT UNIQUE
)''')

cur.execute('''CREATE TABLE IF NOT EXISTS Movies_Actors (
    movie_id  INTEGER,
    actor_id  INTEGER,
    PRIMARY KEY (movie_id, actor_id)
)''')

cur.execute('''CREATE TABLE IF NOT EXISTS Movies_Genre (
    movie_id  INTEGER,
    genre_id  INTEGER,
    PRIMARY KEY (movie_id, genre_id)
)''')

fh = open("movie_list.txt")
for line in fh:
    movie = line.strip()

    cur.execute("SELECT name FROM Movies WHERE name= ?",
                (movie, ))
    try:
        data = cur.fetchone()[0]
        print "Found in database ", movie
        continue
    except:
        pass

    movie_data = scraper.imdb_scraper(movie)
    actors = movie_data['Actors'].split(', ')
    genres = movie_data['Genre'].split(', ')
    title = movie_data['Title']
    year = int(movie_data['Year'])
    runtime = int(movie_data['Runtime'].split()[0])
    director = movie_data['Director']
    rating = float(movie_data['imdbRating'])

    cur.execute('''INSERT OR IGNORE INTO Directors (name)
        VALUES ( ? )''', (director, ))
    cur.execute('SELECT id FROM Directors WHERE name = ? ',
                (director, ))
    director_id = cur.fetchone()[0]

    cur.execute('''INSERT OR IGNORE INTO Movies (name, year, runtime, director_id, rating)
        VALUES ( ?, ?, ?, ?, ? )''', (title, year, runtime, director_id, rating))
    cur.execute('SELECT id FROM Movies WHERE name = ? ',
                (title, ))
    movie_id = cur.fetchone()[0]

    for actor in actors:
        cur.execute('''INSERT OR IGNORE INTO Actors (name)
        VALUES ( ? )''', (actor, ))
        cur.execute('SELECT id FROM Actors WHERE name = ? ', (actor, ))
        actor_id = cur.fetchone()[0]

        cur.execute('''INSERT OR REPLACE INTO Movies_Actors
        (movie_id, actor_id) VALUES (?, ?)''',
                    (movie_id, actor_id))

    for genre in genres:
        cur.execute('''INSERT OR IGNORE INTO Genre (name)
        VALUES ( ? )''', (genre, ))
        cur.execute('SELECT id FROM Genre WHERE name = ? ', (genre, ))
        genre_id = cur.fetchone()[0]

        cur.execute('''INSERT OR REPLACE INTO Movies_Genre
        (movie_id, genre_id) VALUES (?, ?)''',
                    (movie_id, genre_id))

    conn.commit()
    time.sleep(1)
