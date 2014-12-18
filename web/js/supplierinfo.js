/**
 * Created by Administrator on 2014/11/17.
 */
Ext.define('js.supplierinfo',{
    extend:'Ext.grid.Panel',
    store2 : Ext.create('Ext.data.Store',{
        fields:['text','name'],
        data:[
            {'text':'按供应商名称','name':'supplierName'},
            {'text':'按助记码','name':'supplierAb'},
            {'text':'按联系人','name':'linkName'},
            {'text':'按联系人电话','name':'linkTel'},
            {'text':'不选择'}
        ]
    }),
    initComponent:function(){
        var me = this;
        var store1 = Ext.create('Ext.data.Store',{
            id:'supplierPanel',
            pageSize:5,
            proxy: {
                type:'ajax',
                url:'/supplierpage', //TODO 要访问的action名称
                reader:{
                    type:'json',
                    root:'supplierlist',    //根节点
                    totalProperty : "rows"//TODO action中返回来的总数量
                }
            },
            fields:[
                {name:'supplierId',type:'string'}, //TODO 名称和属性
                {name:'supplierName',type:'string'},
                {name:'supplierAb',type:'string'},
                {name:'address',type:'string'},
                {name:'linkName',type:'string'},
                {name:'linkTel',type:'string'},
                {name:'qq',type:'string'},
                {name:'email',type:'string'},
                {name:'sortId',type:'string'},
                {name:'status',type:'boolean'}
            ],
            listeners: {
                beforeload:function(store,operation){
                    var name = Ext.getCmp('deliveryparam1Class');
                    var name1 = Ext.getCmp('deliveryparam1Value');
                    var name2 = Ext.getCmp('deliveryparam2Class');
                    var name3 = Ext.getCmp('deliveryparam2Value')

                    if(name){
                        if(name.getValue()){
                            if(operation.params){
                                operation.params.param1=name.getValue()
                            }else{
                                operation.params={param1:name.getValue()};
                            }
                        }
                        if(name1){
                            if(name1.getValue()){
                                if(operation.params){
                                    operation.params.param2=name1.getValue()    //encodeURIComponent()
                                }else{
                                    operation.params={
                                        param2:name1.getValue(name1.getValue())
                                    };
                                }
                            }
                        }
                        if(name1){
                            if(name1.getValue()){
                                if(operation.params){
                                    operation.params.param3=name2.getValue()    //encodeURIComponent()
                                }else{
                                    operation.params={
                                        param3:name1.getValue(name2.getValue())
                                    };
                                }
                            }
                        }
                        if(name1){
                            if(name1.getValue()){
                                if(operation.params){
                                    operation.params.param4=name3.getValue()    //encodeURIComponent()
                                }else{
                                    operation.params={
                                        param4:name1.getValue(name3.getValue())
                                    };
                                }
                            }
                        }
                    }
                }
            },
            autoLoad : false
        });
        store1.load({
            params:{
                start:0,
                limit:5
            }
        });
        var selModel = Ext.create(Ext.selection.CheckboxModel);
        Ext.apply(this,{
            id:'supplierPage',
            //stripeRows:true,
            border:false,
            selModel:selModel,
            closable: true,
           // singleSelect:false,
            title:'供应商管理',//TODO 表格的名称
            store:store1, //TODO store的ID
            columns:[
                {text:'供应商名称',dataIndex:'supplierName',align:'center',menuDisabled:true,flex:1}, //TODO  flex:1这一列一直到最后
                {text:'助记码',dataIndex:'supplierAb',align:'center',menuDisabled:true,flex:1},
                {text:'地址',dataIndex:'address',align:'center',menuDisabled:true,flex:1},
                {text:'联系人',dataIndex:'linkName',align:'center',menuDisabled:true,flex:1},
                {text:'联系电话',dataIndex:'linkTel',align:'center',menuDisabled:true,flex:1},
                {text:'QQ',dataIndex:'qq',align:'center',menuDisabled:true,flex:1},
                {text:'邮箱',dataIndex:'email',align:'center',menuDisabled:true,flex:1},
                {text:'状态',dataIndex:'status',align:'center',menuDisabled:true,hidden:true,flex:1},
                {text:'id',dataIndex:'supplierId',align:'center',menuDisabled:true,hidden:true,flex:1},
                {text:'sort',dataIndex:'sortId',align:'center',menuDisabled:true,hidden:true,flex:1}
            ],
            dockedItems:[{
                xtype:'form',
                layout:'column',
                border:false,
                bodyStyle:{
                    background:'#cbdbef'
                },
                items:[{
                    xtype:'combo',
                    id:'suppliverparam1Class',
                    name:'suppliverparam1',
                    width:112,
                    emptyText:'请选择查询方式',
                    emptyValue:'0',
                    store:me.store2,
                    displayField:'text',
                    valueField:'name'
                },{
                    xtype:'textfield',
                    id:'suppliverparam1Value',
                    name:'suppliverparam2'
                },{
                    xtype:'combo',
                    id:'suppliverparam2Class',
                    name:'param3',
                    width:112,
                    emptyText:'请选择查询方式',
                    emptyValue:'0',
                    store:me.store2,
                    displayField:'text',
                    valueField:'name'
                },{
                    xtype:'textfield',
                    id:'suppliverparam2Value',
                    name:'param4'
                },{ xtype:'button',text:'搜索',border:false,style:{background:'#cbdbef'}, handler:function(){
                    Ext.getCmp('supplierPage').store.load({
                        params:{
                            param1:Ext.getCmp('suppliverparam1Class').getValue(),
                            param2:Ext.getCmp('suppliverparam1Value').getValue(),
                            param3:Ext.getCmp('suppliverparam2Class').getValue(),
                            param4:Ext.getCmp('suppliverparam2Value').getValue()
                        }
                    });
                }
                }]
            },{
                dock:'bottom',
                xtype:'pagingtoolbar',
                store:store1,
                displayInfo:true
            }],
            tbar:[
                {xtype:'button',text:'添加',handler:function(){
                    if(!Ext.getCmp('supplierInsert')){
                        me.insert();
                    }
                }},
                {xtype:'button',text:'删除',handler:function(){
                    me.del();
                }},
                {xtype:'button',text:'修改',handler:function(){
                    if(!Ext.getCmp('supplieredit')){me.edit()}
                }}
            ]
        });
        this.callParent();
    },
    insert:function(){
        var me = this;
        var window = Ext.create('Ext.window.Window',{
            title:'数据添加窗口',
            items:[{
                xtype:'form',
                layout:'form',
                border:false,
                id:'supplierInsert',//TODO 数据窗口的ID
                frame:true,
                bodyPadding:'5 5 0',
                width:390,
                fieldDefaults:{
                    msgTarget:'side',
                    labelWidth:75
                },
                defaultType:'textfield',
                items:[{
                    fieldLabel:'供应商名称',
                    name:'supp.supplierName',//TODO 数据库中字段的名字
                    allowBlank:false

                },{
                    fieldLabel:'助记码',
                    name:'supp.supplierAb'//TODO 数据库中字段的名字
                },{
                    fieldLabel:'地址',
                    name:'supp.address',//TODO 数据库中字段的名字
                    allowBlank:false
                },{
                    fieldLabel:'联系人',
                    name:'supp.linkName',//TODO 数据库中字段的名字
                    allowBlank:false
                },{
                    fieldLabel:'联系电话',
                    allowBlank:false,
                    name:'supp.linkTel'//TODO 数据库中字段的名字
                },{
                    fieldLabel:'QQ',
                    name:'supp.qq'//TODO 数据库中字段的名字
                },{
                        fieldLabel:'邮箱',
                        name:'supp.email'//TODO 数据库中字段的名字
                },{
                    fieldLabel:'id',
                    name:'supp.supplierId'//TODO 数据库中字段的名字s
                }]
            }],
            buttons:[
                {text:'确定',handler:function(){me.execute('supplierInsert','supplierinsert')}},// TODO 调用执行方法
                {text:'清空',handler:function(){Ext.getCmp('supplierInsert').getForm().reset()}}
            ]
        });
        window.show();
        window.center();
    },
    del:function(){
        var me = this;
        var record = Ext.getCmp('supplierPage').getSelectionModel().getSelection();
        var length = record.length;
        var list='';
        if(length>1){
            for(var i =0;i<length;i++){
                list += record[i].raw.supplierId;
                if(i!=length-1){
                    list+=',';
                }
            }
        }else{
            list +=  record[0].raw.supplierId;
        }
        Ext.Ajax.request({
            url:'supplierdel',
            method:'post',
            params:{idList:list},
            success:function(){
                Ext.getCmp('supplierPage').store.reload();
            }
        })
    },
    edit:function(){
        var me = this;
        var recordedit = Ext.getCmp('supplierPage').getSelectionModel().getSelection();
        if(recordedit.length>1){
            Ext.MessageBox.show({
                title:'异常提示',
                msg:'修改数据每次只能修改一条，请重新选择',
                icon:Ext.MessageBox.QUESTION,
                buttons:Ext.MessageBox.YES
            })
        }else if(recordedit.length==1){
            var window = Ext.create('Ext.window.Window',{
                title:'修改信息',
                id:'supplieredit',
                items:[{
                    xtype:'form',
                    layout:'form',
                    border:false,
                    id:'suppliereditForm',
                    frame:true,
                    bodyPadding:'5 5 0',
                    width:390,
                    fieldDefaults:{
                        msgTarget:'side',
                        labelWidth:75
                    },
                    defaultType:'textfield',
                    items:[{
                        fieldLabel:'供应商名称',
                        name:'supp.supplierName',//TODO 数据库中字段的名字
                        value:recordedit[0].raw.supplierName
                    },{
                        fieldLabel:'助记码',
                        name:'supp.supplierAb',
                        value:recordedit[0].raw.supplierAb//TODO 数据库中字段的名字

                    },{
                        fieldLabel:'地址',
                        name:'supp.address',//sortId
                        value:recordedit[0].raw.address,
                        hidden:true
                    },{
                        fieldLabel:'联系人',
                        name:'supp.linkName',//
                        value:recordedit[0].raw.linkName
                    },{
                        fieldLabel:'联系电话',
                        name:'supp.linkTel',//
                        value:recordedit[0].raw.linkTel
                    },{
                        fieldLabel:'QQ',
                        name:'supp.qq',//
                        value:recordedit[0].raw.qq
                    },{
                        fieldLabel:'邮箱',
                        name:'supp.email',//
                        value:recordedit[0].raw.email
                    },{
                        fieldLabel:'ID',
                        name:'supp.supplierId',//
                        value:recordedit[0].raw.supplierId,
                        hidden:true
                    },{
                        fieldLabel:'状态',
                        name:'supp.status',//TODO 数据库中字段的名字s
                        value:recordedit[0].raw.status,
                        hidden:true
                    },{
                        fieldLabel:'排序',
                        name:'supp.sortId',//TODO 数据库中字段的名字s
                        value:recordedit[0].raw.sortId,
                        hidden:true
                    }]
                }],
                buttons:[
                    {text:'保存',handler:function(){me.execute('suppliereditForm','proStatusEdit')}},//TODO 修改的执行方法
                    {text:'关闭',handler:function(){Ext.getCmp('supplieredit').close()}}
                ]
            });
            window.center();
            window.show();
        }else{
            Ext.MessageBox.show({
                title:'异常提示',
                msg:'请选择一条数据,进行修改',
                icon:Ext.MessageBox.QUESTION,
                buttons:Ext.MessageBox.YES
            })
        }
    },
    execute:function(id,url){
        var form = Ext.getCmp(id).getForm();
        if(form.isValid()){
            form.submit({
                url:url,
                success:function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.getCmp('supplierPage').store.reload();
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
                        icon:Ext.MessageBox.QUESTION,
                        buttons:Ext.MessageBox.YES
                    })
                }
            })
        }
    }
})