<%@page session="false" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@include file="/libs/foundation/global.jsp" %>
<%@taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %>
<%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>
    
<cq:setContentBundle/>
    
<style>
  .glbImageButtonFocusIndicator{ 
  }    

  .glbImageButtonFocusIndicator:focus{ 
    outline: 1px solid !important;
    outline-color: black !important;
    border-color: black !important;
    outline-offset: -0.2em !important;
    filter: brightness(90%);

  }
  .glbImageButtonFocusIndicator:hover{ 
    filter: brightness(90%);
  }
  
  .image-button-display-type {
    display: inline-block;
    position: relative;
    top: 33%;
  }

  .hiddenDiv{
    display: none;
  }

  .${properties.button_independentID} {
      text-align: ${properties.button_style_textAlignForCentering};
      width: ${properties.button_style_width};
      height: ${properties.button_style_height};
      color: ${properties.button_style_textColour};
      background-color: ${properties.button_style_backgroundColour};
      opacity: ${properties.button_style_opacity};
      background-image: ${properties.button_style_backgroundImage};
      border-style: ${properties.button_style_borderType};
      border-color: ${properties.button_style_borderColour};
      border-radius: ${properties.button_style_borderRadius};
      border-width: ${properties.button_style_borderWidth};
      padding-left: ${properties.button_style_paddingLeft};
      padding-right: ${properties.button_style_paddingRight};
      padding-top: ${properties.button_style_paddingTop};
      padding-bottom: ${properties.button_style_paddingBottom};
      font-family: ${properties.button_style_fontFamily};
      font-size: ${properties.button_style_fontSize};
      font-style: ${properties.button_style_fontStyle};
      font-weight: ${properties.button_style_fontWeight};
      text-align: ${properties.button_style_textAlign};
      margin: ${properties.button_style_margin};
      float: ${properties.button_style_float};
      vertical-align: ${properties.button_style_verticalAlign};
      box-shadow: ${properties.button_style_boxShadow};
    }

    .${properties.button_independentID}:hover {
      color: ${properties.button_style_rollover_textColour};
      background-color: ${properties.button_style_rollover_backgroundColour};
      background-image: ${properties.button_style_rollover_backgroundImage};
    }

    .${properties.button_independentID} img {
      padding-top: ${properties.button_style_image_paddingTop};
      padding-right: ${properties.button_style_image_paddingRight};
      padding-bottom: ${properties.button_style_image_paddingBottom};
      padding-left: ${properties.button_style_image_paddingLeft};
      color: ${properties.button_style_rollover_textColour};
    }

    #textBefore, #textAfter {
      display: inline-block;
    }
    @media only screen and (max-width: 768px){
        .${properties.button_independentID} {
            width: ${properties.button_style_width_768px};
            height: ${properties.button_style_height_768px};
            color: ${properties.button_style_textColour_768px};
            background-color: ${properties.button_style_backgroundColour_768px};
            opacity: ${properties.button_style_opacity_768px};
            background-image: ${properties.button_style_backgroundImage_768px};
            border-style: ${properties.button_style_borderType_768px};
            border-color: ${properties.button_style_borderColour_768px};
            border-radius: ${properties.button_style_borderRadius_768px};
            border-width: ${properties.button_style_borderWidth_768px};
            padding-left: ${properties.button_style_paddingLeft_768px};
            padding-right: ${properties.button_style_paddingRight_768px};
            padding-top: ${properties.button_style_paddingTop_768px};
            padding-bottom: ${properties.button_style_paddingBottom_768px};
            font-family: ${properties.button_style_fontFamily_768px};
            font-size: ${properties.button_style_fontSize_768px};
            font-style: ${properties.button_style_fontStyle_768px};
            font-weight: ${properties.button_style_fontWeight_768px};
            text-align: ${properties.button_style_textAlign_768px};
            margin: ${properties.button_style_margin_768px};
            float: ${properties.button_style_float_768px};
            vertical-align: ${properties.button_style_verticalAlign_768px};
            box-shadow: ${properties.button_style_boxShadow_768px};
          }

          .${properties.button_independentID}:hover {
            color: ${properties.button_style_rollover_textColour_768px};
            background-color: ${properties.button_style_rollover_backgroundColour_768px};
            background-image: ${properties.button_style_rollover_backgroundImage_768px};
          }

          .${properties.button_independentID} img {
            padding-top: ${properties.button_style_image_paddingTop_768px};
            padding-right: ${properties.button_style_image_paddingRight_768px};
            padding-bottom: ${properties.button_style_image_paddingBottom_768px};
            padding-left: ${properties.button_style_image_paddingLeft_768px};
          }
    }
</style>
    
    
<c:choose>
  <c:when test="${wcmmode:isDesign(pageContext) || wcmmode:isEdit(pageContext)}">
    <div style="text-align: ${properties.button_style_textAlignForCentering};">
      <button id="${properties.button_elementID}" class="authorModeDiv ${properties.button_independentID}">
        <c:if test="${not empty properties.button_textBefore}">
          <div id="textBefore"><fmt:message key="${properties.button_textBefore}"/></div>
        </c:if>
        
        <c:choose>
          <c:when test="${not empty properties.button_image}">
            <img src="${properties.button_image}"/>
          </c:when>
          <c:otherwise>
            <c:if test="${empty properties.button_textBefore && empty properties.button_textAfter}">
              <!-- Image Button Placeholder -->
              <img alt="" src="https://canadiantire.scene7.com/is/image/CanadianTire/defaultImageBtn?qlt=50&scl=1&fmt=png-alpha" style="width:50%; max-width: 20rem;" />
            </c:if>
          </c:otherwise>
        </c:choose>
 
        <c:if test="${not empty properties.button_textAfter}">
          <div id="textAfter"><fmt:message key="${properties.button_textAfter}"/></div>
        </c:if>
      </button>
      
    </div>
  </c:when>
  <c:otherwise>

    <!-- Start Main HTML of component -->
    <div
      class="hide-until-angular-init ${properties.button_flex_align}"
      style="text-align: ${properties.button_style_textAlignForCentering};"

      global-image-button

      data-author-css-class='${properties.button_independentID}'
      data-link-to='${properties.button_linkTo}'
      data-close-modal='${properties.button_close_modal}'
      data-print-section='${properties.button_print_section}'
      data-button-image-alt-tag='${properties.button_altTag}'
      data-button-image-location='${properties.button_image}'
      
      data-button-width='width: ${properties.button_style_width}'
      data-button-height='height: ${properties.button_style_height}'
      data-button-text-colour='color: ${properties.button_style_textColour}'
      data-button-background-colour='background-color: ${properties.button_style_backgroundColour}'
      data-button-opacity='opacity: ${properties.button_style_opacity}'
      data-button-background-image='background-image: ${properties.button_style_backgroundImage}'
      data-button-border-type='border-style: ${properties.button_style_borderType}'
      data-button-border-colour='border-color: ${properties.button_style_borderColour}'
      data-button-border-radius='border-radius: ${properties.button_style_borderRadius}'
      data-button-border-width='border-width: ${properties.button_style_borderWidth}'
      data-button-padding-left='padding-left: ${properties.button_style_paddingLeft}'
      data-button-padding-right='padding-right: ${properties.button_style_paddingRight}'
      data-button-padding-top='padding-top: ${properties.button_style_paddingTop}'
      data-button-padding-bottom='padding-bottom: ${properties.button_style_paddingBottom}'
      data-button-font-family='font-family: ${properties.button_style_fontFamily}'
      data-button-font-size='font-size: ${properties.button_style_fontSize}'
      data-button-font-style='font-style: ${properties.button_style_fontStyle}'
      data-button-font-weight='font-weight: ${properties.button_style_fontWeight}'
      data-button-text-align='text-align: ${properties.button_style_textAlign}'
      data-button-margin='margin: ${properties.button_style_margin}'
      data-button-float='float: ${properties.button_style_float}'
      data-button-vertical-align='vertical-align: ${properties.button_style_verticalAlign}'
      data-button-box-shadow='box-shadow: ${properties.button_style_boxShadow}'
      
      data-image-padding-top='padding-top: ${properties.button_style_image_paddingTop}'
      data-image-padding-right='padding-right: ${properties.button_style_image_paddingRight}'
      data-image-padding-bottom='padding-bottom: ${properties.button_style_image_paddingBottom}'
      data-image-padding-left='padding-left: ${properties.button_style_image_paddingLeft}'
      
      data-button-rollover-text-colour='color: ${properties.button_style_rollover_textColour}'
      data-button-rollover-bg-colour='background-color: ${properties.button_style_rollover_backgroundColour}'
      data-button-rollover-bg-image='background-image: ${properties.button_style_rollover_backgroundImage}'
      
      data-button-width-768px='width: ${properties.button_style_width_768px}'
      data-button-height-768px='height: ${properties.button_style_height_768px}'
      data-button-text-colour-768px='color: ${properties.button_style_textColour_768px}'
      data-button-bg-colour-768px='background-color: ${properties.button_style_backgroundColour_768px}'
      data-button-opacity-768px='opacity: ${properties.button_style_opacity_768px}'
      data-button-background-image-768px='background-image: ${properties.button_style_backgroundImage_768px}'
      data-button-border-type-768px='border-style: ${properties.button_style_borderType_768px}'
      data-button-border-colour-768px='border-color: ${properties.button_style_borderColour_768px}'
      data-button-border-radius-768px='border-radius: ${properties.button_style_borderRadius_768px}'
      data-button-border-width-768px='border-width: ${properties.button_style_borderWidth_768px}'
      data-button-padding-left-768px='padding-left: ${properties.button_style_paddingLeft_768px}'
      data-button-padding-right-768px='padding-right: ${properties.button_style_paddingRight_768px}'
      data-button-padding-top-768px='padding-top: ${properties.button_style_paddingTop_768px}'
      data-button-padding-bottom-768px='padding-bottom: ${properties.button_style_paddingBottom_768px}'
      data-button-font-family-768px='font-family: ${properties.button_style_fontFamily_768px}'
      data-button-font-size-768px='font-size: ${properties.button_style_fontSize_768px}'
      data-button-font-style-768px='font-style: ${properties.button_style_fontStyle_768px}'
      data-button-font-weight-768px='font-weight: ${properties.button_style_fontWeight_768px}'
      data-button-text-align-768px='text-align: ${properties.button_style_textAlign_768px}'
      data-button-margin-768px='margin: ${properties.button_style_margin_768px}'
      data-button-float-768px='float: ${properties.button_style_float_768px}'
      data-button-vertical-align-768px='vertical-align: ${properties.button_style_verticalAlign_768px}'
      data-button-box-shadow-768px='box-shadow: ${properties.button_style_boxShadow_768px}'
      
      data-image-padding-top-768px='padding-top: ${properties.button_style_image_paddingTop_768px}'
      data-image-padding-right-768px='padding-right: ${properties.button_style_image_paddingRight_768px}'
      data-image-padding-bottom-768px='padding-bottom: ${properties.button_style_image_paddingBottom_768px}'
      data-image-padding-left-768px='padding-left: ${properties.button_style_image_paddingLeft_768px}'
      
      data-button-rollover-text-colour-768px='color: ${properties.button_style_rollover_textColour_768px}'
      data-button-rollover-bg-colour-768px='background-color: ${properties.button_style_rollover_backgroundColour_768px}'
      data-button-rollover-bg-image-768px='background-image: ${properties.button_style_rollover_backgroundImage_768px}'
      >
      
      <div class="hiddenDiv" id="textBefore"><fmt:message key="${properties.button_textBefore}"/></div>
      <div class="hiddenDiv" id="textAfter"><fmt:message key="${properties.button_textAfter}"/></div>

    </div>
  </c:otherwise>
</c:choose>