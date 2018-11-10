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
    //log the completed table to console
    console.log(displayTable.toString());
    inquireForPurchase();
  });


};



function inquireForPurchase() {
  inquirer
    .prompt([{
      name: "Id",
      type: "question",
      message: "What is the id of the product you would like to buy?",
    }, {
      name: 'quantity',
      type: 'question',
      message: 'how many would you like to buy?'
    }]
    ).then(function (answers) {
      //set captured input as variables, pass variables as parameters.
      var quantityDesired = answers.quantity;
      var id = answers.Id;
      purchasedItem(id, quantityDesired);
    });

};

function purchasedItem(ID, quantityNeeded) {
  //check quantity of desired purchase. Minus quantity of the itemID from database if possible. Else inform user "Quantity desired not in stock" 
  connection.query('SELECT * FROM products WHERE id = ' + ID, function (err, response) {
    if (err) throw err

    if (quantityNeeded <= response[0].quantity) {
      //calculate cost
      var totalCost = response[0].price * quantityNeeded;
      //inform user
      console.log("Your order is being processed.");
      console.log("Your total cost for " + quantityNeeded + " " + response[0].productName + " is " + totalCost + ". Thank you for your purchase!");
      
      connection.query('UPDATE products SET quantity = quantity - ' + quantityNeeded + ' WHERE ID = ' + ID);
    } else {
      console.log("Our apologies. We don't have enough " + response[0].productName + " to complete your order.");
    };
    inquireForPurchase()
  });

}; 



