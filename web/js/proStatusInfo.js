/**
 * Created by Administrator on 2014/11/20.
 */
Ext.define('js.proStatusInfo',{
    extend:'Ext.grid.Panel',
    initComponent:function(){
        var me = this;
        var store = Ext.create('Ext.data.Store',{
            id:'proStatusPanel', //TODO 分页的ID
            pageSize:5,
            autoLoad:false,
            proxy: {
                type:'ajax',
                url:'proStatuspage', //TODO 要访问的action名称
                reader:{
                    type:'json',
                    root:'prostatuslist',
                    totalProperty:'rows'//TODO action中返回来的总数量
                }
            },
            fields:[
                {name:'proStatusId',type:'string'}, //TODO 名称和属性
                {name:'proStatusName',type:'string'},
                {name:'status',type:'boolean'},
                {name:'remark',type:'string'}
            ],
            listeners: {
                beforeload:function(store,operation){
                    var name = Ext.getCmp('proStatusparam1Class');
                    var name1 = Ext.getCmp('proStatusparam1Value');
                    if(name){
                        if(name.getValue()){
                            if(operation.params){
                                operation.params.param1=name.getValue()
                            }else{
                                operation.params={param1:name.getValue()};
                            }
                        };
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
                        };
                    }
                }
            }
        });
        store.load({
            params:{
                start:0,
                limit:5
            }
        });
        var store2 = Ext.create('Ext.data.Store',{
            fields:['text','name'],
            data:[
                {'text':'状态名','name':'proStatusName'},
                {'text':'备注','name':'remark'}
            ]
        });
        var selModel = Ext.create(Ext.selection.CheckboxModel);
        Ext.apply(this,{
            id:'proStatusInfo',
            stripeRows:true,
            border:false,
            selModel:selModel,
            closable: true,
            title:'商品状态管理',//TODO 表格的名称
            store:Ext.data.StoreManager.lookup('proStatusPanel'), //TODO store的ID
            columns:[
                {text:'状态ID',dataIndex:'proStatusId',align:'center',menuDisabled:true,hidden:true}, //TODO  falex:1这一列一直到最后
                {text:'状态名',dataIndex:'proStatusName',align:'center',menuDisabled:true,width:200},
                {text:'状态',dataIndex:'status',align:'center',menuDisabled:true,hidden:true},
                {text:'备注',dataIndex:'remark',align:'center',menuDisabled:true,flex:1}
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
                    id:'proStatusparam1Class',
                    name:'proStatusparam1',
                    width:112,
                    emptyText:'请选择查询方式',
                    emptyValue:'0',
                    store:store2,
                    displayField:'text',
                    valueField:'name'
                },{
                    xtype:'textfield',
                    id:'proStatusparam1Value',
                    name:'proStatusparam2'
                },{ xtype:'button',text:'搜索',border:false,style:{background:'#cbdbef'}, handler:function(){
                    Ext.getCmp('proStatusInfo').store.load({
                        params:{
                            param1:Ext.getCmp('proStatusparam1Class').getValue(),
                            param2:Ext.getCmp('proStatusparam1Value').getValue()
                        }
                    });
                }
                }]
            },{
                xtype:'pagingtoolbar',
                store:store,
                dock:'bottom',
                displayInfo:true
            }],
            tbar:[
                {xtype:'button',text:'添加',handler:function(){
                    if(!Ext.getCmp('prostatusInsert')){me.insert()}
                }},
                {xtype:'button',text:'删除',handler:function(){
                    me.del();
                }},
                {xtype:'button',text:'修改',handler:function(){
                    if(!Ext.getCmp('proStatusedit')){me.edit()}
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
                id:'prostatusInsert',//TODO 数据窗口的ID
                frame:true,
                bodyPadding:'5 5 0',
                width:390,
                fieldDefaults:{
                    msgTarget:'side',
                    labelWidth:75
                },
                defaultType:'textfield',
                items:[{
                    fieldLabel:'状态名',
                    allowBlank:false,
                    name:'pros.proStatusName'//TODO 数据库中字段的名字
                },{
                    xtype:'textarea',
                    fieldLabel:'备注',
                    name:'pros.remark'//TODO 数据库中字段的名字
                }]
            }],
            buttons:[
                {text:'确定',handler:function(){me.execute('prostatusInsert','proStatusInsert')}},// TODO 调用执行方法
                {text:'清空',handler:function(){Ext.getCmp('prostatusInsert').getForm().reset()}}
            ]
        });
        window.show();
        window.center();
    },
    del:function(){
        var me = this;
        var record = Ext.getCmp('proStatusInfo').getSelectionModel().getSelection();
        var length = record.length;
        var list='';
        if(length>1){
            for(var i =0;i<length;i++){
                list += record[i].raw.proStatusId;
                if(i!=length-1){
                    list+=',';
                }
            }
        }else{
            list +=  record[0].raw.proStatusId;
        }
        Ext.Ajax.request({
            url:'proStatusdel',
            method:'post',
            params:{idList:list},
            success:function(){
                Ext.getCmp('proStatusInfo').store.reload();
            }
        })
    },
    edit:function(){
        var me = this;
        var recordedit = Ext.getCmp('proStatusInfo').getSelectionModel().getSelection();
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
                id:'proStatusedit',
                items:[{
                    xtype:'form',
                    layout:'form',
                    border:false,
                    id:'proStatuseditForm',
                    frame:true,
                    bodyPadding:'5 5 0',
                    width:390,
                    fieldDefaults:{
                        msgTarget:'side',
                        labelWidth:75
                    },
                    defaultType:'textfield',
                    items:[{
                        fieldLabel:'状态名',
                        name:'pros.proStatusName',//TODO 数据库中字段的名字
                        value:recordedit[0].raw.proStatusName
                    },{
                        xtype:'textarea',
                        fieldLabel:'备注',
                        name:'pros.remark',
                        value:recordedit[0].raw.remark//TODO 数据库中字段的名字
                    },{
                        fieldLabel:'id',
                        name:'pros.proStatusId',//sortId
                        value:recordedit[0].raw.proStatusId,
                        hidden:true
                    },{
                        fieldLabel:'排序',
                        name:'pros.status',//
                        value:recordedit[0].raw.status,
                        hidden:true
                    }]
                }],
                buttons:[
                    {text:'保存',handler:function(){me.execute('proStatuseditForm','proStatusEdit')}},//TODO 修改的执行方法
                    {text:'关闭',handler:function(){Ext.getCmp('proStatusedit').close()}}
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
                    Ext.getCmp('proStatusInfo').store.reload();
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