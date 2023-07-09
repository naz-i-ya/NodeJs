const fs = require('fs');

if(!fs.existsSync('./newDir')){//used to checking for file existance
    fs.mkdir('./newDir', (err) => {
        if (err) throw err; 
        console.log('Directory Created....');
    })
}else{
    console.log('Directory Already exist....');
}

// ------delete directry---------

if(fs.existsSync('./newDir')){//used to checking for file existance
    fs.rmdir('./newDir', (err) => {
        if (err) throw err; 
        console.log('Directory Created....');
    })
}else{
    console.log('Directory removed ....');
}