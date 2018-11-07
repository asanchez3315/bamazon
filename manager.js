var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    display();
});

function display() {
    //show all ids, names, and products from database.
    connection.query('SELECT * FROM Products', function (err, response) {
        if (err) throw err
        //New instance of our constructor
        var displayTable = new Table({
            //declare the value categories
            head: ['Item ID', 'Product Name', 'Product Dept', 'Price', 'Quantity'],
            //set widths to scale
            colWidths: [10, 30, 18, 10, 14]
        });
        //for each row of the loop
        for (i = 0; i < response.length; i++) {
            //push data to table
            displayTable.push(
                [response[i].Id, response[i].productName, response[i].deptName, response[i].price, response[i].quantity]
            );
        }

        console.log(displayTable.toString());
        inquireForUpdates()
    });

};

function inquireForUpdates() {
    //inquire for input
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "What would you like to do?:",
        choices: ["Restock Inventory", "Add New Product", "Remove An Existing Product"]
    }]).then(function (answers) {
        //select case
        switch (answers.action) {

            case 'Restock Inventory':
                restockProduct();
                break;

            case 'Add New Product':
                addProduct();
                break;

            case 'Remove An Existing Product':
                removeProduct();
                break;
        }
    });
}; //end inquireForUpdates

function restockProduct() {
    //gather data from user
    inquirer.prompt([

        {
            name: "ID",
            type: "input",
            message: "What is the ID of the item you wish to restock?"
        }, 
        {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like to add?"
        },

    ]).then(function (answers) {
        //set captured input as variables, pass variables as parameters.
        var quantityAdded = answers.quantity;
        var ID = answers.ID;
        restockDatabase(ID, quantityAdded);
    });
}; 


function restockDatabase(ID, quantity) {
    //update the database
    connection.query('SELECT * FROM Products WHERE Item ID = ' + ID, function (err, response) {
        if (err) console.log(err)
        connection.query('UPDATE Products SET Quantity = Quantity + ' + quantity + ' WHERE Item ID = ' + ID);
        //re-run display to show updated results
        display();
    });
}; 

function addProduct() {
    inquirer.prompt([

        {
            name: "Name",
            type: "input",
            message: "What is the name of the item you wish to stock?"
        },
        {
            name: 'dept',
            type: 'input',
            message: "add product to which dept"
        },
        {
            name: 'Price',
            type: 'input',
            message: "How much would you like this to cost?"
        },
        {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like to add?"
        },

    ]).then(function (answers) {
        //gather user input, store as variables, pass as parameters
        var name = answers.productName;
        var dept = answers.deptName;
        var price = answers.price;
        var quantity = answers.quantity;
        buildNewItem(name, dept, price, quantity);
    });
}; //end addRequest

function buildNewItem(name, dept, price, quantity) {
    //query database, insert new item
    connection.query('INSERT INTO Products (Product Name, Product Dept ,Price, Quantity) VALUES("' + name + '","' + dept + '",' + price + ',' + quantity + ')');
    //display updated results
    display();

};//end buildNewItem

function removeProduct() {
    inquirer.prompt([{
        name: "ID",
        type: "input",
        message: "What is the item number of the item you wish to remove?"
    }]).then(function (answer) {
        var id = answer.Id;
        removeFromDatabase(id);
    });
};//

function removeFromDatabase(ID) {
    connection.query('DELETE FROM Products WHERE Item ID = ' + ID);
    display();
};//end removeFromDatabase



