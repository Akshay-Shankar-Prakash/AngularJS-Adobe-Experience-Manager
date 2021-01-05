<%@page session="false" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@include file="/libs/foundation/global.jsp" %>
<%@taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %>

<cq:setContentBundle />

<% response.setHeader("Dispatcher", "no-cache"); %>

<section id="enrollBoxContainer" class="enrollment" data-ng-controller="EnrolmentBoxController as enrolBoxCtrl" >
  <div data-ng-if="enrolBoxCtrl.view == 'landing'">
    <cq:include path="landing" resourceType="wcm/foundation/components/responsivegrid"/>
  </div>
  <div data-ng-if="enrolBoxCtrl.view == 'card'">
    <cq:include path="card" resourceType="wcm/foundation/components/responsivegrid"/>
  </div>
  <div data-ng-if="enrolBoxCtrl.view == 'bankingProducts'">
    <cq:include path="bankingProducts" resourceType="wcm/foundation/components/responsivegrid"/>
  </div>
</section>
