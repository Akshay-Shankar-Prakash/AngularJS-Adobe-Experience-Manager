;(function() {
    'use strict';

    angular
        .module('dash')
        .directive('globalImageButton', globalImageButton);
    
    function globalImageButton($compile, $rootScope, RedirectService, $templateCache, $timeout, PageLanguageService,
                               DetectMobileOSService) {

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

            var buttonCssString;
            var buttonRolloverCssString;
            var imageCssString;
            var buttonCssString768px;
            var buttonRolloverCssString768px;
            var imageCssString768px;

            // $timeout(function(){
            //     var printableSection = $templateCache.get("dash/template/printable/"+attrs.printSection+".html");
            //     console.log("printable section");
            //     console.log(printableSection);   
            // },0);

            

            var textBefore;
            if(element[0].querySelector('#textBefore')){
                textBefore = element[0].querySelector('#textBefore').innerHTML;
            }
            var textAfter;
            if(element[0].querySelector('#textAfter')){
                textAfter = element[0].querySelector('#textAfter').innerHTML;
            }
             

            var buttonStyles = {buttonWidth: attrs.buttonWidth,
                                buttonHeight: attrs.buttonHeight,
                                buttonTextColour: attrs.buttonTextColour,
                                buttonBackgroundColour: attrs.buttonBackgroundColour,                              
                                buttonOpacity: attrs.buttonOpacity,
                                buttonBackgroundImage: attrs.buttonBackgroundImage,
                                buttonBorderType: attrs.buttonBorderType,
                                buttonBorderColour: attrs.buttonBorderColour,
                                buttonBorderRadius: attrs.buttonBorderRadius,
                                buttonBorderWidth: attrs.buttonBorderWidth,
                                buttonPaddingTop: attrs.buttonPaddingTop,
                                buttonPaddingRight: attrs.buttonPaddingRight,
                                buttonPaddingBottom: attrs.buttonPaddingBottom,
                                buttonPaddingLeft: attrs.buttonPaddingLeft,
                                buttonFontFamily: attrs.buttonFontFamily,
                                buttonFontSize: attrs.buttonFontSize,
                                buttonFontStyle: attrs.buttonFontStyle,
                                buttonFontWeight: attrs.buttonFontWeight,
                                buttonTextAlign: attrs.buttonTextAlign,
                                buttonMargin: attrs.buttonMargin,
                                buttonFloat: attrs.buttonFloat,
                                buttonVerticalAlign: attrs.buttonVerticalAlign,
                                buttonBoxShadow: attrs.buttonBoxShadow};

            var buttonRolloverStyles = {buttonRolloverTextColour: attrs.buttonRolloverTextColour,
                                        buttonRolloverBgColour: attrs.buttonRolloverBgColour,
                                        buttonRolloverBgImage: attrs.buttonRolloverBgImage};


            var imageStyles = {imagePaddingTop: attrs.imagePaddingTop,
                                imagePaddingRight: attrs.imagePaddingRight,
                                imagePaddingBottom: attrs.imagePaddingBottom,
                                imagePaddingLeft: attrs.imagePaddingLeft};


            var buttonStyles768px = {buttonWidth768px: attrs.buttonWidth768px,
                                    buttonHeight768px: attrs.buttonHeight768px,
                                    buttonTextColour768px: attrs.buttonTextColour768px,
                                    backgroundColour768px: attrs.buttonBgColour768px,                              
                                    buttonOpacity768px: attrs.buttonOpacity768px,
                                    buttonBackgroundImage768px: attrs.buttonBackgroundImage768px,
                                    buttonBorderType768px: attrs.buttonBorderType768px,
                                    buttonBorderColour768px: attrs.buttonBorderColour768px,
                                    buttonBorderRadius768px: attrs.buttonBorderRadius768px,
                                    buttonBorderWidth768px: attrs.buttonBorderWidth768px,
                                    buttonPaddingTop768px: attrs.buttonPaddingTop768px,
                                    buttonPaddingRight768px: attrs.buttonPaddingRight768px,
                                    buttonPaddingBottom768px: attrs.buttonPaddingBottom768px,
                                    buttonPaddingLeft768px: attrs.buttonPaddingLeft768px,
                                    buttonFontFamily768px: attrs.buttonFontFamily768px,
                                    buttonFontSize768px: attrs.buttonFontSize768px,
                                    buttonFontStyle768px: attrs.buttonFontStyle768px,
                                    buttonFontWeight768px: attrs.buttonFontWeight768px,
                                    buttonTextAlign768px: attrs.buttonTextAlign768px,
                                    buttonMargin768px: attrs.buttonMargin768px,
                                    buttonFloat768px: attrs.buttonFloat768px,
                                    buttonVerticalAlign768px: attrs.buttonVerticalAlign768px,
                                    buttonBoxShadow768px: attrs.buttonBoxShadow768px};

            var btnRolloverStyles768px = {buttonRolloverTextColour768px: attrs.buttonRolloverTextColour768px,
                                            buttonRolloverBgColour768px: attrs.buttonRolloverBgColour768px,
                                            buttonRolloverBgImage768px: attrs.buttonRolloverBgImage768px};


            var imageStyles768px = {imagePaddingTop768px: attrs.imagePaddingTop768px,
                                    imagePaddingRight768px: attrs.imagePaddingRight768px,
                                    imagePaddingBottom768px: attrs.imagePaddingBottom768px,
                                    imagePaddingLeft768px: attrs.imagePaddingLeft768px};

            // Start creating css strings
            // Create the css string for the button.
            if(attrs.authorCssClass != undefined && attrs.authorCssClass !== ''){
                buttonCssString = createCssString(buttonStyles);
                if(buttonCssString != undefined && buttonCssString !== ''){
                    createCssClass(attrs.authorCssClass, buttonCssString);
                }
                
                buttonRolloverCssString = createCssString(buttonRolloverStyles);
                if(buttonRolloverCssString != undefined && buttonRolloverCssString !== ''){
                    createCssClass(attrs.authorCssClass + ':hover', buttonRolloverCssString);
                }

                imageCssString = createCssString(imageStyles);
                if(imageCssString != undefined && imageCssString !== ''){
                    createCssClass(attrs.authorCssClass + 'IMAGETAG', imageCssString);
                }

                buttonCssString768px = createCssString(buttonStyles768px);
                if(buttonCssString768px != undefined && buttonCssString768px !== ''){
                    createCssClass(attrs.authorCssClass, buttonCssString768px, '768px');
                }

                buttonRolloverCssString768px = createCssString(btnRolloverStyles768px);
                if(buttonRolloverCssString768px != undefined && buttonRolloverCssString768px !== ''){
                    createCssClass(attrs.authorCssClass, buttonRolloverCssString768px, '768px');
                }

                imageCssString768px = createCssString(imageStyles768px);
                if(imageCssString768px != undefined && imageCssString768px !== ''){
                    createCssClass(attrs.authorCssClass, imageCssString768px, '768px');
                }
            }

            // Now build the template for the button:
            var templateString = buildTemplate(textBefore, 
                                                textAfter, 
                                                attrs.buttonImageLocation, 
                                                attrs.buttonImageAltTag, 
                                                attrs.authorCssClass);

            // Now compile and attach the template
            var compiledElement = $compile(templateString)(scope);

            // Attach the compiled element
            element.append(compiledElement);

            // Bind actions for link, close modal, and print section on the compiled button
            bindActions(compiledElement, attrs.linkTo, attrs.closeModal, attrs.printSection, scope);

            // Get rid of the divs that were used for the i18n data.
            removeDataDivs(element);

            // Unhide the whole thing:
            element.removeClass('hide-until-angular-init');

            
        // End linking function
        }

        function createCssString(cssStyles){

            var cssString = '';
            var cssStatementSplit;

            angular.forEach(cssStyles, function(cssStyle){
                if(cssStyle != undefined){
                    cssStatementSplit = cssStyle.split(':');

                    if(cssStatementSplit[1] !== '' && cssStatementSplit[1] != undefined){
                        cssString += cssStyle + ';';
                    } 
                } else {
                    console.error("Image Button: css style undefined");
                }

            });

            return cssString;
        }

        function createCssClass(className, cssString, breakpoint){
            if(cssString != undefined && cssString !== ''){
                // Grab all the stylesheets and get the last one.
                // var allStyleSheets = document.styleSheets;
                // var stylesheetLast = document.styleSheets[allStyleSheets.length - 1];

                if(breakpoint === '768px'){
                    authorStyleSheet.insertRule('@media only screen and (max-width: 768px) { .' + className + ' { ' + cssString + ' }', 0);
                } else {
                    authorStyleSheet.insertRule('.' + className + ' { ' + cssString + ' }', 0);
                }
            }

        }

        function buildTemplate(textBefore, 
                                textAfter, 
                                imageLocation, 
                                imageAltTag, 
                                cssClass){

            var buttonTemplate;

            // Create the button template
            buttonTemplate = '<button id="label-1" tabindex="0" type="button"'+
                            ' class="' + cssClass + ' glbImageButtonFocusIndicator">';

            if(textBefore != undefined && textBefore !== '??????' && textBefore !== ''){
                buttonTemplate += '<span class="image-button-display-type">' +
                                          textBefore +
                                      '</span>';
            }

            if(imageLocation && imageAltTag){
                buttonTemplate += '<img class="image-button-display-type ' + cssClass + 'IMAGETAG" ' + 
                                    'src="'+imageLocation+'" ' +
                                    'alt=""';
            } else if(imageLocation && !imageAltTag) {
                buttonTemplate += '<img class="image-button-display-type ' + cssClass + 'IMAGETAG" ' +
                                    'src="'+imageLocation+'"' +
                                    'alt="">';
            }

            if(textAfter != undefined && textAfter !== '??????' && textAfter !== ''){
                buttonTemplate += '<span class="image-button-display-type">' +
                                          textAfter +
                                      '</span>';
            }

            buttonTemplate += '</button>';
                                      

            return buttonTemplate;

        }

        function bindActions(compiledElem, linkTo, closeModal, printSection, scope){

            compiledElem.on('keypress', function (event) {
                if(event.which === 13
                || event.which === 32){
                    if(linkTo){
                        scope.$apply(function () {
                            console.log("redirecting");
                            RedirectService.redirect(linkTo);
                        });
                    }
                    if(closeModal){
                        scope.$apply(function () {
                            console.log("closing modal");
                            $rootScope.$broadcast('dash:modal:closed', closeModal); 
                        });
                    }
                    if(printSection){
                        scope.$apply(function () {
                            console.log("printing page section");
                            createPrintWindow(printSection, scope);
                        });
                    }
                }

            }).on('mousedown', function(event){
                if(linkTo){
                    scope.$apply(function () {
                        console.log("redirecting");
                        RedirectService.redirect(linkTo);
                    });
                }
                if(closeModal){
                    scope.$apply(function () {
                        console.log("closing modal");
                        $rootScope.$broadcast('dash:modal:closed', closeModal); 
                    });
                }
                if(printSection){
                    scope.$apply(function () {
                        createPrintWindow(printSection, scope);
                    });
                }

            });

            return;

        }

        function removeDataDivs(element){
            // Get rid of the hidden divs.
            var dataElement;
            var abortLoop = 0;
            do {
                abortLoop += 1;
                dataElement = element[0].querySelector('.hiddenDiv');
                if(dataElement != null){
                    angular.element(dataElement).remove();
                }
                if(abortLoop > 50){
                    break;
                }
            } while (dataElement != null);
        }

        function createPrintWindow(printTemplate, scope) 
        {
            
            var lang = PageLanguageService.getPageLanguage();
            var printableSection = $templateCache.get("dash/template/printable/"+printTemplate+".html");

            //This is a workaround for iOS.
            //In iOS we cant open a new tab, add printableSection to that tab and then print.
            //Instead we are just appending printableSection to #content and then running window.print()
            if(DetectMobileOSService.getMobileOperatingSystem() == 'iOS'){
                var hasPrintElem = document.getElementsByClassName('printable-section-parsys');
                if (hasPrintElem.length > 0) {
                    jQuery('.printable-section-parsys').remove();
                }
                jQuery("#content").append(printableSection);
                setTimeout(window.print(), 1000);
            }
            //if NOT iOS, then print by adding printableSection to a new tab
            else{
                // This all happens outside the angular context, links will work but buttons and anything else that relies on angular won't
                // It's possible to put this in with some effort, but that type of functionality shouldn't be needed in a print window.
                var printWindow = window.open('', 'PRINT', '');

                printWindow.document.write('<html lang="'+lang+'"><head><title></title>');
                printWindow.document.write('</head><body >');

                printWindow.document.write(printableSection);
                printWindow.document.write('</body></html>');

                printWindow.focus(); // necessary for IE >= 10*/

                printWindow.print();

                //If the desired behavior is to close the window after printing:
                printWindow.document.close(); // necessary for IE >= 10
                printWindow.close();

                //console.log(printableSection);
            }
            return true;
        }
    }
})();

