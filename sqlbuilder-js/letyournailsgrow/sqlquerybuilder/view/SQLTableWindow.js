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
          
		/*
            if (this.shadowSprite.bConnections) {
                // also move the associated connections 
                for (var i = ux.vqbuilder.connections.length; i--;) {
                    this.connection(ux.vqbuilder.connections[i]);
                }
            }*/
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
    
    /*
    getLeftRightCoordinates: function(obj1, obj2, aBBPos){
        var bb1, bb2, p = [], dx, leftBoxConnectionPoint, rightBoxConnectionPoint, dis, columHeight = 21, headerHeight = 46, LeftRightCoordinates = {};
        
        bb1 = obj1.getBBox();
       
        bb1.pY = bb1.y + headerHeight + ((aBBPos[0] - 1) * columHeight) + (columHeight / 2) - obj1.scrollTop;
        
        bb2 = obj2.getBBox();
       
        bb2.pY = bb2.y + headerHeight + ((aBBPos[1] - 1) * columHeight) + (columHeight / 2) - obj2.scrollTop;
        
        
        if (bb1.pY > (bb1.y + 4) && bb1.pY < (bb1.y + bb1.height - 4)) {
            p.push({
                x: bb1.x - 1, 
                y: bb1.pY
            });
            p.push({
                x: bb1.x + bb1.width + 1, 
                y: bb1.pY
            });
        }
        else {
            if (bb1.pY < (bb1.y + 4)) {
                p.push({
                    x: bb1.x - 1,
                    y: bb1.y + 4
                });
                p.push({
                    x: bb1.x + bb1.width + 1, 
                    y: bb1.y + 4
                });
            }
            else {
                p.push({
                    x: bb1.x - 1, 
                    y: bb1.y + bb1.height - 4
                });
                p.push({
                    x: bb1.x + bb1.width + 1, 
                    y: bb1.y + bb1.height - 4
                });
            };
	};

        if (bb2.pY > (bb2.y + 4) && bb2.pY < (bb2.y + bb2.height - 4)) {
            p.push({
                x: bb2.x - 1,
                y: bb2.pY
            });
            p.push({
                x: bb2.x + bb2.width + 1, 
                y: bb2.pY
            });
        }
        else {
            if (bb2.pY < (bb2.y + 4)) {
                p.push({
                    x: bb2.x - 1, 
                    y: bb2.y + 4
                });
                p.push({
                    x: bb2.x + bb2.width + 1, 
                    y: bb2.y + 4
                });
            }
            else {
                p.push({
                    x: bb2.x - 1,
                    y: bb2.y + bb2.height - 4
                });
                
                p.push({
                    x: bb2.x + bb2.width + 1, 
                    y: bb2.y + bb2.height - 4
                });
            }
        };
        
        for (var i = 0; i < 2; i++) {
            for (var j = 2; j < 4; j++) {
                dx = Math.abs(p[i].x - p[j].x), dy = Math.abs(p[i].y - p[j].y);
                if (((i == 0 && j == 3) && dx < Math.abs(p[1].x - p[2].x)) || ((i == 1 && j == 2) && dx < Math.abs(p[0].x - p[3].x))) {
                    leftBoxConnectionPoint = p[i];
                    rightBoxConnectionPoint = p[j];
                }
            }
        };
        
        return {
            leftBoxConnectionPoint: leftBoxConnectionPoint,
            rightBoxConnectionPoint: rightBoxConnectionPoint
        };
        
    },
    */
    connection: function(obj1, obj2, line, aBBPos){
	    /*
        var LeftRightCoordinates, line1, line2, miniLine1, miniLine2, path, surface, color = typeof line == "string" ? line : "#000";
        
        if (obj1.line && obj1.from && obj1.to && obj1.aBBPos) {
            line = obj1;
            obj1 = line.from;
            obj2 = line.to;
            aBBPos = line.aBBPos;
        }
        
        // set reference to the wright surface
        surface = obj1.surface;
        
        // get coordinates for the left and right box
        LeftRightCoordinates = this.getLeftRightCoordinates(obj1, obj2, aBBPos);
        
        // check if the LeftBox is still on the left side or not
        if (LeftRightCoordinates.leftBoxConnectionPoint.x - LeftRightCoordinates.rightBoxConnectionPoint.x < 0) {
            line1 = 12;
            line2 = 12;
        }
        else {
            line1 = -12;
            line2 = -12;
        }
        // define the path between the left and the right box
        path = ["M", LeftRightCoordinates.leftBoxConnectionPoint.x, LeftRightCoordinates.leftBoxConnectionPoint.y, "H", LeftRightCoordinates.leftBoxConnectionPoint.x + line1, "L", LeftRightCoordinates.rightBoxConnectionPoint.x - line2, LeftRightCoordinates.rightBoxConnectionPoint.y, "H", LeftRightCoordinates.rightBoxConnectionPoint.x].join(",");
        
        miniLine1 = ["M", LeftRightCoordinates.leftBoxConnectionPoint.x, LeftRightCoordinates.leftBoxConnectionPoint.y, "H", LeftRightCoordinates.leftBoxConnectionPoint.x + line1].join(",");
        
        miniLine2 = ["M", LeftRightCoordinates.rightBoxConnectionPoint.x - line2, LeftRightCoordinates.rightBoxConnectionPoint.y, "H", LeftRightCoordinates.rightBoxConnectionPoint.x].join(",");
        
        //check if it is a new connection or not
        if (line && line.line) {
            // old connection, only change path
            line.bgLine &&
            line.bgLine.setAttributes({
                path: path
            }, true);
            line.line.setAttributes({
                path: path
            }, true);
            line.miniLine1.setAttributes({
                path: miniLine1
            }, true);
            line.miniLine2.setAttributes({
                path: miniLine2
            }, true);
        }
        else {
            // new connction, return new connection object
            return {
                line: Ext.create('Ext.draw.Sprite', {
                    type: 'path',
                    path: path,
                    stroke: color,
                    fill: 'none',
                    'stroke-width': 1,
                    surface: surface
                }).show(true),
                miniLine1: Ext.create('Ext.draw.Sprite', {
                    type: 'path',
                    path: miniLine1,
                    stroke: color,
                    fill: 'none',
                    'stroke-width': 2,
                    surface: surface
                }).show(true),
                miniLine2: Ext.create('Ext.draw.Sprite', {
                    type: 'path',
                    path: miniLine2,
                    stroke: color,
                    fill: 'none',
                    'stroke-width': 2,
                    surface: surface
                }).show(true),
                bgLine: Ext.create('Ext.draw.Sprite', {
                    type: 'path',
                    path: path,
                    opacity: 0,
                    stroke: '#fff',
                    fill: 'none',
                    'stroke-width': 10,
                    surface: surface
                }).show(true),
                from: obj1,
                to: obj2,
                aBBPos: aBBPos,
                uuid: this.createUUID()
            };
        }*/
    },
});