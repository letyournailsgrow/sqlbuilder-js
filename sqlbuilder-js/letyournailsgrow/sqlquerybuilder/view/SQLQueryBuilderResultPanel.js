Ext.define('Ext.letyournailsgrow.sqlquerybuilder.view.SQLQueryBuilderResultPanel', {
    extend: 'Ext.panel.Panel',
    alias: ['widget.sqbresultpanel'],
    id: 'SQLResultPanel',
    listeners: {
        afterlayout: function(){
            //SyntaxHighlighter.highlight(); 
        }
    },
    initComponent: function(){
        this.callParent(arguments);
    }
});