module.exports = (sequelize, Sequelize) => {
    const Trainer = sequelize.define('trainer', {
        id: { 
          type: Sequelize.INTEGER, 
          primaryKey: true, 
          autoIncrement: true 
        },
        name: {
          type: Sequelize.STRING
        }
      },
      {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return Trainer;
};

