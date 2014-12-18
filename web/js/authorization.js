/**
 * Created by Administrator on 2014/12/6.
 */
Ext.define('js.authorization', {
    extend: 'Ext.panel.Panel',
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            id: 'authorizationPanel', //TODO 分页的ID
            pageSize: 5,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: 'roleinfopage', //TODO 要访问的action名称
                reader: {
                    type: 'json',
                    root: 'roleList',
                    totalProperty: 'rows'//TODO action中返回来的总数量
                }
            },
            fields: [
                {name: 'roleName', type: 'string'},
                {name: 'roleId', type: 'string'}

            ]
        });
        store.load({
            params: {
                start: 0,
                limit: 5
            }
        });
//        var selModel = Ext.create(Ext.selection.CheckboxModel);
        Ext.apply(this, {
            id: 'authorizationpage',
            title: '权限管理',//TODO 表格的名称
            layout: 'border',
            closable: true,
            items: [
                {
                    region: 'center',
                    xtype: 'grid',
                    id: 'authorizationgrid',
                    stripeRows: true,
//                    selModel:selModel,
                    border: false,
                    store: Ext.data.StoreManager.lookup('authorizationPanel'), //TODO store的ID
                    columns: [
                        {text: '操作员ID', dataIndex: 'roleId'}, //TODO  falex:1这一列一直到最后
                        {text: '操作员名称', dataIndex: 'roleName', align: 'center', menuDisabled: true}
                    ],
                    listeners: {
                        itemcontextmenu: function (view, record, item, index, e) {
                            e.preventDefault();
                            e.stopEvent();
                            var menu = new Ext.menu.Menu({
                                float: true,
                                items: [
                                    {
                                        text: '查看权限',
                                        iconCls: 'leaf',
                                        handler: function () {
                                            this.up('menu').hide();
                                            roleid = record.get('roleId');
                                            var aa = Ext.getCmp('authroletree').getRootNode();
                                            Ext.Ajax.request({
                                                url: 'menutree?roleId=' + roleid,
                                                async: false,
                                                success: function (response) {
                                                    me.jsonData = response.responseText;
                                                    if (typeof(me.jsonData) === 'string') {
                                                        me.jsonData = Ext.JSON.decode(me.jsonData);
                                                        me.mystore = me.jsonData.menulist.children;
                                                        aa.removeAll(false);
                                                        Ext.getCmp("authroletree").setRootNode(me.jsonData.menulist);
                                                        Ext.getCmp("authroletree").expandAll();
                                                    }
                                                }
                                            })
                                        }
                                    }
                                ]
                            }).showAt(e.getXY());
                        }
                    }
//                    dockedItems: [
//                        {
//                            xtype: 'pagingtoolbar',
//                            store: store,
//                            dock: 'bottom',
//                            displayInfo: true
//                        }
//                    ]
                },
                {
                    region: 'east',
                    title: '对应权限',
                    width: 200,
                    items: Ext.create('Ext.tree.Panel', {
                        id: 'authroletree',
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
                }
            ],
            tbar: [
//                {
//                xtype:'button',text:'查看权限',handler:function(){
//                    var record = Ext.getCmp('authorizationgrid').getSelectionModel().getSelection();
//                    if(record.length!=1){
//                        Ext.MessageBox.show({
//                            title:'系统提示',
//                            msg:'请选择一条数据查看',
//                            icon:Ext.MessageBox.INFO,
//                            buttons:Ext.MessageBox.YES
//                        });
//                    }else{
//                        if(!Ext.getCmp('detaileData')){
//                            me.showdetaile(record);
//                        }
//                    }
//                }},
                {xtype: 'button', text: '添加', handler: function () {
                    if (!Ext.getCmp('authorizatinInsertWindow')) {
                        me.insert();
                    }
                }},
//                {xtype:'button',text:'删除',handler:function(){
//                    if(!Ext.getCmp('authorizatinInsertWindow')){}
//                }},
                {xtype: 'button', text: '修改', handler: function () {
                    if (!Ext.getCmp('authorizationedit')) {
                        me.edit();
                    }
                }}
            ]
        });
        this.callParent();
    },
    insert: function () {
        var me1 = this;
        Ext.Ajax.request({
            url: 'menuAllTree',
            async: false,
            success: function (response) {
                me1.treeData = Ext.JSON.decode(response.responseText);
            }
        });
        me1.menuStore = Ext.create('Ext.data.TreeStore', {
            fields: [
                {name: 'text', type: 'string', mapping: 'menuinfoEntity.menuName'},
                {name: 'id', type: 'string', mapping: 'menuinfoEntity.menuId'}
            ],
            root: {
                expanded: true,
                id: '-1',
                children: me1.treeData.menulist.children
            }
        })
        var window = Ext.create('Ext.window.Window', {
            title: '数据添加窗口',
            id: 'authorizatinInsertWindow',
            autoScroll: true,
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    border: false,
                    id: 'authorizationInsertForm',//TODO 数据窗口的ID
                    frame: true,
                    bodyPadding: '5 5 0',
                    width: 390,
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 75
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: '角色名称',
                            id: 'roleName',
                            border: false,
                            name: 'roleName'//TODO 数据库中字段的名字
                        },
                        {
                            fieldLabel: '权限',
                            xtype: 'treepanel',
                            id: 'tree2',
                            store: me1.menuStore
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                {text: '添加', handler: function () {
//                    var FileItype=Ext.getCmp('authorizationInsertForm').getForm().findField('checkboxgroupValue').getValue();
//                    var length= FileItype.cb.length;
                    var FileItype = Ext.getCmp('tree2').getChecked();
                    var data1 = FileItype;
                    var list = new Array();
                    var roleName = Ext.getCmp('roleName').getValue();
                    Ext.each(data1, function (item, index) {
                        list.push(item.data.id);
                    });
//                    var roleName = Ext.getCmp('roleName').getValue();
//                    for(var i =0;i<length;i++){
//                        list += data.cb[i];
//                        if(i!=length-1){
//                            list+=',';
//                        }
//                    }
                    Ext.Ajax.request({
                        url: 'aothorizatinInsert',
                        method: 'post',
                        params: {
                            idList1: list,
                            roleName: roleName
                        },
                        success: function () {
                            Ext.getCmp('authorizationgrid').store.reload();
                            Ext.MessageBox.show({
                                title: '系统提示',
                                msg: '添加成功',
                                icon: Ext.MessageBox.INFO,
                                buttons: Ext.MessageBox.YES,
                                fn: function () {
                                    Ext.getCmp('authorizatinInsertWindow').close();
                                }
                            });
                        }
                    })
                }},// TODO 调用执行方法
                {text: '清空', handler: function () {
                    Ext.getCmp('authorizationInsertForm').getForm().reset()
                }}
            ]
        });
        window.show();
        window.center();
    },
    showdetaile: function (record) {
        var delauth = this;
        var selModel = Ext.create(Ext.selection.CheckboxModel);
        record1 = record[0];
        var storedetaile = Ext.create('Ext.data.Store', {
            id: 'authorizationdetaile',
            proxy: {
                type: 'ajax',
                url: 'authorizationpage?param1=' + record1.get('roleId'),
                reader: {
                    type: 'json',
                    root: 'authorizationList',
                    totalProperty: "rows"
                }
            },
            fields: [
                {name: 'id', type: 'string'},
                {name: 'roleinfoByRoleId.roleId', type: 'string'},
                {name: 'roleinfoByRoleId.roleName', type: 'string'},
                {name: "menuinfoByMenuId.menuId", type: 'int'},
                {name: 'menuinfoByMenuId.menuName', type: 'string'}
            ],
            autoLoad: true
        });
        storedetaile.load({
            params: {
                start: 0,
                limit: 5
            }
        });
        Ext.create('Ext.window.Window', {
            title: '操作员权限',
            id: 'authorizationdataWindow',
            width: 500,
            height: 350,
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    id: 'authorizationdetaileData',
                    selModel: selModel,
                    store: storedetaile,
                    columns: [
                        {text: 'ID', dataIndex: 'id', hidden: true},
                        {text: '角色ID', dataIndex: 'roleinfoByRoleId.roleId', flex: 1, align: 'center'},
                        {text: '角色名称', dataIndex: 'roleinfoByRoleId.roleName', flex: 1, align: 'center'},
                        {text: '菜单ID', dataIndex: 'menuinfoByMenuId.menuId', flex: 1, align: 'center'},
                        {text: '菜单名称', dataIndex: 'menuinfoByMenuId.menuName', flex: 1, align: 'center'}
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'form',
                    layout: 'column',
                    border: false,
                    bodyStyle: {
                        background: '#cbdbef'
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: '删除',
                            border: false,
                            style: {background: '#cbdbef'},
                            handler: function () {
                                var record2 = Ext.getCmp('authorizationdetaileData').getSelectionModel().getSelection();
                                var list = '';
                                if (record2.length == 0) {
                                    Ext.MessageBox.show({
                                        title: '系统提示',
                                        msg: '请选择一条数据！',
                                        icon: Ext.MessageBox.INFO,
                                        buttons: Ext.MessageBox.YES
                                    });
                                } else if (record2.length == 1) {
                                    Ext.MessageBox.show({
                                        title: '系统提示',
                                        msg: '你确定要删除这条数据吗？',
                                        icon: Ext.MessageBox.INFO,
                                        buttons: Ext.MessageBox.YESNO,
                                        fn: function (btn) {
                                            if (btn == 'yes') {
                                                del(record2);
                                            }
                                            Ext.getCmp('authorizationpage').close();
                                        }
                                    });
                                } else {
                                    Ext.MessageBox.show({
                                        title: '系统提示',
                                        msg: '你确定要删除这些数据吗？',
                                        icon: Ext.MessageBox.INFO,
                                        buttons: Ext.MessageBox.YESNO,
                                        fn: function (btn) {
                                            if (btn == 'yes') {
                                                del(record2);
                                            }
                                            Ext.getCmp('authorizationpage').close();
                                        }
                                    });
                                }
                                var del = function (record2) {
                                    var length = record2.length;
                                    for (var i = 0; i < length; i++) {
                                        list += record2[i].raw.id;
                                        if (i != length - 1) {
                                            list += ',';
                                        }
                                    }
                                    Ext.Ajax.request({
                                        url: 'aothorizatindelete',
                                        method: 'post',
                                        params: {idList: list},
                                        success: function () {
                                            Ext.MessageBox.show({
                                                title: '系统提示',
                                                msg: '删除成功！',
                                                icon: Ext.MessageBox.INFO,
                                                buttons: Ext.MessageBox.YES,
                                                fn: function () {
                                                    Ext.getCmp('authorizatinInsertWindow').close();
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: '添加',
                            border: false,
                            style: {background: '#cbdbef'},
                            handler: function () {
                                var me = this;
                                var window = Ext.create('Ext.window.Window', {
                                    title: '数据添加窗口',
                                    id: 'authorizatinInsertWindow',
                                    items: [
                                        {
                                            xtype: 'form',
                                            layout: 'form',
                                            border: false,
                                            id: 'authorizationInsertForm',//TODO 数据窗口的ID
                                            frame: true,
                                            bodyPadding: '5 5 0',
                                            width: 390,
                                            fieldDefaults: {
                                                msgTarget: 'side',
                                                labelWidth: 75
                                            },
                                            defaultType: 'textfield',
                                            items: [
                                                {
                                                    fieldLabel: '角色名称',
                                                    id: 'roleName',
                                                    value: record[0].raw.roleName,
                                                    name: 'roleName'//TODO 数据库中字段的名字
                                                },
                                                {
                                                    xtype: 'checkboxgroup',
                                                    fieldLabel: '角色权限',
                                                    layout: 'column',
                                                    items: [
                                                        { boxLabel: '用户管理', name: 'cb', inputValue: '1', columnWidth: .3 },
                                                        { boxLabel: '商品管理', name: 'cb', inputValue: '2', columnWidth: .3 },
                                                        { boxLabel: '采购管理', name: 'cb', inputValue: '3', columnWidth: .3 },
                                                        { boxLabel: '销售管理', name: 'cb', inputValue: '4', columnWidth: .3 },
                                                        { boxLabel: '仓库管理', name: 'cb', inputValue: '5', columnWidth: .3 },
                                                        { boxLabel: '日志管理', name: 'cb', inputValue: '6', columnWidth: .3 },
                                                        { boxLabel: '会员管理', name: 'cb', inputValue: '7', columnWidth: .3 }
                                                    ],
                                                    name: 'checkboxgroupValue'//TODO 数据库中字段的名字
                                                }
                                            ]
                                        }
                                    ],
                                    buttons: [
                                        {text: '确定', handler: function () {
                                            var FileItype = Ext.getCmp('authorizationInsertForm').getForm().findField('checkboxgroupValue').getValue();
                                            var length = FileItype.cb.length;
                                            var data = FileItype;
                                            var list = '';
                                            var roleName = Ext.getCmp('roleName').getValue();
                                            for (var i = 0; i < length; i++) {
                                                list += data.cb[i];
                                                if (i != length - 1) {
                                                    list += ',';
                                                }
                                            }
                                            Ext.Ajax.request({
                                                url: 'aothorizatinInsert',
                                                method: 'post',
                                                params: {idList: list,
                                                    roleName: roleName
                                                },
                                                success: function () {
                                                    Ext.getCmp('authorizationpage').store.reload();
                                                    Ext.MessageBox.show({
                                                        title: '系统提示',
                                                        msg: '添加成功',
                                                        icon: Ext.MessageBox.INFO,
                                                        buttons: Ext.MessageBox.YES,
                                                        fn: function () {
                                                            Ext.getCmp('authorizatinInsertWindow').close();
                                                        }
                                                    });
                                                }
                                            })
                                        }},// TODO 调用执行方法
                                        {text: '清空', handler: function () {
                                            Ext.getCmp('authorizationInsertForm').getForm().reset()
                                        }}
                                    ]
                                });
                                window.show();
                                window.center();
                            }
                        }
                    ]
                }
            ]
        }).show();
    },
    del: function () {
        var me = this;
        var record = Ext.getCmp('').getSelectionModel.getSelection()[0];
        var window = Ext.create('Ext.window.Window', {
            title: '你确定要删除这个用户吗？',
            id: 'del',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    border: false,
                    id: 'delFrom',
                    frame: true,
                    bodyPadding: '5 5 0',
                    width: 390,
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 75
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: '',
                            name: '',
                            allowBlank: false,
                            value: record.get('')//TODO id
                        },
                        {
                            fieldLabel: ''
                        }
                    ]
                }
            ],
            buttons: [
                {text: '确定', handler: function () {
                }},
                {text: '取消', handler: function () {
                    Ext.getCmp().close()
                }}
            ]
        });
        window.show();
        window.center()
    },
    edit: function () {
        var me = this;
        var record = Ext.getCmp('authorizationgrid').getSelectionModel().getSelection()[0];
        Ext.Ajax.request({
            url: 'menuAllTree',
            async: false,
            success: function (response) {
                me.treeData = Ext.JSON.decode(response.responseText);
            }
        });
        me.menuStore = Ext.create('Ext.data.TreeStore', {
            fields: [
                {name: 'text', type: 'string', mapping: 'menuinfoEntity.menuName'},
                {name: 'id', type: 'string', mapping: 'menuinfoEntity.menuId'}
            ],
            root: {
                expanded: true,
                id: '-1',
                children: me.treeData.menulist.children
            }
        });
        var window = Ext.create('Ext.window.Window', {
            title: '修改信息',
            id: 'authorizationedit',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    border: false,
                    id: 'editForm',
                    frame: true,
                    bodyPadding: '5 5 0',
                    width: 390,
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 75
                    },
                    defaultType: 'textfield',
                    items: [                 //TODO 要修改的列，数据库中飞空的列
                        {
                            fieldLabel: '操作员ID',
                            value: record.raw.roleId,
                            hidden: true,
                            id: 'roleIdEdit'
//                        name:'oper.operId'
                        },
                        {
                            fieldLabel: '操作员姓名',
                            value: record.raw.roleName,
                            id: 'roleNameEdit'
//                        name:'oper.operName'//TODO 数据库中字段的名字
                        },
                        {
                            fieldLabel: '权限',
                            xtype: 'treepanel',
                            id: 'tree3',
                            store: me.menuStore
                        }
                    ]
                }
            ],
            buttons: [
                {text: '修改', handler: function () {
                    var FileItype = Ext.getCmp('tree3').getChecked();
                    var data1 = FileItype;
                    var list = new Array();
                    var roleName = Ext.getCmp('roleNameEdit').getValue();
                    var roleId = Ext.getCmp('roleIdEdit').getValue();
                    Ext.each(data1, function (item, index) {
                        list.push(item.data.id);
                    });
                    Ext.Ajax.request({
                        url: 'aothorizatinedit',
                        method: 'post',
                        params: {
                            idList1: list,
                            roleName: roleName,
                            roleId: roleId
                        },
                        success: function () {
                            Ext.getCmp('authorizationgrid').store.reload();
                            Ext.MessageBox.show({
                                title: '系统提示',
                                msg: '修改成功',
                                icon: Ext.MessageBox.INFO,
                                buttons: Ext.MessageBox.YES,
                                fn: function () {
                                    Ext.getCmp('authorizatinInsertWindow').close();
                                }
                            });
                        }
                    })
                }},//TODO 修改的执行方法
                {text: '关闭', handler: function () {
                    Ext.getCmp('edit').close()
                }}
            ]
        }).show().center();
    },
    execute: function (id, url) {
        var form = Ext.getCmp(id).getForm();
        if (form.isValid()) {
            form.submit({
                url: url,
                success: function (form, action) {
                },
                failure: function (form, action) {
                    Ext.MessageBox.show({
                        title: '异常提示',
                        msg: '由于网络原因你发送的请求无法完成，请检查你的网络，是否已连接！',
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES
                    })
                }
            })
        }
    }
})