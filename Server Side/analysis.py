from data import data
import re
import pandas as pd

nums = {}
sites = [re.match('https?:\/\/.*\..*?\/', d['url']).group(
	0) for d in data['history']]

df = (pd.DataFrame(sites, columns=['site'])
	.groupby('site')
	.size()
	.sort_values(ascending=False)
	.head())

final_sites = list(df.index)
final_numbers = list(df)

result = []

i = 0
while i < 5:
	result.append(
		{'site': final_sites[i],
		'visits': final_numbers[i]})
	i += 1

print(result)
