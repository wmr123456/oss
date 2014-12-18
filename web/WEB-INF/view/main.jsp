<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014-11-12
  Time: 16:58
  To change this template use File | Settings | File Templates.
--%>
<%@ include file="checklogin.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>电商后台管理系统</title>
    <% String path = request.getContextPath();%>
    <link href="<%=path%>/extjs/resources/ext-theme-classic/ext-theme-classic-all-rtl-debug.css" type="text/css"
          rel="stylesheet">
    <script src="<%=path%>/extjs/ext-all-debug.js" type="text/javascript"></script>
    <script src="<%=path%>/extjs/locale/ext-lang-zh_CN.js" type="text/javascript"></script>
    <script src="<%=path%>/js/main.js" type="text/javascript"></script>
    <script type="text/javascript">
        Ext.onReady(function () {
            Ext.create('ShinowMain', {
                renderTo: Ext.getBody()
            })
        })
    </script>
</head>
<body>

</body>
</html>
