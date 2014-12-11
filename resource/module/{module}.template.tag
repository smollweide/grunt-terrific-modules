<%-- outlet.template --%>
		<c:when test="${template == '{template}'}">
			<%@ include file="/WEB-INF/terrific/modules/{module}/{module}-{template}.jsp" %>
		</c:when>