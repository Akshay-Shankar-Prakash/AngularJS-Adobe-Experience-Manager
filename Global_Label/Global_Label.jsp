<%@page session="false" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@include file="/libs/foundation/global.jsp" %>
<%@taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
    
<cq:setContentBundle/>

<c:choose>
  <c:when test="${wcmmode:isDesign(pageContext) || wcmmode:isEdit(pageContext)}">
     <div class="authorModeDiv ${properties.gl_label_verticalPosition} ${properties.gl_label_horizontalPosition} ${properties.gl_label_cssClassOne}"
          id="${properties.gl_label_idAttr}"
          style=" font-family:${properties.gl_style_font_fontFamily};
                  font-size:${properties.gl_style_font_fontSize};
                  font-style:${properties.gl_style_font_fontStyle};
                  font-variant:${properties.gl_style_font_fontVariant};
                  font-weight:${properties.gl_style_font_fontWeight};
                  color:${properties.gl_style_text_color};
                  text-align:${properties.gl_style_text_textAlign};
                  text-shadow:${properties.gl_style_text_textShadow};
                  line-height:${properties.gl_style_text_line_height};
                  vertical-align:${properties.gl_style_text_verticalAlign};
                  padding-top:${properties.gl_style_text_paddingTop};
                  padding-right:${properties.gl_style_text_paddingRight};
                  padding-bottom:${properties.gl_style_text_paddingBottom};
                  padding-left:${properties.gl_style_text_paddingLeft};
                  margin-top:${properties.gl_style_text_marginTop};
                  margin-right:${properties.gl_style_text_marginRight};
                  margin-bottom:${properties.gl_style_text_marginBottom};
                  margin-left:${properties.gl_style_text_marginLeft};
                  border-top:${properties.gl_style_text_borderTop};
                  border-right:${properties.gl_style_text_borderRight};
                  border-bottom:${properties.gl_style_text_borderBottom};
                  border-left:${properties.gl_style_text_borderLeft}; 
                  background-color:${properties.gl_style_bg_color};">
          i18n label: <br />
         <fmt:message key="${properties.gl_label_i18nLabel}"/>
     </div>
  </c:when>
  <c:otherwise>
    <!-- Start Main HTML of component -->
    <div 
    data-ng-controller="glbLabelController as glbLabelCtrl"
    ng-init="getConfigSettings('${properties.gl_qParamError_i18nLabel}', '${properties.gl_qParamError_checkbox}')" style="padding-right: 5px">

      <div
        class="hide-until-angular-init"
        ng-show="glbLabelCtrl.showLabel" 
        i18n-label
        data-config-aria-label='${properties.gl_label_aria_label}'
        data-id-attr='${properties.gl_label_idAttr}'
        data-paragraph-style='${properties.gl_label_paragraphStyle}'
        data-link-to='${properties.gl_label_linkTo}'
        data-css-class-one='${properties.gl_label_cssClassOne}'
        data-vertical-position='${properties.gl_label_verticalPosition}'
        data-horizontal-position='${properties.gl_label_horizontalPosition}'
        data-display-type='${properties.gl_label_displayType}'
        data-font-family='${properties.gl_style_font_fontFamily}'
        data-font-size='${properties.gl_style_font_fontSize}'
        data-font-style='${properties.gl_style_font_fontStyle}'
        data-font-variant='${properties.gl_style_font_fontVariant}'
        data-font-weight='${properties.gl_style_font_fontWeight}'
        data-text-color='${properties.gl_style_text_color}'
        data-text-align='${properties.gl_style_text_textAlign}'
        data-text-shadow='${properties.gl_style_text_textShadow}'
        data-line-height='${properties.gl_style_text_line_height}'
        data-vertical-align='${properties.gl_style_text_verticalAlign}'
        data-padding-top='${properties.gl_style_text_paddingTop}'
        data-padding-right='${properties.gl_style_text_paddingRight}'
        data-padding-bottom='${properties.gl_style_text_paddingBottom}'
        data-padding-left='${properties.gl_style_text_paddingLeft}'
        data-margin-top='${properties.gl_style_text_marginTop}'
        data-margin-right='${properties.gl_style_text_marginRight}'
        data-margin-bottom='${properties.gl_style_text_marginBottom}'
        data-margin-left='${properties.gl_style_text_marginLeft}'
        data-border-top='${properties.gl_style_text_borderTop}'
        data-border-right='${properties.gl_style_text_borderRight}'
        data-border-bottom='${properties.gl_style_text_borderBottom}'
        data-border-left='${properties.gl_style_text_borderLeft}'
        data-background-color='${properties.gl_style_bg_color}'


        data-mobile-css-class='${properties.gl_label_mobileCssClass}'

        data-display-type-768px='display: ${properties.gl_label_displayType_768px}'
        data-font-family-768px='font-family: ${properties.gl_style_font_fontFamily_768px}'
        data-font-size-768px='font-size: ${properties.gl_style_font_fontSize_768px}'
        data-font-style-768px='font-style: ${properties.gl_style_font_fontStyle_768px}'
        data-font-variant-768px='font-variant: ${properties.gl_style_font_fontVariant_768px}'
        data-font-weight-768px='font-weight: ${properties.gl_style_font_fontWeight_768px}'
        data-text-color-768px='color: ${properties.gl_style_text_color_768px}'
        data-text-align-768px='text-align: ${properties.gl_style_text_textAlign_768px}'
        data-text-shadow-768px='text-shadow: ${properties.gl_style_text_textShadow_768px}'
        data-line-height-768px='line-height: ${properties.gl_style_text_line_height_768px}'
        data-vertical-align-768px='vertical-align: ${properties.gl_style_text_verticalAlign_768px}'
        data-padding-top-768px='padding-top: ${properties.gl_style_text_paddingTop_768px}'
        data-padding-right-768px='padding-right: ${properties.gl_style_text_paddingRight_768px}'
        data-padding-bottom-768px='padding-bottom: ${properties.gl_style_text_paddingBottom_768px}'
        data-padding-left-768px='padding-left: ${properties.gl_style_text_paddingLeft_768px}'
        data-margin-top-768px='margin-top: ${properties.gl_style_text_marginTop_768px}'
        data-margin-right-768px='margin-right: ${properties.gl_style_text_marginRight_768px}'
        data-margin-bottom-768px='margin-bottom: ${properties.gl_style_text_marginBottom_768px}'
        data-margin-left-768px='margin-left: ${properties.gl_style_text_marginLeft_768px}'
        data-border-top-768px='border-top: ${properties.gl_style_text_borderTop_768px}'
        data-border-right-768px='border-right: ${properties.gl_style_text_borderRight_768px}'
        data-border-bottom-768px='border-bottom: ${properties.gl_style_text_borderBottom_768px}'
        data-border-left-768px='border-left: ${properties.gl_style_text_borderLeft_768px}'
        data-background-color-768px='background-color: ${properties.gl_style_bg_color_768px}'


        data-dialog-to-pop='${properties.gl_popup}'
        data-qparam-err-label='${properties.gl_qParamError_i18nLabel}'
        data-qparam-err-checkbox='${properties.gl_qParamError_checkbox}'>
        
        <div class="hiddenDiv" aria-hidden="true" style="display:none; visibility: hidden;">
            <fmt:message key='${properties.gl_label_i18nLabel}'/>
        </div>             
        
      </div>
    </div>
  </c:otherwise>
</c:choose>