//to avoid inside callbacks  
/*fs.writeFile(
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
  );*/

  const fsPromises = require('fs').promises;
  const path = require('path');

  const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname,'files', 'starter.txt'), 'utf8');
        console.log(data, "Reading file from Promises");
        // ----deleteing----
        // await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
        await fsPromises.writeFile(path.join(__dirname, "files", "WritePromise.txt"), data);
        await fsPromises.appendFile(path.join(__dirname, "files", "WritePromise.txt", "\n\n\nUpdating file from promises"));
        await fsPromises.rename(path.join(__dirname, "files", "WritePromise.txt" ), path.join(__dirname,"files", "RenamePromise.txt"))
        const newData = await fsPromises.readFile(path.join(__dirname,'files', 'RenamePromise.txt'), 'utf8');
        console.log(newData, "Reading new file from Promises");
    }
    catch(err){
        console.log(err);
    }
  }

  fileOps();