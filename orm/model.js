const Sequelize = require('sequelize');
var sequelize=require('./connection');

var authors=sequelize.define('authors',
{
  author_id:
  {
  type: Sequelize.INTEGER,
  primaryKey:true
  },
  author_name:
  {
  type: Sequelize.TEXT,
  allowNull:false
  },
  city:
  {
  type: Sequelize.TEXT,
  allowNull: true
  }
});
var books=sequelize.define('books',
{
  book_id:
  {
    type: Sequelize.INTEGER,
    primaryKey:true
  },
  category:
  {
    type: Sequelize.TEXT,
    allowNull:false
  },
  book_name:
  {
    type: Sequelize.TEXT,
    allowNull:false
  },
  price:
  {
    type: Sequelize.INTEGER,
    allowNull:false
  },
  no_of_pages:
  {
    type: Sequelize.INTEGER,
    allowNull:false
  }
})

authors.hasMany(books,{foreignKey: 'author_id'});
books.belongsTo(authors,{foreignKey: 'author_id'});

authors.sync({drop: false}).then(() => 
{
  console.log("Author table Synched!!!");
});

books.sync({drop: false}).then(() => 
{
  console.log("Books table Synched!!!");
});

module.exports={authors:authors, books:books};
