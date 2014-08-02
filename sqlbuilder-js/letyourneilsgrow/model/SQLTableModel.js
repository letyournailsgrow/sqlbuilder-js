Ext.define('Ext.letyourneilsgrow.model.SQLTableModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'alias',
        type: 'string'
    }]
});