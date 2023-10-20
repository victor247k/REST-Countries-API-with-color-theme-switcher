def format_number(value):
    return "{:,}".format(value)

def get_language(data):
    
    languages = []

    for key in data:
        languages.append(data[key])

    return languages

def get_native_name(data):

    for key in data:
        return data[key]['common']

def get_borders(data):
    try:
        return data['borders']
    except KeyError:
        return []