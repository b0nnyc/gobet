import requests
import os

filename = "url.txt"

with open(filename) as f:
    content = f.read().splitlines()

for line in content:
	folder = line[0:2] 
	fname =  folder + "/" + line
	if os.path.exists(fname):
		print("skipped", fname)
		continue
	url = "https://public.momopet.cn/resource/" + fname
	print(url)
	print(line)
	try:
		os.mkdir(folder)
	except:
		pass
	r = requests.get(url)
	with open(fname, 'wb') as f:
		f.write(r.content) 
