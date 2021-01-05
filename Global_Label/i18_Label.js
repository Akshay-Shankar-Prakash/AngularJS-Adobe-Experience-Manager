;(function() {
    'use strict';

    angular
        .module('dash')
        .directive('i18nLabel', i18nLabel);
    
    function i18nLabel($parse, $timeout, $compile) {

        var authorStyleSheet = (function() {
            // Create the <style> tag
            var style = document.createElement("style");

            // WebKit hack :(
            style.appendChild(document.createTextNode(""));

            // Add the <style> element to the page
            document.head.appendChild(style);

            return style.sheet;
        })();


        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {

            var i18nDiv = element[0].querySelector('.hiddenDiv');

            var cssClassOne,
                labelIDAttr;

            var displayType,
                fontFamily, 
                fontSize, 
                fontStyle, 
                fontVariant, 
                fontWeight, 
                textColor,
                textAlign,
                textShadow,
                lineHeight,
                verticalAlign,
                paddingTop,
                paddingRight,
                paddingBottom,
                paddingLeft,
                marginTop,
                marginRight,
                marginBottom,
                marginLeft,
                borderTop,
                borderRight,
                borderBottom,
                borderLeft,
                backgroundColor,
                ariaLabel,
                mobileCssClass;
            
            //DCI-6662: Add ID Attribute for i18n label
            if(attrs.idAttr != undefined && attrs.idAttr != ''){
                labelIDAttr = attrs.idAttr;
            } else {
                labelIDAttr = '';
            }
            if(attrs.displayType != undefined && attrs.displayType != ''){
                displayType = 'display:' + attrs.displayType + ';';
            } else {
                displayType = '';
            }
            if(attrs.cssClassOne != undefined && attrs.cssClassOne != ''){
                cssClassOne = attrs.cssClassOne;
            } else {
                cssClassOne = '';
            }
            if(attrs.fontFamily != undefined && attrs.fontFamily != ''){
                fontFamily = 'font-family:' + attrs.fontFamily + ';';
            } else {
                fontFamily = '';
            }
            if(attrs.fontSize != undefined && attrs.fontSize != ''){
                fontSize = 'font-size:' + attrs.fontSize + ';';
            } else {
                fontSize = '';
            }
            if(attrs.fontStyle != undefined && attrs.fontStyle != ''){
                fontStyle = 'font-style:' + attrs.fontStyle + ';';
            } else {
                fontStyle = '';
            }
            if(attrs.fontVariant != undefined && attrs.fontVariant != ''){
                fontVariant = 'font-variant:' + attrs.fontVariant + ';';
            } else {
                fontVariant = '';
            }
            if(attrs.fontWeight != undefined && attrs.fontWeight != ''){
                fontWeight = 'font-weight:' + attrs.fontWeight + ';';
            } else {
                fontWeight = '';
            }
            if(attrs.textColor != undefined && attrs.textColor != ''){
                textColor = 'color:' + attrs.textColor + ';';
            } else {
                textColor = '';
            }
            if(attrs.textAlign != undefined && attrs.textAlign != ''){
                textAlign = 'text-align:' + attrs.textAlign + ';';
            } else {
                textAlign = '';
            }
            if(attrs.textShadow != undefined && attrs.textShadow != ''){
                textShadow = 'text-shadow:' + attrs.textShadow + ';';
            } else {
                textShadow = '';
            }
            if(attrs.lineHeight != undefined && attrs.lineHeight != ''){
                lineHeight = 'line-height:' + attrs.lineHeight + ';';
            } else {
                lineHeight = '';
            }
            if(attrs.verticalAlign != undefined && attrs.verticalAlign != ''){
                verticalAlign = 'vertical-align:' + attrs.verticalAlign + ';';
            } else {
                verticalAlign = '';
            }
            if(attrs.paddingTop != undefined && attrs.paddingTop != ''){
                paddingTop = 'padding-top:' + attrs.paddingTop + ';';
            } else {
                paddingTop = '';
            }
            if(attrs.paddingRight != undefined && attrs.paddingRight != ''){
                paddingRight = 'padding-right:' + attrs.paddingRight + ';';
            } else {
                paddingRight = '';
            }
            if(attrs.paddingBottom != undefined && attrs.paddingBottom != ''){
                paddingBottom = 'padding-bottom:' + attrs.paddingBottom + ';';
            } else {
                paddingBottom = '';
            }
            if(attrs.paddingLeft != undefined && attrs.paddingLeft != ''){
                paddingLeft = 'padding-left:' + attrs.paddingLeft + ';';
            } else {
                paddingLeft = '';
            }
            if(attrs.marginTop != undefined && attrs.marginTop != ''){
                marginTop = 'margin-top:' + attrs.marginTop + ';';
            } else {
                marginTop = '';
            }
            if(attrs.marginRight != undefined && attrs.marginRight != ''){
                marginRight = 'margin-right:' + attrs.marginRight + ';';
            } else {
                marginRight = '';
            }
            if(attrs.marginBottom != undefined && attrs.marginBottom != ''){
                marginBottom = 'margin-bottom:' + attrs.marginBottom + ';';
            } else {
                marginBottom = '';
            }
            if(attrs.marginLeft != undefined && attrs.marginLeft != ''){
                marginLeft = 'margin-left:' + attrs.marginLeft + ';';
            } else {
                marginLeft = '';
            }
            if(attrs.borderTop != undefined && attrs.borderTop != ''){
                borderTop = 'border-top:' + attrs.borderTop + ';';
            } else {
                borderTop = '';
            }
            if(attrs.borderRight != undefined && attrs.borderRight != ''){
                borderRight = 'border-right:' + attrs.borderRight + ';';
            } else {
                borderRight = '';
            }
            if(attrs.borderBottom != undefined && attrs.borderBottom != ''){
                borderBottom = 'border-bottom:' + attrs.borderBottom + ';';
            } else {
                borderBottom = '';
            }
            if(attrs.borderLeft != undefined && attrs.borderLeft != ''){
                borderLeft = 'border-left:' + attrs.borderLeft + ';';
            } else {
                borderLeft = '';
            }
            if(attrs.backgroundColor != undefined && attrs.backgroundColor != ''){
                backgroundColor = 'background-color:' + attrs.backgroundColor + ';';
            } else {
                backgroundColor = '';
            }
            if(attrs.mobileCssClass != undefined && attrs.mobileCssClass != ''){
                mobileCssClass = attrs.mobileCssClass ;
            } else {
                mobileCssClass = '';
            }
            if(attrs.configAriaLabel != undefined && attrs.configAriaLabel != '') {
                ariaLabel = Granite.I18n.get(attrs.configAriaLabel);
            }

            

            // mobile styles
            var mobileStyles = {
                displayType768px: attrs.displayType768px,
                fontFamily768px: attrs.fontFamily768px,
                fontSize768px: attrs.fontSize768px,
                fontStyle768px: attrs.fontStyle768px,
                fontVariant768px: attrs.fontVariant768px,
                fontWeight768px: attrs.fontWeight768px,
                textColor768px: attrs.textColor768px,
                textAlign768px: attrs.textAlign768px, 
                textShadow768px: attrs.textShadow768px,
                lineHeight768px: attrs.lineHeight768px,
                verticalAlign768px: attrs.verticalAlign768px,
                paddingTop768px: attrs.paddingTop768px,
                paddingRight768px: attrs.paddingRight768px,
                paddingBottom768px: attrs.paddingBottom768px,
                paddingLeft768px: attrs.paddingLeft768px,
                marginTop768px: attrs.marginTop768px,
                marginRight768px: attrs.marginRight768px,
                marginBottom768px: attrs.marginBottom768px,
                marginLeft768px: attrs.marginLeft768px,
                borderTop768px: attrs.borderTop768px,
                borderRight768px: attrs.borderRight768px,
                borderBottom768px: attrs.borderBottom768px,
                borderLeft768px: attrs.borderLeft768px,
                backgroundColor768px: attrs.backgroundColor768px
            }

        
            // Set up string for mobile css styles.
            var mobileStyleString = createCssString(mobileStyles);
            if(mobileStyleString != undefined && mobileStyleString != ''){
                createCssClass(attrs.mobileCssClass, mobileStyleString, '768px');
            }

            function createCssString(mobileStyles) {

                var cssString = '';
                var cssStatementSplit;

                angular.forEach(mobileStyles, function (cssStyle) {
                    if (cssStyle != undefined) {
                        cssStatementSplit = cssStyle.split(':');

                        if (cssStatementSplit[1] !== '' && cssStatementSplit[1] != undefined) {
                            cssString += cssStyle + ' !important;';
                        }
                    } else {
                        console.error("i18n Label: mobile css style undefined");
                    }

                });

                return cssString;
            }
            

            function createCssClass(className, cssString, breakpoint) {
                if (cssString != undefined && cssString !== '') {

                    if (breakpoint === '768px') {
                        authorStyleSheet.insertRule('@media only screen and (max-width: 768px) { .' + className + ' { ' + cssString + ' }', 0);
                    }
                }
            }

            // Set up string that will append the inline css styles.
           var cssStyles = 'style="' + displayType + 
                                        fontFamily +
                                        fontSize +
                                        fontStyle +
                                        fontVariant +
                                        fontWeight +
                                        textColor +
                                        textAlign +
                                        textShadow +
                                        lineHeight +
                                        verticalAlign +
                                        paddingTop +
                                        paddingRight +
                                        paddingBottom +
                                        paddingLeft +
                                        marginTop +
                                        marginRight +
                                        marginBottom +
                                        marginLeft +
                                        borderTop +
                                        borderRight +
                                        borderBottom +
                                        borderLeft + 
                                        backgroundColor + '"';


            var beginAnchor;
            var endAnchor;
            var paragraphType;
            var urlLink;

            var formattedLabel = attrs.i18nLabel.replace("&quot;", "\"");

            // Check to see if a link exists, compile will be different for each as link has to wrap the compile statement
            // Determine the type of element to append
           if(attrs.paragraphStyle === 'paragraph'){
            paragraphType = '<p id="'+ labelIDAttr +'" class="'+ cssClassOne +' '+ mobileCssClass + '" ' + cssStyles + '>' + i18nDiv.innerHTML + '</p>';
           } else if (attrs.paragraphStyle === 'header1'){
            paragraphType = '<h1 id="'+ labelIDAttr +'" class="'+ cssClassOne +' '+ mobileCssClass + '" ' + cssStyles + '>' + i18nDiv.innerHTML + '</h1>';
           } else if (attrs.paragraphStyle === 'header2'){
            paragraphType = '<h2 id="'+ labelIDAttr +'" class="'+ cssClassOne +' '+ mobileCssClass + '" ' + cssStyles + '>' + i18nDiv.innerHTML + '</h2>';
           } else {
            paragraphType = '<div id="'+ labelIDAttr +'" class="'+ cssClassOne +' '+ mobileCssClass + '" ' + cssStyles + '>' + i18nDiv.innerHTML + '</div>';
           }

            var templateToAppend;

           // Append template with link if one exists or template without link if there is no href
           // if(attrs.linkTo != undefined && attrs.linkTo != ''){
           if(attrs.linkTo){
               if(Granite.I18n.get(attrs.linkTo).indexOf('.html') < 0 && Granite.I18n.get(attrs.linkTo).indexOf('#/') < 0){
                   urlLink = Granite.I18n.get(attrs.linkTo) + '.html';
                 } else {
                   // ".html" already present in redirect string.
                   urlLink = Granite.I18n.get(attrs.linkTo);
                 }
            beginAnchor = '<a '+(ariaLabel? 'aria-label="'+ariaLabel+'"' : '')+' href="'+ urlLink + '">';
            endAnchor = '</a>';
            templateToAppend = $compile(beginAnchor + paragraphType + endAnchor)(scope);
            element.append(templateToAppend);
           } else {
            templateToAppend = $compile(paragraphType)(scope);
            element.append(templateToAppend);
           }

           checkBindPopup();

           // Set the flex classes for the element:
            if(attrs.verticalPosition != undefined && attrs.verticalPosition != ''){
               element.addClass(attrs.verticalPosition);
            }

            if(attrs.horizontalPosition != undefined && attrs.horizontalPosition != ''){
                element.addClass(attrs.horizontalPosition);
            }
           

           element.removeClass('hide-until-angular-init');


           function checkBindPopup(){

                if(attrs.dialogToPop){
                    var anchorElement = element.find('a');
                    if(anchorElement){
                        anchorElement.on('click', function(event){
                            openDialog(attrs.dialogToPop)
                            scope.$apply();
                        });
                    }

                }
            //End checkBindPopup
            }

        }

        function openDialog(dialogName) {
          jQuery('#' + dialogName).modal('show');
        }


    }
})();