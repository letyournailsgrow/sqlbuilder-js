Ext.define('Ext.letyournailsgrow.sqlquerybuilder.store.SQLJoinStore', {
    extend: 'Ext.data.Store',
    autoSync: true,
    model: 'Ext.letyournailsgrow.sqlquerybuilder.model.SQLJoinModel',
    proxy: {
        type: 'memory'
    }
});