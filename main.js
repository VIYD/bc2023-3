const fs = require("node:fs");

fs.readFile("data.json", (readErr, data) => {
    if (readErr == null) {
        const jsondata = JSON.parse(data.toString());

        fs.open("output.txt", "a", (openErr, fd) => {
            if (openErr != null) {
                console.log("Error occurred while opening file:", openErr);
                return;
            }

            function writeNext(index) {
                if (index < jsondata.length) {
                    const jsonstring = jsondata[index].StockCode + "-" + jsondata[index].ValCode + "-" + jsondata[index].Attraction + "\n";

                    fs.write(fd, jsonstring, (writeErr) => {
                        if (writeErr != null) {
                            console.log("Error occurred while writing file:", writeErr);
                        }
                        writeNext(index + 1);
                    });
                } else {
                    fs.close(fd, (closeErr) => {
                        if (closeErr != null) {
                            console.log("Error occurred while closing file:", closeErr);
                        } else {
                            console.log("File has been written!");
                        }
                    });
                }
            }

            writeNext(0);
        });
    } else {
        console.log("Error occurred while reading file:", readErr);
    }
});
