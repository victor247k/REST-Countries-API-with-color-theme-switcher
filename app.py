from flask import Flask, render_template, redirect, request
import requests, json, pprint
from jinja2 import Environment
from helpers import format_border, format_number, get_language, get_native_name, get_borders

app = Flask(__name__)

# https://restcountries.com/ API

app.jinja_env.filters['format_border'] = format_border
app.jinja_env.filters['format_number'] = format_number

@app.route("/")
def index():
    url = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
    response = requests.get(url).json()

    countries = []

    for row in response:
        country = {
            "name": row['name']['common'],
            "flags": {
                "png": row['flags']['png'],
            },
            "population": row['population'],
            "region": row['region'],
            "capital": row['capital'][0] if row['capital'] else row['capital']
        }
        countries.append(country)

    regions = ["africa", "america", "asia", "europe", "oceania"]

    return render_template("index.html", regions=regions, countries=countries)

@app.route("/country/<country_name>")
def country_page(country_name):

    countries = []

    url = "https://restcountries.com/v3.1/all"
    response = requests.get(url).json()

    for index, value in enumerate(response):
        country = {
            "name": value['name']['common'],
            "index": index
        }
        countries.append(country)

    matching = [d for d in countries if d.get('name') == country_name]

    if matching:
        row = response[int(matching[0]['index'])]
        country = {
            "name": row['name']['common'],
            "flags": {
                "png": row['flags']['png'],
            },
            "population": row['population'],
            "region": row['region'],
            "capital": row['capital'][0] if row['capital'] else row['capital'],
            "subregion": row['subregion'],
            "nativeName": get_native_name(row['name']['nativeName']),
            "topLevelDomain": row['tld'][0],
            "currencies": row['currencies'],
            "languages": get_language(row['languages']),
            "borders": get_borders(row),
        }

        return render_template("country.html", country=country) #fill in values TODO!
    else:
        return redirect("/")
    