

exports.up = function(knex) {
    return knex.schema.createTable('cars', (table) => {
        table
            .increments()
            .unsigned()
            .primary();
    
        table
            .string('vin')
            .unique()
            .notNullable();
    
        table
            .string('make')
            .notNullable();
    
        table
            .string('model')
            .notNullable();
    
        table
            .string('mileage')
            .notNullable();
    
        table
            .string('transmissionType')
            .defaultTo('not specified');

        table
            .string('status')
            .defaultTo('not specified');
      })
};

exports.down = function(knex) {
    return knex.dropTable('cars');
};
