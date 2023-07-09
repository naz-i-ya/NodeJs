const fs = require("fs");
const path = require("path");

fs.readFile("./files/starter.txt", (err, data) => {
  if (err) throw err;
  console.log(data); //we get buffer data
  console.log(data.toString()); //we get data
});

// ----OR----pass utf-8 to encode

fs.readFile("./files/starter.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data, "utf-8");
});

console.log("Hello......"); //readFile is async it waits to execute other task.

//exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error: ${err}`); //There was an uncaught error: Error: ENOENT: no such file or directory,
  process.exit(1); //exit the application
});

// ----BY Using Path module-----

fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf-8",
  (err, data) => {
    if (err) throw err;
    console.log(data, "----->using Path module pass utf-8"); //we get buffer data
    console.log(data, "------>using Path module no string........."); //we get data
  }
);

// -------Write File -------
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Hello Naziya..!! nice to meet u.....",
  (err, data) => {
    if (err) throw err;
    console.log("------------Write Complete------------");

    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "\n\n updating file by using appendFile....",
      (err, data) => {
        if (err) throw err;
        console.log("------------Append Complete------------");

        // ----Rename file------
        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files", "rename.txt"),
          (err, data) => {
            if (err) throw err;
            console.log("------------Rename Complete------------");
          }
        );
      }
    );
  }
);

//-----------Update File----------:append file is used to update if the file exists if not it create file
fs.appendFile(
  path.join(__dirname, "files", "test.txt"),
  "Hello Naziya..!! TESTINGGGGGGGGGGGG.....",
  (err, data) => {
    if (err) throw err;
    console.log("------------Append Complete------------");
  }
);

//due to async  read completed last after other task/operations complete
