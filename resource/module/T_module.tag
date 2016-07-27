<%-- Common module settings --%>
<%@ tag body-content="empty" trimDirectiveWhitespaces="true" %>
<%@ attribute name="tag" description="The tag name used for the module context (default=div)" type="java.lang.String" rtexprvalue="false" %>
<%@ attribute name="htmlClasses" description="The HTML class values to add to the Terrific module element" type="java.lang.String" rtexprvalue="true" %>
<%@ attribute name="decorator" description="The skin used for the module" type="java.lang.String" rtexprvalue="false" %>
<%@ attribute name="dataConnectors" description="The data-connectors used for the module" type="java.lang.String" rtexprvalue="false" %>
<%@ attribute name="attributes" description="Additional attributes as comma-separated list, e.g. id='123',role='banner'" type="java.lang.String" rtexprvalue="false" %>
<%@ attribute name="template" description="The template used for rendering of the module" type="java.lang.String" rtexprvalue="false" %>

<%-- Required tag libraries --%>
<%@ taglib prefix="terrific" uri="http://www.namics.com/commons/taglibs/terrific" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%-- Specific module settings --%>
<%@ tag description="Module: T_Module - Templates: default" %>

<%-- Module template selection --%>
<terrific:mod name="T_module" classPrefix="T_customType" tag="${tag}" htmlClasses="${htmlClasses}" decorator="${decorator}" dataConnectors="${dataConnectors}" attributes="${attributes}">
	<c:choose>
		<c:when test="false">
		</c:when>
		<%-- outlet.template --%>
		<c:otherwise>
			<%@ include file="/WEB-INF/terrific/components/T_type/T_module/T_module.jsp" %>
		</c:otherwise>
	</c:choose>
</terrific:mod>
