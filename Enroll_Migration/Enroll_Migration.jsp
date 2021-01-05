<%@page session="false" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@include file="/libs/foundation/global.jsp" %>
<%@taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
    
<cq:setContentBundle/>

<div class="enrollMigration">
    <h1 id="moaeH1" class="headingLevel1" tabindex="-1"><fmt:message key='ENROLMENT-CC0000'/></h1><!-- My Online Account Enrolment -->
    <h1 id="moaeH1" class="headingLevel2" tabindex="-1"><fmt:message key='BANK-DECISION-SCREEN-001'/></h1><!-- Choose One -->
</div>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div class= "enroll-box">            
                <div class="enroll-box--content">
                    <div class="enroll-marketing">
                            <div class="cardTitle">
                                <h3><fmt:message key='BANK-DECISION-SCREEN-002'/></h3>
                            </div>
                        <div class="cardImage">
                            <img src="https://canadiantire.scene7.com/is/image/CanadianTire/RBmig_Triangle2x?scl=1&amp;fmt=png-alpha" 
                            srcset="https://canadiantire.scene7.com/is/image/CanadianTire/RBmig_Triangle2x?scl=1&amp;fmt=png-alpha 2x">
                        </div>
                        <div class="glb-image-button">
                            <button id="label-1" tabindex="0" type="button" data-ng-click="goToCard()"
                            class="enrol_now_button login-button dash-button dash-button--affirm glbImageButtonFocusIndicator ng-scope">
                                <span class="image-button-display-type">
                                    <fmt:message key='BANK-DECISION-SCREEN-005'/>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div class= "enroll-box">
                <div class="enroll-box--content">
                    <div class="enroll-marketing">
                        <div class="cardTitle">
                            <h3><fmt:message key='BANK-DECISION-SCREEN-003'/></h3>
                        </div>
                        <div class="cardImage">
                            <img src="https://canadiantire.scene7.com/is/image/CanadianTire/RBmig_CashAdvantage2x?scl=1&amp;fmt=png-alpha" 
                            srcset="https://canadiantire.scene7.com/is/image/CanadianTire/RBmig_CashAdvantage2x?scl=1&amp;fmt=png-alpha 2x">
                        </div>
                        <div class="glb-image-button">
                            <button id="label-1" tabindex="0" type="button" data-ng-click="goToCard()"
                            class="enrol_now_button login-button dash-button dash-button--affirm glbImageButtonFocusIndicator ng-scope">
                                <span class="image-button-display-type">
                                    <fmt:message key='BANK-DECISION-SCREEN-005'/>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div class= "enroll-box">
                <div class="enroll-box--content">
                    <div class="enroll-marketing">
                        <div class="cardTitle">
                            <h3><fmt:message key='BANK-DECISION-SCREEN-004'/></h3>
                        </div>
                        <div class="cardImage">
                            <img src="https://canadiantire.scene7.com/is/image/CanadianTire/RBmig_GasAdvantage2x?scl=1&amp;fmt=png-alpha"
                            srcset="https://canadiantire.scene7.com/is/image/CanadianTire/RBmig_GasAdvantage2x?scl=1&amp;fmt=png-alpha 2x">
                        </div>
                        <div class="glb-image-button">
                            <button id="label-1" tabindex="0" type="button" data-ng-click="goToCard()"
                            class="enrol_now_button login-button dash-button dash-button--affirm glbImageButtonFocusIndicator ng-scope">
                                <span class="image-button-display-type">
                                    <fmt:message key='BANK-DECISION-SCREEN-005'/>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <br>
    <br>
    <br>
    <div class="enrol-products">
        <div class="enroll-products--content">
            <div class="enroll-marketing">
                <div class="bankingTitle">
                    <fmt:message key='BANK-DECISION-SCREEN-006'/>
                </div>
                <div class="glb-image-button" style="padding-top: 1.25rem; padding-bottom: 1.25rem;">
                    <button id="label-1" tabindex="0" type="button" data-ng-click="goToBankingProducts()"
                    class="enrol_now_button login-button dash-button dash-button--affirm glbImageButtonFocusIndicator ng-scope">
                        <span class="image-button-display-type">
                            <fmt:message key='BANK-DECISION-SCREEN-005'/>
                        </span>
                    </button>
                </div>
            </div>
        </div> 
    </div>
   
  

    