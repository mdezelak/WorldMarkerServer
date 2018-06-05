exports.up = function(knex, Promise) {
    return knex.schema.createTable('lastnik', (table) => {
            table.increments('id').primary();
            table.text('Ime').notNullable();
            table.text('Priimek').notNullable();
            table.text('email').notNullable();
        }).createTable('kolo', (table) => {
            table.increments('id').primary();
            table.text('imeKolesa').notNullable();
            table.text('lokacija').notNullable();
            table.integer('lastnik_id').references('id').inTable('lastnik');
        }).createTable('uporabnik', (table) => {
            table.increments('id').primary();
            table.text('Ime').notNullable();
            table.text('Priimek').notNullable();
            table.text('email').notNullable();
            table.integer('kolo_id').references('id').inTable('kolo');;
        })
};


exports.down = function(knex, Promise) {
    return knex.schema.dropTable('lastnik').dropTable('kolo').dropTable('uporabnik');
};