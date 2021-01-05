;(function()
{
  angular.module('dash').controller('glbImageController', glbImageController)
  function glbImageController($rootScope,$scope,$window, $element)
    {
        var vm = this;

        var independentClassId = undefined;
        var b_s_displayType = "block";
        var b_s_backgroundColour = "None";
        var b_s_opacity = "None";
        var b_s_borderType = "None";
        var b_s_borderColour = "None";
        var b_s_borderRadius = "None";
        var b_s_height = "None";
        var b_s_width = "None";
        var b_s_paddingLeft = "None";
        var b_s_paddingRight = "None";
        var b_s_paddingTop = "None";
        var b_s_paddingBottom = "None";
        var b_s_margin = "None";
        var b_s_float = "None";
        var b_s_vertical_align = "baseline";
        var b_s_boxShadow = "None";
        var b_s_max_height;
        var b_s_min_height;
        var b_s_max_width;
        var b_s_min_width;


        angular.extend(vm,
        {
          b_image: '',
          b_imageAlt: '',
          b_link: '',
          showLink: false,
          noShowLink: false,
          removeHide: false,
          initValues: initValues

        });
        
        function initValues(button_independentID, 
                            button_style_displayType,
                            button_style_backgroundColour, 
                            button_style_opacity, 
                            button_style_borderType, 
                            button_style_borderColour, 
                            button_style_borderRadius,  
                            button_style_height,
                            button_style_max_height,
                            button_style_min_height,
                            button_style_width,
                            button_style_max_width,
                            button_style_min_width,
                            button_style_paddingLeft, 
                            button_style_paddingRight, 
                            button_style_paddingTop, 
                            button_style_paddingBottom, 
                            button_style_margin,
                            button_style_float, 
                            button_style_vertical_align, 
                            button_style_boxShadow,
                            button_image,
                            button_image_alt,
                            button_link){


            independentClassId = button_independentID;
            b_s_displayType = button_style_displayType;
            b_s_backgroundColour = button_style_backgroundColour;
            b_s_opacity = button_style_opacity;
            b_s_borderType = button_style_borderType;
            b_s_borderColour = button_style_borderColour;
            b_s_borderRadius = button_style_borderRadius;
            b_s_height = button_style_height;
            b_s_max_height = button_style_max_height;
            b_s_min_height = button_style_min_height;
            b_s_width = button_style_width;
            b_s_max_width = button_style_max_width;
            b_s_min_width = button_style_min_width;
            b_s_paddingLeft = button_style_paddingLeft;
            b_s_paddingRight = button_style_paddingRight;
            b_s_paddingTop = button_style_paddingTop;
            b_s_paddingBottom = button_style_paddingBottom;
            b_s_margin = button_style_margin;
            b_s_float = button_style_float;
            b_s_vertical_align = button_style_vertical_align;
            b_s_boxShadow = button_style_boxShadow;
            vm.b_image = button_image;
            vm.b_imageAlt = button_image_alt;
            vm.b_link = button_link;



            if(button_link !== ''){
              vm.showLink = true;
              vm.noShowLink = false;
            } else {
              vm.showLink = false;
              vm.noShowLink = true;
            }


            setStyle();
        }

        function setStyle()
        {

          // Start variable declaration
          var dot = ".";
          var classTag = independentClassId;

          var buttonAttributes;

          if(classTag !== null && classTag !== undefined && classTag !== ''){
            var className = dot.concat(independentClassId);
            buttonAttributes = document.querySelector(className);
          }

          // Start css push
          if(buttonAttributes !== null && buttonAttributes !== undefined){
              buttonAttributes.style.display = b_s_displayType;
              buttonAttributes.style.backgroundColor = b_s_backgroundColour;
              buttonAttributes.style.opacity = b_s_opacity;
              buttonAttributes.style.border = b_s_borderType;
              buttonAttributes.style.borderColor = b_s_borderColour;
              buttonAttributes.style.borderRadius = b_s_borderRadius;
              buttonAttributes.style.height = b_s_height;
              buttonAttributes.style.maxHeight = b_s_max_height;
              buttonAttributes.style.minHeight = b_s_min_height;
              buttonAttributes.style.width = b_s_width;
              buttonAttributes.style.maxWidth = b_s_max_width;
              buttonAttributes.style.minWidth = b_s_min_width;
              buttonAttributes.style.paddingLeft = b_s_paddingLeft;
              buttonAttributes.style.paddingRight = b_s_paddingRight;
              buttonAttributes.style.paddingTop = b_s_paddingTop;
              buttonAttributes.style.paddingBottom = b_s_paddingBottom;
              buttonAttributes.style.margin = b_s_margin;
              buttonAttributes.style.float = b_s_float;
              buttonAttributes.style.verticalAlign  = b_s_vertical_align;
              buttonAttributes.style.boxShadow = b_s_boxShadow;
          }

          vm.removeHide = true;
        }

 
  }
})();