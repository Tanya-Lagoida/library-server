const sequelize = require('../db');
const {DataTypes, STRING, ARRAY} = require('sequelize');

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: DataTypes.STRING, unique: true, allowNull: false},
  email: {type: DataTypes.STRING, unique: true, allowNull: false},
  provider: {type: DataTypes.STRING},
  confirmed: {type: DataTypes.BOOLEAN, defaultValue: true},
  blocked: {type: DataTypes.BOOLEAN, defaultValue: false},
  createdAt: {type: DataTypes.DATE},
  updatedAt: {type: DataTypes.DATE},
  firstName: {type: DataTypes.STRING, allowNull: false},
  lastName: {type: DataTypes.STRING, allowNull: false},
  phone: {type: DataTypes.STRING, unique: true, allowNull: false},
  password: {type: DataTypes.STRING},
})

const URL = sequelize.define('url', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  url: {type: DataTypes.STRING}
})

const Booking = sequelize.define('booking', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  order: {type: DataTypes.BOOLEAN},
  dateOrder: {type: DataTypes.DATE},
  customerId: {type: DataTypes.INTEGER, allowNull: false},
  customerFirstName: {type: DataTypes.STRING, allowNull: false},
  customerLastName: {type: DataTypes.STRING, allowNull: false},
})

const Delivery = sequelize.define('delivery', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  handed: {type: DataTypes.BOOLEAN},
  dateHandedFrom: {type: DataTypes.DATE},
  dateHandedTo: {type: DataTypes.DATE},
  recipientId: {type: DataTypes.INTEGER},
  recipientFirstName: {type: DataTypes.STRING},
  recipientLastName: {type: DataTypes.STRING},
})

const BooksType = sequelize.define('booksType',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  issueYear: {type: DataTypes.STRING, allowNull: false},
  rating: {type: DataTypes.STRING},
  title: {type: DataTypes.STRING, unique: true, allowNull: false},
  authors: {type: DataTypes.STRING, allowNull: false},
  image:  {type: DataTypes.STRING, allowNull: true},
  categories: {type: DataTypes.STRING, allowNull: false},
  // booking: {
  //   model: Booking,
  // },
  // delivery: {
  //   model: Delivery,
  // },
  // histories: [
  //   {
  //     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  //     userId: {type: DataTypes.INTEGER},
  //   }
  // ]
})

const UserComments = sequelize.define('userComments', {
  commentUserId:  {type: DataTypes.INTEGER, allowNull: false},
  firstName:  {type: DataTypes.STRING, allowNull: false},
  lastName:  {type: DataTypes.STRING, allowNull: false},
  avatarUrl:  {type: DataTypes.STRING},
})

const CommentsType = sequelize.define('comments',{
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  rating: {type: DataTypes.INTEGER},
  text:  {type: DataTypes.STRING},
  createdAt:  {type: DataTypes.DATE, allowNull: false},
  // user: UserComments
})

const TBooksByIdType = sequelize.define('booksByIdType', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false},
  title: {type: DataTypes.STRING, allowNull: false},
  rating: {type: DataTypes.STRING},
  issueYear: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false},
  publish: {type: DataTypes.STRING, allowNull: false},
  pages: {type: DataTypes.STRING, allowNull: false},
  cover: {type: DataTypes.STRING, allowNull: false},
  weight: {type: DataTypes.STRING, allowNull: false},
  format: {type: DataTypes.STRING, allowNull: false},
  ISBN: {type: DataTypes.STRING, allowNull: false},
  producer: {type: DataTypes.STRING, allowNull: false},
  authors: {type: DataTypes.STRING, allowNull: false},
  image: {type: DataTypes.STRING},
  categories: {type: DataTypes.STRING, allowNull: false},
  // comments: CommentsType,
  // booking: Booking,
  // delivery: Delivery
  // histories: [
  //   {
  //     id: {type: DataTypes.INTEGER, autoIncrement: true},
  //     userId: {type: DataTypes.INTEGER, allowNull: false},
  //   }
  // ]
})

const BooksGenresType = sequelize.define('booksGenresType', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false},
  name: {type: DataTypes.STRING, allowNull: false},
  path: {type: DataTypes.STRING, allowNull: false},
  // createdAt: {type: DataTypes.DATE},
  // updatedAt: {type: DataTypes.DATE},
})

TBooksByIdType.hasMany(CommentsType, {as: 'comments'})
CommentsType.belongsTo(TBooksByIdType)

module.exports = {
  User,
  BooksType,
  CommentsType,
  TBooksByIdType,
  BooksGenresType,
  URL,
  Booking,
  Delivery,
  UserComments,
}