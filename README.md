# Jesse W Projects for CP07

Note that code for CP07 (file load, update, save, reload) is in the read file and update file requests.

## API using the file system

For this I challenged myself to build a (very basic) api only using what I've learned about node/fs/express, the official docs (not searching for anything API related), and my understanding of APIs from having consumed API in the past.

Given these limitations this API won't follow the normal conventions. As a second step later on I want to learn about creating APIs, and then come back and improve on this design.

For now it works... with a few minor bugs (and probably many many security flaws if it were to be made public!).

---

## How to setup

1. Clone to local machine
2. Make sure the CP07 branch is checked out
3. npm install
4. node /API/api.js

At this point you can hopefully make some requests. I used Insomnia to do this. I'll add some js files to do these requests at a later point (if it would count towards WD02)

---

## API Docs... kinda

### List files

GET request: http://localhost:3000/files

This will return a list of all the files in the data directory.

### Search files

GET request: http://localhost:3000/files/search
You will need to pass a JSON body with searchString, e.g.

```
{"searchString" : "awe"}
```

This is veery basic right now and just returns that the the searchString in the file name. This has lots of room for expansion.

### Open a file

GET request: http://localhost:3000/files/filename where filename is the name of the file you wanted to see the contents of, e.g. http://localhost:3000/files/ipsum.txt

### Update a file

PUT request: http://localhost:3000/files/filename/update where filename is the name of the file you wanted to update, e.g. http://localhost:3000/files/ipsum.txt/update

You will need to pass a JSON body. This body can include:

- rename: what you would like to rename the file to
- content: what you would like to change the file contents to
- overwrite: if true it will overwrite the existing contents, if false it will append to the end of the file. Default is false. _overwrite true currently isn't working as I'd hoped. I'm sure I could fix it... but it's time for bed_

You will need to pass at least rename or contents.
