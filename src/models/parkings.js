module.exports = (sequelize, DataTypes) => {  
    //sequelize : represente la connexion a notre base de données
    return sequelize.define('Parking', {  // define : permet de classer un nouveau modele aupres de sequelize
      id: {
        type: DataTypes.INTEGER, // Type de donnees
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      city: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      timestamps: true, // indique que nous voulons modifier le comportement par defaut proposer par sequelize
      createdAt: 'created', // La date de creaton pour une novelle install est automatique
      updatedAt: false // La date de modification
    })
  }