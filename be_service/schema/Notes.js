const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Notes = sequelize.define("Note", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  tableName: "notes",
  timestamps: true,
  createdAt: "tanggal_dibuat",
  updatedAt: false 
});

module.exports = Notes;