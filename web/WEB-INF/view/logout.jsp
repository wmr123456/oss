<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%
    response.setCharacterEncoding("utf-8");
    request.setCharacterEncoding("utf-8");
    session.invalidate();
    response.sendRedirect(request.getContextPath() + "/login.html");
%>
