from flask import Flask, render_template, redirect, request
import requests, json, pprint
from jinja2 import Environment

app = Flask(__name__)

# https://restcountries.com/ API

def format_number(value):
    return "{:,}".format(value)

app.jinja_env.filters['format_number'] = format_number

def format_border(value):
    return "".format(value)

app.jinja_env.filters['format_border'] = format_border

@app.route("/")
def index():
    url = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
    response = requests.get(url).json()

    countries = []

    for row in response:
        country = {
            "name": row['name']['official'],
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

    url = "https://restcountries.com/v3.1/all?fields=name,flags,nativeName,region,subregion,capital,topLevelDomain,currencies,borders,population"
    response = requests.get(url).json()

    for index, value in enumerate(response):
        country = {
            "name": value['name']['official'],
            "index": index
        }
        countries.append(country)

    matching = [d for d in countries if d.get('name') == country_name]

    if matching:
        row = response[int(matching[0]['index'])]
        country = {
            "name": row['name']['official'],
            "flags": {
                "png": row['flags']['png'],
            },
            "population": row['population'],
            "region": row['region'],
            "capital": row['capital'][0] if row['capital'] else row['capital'],
            "subregion": row['subregion'],
            "nativeName": get_native_name(row['name']['nativeName']),

        }

        return render_template("country.html", country=country) #fill in values TODO!
    else:
        return redirect("/")
    
def get_native_name(data):
    return "TODO!"