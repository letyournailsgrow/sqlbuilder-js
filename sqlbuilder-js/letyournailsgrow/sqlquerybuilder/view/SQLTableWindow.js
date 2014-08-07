Ext.define('Ext.letyournailsgrow.sqlquerybuilder.view.SQLTableWindow', {
    extend: 'Ext.window.Window',
    minWidth: 150,
    alias: ['widget.sqltablewindow'],
 
    height: 200,
    width: 150,
  	    
    layout: {
        type: 'fit'
    },
    
    closable: true,
  
    shadowSprite: {},		
	    
    listeners: {
        show: function(){
		this.initSQLTable();
        },
        beforeclose: function(){
		this.closeSQLTable();
        }
    },
      
     closeSQLTable: function(){
     
        // SPIRIDUS: unregister 
        this.getHeader().el.un('mousedown', this.startDragSprite, this);
        // SPIRIDUS: unregister
        Ext.EventManager.un(document, 'mousemove', this.moveWindow, this);
        // SPIRIDUS: remove sprite from surface
        Ext.getCmp('SQLTableZonePanel').down('draw').surface.remove(this.shadowSprite, false);
	     
    },
    
     initComponent: function(){
        
	var me = this;
	this.isMouseDown = false; // util pentru spiridus
	     
        // UUID
        this.tableId = this.createUUID();
                
        this.items = [{
            xtype: 'sqbtablefieldsgrid',
            store:  me.getGridStore(me.title, me.tableId, me.id)
        }];
	
	var tableModel = Ext.create("Ext.letyournailsgrow.sqlquerybuilder.model.SQLTableModel", {
            id: this.tableId,
            name: this.title,
            alias: ''
        });
	Ext.getCmp('SQLQueryBuilderPanel').getController().addTable(tableModel);
	
        this.callParent(arguments);
    },

    getGridStore:function(title,tableId, cmpId){
	    var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: [{
                name: 'id',
                type: 'string'
            }, {
                name: 'tableName',
                type: 'string'
            }, {
                name: 'tableId',
                type: 'string',
                defaultValue: tableId
            }, {
                name: 'field',
                type: 'string'
            }, {
                name: 'extCmpId',
                type: 'string',
                defaultValue: cmpId
            }, {
                name: 'type',
                type: 'string'
            }, {
                name: 'null',
                type: 'string'
            }, {
                name: 'key',
                type: 'string'
            }, {
                name: 'default',
                type: 'string'
            }, {
                name: 'extra',
                type: 'string'
            }],
            proxy: {
                type: 'ajax',
                url: 'data/database/getTableFields',
                extraParams: {
                    tablename: title
                },
                reader: {
                    type: 'json'
                }
            }
        });
	return store;
    },
    
    createUUID: function(){
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        
        var uuid = s.join("");
        return uuid;
    },
    
    // se creeaza un spiridus cu aceleasi dimensiuni ca fereastra
    getSprite:function(tableZone){
        var xyParentPos = tableZone.el.getXY();
        var xyChildPos = this.el.getXY();
        var childSize = this.el.getSize();
        
        var sprite = Ext.create('Ext.letyournailsgrow.sqlquerybuilder.view.SQLTableSprite', {
            type: 'rect',
            stroke: '#fff',
	    fill: '#ff0',
            height: childSize.height - 4,
            width: childSize.width - 4,
            x: xyChildPos[0] - xyParentPos[0] + 2,
            y: xyChildPos[1] - xyParentPos[1] + 2,
            scrollTop: 0
        });
	return sprite;
	
    },
    
    initSQLTable: function(){
       
	var tableZone = Ext.getCmp('SQLTableZonePanel');   
	// SPIRIDUS    
        var sprite = this.getSprite(tableZone);
        
	// SPIRIDUS: se adauga sprite/spiridus pe suprafata zonei de tabele
        this.shadowSprite = tableZone.down('draw').surface.add(sprite).show(true);
        
        // SPIRIDUS: daca tabelul se redimensioneaza...se redimensioneaza si spiridusul
        this.resizer.on('resize', function(resizer, width, height, event){
            this.shadowSprite.setAttributes({
                width: width - 6,
                height: height - 6,
		x:resizer.target.x,
		y:resizer.target.y   
            }, true);
	  
            // also move the associated connections 
           // for (var i = ux.vqbuilder.connections.length; i--;) {
               // this.connection(ux.vqbuilder.connections[i]);
           // }
        }, this);
	
        // SPIRIDUS: cand se face click cu ajutorul mouse-ului pe header-ul ferestrei se poate considera ca se poate trage si spiridusul
        this.getHeader().el.on('mousedown', this.startDragSprite, this);
	
        /*
        this.getHeader().el.on('contextmenu', this.showSQLTableCM, this);
        this.getHeader().el.on('dblclick', this.showTableAliasEditForm, this);
        this.getHeader().origValue = '';
        */
       
	// SPIRIDUS: util pentru a muta spiridusul
	Ext.EventManager.on(document, 'mousemove', this.moveWindow, this);
        
        // SPIRIDUS: util pentru a marca mutarea ferestrei (pentru spiridus)
        Ext.EventManager.on(document, 'mouseup', function(){
            this.isMouseDown = false;
        }, this);
        
    },
    
     // SPIRIDUS
     moveWindow: function(event, domEl, opt){
        if (this.isMouseDown) {
            // se trimite spiridusului cat s-a mutat (distanta) 
            this.shadowSprite.onDrag(this.getOffset());
          
	    if (this.shadowSprite.hasJoins) {
		var controller = Ext.getCmp('SQLQueryBuilderPanel').getController();
                for (var i = controller.getConnections().length; i--;) {
                    this.updateJoinTable(controller.getConnections()[i]);
                }
            }
        }
    },
    
     // SPIRIDUS
     startDragSprite: function(){
        // save the mousedown state
        this.isMouseDown = true;
        // start the drag of the sprite
        this.shadowSprite.startDrag(this.getId());
    },
    
    // SPIRIDUS
     getOffset: function(){
        var xy = this.dd.getXY('point');
	var s = this.dd.startXY;
        return [xy[0] - s[0], 
		   xy[1] - s[1]];
    },
    
    pushPoints:function(p,bb){
	if (bb.pY > (bb.y + 4) && bb.pY < (bb.y + bb.height - 4)) { // daca [y  < py < y+h] daca este "oarecum"  (mai departe de 4 pixeli distanta de marinile de sus si jos)  in interiorul spridusului
	    // (x.pY) & (x+w,pY) : deci 2 puncte, unul pe o latura si altul pe cealalta latura , unde s-ar afla putea afla pozitia de inceput a liniii care ureste cele doua tabele	
            p.push({
                x: bb.x - 1, 
                y: bb.pY
            });
            p.push({
                x: bb.x + bb.width + 1, 
                y: bb.pY
            });
        }
        else {
            if (bb.pY < (bb.y + 4)) { // daca punctul ar fii "oarecum" (la maxim 4 pixeli distanta) pe marinea de sus
		//(x,y) & (x+w,y) : cele doua puncte  de sus ale spiridului    
                p.push({
                    x: bb.x - 1,
                    y: bb.y + 4
                });
                p.push({
                    x: bb.x + bb.width + 1, 
                    y: bb.y + 4
                });
            }
            else { // daca punctul ar fii "oarecum" (la maxim 4 pixeli distanta) pe marinea de jos
		//(x,y+h) & (x+w,y+h) : : cele doua puncte  de jos ale spiridului   
                p.push({
                    x: bb.x - 1, 
                    y: bb.y + bb.height - 4
                });
                p.push({
                    x: bb.x + bb.width + 1, 
                    y: bb.y + bb.height - 4
                });
            };
	};
    },
    
    getLeftRightCoordinates: function(sprite1, sprite2, indexes){
	    
	var columHeight = 21;
	var headerHeight = 46;
	   
	// calculeaza pe baza index-ului pozitia efectiva pe sprite (pe unde s-ar afla)
        var bb1 = sprite1.getBBox();
        bb1.pY = bb1.y + headerHeight + ((indexes[0] - 1) * columHeight) + (columHeight / 2) - sprite1.scrollTop;
        
        var bb2 = sprite2.getBBox();
        bb2.pY = bb2.y + headerHeight + ((indexes[1] - 1) * columHeight) + (columHeight / 2) - sprite2.scrollTop;
        
	var points = []; // va contine 4 coordonate (primele 2 pentru bb1, ultimele 2 pentru bb2)
        this.pushPoints(points,bb1);  // se adauga coodonatele pe ambele parti pentru bb1
	this.pushPoints(points,bb2);  // se adauga coodonatele pe ambele parti pentru bb2
	    
	// se unesc cele mai apropiate puncte, dar numari in cruce, 
	// PARE DUBIOS , se testeaza doar (0,3) si (1,2) pe x, nu si (0.2) si (1,3)   
        var leftBoxConnectionPoint;
        var rightBoxConnectionPoint;       
        for (var i = 0; i < 2; i++) {
            for (var j = 2; j < 4; j++) {
	       var dx = Math.abs(points[i].x - points[j].x);
	     //  var dy = Math.abs(points[i].y - points[j].y);
                if ( ((i == 0 && j == 3) && dx < Math.abs(points[1].x - points[2].x))  || 
		     ((i == 1 && j == 2) && dx < Math.abs(points[0].x - points[3].x))) {
                    leftBoxConnectionPoint = points[i];
                    rightBoxConnectionPoint = points[j];
                }
            }
        };
        
        return {
            leftBoxConnectionPoint: leftBoxConnectionPoint,
            rightBoxConnectionPoint: rightBoxConnectionPoint
        };
        
    },
    
    getJoinTablePaths:function(sprite1, sprite2, indexes){
	var positions = this.getLeftRightCoordinates(sprite1, sprite2, indexes);
	var lineLength = 12;  
	var sign = 1;	    
	if (positions.leftBoxConnectionPoint.x - positions.rightBoxConnectionPoint.x >= 0) {
	    sign = -1;
	} 
	// M = move to (x,y)+
	// H = horizontal line to x+
	// L = line to (x,y)+
	// -1 daca este liniuta albastra in interiorul SPIRIDUSULUI
	var orientation = ((sprite1.getBBox().x==positions.leftBoxConnectionPoint.x+1 && sign==1) || (sprite2.getBBox().x==positions.rightBoxConnectionPoint.x+1) && sign==-1)?-1:1; //daca nu merge ok, ar trebuie sa fie orientation=1
	var line1 = (sign)*lineLength;
	var line2 = (sign)*lineLength;
	var path = ["M", positions.leftBoxConnectionPoint.x, positions.leftBoxConnectionPoint.y, 
			 "H", positions.leftBoxConnectionPoint.x + (orientation) * line1, 
			 "L", positions.rightBoxConnectionPoint.x - (orientation) * line2, positions.rightBoxConnectionPoint.y,
			 "H", positions.rightBoxConnectionPoint.x
			].join(",");

	var miniLine1 = ["M", positions.leftBoxConnectionPoint.x, positions.leftBoxConnectionPoint.y,
			       "H", positions.leftBoxConnectionPoint.x + (orientation) * line1
			      ].join(",");

	var miniLine2 = ["M", positions.rightBoxConnectionPoint.x - (orientation) * line2, positions.rightBoxConnectionPoint.y, 
			       "H", positions.rightBoxConnectionPoint.x
			      ].join(",");
	
	return [path,miniLine1,miniLine2];
	
    },

    
    updateJoinTable:function(joinTable){
	var sprite1 = joinTable.from; 
	var sprite2 = joinTable.to;   
	var indexes = joinTable.indexes; 
	    
	var joinTablePath = this.getJoinTablePaths(sprite1,sprite2,indexes);
	
	if (joinTable.bgLine){
	     joinTable.bgLine.setAttributes({
                path: joinTablePath[0]
            }, true);
	}
	joinTable.line.setAttributes({
		path: joinTablePath[0]
	}, true);
	joinTable.miniLine1.setAttributes({
		path: joinTablePath[1]
	}, true);
	joinTable.miniLine2.setAttributes({
		path: joinTablePath[2]
	}, true);
	
    },
    
    joinTable:function(sprite1, sprite2, color, indexes){
	var surface = sprite1.surface;
	    
	var joinTablePath = this.getJoinTablePaths(sprite1,sprite2,indexes);
	
	return {
                line: Ext.create('Ext.draw.Sprite', {
                    type: 'path',
                    path: joinTablePath[0],
                    stroke: color,
                    fill: 'none',
                    'stroke-width': 1,
                    surface: surface
                }).show(true),
                miniLine1: Ext.create('Ext.draw.Sprite', {
                    type: 'path',
                    path: joinTablePath[1],
                  //  stroke: color,
		    stroke:'blue',	
                    fill: 'none',
                    'stroke-width': 7,
                    surface: surface
                }).show(true),
                miniLine2: Ext.create('Ext.draw.Sprite', {
                    type: 'path',
                    path: joinTablePath[2],
                    //stroke: color,
		    stroke:'blue',	
                    fill: 'none',
                    'stroke-width': 7,
                    surface: surface
                }).show(true),
                bgLine: Ext.create('Ext.draw.Sprite', {
                    type: 'path',
                    path: joinTablePath[0],
                    opacity: 0,
                    stroke: '#fff',
                    fill: 'none',
                    'stroke-width': 10,
                    surface: surface
                }).show(true),
                from: sprite1,
                to: sprite2,
                indexes: indexes,
                uuid: this.createUUID()
	};

    }
   
});