/**
 * Created by Administrator on 2014/11/20.
 */
Ext.define('js.deliverypage', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            id: 'deliveryPanel', //TODO 分页的ID
            pageSize: 20,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: 'deliverypage', //TODO 要访问的action名称
                reader: {
                    type: 'json',
                    root: 'delierylist',
                    totalProperty: 'rows'//TODO action中返回来的总数量
                }
            },
            fields: [
                {name: 'deliveryId', type: 'string'}, //TODO 名称和属性
                {name: 'deliveryName', type: 'string'},
                {name: 'address', type: 'string'},
                {name: 'linkName', type: 'string'},
                {name: 'linkTel', type: 'string'},
                {name: 'qq', type: 'string'},
                {name: 'email', type: 'string'},
                {name: 'sortId', type: 'string'},
                {name: 'status', type: 'string'}
            ],
            listeners: {
                beforeload: function (store, operation) {
                    var name = Ext.getCmp('deliveryparam1Class');
                    var name1 = Ext.getCmp('deliveryparam1Value');
                    var name2 = Ext.getCmp('deliveryparam2Class');
                    var name3 = Ext.getCmp('deliveryparam2Value');
                    var name4 = Ext.getCmp('deliveryparam3Class');
                    var name5 = Ext.getCmp('deliveryparam3Value');

                    if (name) {
                        if (name.getValue()) {
                            if (operation.params) {
                                operation.params.param1 = name.getValue()
                            } else {
                                operation.params = {param1: name.getValue()};
                            }
                        }
                        ;
                        if (name1) {
                            if (name1.getValue()) {
                                if (operation.params) {
                                    operation.params.param2 = name1.getValue()    //encodeURIComponent()
                                } else {
                                    operation.params = {
                                        param2: name1.getValue(name1.getValue())
                                    };
                                }
                            }
                        }
                        ;
                        if (name2) {
                            if (name2.getValue()) {
                                if (operation.params) {
                                    operation.params.param3 = name2.getValue()    //encodeURIComponent()
                                } else {
                                    operation.params = {
                                        param3: name2.getValue(name2.getValue())
                                    };
                                }
                            }
                        }
                        ;
                        if (name3) {
                            if (name3.getValue()) {
                                if (operation.params) {
                                    operation.params.param4 = name3.getValue()    //encodeURIComponent()
                                } else {
                                    operation.params = {
                                        param4: name3.getValue(name3.getValue())
                                    };
                                }
                            }
                        }
                        ;
                        if (name4) {
                            if (name4.getValue()) {
                                if (operation.params) {
                                    operation.params.param5 = name4.getValue()    //encodeURIComponent()
                                } else {
                                    operation.params = {
                                        param5: name4.getValue(name4.getValue())
                                    };
                                }
                            }
                        }
                        ;
                        if (name5) {
                            if (name5.getValue()) {
                                if (operation.params) {
                                    operation.params.param6 = name5.getValue()    //encodeURIComponent()
                                } else {
                                    operation.params = {
                                        param6: name5.getValue(name5.getValue())
                                    };
                                }
                            }
                        }
                        ;
                    }
                }
            }
        });
        store.load({
            params: {
                start: 0,
                limit: 20
            }
        });
        var store2 = Ext.create('Ext.data.Store', {
            fields: ['text', 'name'],
            data: [
                {
                    'text': '按供应商民称', 'name': 'deliveryName'
                },
                {
                    'text': '按地址', 'name': 'address'
                },
                {
                    'text': '按联系人', 'name': 'linkName'
                },
                {
                    'text': '按联系电话', 'name': 'linkTel'
                }
            ]
        });
        var selModel = Ext.create(Ext.selection.CheckboxModel);
        Ext.apply(this, {
            id: 'deliverypage',
            stripeRows: true,
            selModel: selModel,
            border: false,
            closable: true,
            title: '配送商管理',//TODO 表格的名称
            store: Ext.data.StoreManager.lookup('deliveryPanel'), //TODO store的ID
            columns: [
                {text: '供应商ID', dataIndex: 'deliveryId', align: 'center', menuDisabled: true, hidden: true},//TODO  falex:1这一列一直到最后
                {text: '供应商名称', dataIndex: 'deliveryName', align: 'center', menuDisabled: true, flex: 1},
                {text: '地址', dataIndex: 'address', align: 'center', menuDisabled: true, flex: 1},
                {text: '联系人', dataIndex: 'linkName', align: 'center', menuDisabled: true, flex: 1},
                {text: '联系电话', dataIndex: 'linkTel', align: 'center', menuDisabled: true, flex: 1},
                {text: 'QQ', dataIndex: 'qq', align: 'center', menuDisabled: true, flex: 1},
                {text: '邮箱', dataIndex: 'email', align: 'center', menuDisabled: true, flex: 1},
                {text: '排序', dataIndex: 'sortId', align: 'center', menuDisabled: true, hidden: true},
                {text: '状态', dataIndex: 'status', align: 'center', menuDisabled: true, hidden: true}
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
                            xtype: 'combo',
                            id: 'deliveryparam1Class',
                            name: 'param1',
                            width: 112,
                            emptyText: '请选择查询方式',
                            emptyValue: '0',
                            store: store2,
                            displayField: 'text',
                            valueField: 'name'
                        },
                        {
                            xtype: 'textfield',
                            id: 'deliveryparam1Value',
                            name: 'param2'
                        },
                        {
                            xtype: 'combo',
                            id: 'deliveryparam2Class',
                            name: 'param3',
                            width: 112,
                            emptyText: '请选择查询方式',
                            emptyValue: '0',
                            store: store2,
                            displayField: 'text',
                            valueField: 'name'
                        },
                        {
                            xtype: 'textfield',
                            id: 'deliveryparam2Value',
                            name: 'param4'
                        },
                        {
                            xtype: 'combo',
                            id: 'deliveryparam3Class',
                            name: 'param5',
                            width: 112,
                            emptyText: '请选择查询方式',
                            emptyValue: '0',
                            store: store2,
                            displayField: 'text',
                            valueField: 'name'
                        },
                        {
                            xtype: 'textfield',
                            id: 'deliveryparam3Value',
                            name: 'param6'
                        },
                        { xtype: 'button', text: '搜索', border: false, style: {background: '#cbdbef'}, handler: function () {
                            Ext.getCmp('deliverypage').store.load({
                                params: {
                                    param1: Ext.getCmp('deliveryparam1Class').getValue(),
                                    param2: Ext.getCmp('deliveryparam1Value').getValue(),
                                    param3: Ext.getCmp('deliveryparam2Class').getValue(),
                                    param4: Ext.getCmp('deliveryparam2Value').getValue(),
                                    param5: Ext.getCmp('deliveryparam3Class').getValue(),
                                    param6: Ext.getCmp('deliveryparam3Value').getValue()
                                }
                            });
                        }
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    store: store,
                    dock: 'bottom',
                    displayInfo: true
                }
            ],
            tbar: [
                {xtype: 'button', text: '添加', handler: function () {
                    if (!Ext.getCmp('deliveryInsert')) {
                        me.insert()
                    }
                }},
                {xtype: 'button', text: '删除', handler: function () {
                    me.del();
                }},
                {xtype: 'button', text: '修改', handler: function () {
                    if (!Ext.getCmp('deliveryedit')) {
                        me.edit();
                    }
                }}
            ]
        });
        this.callParent();
    },
    insert: function () {
        var me = this;
        var window = Ext.create('Ext.window.Window', {
            title: '数据添加窗口',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    border: false,
                    id: 'deliveryInsert',//TODO 数据窗口的ID
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
                            fieldLabel: '配送商名称',
                            allowBlank: false,
                            name: 'delivery.deliveryName'//TODO 数据库中字段的名字
                        },
                        {
                            fieldLabel: '地址',
                            allowBlank: false,
                            name: 'delivery.address'//TODO 数据库中字段的名字
                        },
                        {
                            fieldLabel: '联系人',
                            allowBlank: false,
                            name: 'delivery.linkName'//TODO 数据库中字段的名字
                        },
                        {
                            fieldLabel: '联系电话',
                            allowBlank: false,
                            name: 'delivery.linkTel'//TODO 数据库中字段的名字
                        },
                        {
                            fieldLabel: 'QQ',
                            name: 'delivery.qq'//TODO 数据库中字段的名字
                        },
                        {
                            fieldLabel: '邮箱',
                            allowBlank: false,
                            name: 'delivery.email'//TODO 数据库中字段的名字
                        }
                    ]
                }
            ],
            buttons: [
                {text: '确定', handler: function () {
                    me.execute('deliveryInsert', 'deliveruInsert')
                }},// TODO 调用执行方法
                {text: '清空', handler: function () {
                    Ext.getCmp('deliveryInsert').getForm().reset()
                }}
            ]
        });
        window.show();
        window.center();
    },
    del: function () {
        var me = this;
        var record = Ext.getCmp('deliverypage').getSelectionModel().getSelection();
        var length = record.length;
        var list = '';
        if (length > 1) {
            for (var i = 0; i < length; i++) {
                list += record[i].raw.deliveryId;
                if (i != length - 1) {
                    list += ',';
                }
            }
        } else {
            list += record[0].raw.deliveryId;
        }
        Ext.Ajax.request({
            url: 'deliveruDel',
            method: 'post',
            params: {idList: list},
            success: function () {
                Ext.getCmp('deliverypage').store.reload();
            }
        })
    },
    edit: function () {
        var me = this;
        var recordedit = Ext.getCmp('deliverypage').getSelectionModel().getSelection();
        if (recordedit.length > 1) {
            Ext.MessageBox.show({
                title: '异常提示',
                msg: '修改数据每次只能修改一条，请重新选择',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.MessageBox.YES
            })
        } else if (recordedit.length == 1) {
            var window = Ext.create('Ext.window.Window', {
                title: '修改信息',
                id: 'deliveryedit',
                items: [
                    {
                        xtype: 'form',
                        layout: 'form',
                        border: false,
                        id: 'deliveryeditForm',
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
                                fieldLabel: '配送商ID',
                                allowBlank: false,
                                hidden: true,
                                value: recordedit[0].raw.deliveryId,
                                name: 'delivery.deliveryId'//TODO 数据库中字段的名字
                            },
                            {
                                fieldLabel: '配送商排序状态',
                                hidden: true,
                                allowBlank: false,
                                value: recordedit[0].raw.sortId,
                                name: 'delivery.sortId'//TODO 数据库中字段的名字
                            },
                            {
                                fieldLabel: '配送商状态',
                                hidden: true,
                                allowBlank: false,
                                value: recordedit[0].raw.status,
                                name: 'delivery.status'//TODO 数据库中字段的名字
                            },
                            {
                                fieldLabel: '配送商名称',
                                allowBlank: false,
                                value: recordedit[0].raw.deliveryName,
                                name: 'delivery.deliveryName'//TODO 数据库中字段的名字
                            },
                            {
                                fieldLabel: '地址',
                                allowBlank: false,
                                value: recordedit[0].raw.address,
                                name: 'delivery.address'//TODO 数据库中字段的名字
                            },
                            {
                                fieldLabel: '联系人',
                                allowBlank: false,
                                value: recordedit[0].raw.linkName,
                                name: 'delivery.linkName'//TODO 数据库中字段的名字
                            },
                            {
                                fieldLabel: '联系电话',
                                allowBlank: false,
                                value: recordedit[0].raw.linkTel,
                                name: 'delivery.linkTel'//TODO 数据库中字段的名字
                            },
                            {
                                fieldLabel: 'QQ',
                                value: recordedit[0].raw.qq,
                                name: 'delivery.qq'//TODO 数据库中字段的名字
                            },
                            {
                                fieldLabel: '邮箱',
                                allowBlank: false,
                                value: recordedit[0].raw.email,
                                name: 'delivery.email'//TODO 数据库中字段的名字
                            }
                        ]
                    }
                ],
                buttons: [
                    {text: '保存', handler: function () {
                        me.execute('deliveryeditForm', 'deliveruEdit')
                    }},//TODO 修改的执行方法
                    {text: '关闭', handler: function () {
                        Ext.getCmp('deliveryedit').close()
                    }}
                ]
            });
            window.center();
            window.show();
        } else {
            Ext.MessageBox.show({
                title: '异常提示',
                msg: '请选择一条数据,进行修改',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.MessageBox.YES
            })
        }
    },
    execute: function (id, url) {
        var form = Ext.getCmp(id).getForm();
        if (form.isValid()) {
            form.submit({
                url: url,
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('deliverypage').store.reload();
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: msg.message,
                        icon: Ext.MessageBox.INFO,
                        buttons: Ext.MessageBox.YES
                    })
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