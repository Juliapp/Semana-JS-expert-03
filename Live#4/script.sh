curl --silent https://next.json-generator.com/api/json/get/NJafGjxXq | 
    jq '[.[] | {name: .name, category: .category}]' | 
    tee myfile.json

curl --silent https://next.json-generator.com/api/json/get/NJafGjxXq | 
    jq '[.[] | {name: .name, category: .category}]' | 
    tee myfile2.json