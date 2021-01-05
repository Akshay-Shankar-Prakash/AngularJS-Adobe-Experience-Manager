<%@page session="false" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %>
<%@include file="/libs/foundation/global.jsp" %>


<cq:setContentBundle />
<% response.setHeader("Dispatcher", "no-cache"); %>

<%-- IE11 doesnt play nice when you want to fill the vertical height unless the element has a parent with display:flex --%>
<div class="horrible-ie-wrapper">
    
    <%-- The items one layer deep in the content-box--matched-height will flex to fill vertical height: --%>
    <c:if test="${not empty properties.form_width}">
        <style>
            .login-box{
                width: ${properties.form_width};
                max-width: ${properties.form_max_width};
                display: inline-block;
            }
        </style>
    </c:if>
    <div id="log-in" class="dash-content-box 
                            login-box
                            dash-content-box--matched-height">
        
        <%-- The form will fill the vertical space because of content-box--matched-height --%>
        <form data-ng-controller="LoginController as loginCtrl"
            class="dash-form--fill-space"
            novalidate
            show-hide-password
            name="loginCtrl.form"
            focus-first-invalid
            data-ng-submit="loginCtrl.submit()"
            data-ng-cloak>
            
            <%-- The items inside the form will flex to fill vertical and horizontal because of dash-form--fill-space. Items one layer deep will flex. --%>

            <cq:include path="loginFormHead" resourceType="/libs/wcm/foundation/components/responsivegrid"/>
            <!-- <h2 class="log-in-trusted__heading"><fmt:message key="LGN0005" /></h2>Sign In -->
            <div>
                <%-- The items inside this layer wont flex to fill space --%>
                <div id="queryParam-errors-section" class="validation-error__message" data-ng-if="loginCtrl.showErrorLogin" role="alert" aria-atomic="true" ng-cloak>
                    <small class="message-animation validation-error__message">
                       {{loginCtrl.errors.login}} <!-- 'Login Error Message -->
                    </small>
                </div>

                <div id="log-in__input-username--section" class="dash-form__section">
                    <label class="dash-form__field-label" for="username"> 
                        <fmt:message key="LGN0002"/>
                    </label>
                    <input id="username"
                            name="username"
                            type="text"
                            class="dash-form__field"
                            placeholder = '<fmt:message key="LGN0008"/>'
                            data-ng-class="loginCtrl.errors.username ? 'fieldError' : '' "
                            data-ng-model="loginCtrl.input.username"
                            data-ng-change="loginCtrl.onChangeInput('username')"
                            data-ng-blur="loginCtrl.onBlurInput('username')"
                            data-ng-keypress="($event.which === 13)?loginCtrl.submit():0"
                            data-ng-pattern="/^(?:[a-zA-Z0-9\._!\$@-]+)?$/"
                            ng-pattern-restrict
                            data-ng-trim="true"
                            required
                            autocomplete="off"
                            maxlength="60"
                            aria-invalid="{{loginCtrl.errors.username ? true : false}}"
                            aria-describedby="usernameValidations">     
                    <!--Error Message for username --> 
                    <div id="usernameValidations" class="error-messages" 
                       data-ng-messages="loginCtrl.form['username'].$error"
                       data-ng-if="loginCtrl.showErrorMessages('username')" role="alert" aria-atomic="true"
                       ng-cloak>       
                            <small class="message-animation validation-error__message" ng-message="required">
                               <fmt:message key="LGN0015"/> <!-- 'Please enter your Username -->
                            </small>
                    </div><!--Error Message for username END-->
                    
                    <p class='body-copy--medium'>
                        <a x-cq-linkchecker="valid" class="login-links" ng-href="<fmt:message key='LGN0019'/>"><fmt:message key="LGN0017"/></a>
                    </p> <!-- MESSAGE: Forgot Username -->
                </div>
                
                <div id="log-in__input-password--section" class="dash-form__section">
                    <label class="dash-form__field-label" for="loginPassword"> 
                        <fmt:message key="LGN0003"/>
                    </label>
                    <input id="loginPassword"
                            name="loginPassword"
                            type="password"
                            placeholder = '<fmt:message key="LGN0009"/>'
                            class="dash-form__field"
                            data-ng-model="loginCtrl.input.loginPassword"
                            data-ng-class="loginCtrl.errors.loginPassword ? 'fieldError' : '' "
                            data-ng-change="loginCtrl.onChangeInput('loginPassword')"
                            data-ng-keypress="($event.which === 13)?loginCtrl.submit():0"
                            data-ng-blur="loginCtrl.onBlurInput('loginPassword')"
                            data-ng-trim="true"
                            required
                            autocomplete="off"
                            aria-describedby="loginPasswordValidations"
                            aria-invalid="{{loginCtrl.errors.loginPassword ? true : false}}">
                            
                    <button id="loginPassword-eyeIcon" type="button"  title="<fmt:message key='AODA-TOOLTIP-PSWD001'/>"class="password_eyeIcon maskedPassword"></button>
                    
                    <!--Error Message for username --> 
                    <div id="loginPasswordValidations" class="error-messages" 
                       data-ng-messages="loginCtrl.form['loginPassword'].$error"
                       data-ng-if="loginCtrl.showErrorMessages('loginPassword')" role="alert" aria-atomic="true"
                       ng-cloak>       
                            <small class="message-animation validation-error__message" ng-message="required">
                               <fmt:message key="LGN0016"/> <!-- MESSAGE: Please enter the Password  -->
                            </small>
                            <small class="message-animation validation-error__message" ng-message="passwordHasQuotes">
                                <fmt:message key="LGN0033"/><!--KEY: LGN0033 MESSAGE: Your password cannot contain single or double quotes, please enter a new password.-->
                            </small> 
                    </div><!--Error Message for username END-->
                    
                    <p class='body-copy--medium'>
                        <a x-cq-linkchecker="valid" class="login-links" ng-href="<fmt:message key='LGN0020'/>">
                            <fmt:message key="LGN0018"/>
                        </a>
                    </p> 
                </div>


                <div class="log-in__remember--wrapper">
                        <div style="display:inline-block;">
                            <div class="checkbox checkboxFocusIndicator"
                                style="display:inline-block;"
                                data-style="rounded"
                                role="checkbox"
                                tabindex="0"
                                data-ng-keypress="loginCtrl.aodaClick($event, 'log-in__remember')"
                                aria-checked="{{loginCtrl.input.remember ? 'true' : 'false'}}" >
                                <input type="checkbox"
                                    id="log-in__remember"
                                    name="log-in__remember"
                                    data-ng-model="loginCtrl.input.remember">

                                <label for="log-in__remember" style="color: #767676;">
                                    <fmt:message key="LGN0010"/>
                                    <i id="lgn-tooltip" class="dash-tooltip" tabindex="0" aria-describedby="ttlgn" data-ng-keyup="loginCtrl.aodaBlur($event,'lgn-tooltip')">
                                        <span class="dash-tooltip__hint tooltip-center" id="ttlgn"  role="tooltip">
                                        <div class="hiddenAODA">
                                            <fmt:message key='AODA-TOOLTIP'/>
                                        </div>                        
                                            <fmt:message key="LGN0021"/>
                                        </span>
                                    </i>
                                </label>
                            </div>
                        </div>
                </div>
            <%-- End items that wont flex to fill space --%>
            </div>

                                    
            <button id="signin-form"
                    type="submit"
                    class="marTop30 dash-button login-button dash-button--affirm loginFocusIndicator"
                    ensure-click
                    button-shake="{{loginCtrl.buttonShake}}"
                    data-ng-keydown="($event.which === 13 || $event.which === 32)?loginCtrl.submit():0" 
                    data-ng-disabled="loginCtrl.buttonLoading">
                <button-loader 
                     loading="loginCtrl.buttonLoading" 
                     default-text="<fmt:message key='LGN0005'/>"
                     loading-text="<fmt:message key='BUTTON-LOADER-LOADING'/>">
                </button-loader> 
            </button>
        </form>
    </div>
</div><%-- End horrible IE wrapper --%>


































<!--************ OLD Login JSP. Might need this for when CA/Security is enabled *********************** -->

<!--
<div class="log-in" role="login">
    <form data-ng-controller="LoginController as loginCtrl"
        class="log-in__content"
        novalidate
        name="loginCtrl.form"
        data-login-redirect="${xss:encodeForHTMLAttr(xssAPI, properties['redirect'])}.html"
        ng-submit="loginCtrl.submit($event)"
        METHOD=POST 
        ACTION="/authn">
        
        <div class="log-in__input-address dash-form__section">
        <label for="text"> 
            <fmt:message key="LGN0002"/> </label>
            <input
                data-ng-class="loginCtrl.showErrorLoginE ? 'fieldError' : ''"
                required
                type="text"
                name="username"
                data-ng-model="loginCtrl.input.email"
                id="text"
                placeholder = '<fmt:message key="LGN0008"/>'
                data-ng-trim="true"
                autocomplete="off"
                maxlength="60"
                class="log-in__input"
                data-ng-change="loginCtrl.changeUsernameField()"
                data-ng-blur="loginCtrl.checkUsernameEmpty()"
                aria-describedby="usernameError">   
        
        <p class=' body-copy--medium dash-links--grey'><a x-cq-linkchecker="valid" ng-href="<fmt:message key='LGN0019'/>"><fmt:message key="LGN0017"/></a></p>
        
        <div id="usernameError" 
            class="log-in__message--error"
            data-ng-if="loginCtrl.errors.usernameField"
            >
        <small class="error-message" data-ng-if="loginCtrl.errors.loginInfo"
               role="alert" 
                aria-atomic="true">
            <fmt:message key="LGN0004"/> 
            <i class="icon-error_outline" aria-hidden="true"></i>
        </small>
        <small class="error-message" data-ng-if="loginCtrl.errors.blankUsername"
                role="alert" 
                aria-atomic="true">
            <fmt:message key="LGN0015"/>
            <i class="icon-error_outline" aria-hidden="true"></i>
        </small> 
        </div>
        </div>
        
        <label for="password"> 
            <fmt:message key="LGN0003"/> </label>
            <input
                data-ng-class="loginCtrl.showErrorLoginP ? 'fieldError' : ''"
                required
                type="password"
                name="password"
                data-ng-model="loginCtrl.input.password"
                id="password"
                placeholder = '<fmt:message key="LGN0009"/>'
                data-ng-trim="true"
                autocomplete="off"
                class="log-in__input"
                data-ng-change="loginCtrl.changePasswordField()"
                data-ng-blur="loginCtrl.checkPasswordEmpty()"
                aria-describedby="passwordError">   
        
        <p class=' body-copy--medium dash-links--grey'><a x-cq-linkchecker="valid" ng-href="<fmt:message key='LGN0020'/>"><fmt:message key="LGN0018"/></a></p>
        
        <div id="passwordError" 
            class="log-in__message--error"
            data-ng-if="loginCtrl.errors.blankPassword"
            >
        <small class="error-message" data-ng-if="loginCtrl.errors.blankPassword"
               role="alert" 
                aria-atomic="true">
            <fmt:message key="LGN0016"/> 
            <i class="icon-error_outline" aria-hidden="true"></i>
        </small>
        </div>
        
        <div class="checkbox log-in__checkbox" 
            data-style="rounded"
            role="checkbox"
            tabindex="0"
            data-ng-keypress="loginCtrl.aodaClick($event, 'log-in__remember' )"
            aria-checked="{{loginCtrl.input.remember ? 'true' : 'false'}}">
            <input type="checkbox"
                id="log-in__remember"
                name="remember"
                data-ng-model="loginCtrl.input.remember">
            <label for="log-in__remember" 
                    class="log-in">
                <fmt:message key="LGN0010"/>
            </label>
        </div>
        <div class="row">
            <div class="columns">
                <button id="signin-oldjsp-form"
                    type="submit"
                    class="log-in__btn-submit button success"
                    button-shake="{{loginCtrl.buttonShake}}">
                    <button-loader 
                         loading="loginCtrl.buttonLoading" 
                         default-text=""
                         loading-text="">
                    </button-loader>
                    <fmt:message key="LGN0005"/>
                </button>
            </div>
        </div>
        <INPUT TYPE="HIDDEN" NAME="login-form-type" VALUE="pwd">
    </form>
</div>
-->