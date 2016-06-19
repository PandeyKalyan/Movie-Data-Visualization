import urllib
import json

apiurl = "http://www.omdbapi.com/?"


def imdb_scraper(title):
    url = apiurl + \
        urllib.urlencode({'t': title})
    print 'Retrieving data from ', url
    url_reply = urllib.urlopen(url).read()
    movie_data = json.loads(url_reply)
    return movie_data
