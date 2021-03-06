'use strict';

const utils = require('../utils');

module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    rut: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: true,
        esValido() {
            if (!utils.checkRut(this.rut)) {
              throw new Error('rut Invalido')
            }
        }
    }
    },
    nombre: DataTypes.STRING,
    apellido_p: DataTypes.STRING,
    apellido_m: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING
  }, {
      freezeTableName: true,
      createdAt: 'fecha_ingreso',
      updatedAt: 'fecha_edicion',
      tableName: 'Cliente'
    });
  Cliente.associate = function (models) {
    // associations can be defined here
    Cliente.hasMany(models.Paciente, {
      foreignKey: {
        name: 'id_cliente',
        allowNull: false
      }
    });
  };
  return Cliente;
};