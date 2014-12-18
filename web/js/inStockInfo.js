/**
 * Created by Administrator on 2014/11/26.
 */
Ext.define('js.inStockInfo', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            id: 'mystore',
            pageSize: 5,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/instockinfopage',//访问的url路径
                reader: {
                    type: 'json',
                    root: 'instockList',
                    totalProperty: "rows"
                }
            },
            fields: [
                {name: 'billCode', type: 'string'},
                {name: 'inType', type: 'byte'},
                {name: 'inTime', type: 'Timestamp'},
                {name: 'hander', type: 'String'},
                {name: 'totalMoney', type: 'BigDecimal'},
                {name: 'remark', type: 'string'},
                {name: 'supplierinfoBySupplierId.supplierName', type: 'string'},
                {name: 'supplierinfoBySupplierId.supplierId', type: 'string'},
                {name: 'operinfoByOperId.operName', type: 'string'}
            ]
        });
        store.load({
            params: {
                start: 0,
                limit: 5
            }
        });
        var selModel = Ext.create(Ext.selection.CheckboxModel);
        Ext.apply(this, {
            id: "inStockInfoPage",
            stripeRows: true,
            border: false,
            selModel: selModel,
            closable: true,
            title: '入库信息',
            store: store,//Ext.data.StoreManager.lookup('mystore'), //store里的id
            columns: [
                {text: '入库单', dataIndex: 'billCode', align: 'center', menuDisabled: true, flex: 1},
                {text: '操作员', dataIndex: 'operinfoByOperId.operName', align: 'center', menuDisabled: true, flex: 1},
                {text: '供应商ID', dataIndex: 'supplierinfoBySupplierId.supplierId', align: 'center', hidden: true},
                {text: '供应商', dataIndex: 'supplierinfoBySupplierId.supplierName', align: 'center', menuDisabled: true, flex: 1},
                {text: '入库方式', dataIndex: 'inType', align: 'center', menuDisabled: true, flex: 1},
                {text: '入库时间', dataIndex: 'inTime', align: 'center', menuDisabled: true, flex: 1},
                {text: '经手人', dataIndex: 'hander', align: 'center', menuDisabled: true, flex: 1},
                {text: '总金额', dataIndex: 'totalMoney', align: 'center', menuDisabled: true, flex: 1},
                {text: '备注', dataIndex: 'remark', align: 'center', menuDisabled: true, flex: 1}
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
                {xtype: 'button', text: '订单详情', handler: function () {
                    if (!Ext.getCmp('dataWindow')) {
                        var record2 = Ext.getCmp('inStockInfoPage').getSelectionModel().getSelection();
                        if (record2.length == 1) {
                            me.show1()
                        } else {
                            Ext.MessageBox.show({
                                title: '系统提示',
                                msg: '请选择一条数据查看！',
                                icon: Ext.MessageBox.INFO,
                                buttons: Ext.MessageBox.YES
                            })
                        }
                    }
                }}, //添加数据
                {xtype: 'button', text: '新建', handler: function () {
                    if (!Ext.getCmp('instockInsernGrid')) {
                        me.insertWindow()
                    }
                }},//删除数据
                {xtype: 'button', text: '修改', handler: function () {
                    if (!Ext.getCmp('instockEditWindow')) {
                        me.editWindow()
                    }
                }},//修改数据
                {xtype: 'button', text: '删除', handler: function () {
                    me.delWindow()
                }}
            ]
        });
        this.callParent();
    },

    show1: function () {
        var recod1 = Ext.getCmp('inStockInfoPage').getSelectionModel().getSelection()[0];
        var storedetaile = Ext.create('Ext.data.Store', {
            id: 'storedata',
            pageSize: 5,
            proxy: {
                type: 'ajax',
                url: 'indetaileInfofopage?param1=' + recod1.get('billCode'),
                reader: {
                    type: 'json',
                    root: 'indetaileInfoList',
                    totalProperty: "count"
                }
            },
            fields: [
                {name: 'id', type: 'string'},
                {name: "num", type: 'int'},
                {name: 'price', type: 'string'},
                {name: 'merchandiseinfoByMerchandiseId.merchandiseName', type: 'string'}
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
            title: '订单详情',
            id: 'dataWindow',
            width: 500,
            height: 350,
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    id: 'detaileData',
                    store: storedetaile,
                    columns: [
                        {text: '商品名称', dataIndex: 'merchandiseinfoByMerchandiseId.merchandiseName', flex: 1, align: 'center'},
                        {text: '数量', dataIndex: 'num', flex: 1, align: 'center'},
                        {text: '单价', dataIndex: 'price', flex: 1, align: 'center'}
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: storedetaile,
                    dock: 'bottom',
                    displayInfo: true
                }
            ]
        }).show();
    },

    insertWindow: function () {
        var logger1 = {};
        var totalmoney = '';
        Ext.Ajax.request({
            url: 'userinfo',
            async: false,
            success: function (response) {
                logger1 = Ext.JSON.decode(response.responseText);
            }
        });
        var inTypeStore = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ['abbr', 'name'],
            data: [
                {'abbr': '1', 'name': '正常入库'},
                {'abbr': '2', 'name': '报溢'},
                {'abbr': '3', 'name': '盘盈'}
            ]
        });
        var userName = logger1.list[0], userID = logger1.list[1];
        var me = this, cellEditing;
        comboText = '';
        cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1,
            listeners: {
                edit: function (editor, context) {
                    var myStore = Ext.data.StoreManager.lookup('myStore');
                    if (context.value || context.value == 0) {
                        if (context.field === 'merchandiseName') {
                            context.record.set('merchandiseId', context.value);
                            context.record.set('merchandiseName', me.comboText);
                        }
                        if (context.field === 'num') {
                            if (context.record.get('price') >= 0) {
                                context.record.set('total', context.value * context.record.get('price'));
                            }
                        }
                        if (context.field === 'price') {
                            if (context.record.get('num') >= 0) {
                                context.record.set('total', context.value * context.record.get('num'));
                            }
                        }
                        if (context.record.get('merchandiseId') !== '' && context.record.get('num') > 0) {
                            var isEmptyRow = false;
                            context.grid.store.each(function (record) {
                                if (record.get('merchandiseId') === '' || record.get('num') <= 0) {
                                    isEmptyRow = true;
                                    return false;
                                }
                            });
                            if (!isEmptyRow) {
                                context.grid.store.add({});
                            }
                            totalmoney = 0;
                            for (var i = 0; i < myStore.data.items.length; i++) {
                                if (!isNaN(myStore.data.items[i].data.total) && myStore.data.items[i].data.total != '') {
                                    totalmoney += myStore.data.items[i].data.total;
                                    Ext.getCmp('totalmoney').setValue(totalmoney);
                                }
                            }
                        }
                    }
                }
            }
        });
        Ext.create('Ext.window.Window', {
            title: '新增入库',
            id: 'instockInsertWindow',
            layout: 'vbox',
            width: '42.5%',
            height: '60%',
            layout: 'vbox',
            items: [
                {
                    xtype: 'form',
                    width: '100%',
                    layout: 'column',
                    border: false,
                    bodyStyle: {
                        background: '#dfe9f5'
                    },
                    id: 'instockInserForm',
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        margin: '10 0 10 0',
                        allowBlank: false
                    },
                    items: [
                        {
                            fileLabel: '操作员ID',
                            hidden: true,
                            name: 'instock.operinfoByOperId.operId',
                            value: userID
                        },
                        {
                            fieldLabel: '操作员',
                            value: userName,
                            disabled: true,
                            columnWidth: .3,
                            name: 'instock.operinfoByOperId.operName'
                        },
                        {
                            fieldLabel: '经手人',
                            name: 'instock.hander',
                            columnWidth: .3
                        },
                        {
                            xtype: 'combo',
                            store: Ext.create('Ext.data.Store', {
                                autoLoad: true,
                                proxy: {
                                    type: 'ajax',
                                    url: '/supplierpage',//访问的url路径
                                    reader: {
                                        type: 'json',
                                        root: 'supplierlist',
                                        totalProperty: "rows"
                                    }
                                },
                                fields: [
                                    { name: 'supplierId', type: 'string' },
                                    { name: 'supplierName', type: 'string' }
                                ]
                            }),
                            fieldLabel: '供货商',
                            displayField: 'supplierName',

                            valueField: 'supplierId',
                            columnWidth: .3,
                            name: 'instock.supplierinfoBySupplierId.supplierId'
                        },
                        {
                            xtype: 'combo',
                            store: inTypeStore,
                            fieldLabel: '入库方式',
                            name: 'instock.inType',
                            columnWidth: .3,
                            displayField: 'name',
                            valueField: 'abbr'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '入库时间',
                            format: 'Y-m-d H:i:s',
                            value: new Date(),
                            name: 'instock.inTime',
                            columnWidth: .3
                        },
                        {
                            fieldLabel: '总计',
                            name: 'instock.totalMoney',
                            columnWidth: .3,
                            id: 'totalmoney'
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: '备注',
                            allowBlank: true,
                            columnWidth: .9,
                            name: 'instock.remark'
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    width: '100%',
                    id: 'instockInsernGrid',
                    flex: 2,
                    plugins: [cellEditing],
                    store: Ext.create('Ext.data.Store', {
                        id: 'myStore',
                        data: [
                            {}
                        ],
                        fields: ['merchandiseId', 'merchandiseName', 'num', 'price', 'total']
                    }),
                    columns: [
                        {
                            text: '商品编号',
                            dataIndex: 'merchandiseId',
                            name: 'merchandiseId',
                            hidden: true
                        },
                        {
                            text: '商品名称',
                            flex: 1,
                            dataIndex: 'merchandiseName',
                            menuDisabled: true,
                            width: 200,
                            align: 'center',
                            name: 'merchandiseName',
                            editor: {
                                allowBlank: false,
                                xtype: 'combobox',
                                editable: false,
                                store: Ext.create('Ext.data.Store', {
                                    proxy: {
                                        type: 'ajax',
                                        url: '/merchandisepage',//访问的url路径
                                        reader: {
                                            type: 'json',
                                            root: 'merchandiseinfolist',
                                            totalProperty: "rows"
                                        }
                                    },
                                    fields: [
                                        { name: 'merchandiseId', type: 'string' },
                                        { name: 'merchandiseName', type: 'string' }
                                    ]
                                }),
                                displayField: 'merchandiseName',
                                valueField: 'merchandiseId',
                                listeners: {
                                    select: function (combo, records) {
                                        me.comboText = records[0].get('merchandiseName');
                                    }
                                }
                            }
                        },
                        {
                            text: '数量',
                            flex: 1,
                            dataIndex: 'num',
                            menuDisabled: true,
                            width: 200,
                            align: 'center',
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false
                            }
                        },
                        {
                            text: '单价',
                            flex: 1,
                            align: 'center',
                            width: 200,
                            menuDisabled: true,
                            dataIndex: 'price',
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false
                            }
                        },
                        {
                            text: '总额',
                            flex: 1,
                            menuDisabled: true,
                            width: 200,
                            align: 'center',
                            dataIndex: 'total'
                        }
                    ]
                }
            ],
            tbar: [
                {
                    text: '提交',
                    handler: function () {
                        var postData = '';
                        var mydata = Ext.data.StoreManager.lookup('myStore').data.items;
                        Ext.each(mydata, function (item, index) {
                            if (!item.data.total) {
                                return;
                            }
                            postData += 'instockDlist[' + index + '].merchandiseinfoByMerchandiseId.merchandiseId=' + item.data.merchandiseId + '&instockDlist[' + index + '].num=' + item.data.num + '&instockDlist[' + index + '].price=' + item.data.price + '&instockDlist[' + index + '].total=' + item.data.total;
                            if (index != mydata.length - 1) {
                                postData += '&'
                            }
                        })
                        Ext.getCmp('instockInserForm').submit({
                            url: 'instockInsert?' + postData,
                            success: function (form, action) {
                                var msg = Ext.JSON.decode(action.response.responseText);
                                Ext.MessageBox.show({
                                    title: '系统提示',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                                Ext.getCmp('inStockInfoPage').store.reload(
                                );
                            }
                        });
                    }
                },
                {
                    text: '添加商品'
                },
                {
                    text: '添加供应商'
                }
            ]
        }).show();
    },

    editWindow: function () {
        var record2 = Ext.getCmp('inStockInfoPage').getSelectionModel().getSelection();
        if (record2.length == 0) {
            Ext.MessageBox.show({
                title: '系统提示',
                msg: '请选择一条数据进行修改！',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.YES
            })
        } else if (record2.length > 1) {
            Ext.MessageBox.show({
                title: '系统提示',
                msg: '本产品不支持多条修改，请选择一条数据修改！',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.YES
            })
        } else {
            var editStoreDetaile = Ext.create('Ext.data.Store', {
                id: 'editStoreData',
                pageSize: 5,
                proxy: {
                    type: 'ajax',
                    url: 'indetaileInfofopage?param1=' + record2[0].get('billCode'),
                    reader: {
                        type: 'json',
                        root: 'indetaileInfoList',
                        totalProperty: "count"
                    }
                },
                fields: [
                    {name: 'id', type: 'string'},
                    {name: "num", type: 'int'},
                    {name: 'price', type: 'BigDecimal'},
                    {name: 'total', type: 'BigDecimal'},
                    {name: 'merchandiseinfoByMerchandiseId.merchandiseName', type: 'string'},
                    {name: 'merchandiseinfoByMerchandiseId.merchandiseId', type: 'string'}
                ],
                autoLoad: true
            });
            Ext.Ajax.request({
                url: 'userinfo',
                async: false,
                success: function (response) {
                    logger1 = Ext.JSON.decode(response.responseText);
                }
            });
            var userName = logger1.list[0], userID = logger1.list[1];
            var logger1 = {};
            var totalmoney = '';
            Ext.Ajax.request({
                url: 'userinfo',
                async: false,
                success: function (response) {
                    logger1 = Ext.JSON.decode(response.responseText);
                }
            });
            var editInTypeStore = Ext.create('Ext.data.Store', {
                autoLoad: true,
                fields: [
                    {name: 'abbr ', type: 'byte'},
                    {name: 'name', type: 'string'}
                ],
                data: [
                    {'abbr': '1', 'name': '正常入库'},
                    {'abbr': '2', 'name': '报溢'},
                    {'abbr': '3', 'name': '盘盈'}
                ]
            });
            var me = this, cellEditing;
            var selModel = Ext.create(Ext.selection.CheckboxModel);
            comboText = '';
            cellEditing = new Ext.grid.plugin.CellEditing({
                clicksToEdit: 1,
                listeners: {
                    edit: function (editor, context) {
                        var myStore = Ext.data.StoreManager.lookup('editStoreData');
                        if (context.value || context.value == 0) {
                            if (context.field === 'merchandiseinfoByMerchandiseId.merchandiseName') {
                                context.record.set('merchandiseinfoByMerchandiseId.merchandiseId', context.value);
                                context.record.set('merchandiseinfoByMerchandiseId.merchandiseName', me.comboText);
                            }
                            if (context.field === 'num') {
                                if (context.record.get('price') >= 0) {
                                    context.record.set('total', context.value * context.record.get('price'));
                                }
                            }
                            if (context.field === 'price') {
                                if (context.record.get('num') >= 0) {
                                    context.record.set('total', context.value * context.record.get('num'));
                                }
                            }
                            if (context.record.get('merchandiseinfoByMerchandiseId.merchandiseId') !== '' && context.record.get('num') > 0) {
                                var isEmptyRow = false;
                                context.grid.store.each(function (record) {
                                    if (record.get('merchandiseinfoByMerchandiseId.merchandiseId') === '' || record.get('num') <= 0) {
                                        isEmptyRow = true;
                                        return false;
                                    }
                                });
                                for (var i = 0; i < myStore.data.items.length; i++) {
                                }
                                totalmoney = 0;
                                for (var i = 0; i < myStore.data.items.length; i++) {
                                    if (!isNaN(myStore.data.items[i].data.total) && myStore.data.items
                                        [i].data.total != '') {
                                        totalmoney += myStore.data.items[i].data.total;
                                        Ext.getCmp('money').setValue(totalmoney);
                                    }
                                }
                            }
                        }
                    }
                }
            });
            Ext.create('Ext.window.Window', {
                title: '入库修改',
                id: 'instockEditWindow',
                layout: 'vbox',
                width: '42.5%',
                height: '60%',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'form',
                        width: '100%',
                        layout: 'column',
                        border: false,
                        bodyStyle: {
                            background: '#dfe9f5'
                        },
                        id: 'editstockEditForm',
                        defaults: {
                            xtype: 'textfield',
                            labelAlign: 'right',
                            margin: '10 0 10 0',
                            allowBlank: false
                        },
                        items: [
                            {
                                fileLabel: '入库单ID',
                                hidden: true,
                                name: 'instockEdit.billCode',
                                value: record2[0].get('billCode')
                            },
                            {
                                fileLabel: '操作员ID',
                                hidden: true,
                                name: 'instockEdit.operinfoByOperId.operId',
                                value: userID
                            },
                            {
                                fieldLabel: '操作员',
                                value: record2[0].get('operinfoByOperId.operName'),
                                disabled: true,
                                columnWidth: .3,
                                name: 'instockEdit.operinfoByOperId.operName'
                            },
                            {
                                fieldLabel: '经手人',
                                name: 'instockEdit.hander',
                                columnWidth: .3,
                                value: record2[0].get('hander')
                            },
                            {
                                xtype: 'combo',
                                store: Ext.create('Ext.data.Store', {
                                    autoLoad: true,
                                    proxy: {
                                        type: 'ajax',
                                        url: '/supplierpage',//访问的url路径
                                        reader: {
                                            type: 'json',
                                            root: 'supplierlist',
                                            totalProperty: "rows"
                                        }
                                    },
                                    fields: [
                                        { name: 'supplierId', type: 'string'},
                                        { name: 'supplierName', type: 'string'}
                                    ]
                                }),
                                fieldLabel: '供货商',
                                value: record2[0].raw.supplierinfoBySupplierId.supplierId,
                                displayField: 'supplierName',
                                valueField: 'supplierId',
                                columnWidth: .3,
                                name: 'instockEdit.supplierinfoBySupplierId.supplierId'
                            },
                            {
                                xtype: 'combo',
                                store: editInTypeStore,
                                fieldLabel: '入库方式',
                                name: 'instockEdit.inType',
                                columnWidth: .3,
                                value: record2[0].raw.inType,
                                displayField: 'name',
                                valueField: 'abbr'
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: '入库时间',
                                format: 'Y-m-d H:i:s',
                                value: record2[0].get('inTime'),
                                name: 'instockEdit.inTime',
                                columnWidth: .3
                            },
                            {
                                fieldLabel: '总计',
                                name: 'instockEdit.totalMoney',
                                columnWidth: .3,
                                id: 'money',
                                value: record2[0].get('totalMoney')
                            },
                            {
                                xtype: 'textarea',
                                fieldLabel: '备注',
                                allowBlank: true,
                                value: record2[0].get('remark'),
                                columnWidth: .9,
                                name: 'instockEdit.remark'
                            }
                        ]
                    },
                    {
                        xtype: 'grid',
                        width: '100%',
                        selModel: selModel,
                        id: 'editstockInsernGrid',
                        flex: 2,
                        plugins: [cellEditing],
                        store: editStoreDetaile,
                        columns: [
                            {
                                text: '商品编号',
                                dataIndex: 'merchandiseinfoByMerchandiseId.merchandiseId',
                                name: 'merchandiseId',
                                hidden: true
                            },
                            {
                                text: '商品名称',
                                flex: 1,
                                dataIndex: 'merchandiseinfoByMerchandiseId.merchandiseName',
                                menuDisabled: true,
                                width: 200,
                                align: 'center',
                                name: 'merchandiseName',
                                editor: {
                                    allowBlank: false,
                                    xtype: 'combobox',
                                    editable: false,
                                    store: Ext.create('Ext.data.Store', {
                                        autoLoad: true,
                                        proxy: {
                                            type: 'ajax',
                                            url: '/merchandisepage',//访问的url路径
                                            reader: {
                                                type: 'json',
                                                root: 'merchandiseinfolist',
                                                totalProperty: "rows"
                                            }
                                        },
                                        fields: [
                                            { name: 'merchandiseId', type: 'string' },
                                            { name: 'merchandiseName', type: 'string'}
                                        ]
                                    }),
                                    displayField: 'merchandiseName',
                                    valueField: 'merchandiseId',
                                    listeners: {
                                        select: function (combo, records) {
                                            me.comboText = records[0].get('merchandiseName');
                                        }
                                    }
                                }
                            },
                            {
                                text: '数量',
                                flex: 1,
                                dataIndex: 'num',
                                menuDisabled: true,
                                width: 200,
                                align: 'center',
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: false
                                }
                            },
                            {
                                text: '单价',
                                flex: 1,
                                align: 'center',
                                width: 200,
                                menuDisabled: true,
                                dataIndex: 'price',
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: false
                                }
                            },
                            {
                                text: '总额',
                                flex: 1,
                                menuDisabled: true,
                                width: 200,
                                align: 'center',
                                dataIndex: 'total'
                            }
                        ]
                    }
                ],
                tbar: [
                    {
                        text: '保存',
                        handler: function () {
                            var postData = '';
                            var mydata = Ext.data.StoreManager.lookup('editStoreData').data.items;
                            Ext.each(mydata, function (item, index) {
                                if (!item.data.total) {
                                    return;
                                }
                                postData += 'instockDlist[' + index + '].merchandiseinfoByMerchandiseId.merchandiseId=' + item.get('merchandiseinfoByMerchandiseId.merchandiseId') + '&instockDlist[' + index + '].num=' + item.data.num + '&instockDlist[' + index + '].price=' + item.data.price + '&instockDlist[' + index + '].total=' + item.data.total;
                                if (index != mydata.length - 1) {
                                    postData += '&'
                                }
                            })
                            Ext.getCmp('editstockEditForm').submit({
                                url: 'instockedit?' + postData,
                                success: function (form, action) {
                                    var msg = Ext.JSON.decode(action.response.responseText);
                                    Ext.MessageBox.show({
                                        title: '系统提示',
                                        msg: msg.message,
                                        icon: Ext.MessageBox.WARNING,
                                        buttons: Ext.MessageBox.YES
                                    });
                                    Ext.getCmp('inStockInfoPage').store.reload(
                                    );
                                }
                            });
                        }
                    },
                    {
                        text: '删除',
                        handler: function () {
                            var rows = Ext.getCmp('editstockInsernGrid').getSelectionModel().getSelection();//获取所选行数
                            for (var i = 0; i < rows.length; i++) {
                                editStoreDetaile.remove(rows[i]); //执行删除
                            }
                        }
                    },
                    {
                        text: '添加明细',
                        handler: function () {
                            var myStore = Ext.data.StoreManager.lookup('editStoreData');
                            myStore.add({});
                        }
                    }
                ]
            }).show();
        }
    },
    delWindow: function () {
        var record3 = Ext.getCmp('inStockInfoPage').getSelectionModel().getSelection();
        if (record3.length == 0) {
            Ext.MessageBox.show({
                title: '系统提示',
                msg: '删除操作，最少要选择一条数据，请选择则数据！',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.YES
            })
        } else if (record3.length == 1) {
            Ext.MessageBox.show({
                title: '系统提示',
                msg: '宁确定要删除这条数据吗？！',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.YESNO,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var me = this;
                        var record = Ext.getCmp('inStockInfoPage').getSelectionModel().getSelection();
                        var length = record.length;
                        var list = record[0].raw.billCode;
                        Ext.Ajax.request({
                            url: 'instockDel',
                            method: 'post',
                            params: {idList: list},
                            success: function () {
                                Ext.getCmp('inStockInfoPage').store.reload();
                            }
                        })
                    } else if (btn === 'no') {
                        console.log('No pressed');
                    } else {
                        console.log('Cancel pressed');
                    }
                }
            })
        } else if (record3.length > 1) {
            Ext.MessageBox.show({
                title: '系统提示',
                msg: '宁确定要删除这些数据吗？！',
                icon: Ext.MessageBox.INFO,
                buttons: Ext.MessageBox.YESNO,
                fn: function (btn) {
                    if (btn === 'yes') {

                        var record = Ext.getCmp('inStockInfoPage').getSelectionModel().getSelection();
                        var length = record.length;
                        var list = '';
                        for (var i = 0; i < length; i++) {
                            list += record[i].raw.billCode;
                            if (i != length - 1) {
                                list += ',';
                            }
                        }
                        Ext.Ajax.request({
                            url: 'instockDel',
                            method: 'post',
                            params: {idList: list},
                            success: function () {
                                Ext.getCmp('inStockInfoPage').store.reload();
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
    execute: function (id, url) {
        var form = Ext.getCmp(id).getForm();
        if (form.isValid()) {
            form.submit({
                url: url,
                success: function (form, action) {
                },
                failure: function (form, action) {
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: '由于网络原因你发送的请求无法完成，请检查网络！',
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES
                    })
                }
            })
        }
    }
});