/**
 * Created by Administrator on 2014-11-12.
 */
Ext.define('js.page',{
    extend:'Ext.grid.Panel',
    initComponent:function(){
        var me = this;
        var store = Ext.create('Ext.data.Store',{
            id:'Panel', //TODO 分页的ID
            pageSize:20,
            autoLoad:false,
            proxy: {
                type:'ajax',
                url:'', //TODO 要访问的action名称
                reader:{
                    type:'json',
                    root:'pagelist',
                    totalProperty:'rows'//TODO action中返回来的总数量
                }
            },
            fields:[
                {name:'',type:''} //TODO 名称和属性
            ]
        });
        store.load({
            params:{
                start:0,
                limit:20
            }
        });
        Ext.apply(this,{
            id:'page',
            stripeRows:true,
            border:false,
            closable: true,
            title:'查看日志',//TODO 表格的名称
            store:Ext.data.StoreManager.lookup(''), //TODO store的ID
            columns:[
                {text:'',dataIndex:'',align:'center',menuDisabled:true} //TODO  falex:1这一列一直到最后
            ],
            dockedItems:[{
                xtype:'pagingtoolbar',
                store:store,
                dock:'bottom',
                displayInfo:true
            }],
            tbar:[
                {xtype:'button',text:'添加',handler:function(){
                    if(!Ext.getCmp('')){}
                }},
                {xtype:'button',text:'删除',handler:function(){
                    if(!Ext.getCmp('')){}
                }},
                {xtype:'button',text:'修改',handler:function(){
                    if(!Ext.getCmp('')){}
                }}
            ],
            dockedItems:[{
                xtype:'form',
                dock:'top',
                id:'',  //TODO  查询输入框form的ID
                layout:'column',
                bodyStyle:{
                    background:''//TODO 颜色
                },
                items:[
                    {xtype:'button',text:'查询',style:{background:''},handler:function(){}}, //TODO 查询的function
                    {}//TODO 下拉列表框
                ]
            }]
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
                id:'',//TODO 数据窗口的ID
                frame:true,
                bodyPadding:'5 5 0',
                width:390,
                fieldDefaults:{
                    msgTarget:'side',
                    labelWidth:75
                },
                defaultType:'textfield',
                items:[{
                    fieldLabel:'id',
                    name:''//TODO 数据库中字段的名字
                },{
                    fieldLabel:'id',
                    name:''//TODO 数据库中字段的名字
                }]
            }],
            buttons:[
                {text:'确定',handler:function(){}},// TODO 调用执行方法
                {text:'清空',handler:function(){Ext.getCmp('').getForm().reset()}}
            ]
        });
        window.show();
        window.center();
    },
    del:function(){
        var me = this;
        var record = Ext.getCmp('').getSelectionModel.getSelection()[0];
        var window = Ext.create('Ext.window.Window',{
            title:'你确定要删除这个用户吗？',
            id:'del',
            items:[
                {
                    xtype:'form',
                    layout:'form',
                    border:false,
                    id:'delFrom',
                    frame:true,
                    bodyPadding:'5 5 0',
                    width:390,
                    fieldDefaults:{
                        msgTarget:'side',
                        labelWidth:75
                    },
                    defaultType:'textfield',
                    items:[
                        {
                            fieldLabel: '',
                            name: '',
                            allowBlank: false,
                            value: record.get('')//TODO id
                        },{
                            fieldLabel:''
                    }]
                }],
            buttons:[
                {text:'确定',handler:function(){}},
                {text:'取消',handler:function(){Ext.getCmp().close()}}
            ]
        });
        window.show();
        window.center()
    },
    edit:function(){
        var me = this;
        var record = Ext.getCmp('').getSelectionModel().getSelection()[0];
        var window = Ext.create('Ext.window.Window',{
            title:'修改信息',
            id:'edit',
            items:[{
                xtype:'form',
                layout:'form',
                border:false,
                id:'editForm',
                frame:true,
                bodyPadding:'5 5 0',
                width:390,
                fieldDefaults:{
                    msgTarget:'side',
                    labelWidth:75
                },
                defaultType:'textfield',
                items:[
                    {}//TODO 要修改的列，数据库中飞空的列
                ]
            }],
            buttons:[
                {text:'修改',handler:function(){}},//TODO 修改的执行方法
                {text:'关闭',handler:function(){Ext.getCmp('edit').close()}}
            ]
        })
    },
    execute:function(id,url){
        var form = Ext.getCmp(id).getForm();
        if(form.isValid()){
            form.submit({
                url:url,
                success:function(form,action){},
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