const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if there's an error, reject the Promist and send the error to the Promise's .catch() method
            if (err) {
                reject(err);
                //return out of the function here to make sure the Promise does not accidentally also execute the resolve() function
                return;
            }

            //if everything went well, resolve the Promise and send the successful data to the resolve() method
            resolve({
                ok: true,
                message: 'File Created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise ((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
              reject(err);
              return;
            }
            
            resolve({
                ok: true,
                message: 'File copied!'
          });
        });
    })
}

module.exports = {
    writeFile: writeFile,
    copyFile: copyFile
};

// Shorthand property names can be used if the 'key name' has the same 'value' that it is being associated with
// module.exports = { writeFile, copyFile };