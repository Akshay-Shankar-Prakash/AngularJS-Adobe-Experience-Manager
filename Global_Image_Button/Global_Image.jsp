<%@include file="/libs/foundation/global.jsp" %>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %><%
%><%@ taglib prefix="widgets" uri="http://www.adobe.com/consulting/acs-aem-commons/widgets" %><%
%><%@ taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %><%
%><%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>
<cq:setContentBundle />

<c:choose>
  <c:when test="${wcmmode:isDesign(pageContext) || wcmmode:isEdit(pageContext)}">
     <div class="authorModeDiv ${properties.image_horizontal_position}"
          style=" display:${properties.image_style_displayType};
                background-color:${properties.image_style_backgroundColour};
                  color:${properties.gl_style_text_color};
                  opacity:${properties.image_style_opacity};
                  border-style: ${properties.image_style_borderType};
                  border-color: ${properties.image_style_borderColour};
                  border-radius: ${properties.image_style_borderRadius};
                  border-top: ${properties.image_style_borderTop};
                  height: ${properties.image_style_height};
                  width: ${properties.image_style_width};
                  padding-top:${properties.image_style_paddingTop};
                  padding-right:${properties.image_style_paddingRight};
                  padding-bottom:${properties.image_style_paddingBottom};
                  padding-left:${properties.image_style_paddingLeft};
                  margin:${properties.image_style_margin};
                  float:${properties.image_style_float};
                  vertical-align:${properties.image_style_vertical_align};
                  box-shadow: ${properties.image_style_boxShadow}; ">
    <div class="glb-image-wrapper">
      <img src="${properties.image_content}"
        alt="${properties.image_altTag}"
        class="${properties.image_independentID}"/>
    </div>

    <c:if test="${empty properties.image_content}">
      Image Placeholder
    </c:if>
     </div>
  </c:when>
  <c:otherwise>
  <!-- Pass all the variables from the granite window into the controller. -->
  <div data-ng-controller="glbImageController as glbImgCtrl" 
         class="${properties.image_horizontal_position}"
         style="border-top: ${properties.image_style_borderTop} ;">
    <div ng-init="glbImgCtrl.initValues(
    '${properties.image_independentID}', 
    '${properties.image_style_displayType}', 
    '${properties.image_style_backgroundColour}', 
    '${properties.image_style_opacity}', 
    '${properties.image_style_borderType}', 
    '${properties.image_style_borderColour}', 
    '${properties.image_style_borderRadius}', 
    '${properties.image_style_height}', 
    '${properties.image_style_max_height}',
    '${properties.image_style_min_height}',
    '${properties.image_style_width}', 
    '${properties.image_style_max_width}',
    '${properties.image_style_min_width}',
    '${properties.image_style_paddingLeft}', 
    '${properties.image_style_paddingRight}', 
    '${properties.image_style_paddingTop}', 
    '${properties.image_style_paddingBottom}', 
    '${properties.image_style_margin}', 
    '${properties.image_style_float}', 
    '${properties.image_style_vertical_align}', 
    '${properties.image_style_boxShadow}',  
    '${properties.image_content}',  
    '${properties.image_altTag}', 
    '${properties.image_linkTo}'
    )">
    </div>

    <div class="glb-image-wrapper">
    <c:choose>
        <c:when test="${empty properties.image_content}">
        <!-- If there is no link for this button to go to, fail and throw the following error -->
        <c:out value="Image"/>
        <wcm:placeholder/>
        </c:when>
        <c:otherwise>
        <c:choose>
          <c:when test="${not empty properties.image_linkTo}">
            <a x-cq-linkchecker="valid" id="${properties.image_elementID}" href="${properties.image_linkTo}">
                            <%-- 
                                Added another choose statement because there are many instances of scene 7 component on dash, and the blank retina config was returning unneccessary console errors. So if retina is blank, srcset attribute will not be used. 
                            --%>
                            <c:choose>
                                <c:when test="${not empty properties.image_retina}">
                                  <img  src="${properties.image_content}"
                                        srcset="${properties.image_retina} 2x"
                                        alt="${properties.image_altTag}" 
                                        class="${properties.image_independentID} hide-until-angular-init" 
                                        remove-hide="glbImgCtrl.removeHide" 
                                        role="presentation"
                                        aria-hidden="true" />
                                </c:when>
                                <c:otherwise>
                                    <img src="${properties.image_content}" 
                                         alt="${properties.image_altTag}" 
                                         class="${properties.image_independentID} hide-until-angular-init" 
                                         remove-hide="glbImgCtrl.removeHide" 
                                         role="presentation"
                                         aria-hidden="true" />
                                </c:otherwise>
                            </c:choose>
          </a>
          </c:when>
          <c:otherwise>
                        <c:choose>
                            <c:when test="${not empty properties.image_retina}">
                              <img  src="${properties.image_content}"
                                    srcset="${properties.image_retina} 2x"
                                    alt="${properties.image_altTag}" 
                                    class="${properties.image_independentID} hide-until-angular-init" 
                                    remove-hide="glbImgCtrl.removeHide" 
                                    role="presentation"
                                    aria-hidden="true" />
                            </c:when>
                            <c:otherwise>
                                <img src="${properties.image_content}" 
                                     alt="${properties.image_altTag}" 
                                     class="${properties.image_independentID} hide-until-angular-init" 
                                     remove-hide="glbImgCtrl.removeHide" 
                                     role="presentation"
                                     aria-hidden="true" />
                            </c:otherwise>
                        </c:choose>
          </c:otherwise>
        </c:choose>
      </c:otherwise>
    </c:choose>
    </div>
  <!-- end controller -->
  </div>
</c:otherwise>
</c:choose>