var encryption = require('../utilities/encryption');

"use strict";

module.exports = function(sequelize, DataTypes) {
  var Employer = sequelize.define("Employer", {
    FirstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      allowNull: true
    },
    LastName: {
      type: DataTypes.STRING,
      field: 'last_name',
      allowNull: true
    },
    Username: {
      type: DataTypes.STRING,
      field: 'username',
      allowNull: false,
      unique: true
    },
    Company: {
      type: DataTypes.STRING,
      field: 'company',
      allowNull: false
    },
    Active: {
      type: DataTypes.BOOLEAN,
      field: 'active',
      allowNull: false,
      defaultValue: false
    },
    LastActive: {
      type: DataTypes.DATE,
      field: "last_active",
      allowNull: true,
    },
    Block: {
      type: DataTypes.BOOLEAN,
      field: 'block',
      allowNull: false,
      defaultValue: false
    },
    Email: {
      type: DataTypes.STRING,
      field: 'email',
      allowNull: false,
      unique: true
    },
    PassHash: {
      type: DataTypes.STRING,
      field: 'pass_hash',
      allowNull: false
    },
    Salt: {
      type: DataTypes.STRING,
      field: 'salt',
      allowNull: false
    },
    Token: {
      type: DataTypes.STRING,
      field: 'token',
      allowNull: false
    },
    Valid_Until: {
      type: DataTypes.STRING,
      field: 'valid_until',
      allowNull: false,
      defaultValue: sequelize.fn('NOW') + 1
    },
    Contact: {
      type: DataTypes.STRING,
      field: 'contact',
      allowNull: true
    },
    Show_Contact: {
      type: DataTypes.BOOLEAN,
      field: 'show_contact',
      allowNull: false,
      defaultValue: true
    },
    Address: {
      type: DataTypes.STRING,
      field: 'address',
      allowNull: true
    },
    CreatedOn: {
      type: DataTypes.DATE,
      field: "created_on",
      allowNull: false,
      defaultValue: sequelize.fn('NOW')
    },
    Role: {
      type: DataTypes.STRING,
      field: "role",
      allowNull: false,
      defaultValue: 'user'
    },
    ProfilePicture: {
      type: DataTypes.STRING,
      field: "profile_picture",
      allowNull: true,
      defaultValue: 'https://s3-us-west-2.amazonaws.com/nairamarketprofile/default.jpeg'
    },
    ReceiveAlert:{
      type: DataTypes.BOOLEAN,
      field: 'receive_alert',
      allowNull: false,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Employer.hasMany(models.Job)
      }

    },
    instanceMethods: {
      authenticate: function(passwordToMatch) {
        return (encryption.hashPwd(this.Salt, passwordToMatch) === this.PassHash);
      },
      hasRole: function(role) {
        return this.Role.indexOf(role) > -1;
      }
    }
  });

  return Employer;
};