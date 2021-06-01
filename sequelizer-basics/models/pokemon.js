module.exports = (sequelize, Sequelize) => {
    const Pokemon = sequelize.define('pokemon', {
        id: { 
          type: Sequelize.INTEGER, 
          primaryKey: true, 
          autoIncrement: true 
        },
        name: {
          type: Sequelize.STRING
        },
        dex: {
            type: Sequelize.INTEGER
        },
        types: {
            type: Sequelize.STRING
        },
        ability: {
            type: Sequelize.STRING
        },
        moves: {
          type: Sequelize.JSON
        },
        level: {
            type: Sequelize.INTEGER
        },
        // trainer_id: {
        //     type: Sequelize.INTEGER,
        //     references: {
        //       model: 'trainer',
        //       key: 'id',
        //     }
        //   }
      },
      {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return Pokemon;
};

