//https://bank.gov.ua/NBU_ovdp?date=29.08.2023&val_code=UAH&json

const fs = require("node:fs");

fs.readFile("data.json", (readErr, data) => {
    if (readErr == null) {
        
        const jsondata = JSON.parse(data.toString());

        fs.open("output.txt", "a", (openErr, fd) => {
            if (openErr != null) {
                console.log("Error occurred while opening file:", openErr);
                return;
            }

            for (let i = 0; i < jsondata.length; i++) {
                const jsonstring = jsondata[i].StockCode + "-" + jsondata[i].ValCode + "-" + jsondata[i].Attraction + "\n";
                
                fs.write(fd, jsonstring, (writeErr) => {
                    if (writeErr != null) {
                        console.log("Error occurred while writing file:", writeErr);
                    }
                });
            }

            fs.close(fd, (closeErr) => {
                if (closeErr != null) {
                    console.log("Error occurred while closing file:", closeErr);
                } else {
                    console.log("File has been written!");
                }
            });
        });
    } else {
        console.log("Error occurred while reading file:", readErr);
    }
});