<%@include file="/libs/foundation/global.jsp" %>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %><%
%><%@ taglib prefix="widgets" uri="http://www.adobe.com/consulting/acs-aem-commons/widgets" %><%
%><%@ taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %><%
%><%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>
<cq:setContentBundle />

<h2 data-ng-if="activateCtrl.step === 1"><fmt:message key="ACTIVATE-CARD-HEADER-002"/></h2>
<h2 data-ng-if="activateCtrl.step === 2"><fmt:message key="ACTIVATE-CARD-HEADER-003"/></h2>
<h2 data-ng-if="activateCtrl.step === 2.1"><fmt:message key="ACTIVATE-CARD-HEADER-004"/></h2>
<h2 data-ng-if="activateCtrl.step === 3"><fmt:message key="ACTIVATE-CARD-HEADER-005"/></h2>

<progress-bar percent={{(activateCtrl.step/3)*100}}></progress-bar>

<%--
<div class="progress progress-border">
    <div class="progress-bar progress-bar-dash"
            aria-valuenow="{{(activateCtrl.step/3)*100}}"
            aria-valuemin="0"
            aria-valuemax="100"
            data-ng-style="{'width': (activateCtrl.step/3)*100 + '%'}">
    </div>
    <div class="progress-bar progress-bar-remaining"
            aria-valuenow="{{100 - (activateCtrl.step/3)*100}}"
            aria-valuemin="0"
            aria-valuemax="100"
            data-ng-style="{'width': 100 - (activateCtrl.step/3)*100 + '%'}">
    </div>
</div>
--%>
