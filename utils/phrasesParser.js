const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, './phrases'));
for (const file of files) {
  const words = fs.readFileSync(path.join(__dirname, `./phrases/${file}`)).toString().split('\n');
  words.forEach(text => {
    const wordsCount = text.split(' ').length;
    if (wordsCount < 2) return;

    fs.writeFileSync(
      path.join(__dirname, `../config/phrases.txt`),
      text.toLowerCase()
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~?-]/g,"")
          .replace(/ё/g, "е"),
      {
        encoding: 'utf8',
        flag: 'a+',
      },
    );
  });
}
