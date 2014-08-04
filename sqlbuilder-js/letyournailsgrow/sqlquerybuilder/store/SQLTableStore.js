Ext.define('Ext.letyournailsgrow.sqlquerybuilder.store.SQLTableStore', {
    extend: 'Ext.data.Store',
    autoSync: true,
    model: 'Ext.letyournailsgrow.sqlquerybuilder.model.SQLTableModel',
    proxy: {
        type: 'memory'
    }
});