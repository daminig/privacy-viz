def scrape_string(string):
    entries = string.split('\n')
    vals = {}
    for sub_string in entries:
        values = sub_string.split(' ')
        website = values[1].split('/')[2]
        visits = int(values[0])
        if vals.get(website):
            vals[website] = vals.get(website) + visits
        else:
            vals[website] = visits
    return vals