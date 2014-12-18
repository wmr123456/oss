/**
 * Created by Administrator on 2014/12/6.
 */
Ext.define('js.operInfo',{
    extend:'Ext.panel.Panel',

    initComponent:function() {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            id: 'operInfoPanel', //TODO 分页的ID
            pageSize: 20,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: 'operinfopage', //TODO 要访问的action名称
                reader: {
                    type: 'json',
                    root: 'operList',
                    totalProperty: 'rows'//TODO action中返回来的总数量
                }
            },
            fields: [
                {name: 'operId', type: 'string'}, //TODO 名称和属性
                {name: 'operName', type: 'string'},
                {name: 'password', type: 'string'},
                {name: 'address', type: 'string'},
                {name: 'linkTel', type: 'string'},
                {name: 'qq', type: 'string'},
                {name: 'email', type: 'string'},
                {name: 'telphone', type: 'string'},
                {name: 'sortId', type: 'string'},
                {name: 'status', type: 'boolean'},
                {name: 'roleinfoByRoleId.roleName', type: 'string'},
                {name:'roleinfoByRoleId.roleId',type:'string'}
            ]
        });
        store.load({
            params: {
                start: 0,
                limit: 20
            }
        });
        Ext.apply(this, {
            layout:'border',
            closable:true,
            title: '操作员管理',//TODO 表格的名称
            id: 'operinfopage',
            items:[
                {
                    region: 'center',
                    xtype:'grid',
                    id:'operinfogrid',
                    stripeRows: true,
                    border: false,
                    store: Ext.data.StoreManager.lookup('operInfoPanel'), //TODO store的ID
                    columns: [
                        {text: '操作员ID', dataIndex: 'operId', align: 'center', menuDisabled: true, flex: 1},//TODO falex:1这一列一直到最后
                        {text: '操作员姓名', dataIndex: 'operName', align: 'center', menuDisabled: true, flex: 1},
                        {text: '身份', dataIndex: 'roleinfoByRoleId.roleName', align: 'center', menuDisabled: true, flex: 1},
                        {text: '密码', dataIndex: 'password', align: 'center', menuDisabled: true, flex: 1},
                        {text: '地址', dataIndex: 'address', align: 'center', menuDisabled: true, flex: 1},
                        {text: '联系电话', dataIndex: 'linkTel', align: 'center', menuDisabled: true, flex: 1},
                        {text: 'QQ', dataIndex: 'qq', align: 'center', menuDisabled: true, flex: 1},
                        {text: '邮箱', dataIndex: 'email', align: 'center', menuDisabled: true, flex: 1},
                        {text: '国定电话', dataIndex: 'telphone', align: 'center', menuDisabled: true, flex: 1},
                        {text: '排序', dataIndex: 'sortId', align: 'center', menuDisabled: true, flex: 1},
                        {text: '状态', dataIndex: 'status', align: 'center', menuDisabled: true, flex: 1,renderer: function (value) {
                            if ((value == 'false') || (value == false)) {
                                return '未启用';
                            }
                            if ((value == 'true') || (true == value)) {
                                return '启用';
                            }
                        }},
                        {text:'操作员ID',dataIndex:'roleinfoByRoleId.roleId',align:'center',hidden:true}
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            store: store,
                            dock: 'bottom',
                            displayInfo: true
                        }
                    ],
                    tbar: [
                        {xtype: 'button', text: '添加', handler: function () {
                            if (!Ext.getCmp('operinfoForm')) {
                                me.insertWindow();
                            }
                        }},
                        {xtype: 'button', text: '删除', handler: function () {
                            me.delWindow();
                        }},
                        {xtype: 'button', text: '修改', handler: function () {
                            if (!Ext.getCmp('')) {
                                me.edit();
                            }
                        }}
                    ],
                    listeners:{
                        itemcontextmenu:function(view,record,item,index,e){
                            e.preventDefault();
                            e.stopEvent();
                            var menu = new Ext.menu.Menu({
                                float:true,
                                items:[
                                    {
                                        text:'查看权限',
                                        iconCls:'leaf',
                                        handler:function(){
                                            this.up('menu').hide();
                                            roleid = record.get('roleinfoByRoleId.roleId');
                                            var aa = Ext.getCmp('roletree').getRootNode();
                                            Ext.Ajax.request({
                                                url:'menutree?roleId='+roleid,
                                                async:false,
                                                success:function(response){
                                                    me.jsonData = response.responseText;
                                                    if (typeof(me.jsonData) === 'string') {
                                                        me.jsonData = Ext.JSON.decode(me.jsonData);
                                                        me.mystore = me.jsonData.menulist.children;
                                                        aa.removeAll(false);
                                                        Ext.getCmp("roletree").setRootNode(me.jsonData.menulist);
                                                        Ext.getCmp("roletree").expandAll();
                                                    }
                                                }
                                            })
                                        }
                                    }
                                ]
                            }).showAt(e.getXY());
                        }
                    }
                },{
                    region: 'east',
                    title:'对应权限',
                    width:200,
                    items:Ext.create('Ext.tree.Panel',{
                        id:'roletree',
                        border: false,
//                        collapsible: true,
                        store: Ext.create('Ext.data.TreeStore', {
                            fields: [
                                {name: 'text', type: 'string', mapping: 'menuinfoEntity.menuName'}
                            ],
                            root: {
                                expanded: true,
                                children: me.mystore
                            }
                        }),
                        rootVisible: false
                    })
                }]
        });
        this.callParent();
    },
    insertWindow:function(){
        var me = this;
        var window = Ext.create('Ext.window.Window',{
            title:'添加员工',
            items:[{
                xtype:'form',
                layout:'form',
                border:false,
                id:'operinfoForm',//TODO 数据窗口的ID
                frame:true,
                bodyPadding:'5 5 0',
                width:390,
                fieldDefaults:{
                    msgTarget:'side',
                    labelWidth:75
                },
                defaultType:'textfield',
                items:[{
                    fieldLabel:'操作员姓名',
                    name:'oper.operName'//TODO 数据库中字段的名字
                },{
                    fieldLabel:'操作员角色',
                    xtype:'combo',
                    store:Ext.create('Ext.data.Store', {
                        proxy: {
                            type: 'ajax',
                            url: '/roleinfopage',//访问的url路径
                            reader: {
                                type: 'json',
                                root: 'roleList',
                                totalProperty: "rows"
                            }
                        },
                        fields: [
                            { name: 'roleId', type: 'string' },
                            { name: 'roleName', type: 'string' }
                        ]
                    }),
                    name:'oper.roleinfoByRoleId.roleId',
                    displayField: 'roleName',
                    valueField: 'roleId'
                },{
                    fieldLabel:'密码',
                    name:'oper.password'//TODO 数据库中字段的名字
                },{
                    fieldLabel:'地址',
                    name:'oper.address'//TODO 数据库中字段的名字
                },{
                    fieldLabel:'联系电话',
                    name:'oper.linkTel'//TODO 数据库中字段的名字
                },{
                    fieldLabel:'QQ',
                    name:'oper.qq'//TODO 数据库中字段的名字
                },{
                    fieldLabel:'邮箱',
                    name:'oper.email'//TODO 数据库中字段的名字
                },{
                    fieldLabel:'固定电话',
                    name:'oper.telphone'//TODO 数据库中字段的名字
                }]
            }],
            buttons:[
                {text:'确定',handler:function(){me.execute('operinfoForm','operinfoinsertl')}},// TODO 调用执行方法
                {text:'清空',handler:function(){Ext.getCmp('operinfoForm').getForm().reset()}}
            ]
        });
        window.show();
        window.center();
    },
    delWindow:function(){
        var record3 = Ext.getCmp('operinfogrid').getSelectionModel().getSelection();
        if(record3.length==0){
            Ext.MessageBox.show({
                title:'系统提示',
                msg:'删除操作，最少要选择一条数据，请选择则数据！',
                icon:Ext.MessageBox.INFO,
                buttons:Ext.MessageBox.YES
            })
        }else if(record3.length==1){
            Ext.MessageBox.show({
                title:'系统提示',
                msg:'您确定要删除这条数据吗？！',
                icon:Ext.MessageBox.INFO,
                buttons:Ext.MessageBox.YESNO,
                fn: function(btn) {
                    if (btn === 'yes') {
                        var me = this;
                        var record = Ext.getCmp('operinfogrid').getSelectionModel().getSelection();
                        var length = record.length;
                        var list= record[0].raw.operId;
                        Ext.Ajax.request({
                            url:'operinfodel',
                            method:'post',
                            params:{idList:list},
                            success:function(){
                                Ext.getCmp('operinfogrid').store.reload();
                            }
                        })
                    } else if (btn === 'no') {
                        console.log('No pressed');
                    } else {
                        console.log('Cancel pressed');
                    }
                }
            })
        }else if(record3.length>1){
            Ext.MessageBox.show({
                title:'系统提示',
                msg:'宁确定要删除这些数据吗？！',
                icon:Ext.MessageBox.INFO,
                buttons:Ext.MessageBox.YESNO,
                fn: function(btn) {
                    if (btn === 'yes'){

                        var record = Ext.getCmp('operinfogrid').getSelectionModel().getSelection();
                        var length = record.length;
                        var list='';
                        for(var i =0;i<length;i++){
                            list += record[i].raw.billCode;
                            if(i!=length-1){
                                list+=',';
                            }
                        }
                        Ext.Ajax.request({
                            url:'operinfodel',
                            method:'post',
                            params:{idList:list},
                            success:function(){
                                Ext.getCmp('operinfogrid').store.reload();
                            }
                        })
                    } else if (btn === 'no') {
                        console.log('No pressed');
                    } else {
                        console.log('Cancel pressed');
                    }
                }
            })
        }
    },
    edit:function(){
        var me = this;
        var recordedit = Ext.getCmp('operinfogrid').getSelectionModel().getSelection();
        var length = recordedit.length;
        me.editInTypeStore = Ext.create('Ext.data.Store',{
            autoLoad: true,
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "True", "name": "以启用"},
                {"abbr": "False", "name": "已禁用"}

            ]
        });
        if(length!=1){
            Ext.MessageBox.show({
                title:'系统提示',
                msg:'请选择一条数据进行查看',
                icon:Ext.MessageBox.INFO,
                buttons:Ext.MessageBox.YES
            })
        }else{
            Ext.create('Ext.window.Window',{
                title:'添加员工',
                items:[{
                    xtype:'form',
                    layout:'form',
                    border:false,
                    id:'operinfoeditForm',//TODO 数据窗口的ID
                    frame:true,
                    bodyPadding:'5 5 0',
                    width:390,
                    fieldDefaults:{
                        msgTarget:'side',
                        labelWidth:75
                    },
                    defaultType:'textfield',
                    items:[{
                        fieldLabel:'操作员ID',
                        value:recordedit[0].raw.operId,
                        name:'oper.operId'
                    },{
                        fieldLabel:'操作员姓名',
                        value:recordedit[0].raw.operName,
                        name:'oper.operName'//TODO 数据库中字段的名字
                    },{
                        fieldLabel:'操作员角色',
                        xtype:'combo',
                        store:Ext.create('Ext.data.Store', {
                            autoLoad:true,
                            proxy: {
                                type: 'ajax',
                                url: '/roleinfopage',//访问的url路径
                                reader: {
                                    type: 'json',
                                    root: 'roleList',
                                    totalProperty: "rows"
                                }
                            },
                            fields: [
                                { name: 'roleId', type: 'string' },
                                { name: 'roleName', type: 'string' }
                            ]
                        }),
                        name:'oper.roleinfoByRoleId.roleId',
                        displayField: 'roleName',
                        valueField: 'roleId',
                        value:recordedit[0].raw.roleinfoByRoleId.roleId
                    },{
                        fieldLabel:'密码',
                        value:recordedit[0].raw.password,
                        name:'oper.password'//TODO 数据库中字段的名字
                    },{
                        fieldLabel:'地址',
                        value:recordedit[0].raw.password,
                        name:'oper.address'//TODO 数据库中字段的名字
                    },{
                        fieldLabel:'联系电话',
                        value:recordedit[0].raw.linkTel,
                        name:'oper.linkTel'//TODO 数据库中字段的名字
                    },{
                        fieldLabel:'QQ',
                        value:recordedit[0].raw.qq,
                        name:'oper.qq'//TODO 数据库中字段的名字
                    },{
                        fieldLabel:'邮箱',
                        value:recordedit[0].raw.email,
                        name:'oper.email'//TODO 数据库中字段的名字
                    },{
                        fieldLabel:'固定电话',
                        value:recordedit[0].raw.telphone,
                        name:'oper.telphone'//TODO 数据库中字段的名字
                    },{
                        xtype: 'combo',
                        store: me.editInTypeStore,
                        fieldLabel: '状态',
                        name:'oper.status',
                        columnWidth: .3,
                        value: recordedit[0].raw.status,
                        displayField: 'name',
                        valueField: 'abbr'
//                        listeners: function (value) {
//                            if ((value ==="false") || (value == false)) {
//                                return '未启用';
//                            }
//                            if ((value ==="true") || (true == value)) {
//                                return '启用';
//                            }
//                        }
                    }]
                }],
                buttons:[
                    {text:'确定',handler:function(){me.execute('operinfoeditForm','operinfoedit')}},// TODO 调用执行方法
                    {text:'清空',handler:function(){Ext.getCmp('operinfoeditForm').getForm().reset()}}
                ]
            }).center().show();
        }
    },
    execute:function(id,url){
        var form = Ext.getCmp(id).getForm();
        if(form.isValid()){
            form.submit({
                url:url,
                success:function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('operinfogrid').store.reload();
                    Ext.MessageBox.show({
                        title:'系统提示',
                        msg:msg.message,
                        icon:Ext.MessageBox.INFO,
                        buttons:Ext.MessageBox.YES
                    })
                },
                failure:function(form,action){
                    Ext.MessageBox.show({
                        title:'异常提示',
                        msg:'由于网络原因你发送的请求无法完成，请检查你的网络，是否已连接！',
                        icon:Ext.MessageBox.INFO,
                        buttons:Ext.MessageBox.YES
                    })
                }
            })
        }
    }
//    tree:function(){
//        if(!Ext.getCmp('operinfogrid')){
//            var store1 = Ext.create('Ext.data.TreeStore', {
//            });
//            Ext.create('Ext.tree.Panel', {
//                title: '对应权限',
//                width: 200,
//                height: 150,
//                store: store1,
//                rootVisible: false,
//                readerTo:Ext.getBody()
//            })
//        }else{
//            Ext.Ajax.request({
//                url: 'menuinfo',
//                async: false,
//                success: function (response) {
//                    child = Ext.JSON.decode(response.responseText);
//                }
//            });
//            var store1 = Ext.create('Ext.data.TreeStore', {
//                fields:[
//                    {name:'text',type:'string',mapping:'menuinfoEntity.menuName'}
//                ],
//                root: {
//                    expanded: true,
//                    children: child.menulist.children
//                }
//            });
//            Ext.create('Ext.tree.Panel', {
//                title: '对应权限',
//                width: 200,
//                height: 150,
//                store: store1,
//                rootVisible: false
//            })
//        };
//    }
})