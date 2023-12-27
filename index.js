/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr  from "qr-image";
import fs from "fs";


inquirer
  .prompt([{
        message: "Type in your URL: ",
        name: "URL"
  }])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_image.png"));

    fs.writeFile("URL.txt", url, (err) => {
      if(err){
        throw new Error(err);
      }
      console.log("The file has been saved!");
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error("Error: Unable to render prompt in the current environment. Please make sure you are using a compatible terminal or command-line interface.");
    } else {
      // Something else went wrong
      console.error("Unexpected error occurred:", error.message);
    }
  });