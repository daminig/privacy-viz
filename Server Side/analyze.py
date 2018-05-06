#!/usr/bin/env python
# -*- coding: utf-8 -*-

from sys import argv

print(argv[1])
exit(0)

import re
import json
import pandas as pd

def func(data):
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

	return result

print("{'donut': " + func(json.loads(argv[1])) + "}")
