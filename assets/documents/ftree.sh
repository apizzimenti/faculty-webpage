#!/bin/sh
IFS=$'\n'
paths=($(find . -type d))
unset IFS

# For each sub-directory, create an index.html file using `tree` to
# list all the files. Man, `tree` should just have a built-in option
# for this.
for path in "${paths[@]}"; do
    cd "$path"
    tree -H "." -R --noreport --dirsfirst --charset utf-8 -o index.html
    cd "/Users/apizzimenti/Dropbox/School/GMU/webpages/personal/assets/documents"
done

