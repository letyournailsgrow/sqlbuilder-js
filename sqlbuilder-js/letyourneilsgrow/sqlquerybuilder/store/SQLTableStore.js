Ext.define('Ext.letyourneilsgrow.sqlquerybuilder.model.SQLTableStore', {
    extend: 'Ext.data.Store',
    autoSync: true,
    model: 'Ext.letyourneilsgrow.sqlquerybuilder.model.SQLTableModel',
    proxy: {
        type: 'memory'
    }
});