// Clasa spiridus
Ext.define('Ext.letyournailsgrow.sqlquerybuilder.view.SQLTableSprite', {
    extend: 'Ext.draw.Sprite',
    alias: ['widget.sqltablesprite'],
	
    hasJoins: false, // util pentru a stabili daca exista legaturi cu alte tabele
	
    startDrag: function(id){
	    
	var me = this;    
        var win = Ext.getCmp(id);
        var sqlTablePanel = Ext.getCmp('SQLTableZonePanel');
	var xyParentPos = sqlTablePanel.el.getXY();
        var xyChildPos = win.el.getXY();
        
	me.prev = me.surface.transformToViewBox(xyChildPos[0] - xyParentPos[0] + 2, xyChildPos[1] - xyParentPos[1] + 2);
	    
    },
    
    onDrag: function(relPosMovement){
	    
        var me = this;
     
        var newX = me.prev[0] + relPosMovement[0];
        var newY = me.prev[1] + relPosMovement[1];
      
        me.setAttributes({
            x: newX,
            y: newY
        }, true);
    }
    
}); 