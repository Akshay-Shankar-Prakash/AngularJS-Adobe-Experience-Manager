;(function() {
    'use strict';

    angular
        .module('dash')
        .controller('LoginController', LoginController);

    function LoginController(  $scope,
                                $q,
                                $window,
                                RedirectService,
                                RememberMeStore,
                                SessionStorageService,
                                FormPostService,
                                queryParameterService,
                                ServerTimeService,
                                $timeout,
                                InputValidations,
                                CaptchaService,
                                PegaChatService,
                                BACKEND_URL) {

        var vm = this;
        var timeout;
        angular.extend(vm, {
            input: {
                username: '',
                loginPassword: '',
                remember: true
            },
            errors: {
                username: false,
                loginPassword: false             
            },
            showErrorLogin: false,
            buttonShake: false,
            buttonLoading: false,
            locale: 'en',  
            onBlurInput: onBlurInput, 
            onChangeInput: onChangeInput,
            showErrorMessages: showErrorMessages,
            aodaClick: aodaClick,
            aodaBlur:aodaBlur,
            submit: submit,
            checkUrl: checkUrl
        });

        init();
        
        //function to test if local storage is avaiable in browser
        function sessionStorageTest(){ 
            try {
              SessionStorageService.setData('lsTest','lsTest');
              SessionStorageService.removeData('lsTest');
              return true;
            } catch(e) {
              return false;
            }
        }
        function setUpLoginController(){
            //remove all session storage
            $window.sessionStorage.clear();
            vm.locale = Granite.I18n.getLocale();
            var store = RememberMeStore.get();

            if (store && store.email) {
                vm.input.username = store.email;
            }
            if ((store && store.email === '') || !store || (store && !store.email)) {
                vm.input.remember = false;
            }
            vm.checkUrl();
            $scope.$on('destroy', function(){
                $timeout.cancel(timeout);
            });
        }

        function init() {
            if(sessionStorageTest() === true){
                //session storage is avaiable in the browser, so continue setting up login controller
                setUpLoginController();
            }else{
                //session storage is not avaiable in the browser, so show an error modal
                timeout = $timeout(function(){
                    jQuery('#session_storage_modal').modal('show');
                },0);
            }

            PegaChatService.clearCookie();
        }  
        
        function checkPassword(inputName){
            //if true, setValidity to false so that the error message shows.
            if (InputValidations.hasQuotes(vm.input.loginPassword)) {
                vm.form.loginPassword.$setValidity('passwordHasQuotes', false);
            }
            //else don't show error message.
            else{
                vm.form.loginPassword.$setValidity('passwordHasQuotes', true);
            }
        }
        function onBlurInput(inputName) {   
            if(inputName == "loginPassword"){
                checkPassword(inputName);
            }
            //if input field is invalid, set red bg
            if( (vm.form[inputName].$invalid && vm.form[inputName].$dirty)
              || (vm.form[inputName].$invalid && vm.form.$submitted) ){                      
                vm.errors[inputName] = true;
            }
        } 

        function onChangeInput(inputName) {
            vm.errors[inputName] = false;
        }

        function showErrorMessages(field){   
            if(vm.form[field] != undefined 
               && ( vm.form[field].$modelValue != undefined || vm.form[field].$modelValue != '' )) {
                return vm.form[field].$touched && vm.errors[field] || vm.errors[field];
            }
        }

        function checkFormFields(){
            checkPassword('loginPassword');
            //will loop through the form object and find invalid form fields
            angular.forEach(vm.form, function(value, key) {
                if (typeof value === 'object' && value.hasOwnProperty('$modelValue') && value.$invalid){
                    // value.$name contains the invalid form field name.
                    vm.errors[value.$name] = true;
                }
            });
        }

        function aodaClick($event,elemID){
            if($event.which === 13 
            || $event.which === 32){
                $event.preventDefault();
                document.getElementById(elemID).click(); 
            }
        }
        function aodaBlur($event, elemID) {

            if ($event.keyCode === 27 || $event.which === 27) {
                document.getElementById(elemID).blur();
            }

        }
        function continueSubmit() {
            vm.buttonLoading = true;
            // Make sure the session store is clear
            if(sessionStorageTest() === true){ $window.sessionStorage.clear(); }
          
            var email;

            if (vm.input.remember) {
                email = vm.input.username;
            } else {
                email = '';
            }
            RememberMeStore.set({email: email});

            CaptchaService.ready
            .then(function() {return CaptchaService.getToken('Login')})
            .then(function(token) {
                // Begin Form Post
                var namesObj = {username: "username", password: "password"};
                var valuesObj = {username: vm.input.username, password: vm.input.loginPassword};

                if (token !== null) {
                    //If token isn't null use recaptcha
                    namesObj.captcha = "g-recaptcha-response";
                    valuesObj.captcha = token
                }

                FormPostService.formPost(BACKEND_URL + "/authn_l1", namesObj, valuesObj);
                // End Form post
            });
        }
        function submit($event){
            vm.buttonShake = false;
            if(vm.form.$invalid){
                vm.buttonShake = true;
                timeout = $timeout(function(){
                    vm.buttonShake = false;
                },0);
            } 
            
            //check form for invalid fields
            checkFormFields();
            
            if(vm.form.$valid 
               && !vm.form.$pristine){
                vm.buttonShake = false;                
                continueSubmit();   
            }else{
                vm.buttonLoading = false;
                $scope.$emit('dash:public-page-form-submit:focusFirstInvalid');
            }
        }

        function checkUrl(){
            var queryParam = queryParameterService.getQueryParamValue('rc');
            if(queryParam){
                vm.showErrorLogin = true;
                vm.errors.login = Granite.I18n.get("LOGIN-ERR"+queryParam);
            }
        }
    }
}());










//************ OLD LoginController. Might need this for when CA/Security is enabled ***********************


//;(function() 
//{
//  'use strict';
//  angular.module('dash').constant('STATUS_ERROR', {unauthorized: 401}).controller('LoginController', LoginController);
//  function LoginController(RedirectService, RememberMeStore, LoginService, TokenStore, $attrs, $scope, STATUS_ERROR) 
//  {
//        var buttonShakeTimer;
//      var vm = this;
//      angular.extend(vm, 
//      {
//          input: 
//          {
//              email: '',
//              password: '',
//              remember: true
//          },
//          errors: {
//              usernameField: false,
//              loginInfo: false,
//              blankUsername: false,
//              blankPassword: false
//          },
//          buttonLoading: false,
//            buttonShake: false,
//          showErrorLogin: false,
//          isDisabledBtn: isDisabledBtn,
//          submit: submit,
//          changeUsernameField: changeUsernameField,
//            changePasswordField: changePasswordField,
//            checkUsernameEmpty: checkUsernameEmpty,
//            checkPasswordEmpty: checkPasswordEmpty,
//          aodaClick: aodaClick
//      });
//      init();
//      function init() 
//      {
//          vm.buttonLoading = false;
//          var store = RememberMeStore.get();
//          if (store && store.email) 
//          {
//              vm.input.email = store.email;
//          }
//          if (store && store.email === '') 
//          {
//              vm.input.remember = false;
//          }
//            $scope.$on('destroy', function(){
//              $timeout.cancel(buttonShakeTimer);
//          });
//      }
//      function isDisabledBtn() 
//      {
//          if(vm.buttonLoading == true)
//          {
//              return true;
//          }
//          else
//          {
//              var emailLength;
//              var passwordLength;
//              if (!angular.isUndefined(vm.input.email))
//              {
//                  emailLength = vm.input.email.length >= 1;
//              }
//              if (!angular.isUndefined(vm.input.password)) 
//              {
//                  passwordLength = vm.input.password.length >= 1;
//              }
//              return (emailLength && passwordLength) ? false : true;
//          }
//      }
//      function changeUsernameField() {
//          vm.errors.usernameField = false;
//          vm.errors.loginInfo = false;
//          vm.errors.blankUsername = false;
//      }
//
//      function changePasswordField(){
//          vm.errors.loginInfo = false;
//          vm.errors.blankPassword = false;
//      }
//
//      function checkUsernameEmpty() {
//          if(vm.form.username.$dirty
//          && vm.form.username.$invalid){
//              vm.errors.usernameField = true;
//              vm.errors.blankUsername = true;
//          }
//      }
//
//      function checkPasswordEmpty() {
//          if(vm.form.password.$dirty
//          && vm.form.password.$invalid){
//              vm.errors.blankPassword = true;
//          }
//      }
//      function aodaClick($event,elemID){
//            if($event.which === 13 
//            || $event.which === 32){
//                event.preventDefault();
//                document.getElementById(elemID).click(); 
//            }
//
//        }
//        function shakeButton(){
//          vm.buttonShake = true;
//          buttonShakeTimer = $timeout(function(){
//              vm.buttonShake = false;
//          },0);
//          return false;
//      }
//      function submit($event) 
//      {
//            ($event.preventDefault());
//          vm.buttonLoading = true;
//          if(vm.input.email && vm.input.email.length > 0 && vm.input.password && vm.input.password.length > 0 )
//          {
//              vm.errors.blankUsername = false;
//              vm.errors.blankPassword = false;
//                
//              // there are no errors              
//              if (vm.form.$invalid )
//              {
//                    shakeButton();                
//                  return false;
//              }
//              TokenStore.clear();
//              LoginService.signOn('username='+vm.input.email+'&password='+ vm.input.password + '&login-form-type=pwd')
//              .then(function(response) 
//              {
//                  console.log('LoginController:'+response);
//                  var email;
//                  if (vm.input.remember) 
//                  {
//                      email = vm.input.email;
//                  } 
//                  else 
//                  {
//                      email = '';
//                  }
//                  RememberMeStore.set({email: email});
//                  TokenStore.set({token: response.data.token});
//                  //RedirectService.redirect($attrs.loginRedirect);
//              })
//              .catch(function(response) 
//              {
//                  if (+response.status === STATUS_ERROR.unauthorized) 
//                  {
//                      vm.errors.usernameField = true;
//                        vm.errors.loginInfo = true;
//                        vm.errors.blankUsername = true;
//                  }
//                    vm.buttonLoading = false;
//              })
//              .finally(function() 
//              {
//                  var localStore = RememberMeStore.get();
//                  vm.input = 
//                  {
//                      email: vm.input.email,
//                      password: '',
//                      remember: (localStore.email !== '') ? true : false
//                  };
//                  vm.buttonLoading = false;
//              });
//          }
//          else
//          {
//              // There are errors
//              if(vm.input.email == null && vm.input.password == null)
//              {
//                  // no email or password
//                  vm.errors.usernameField = true;
//                    vm.errors.loginInfo = true;
//                    vm.errors.blankUsername = true;
//                  vm.errors.blankPassword = true;
//              }
//              else if(vm.input.email == null)
//              {
//                  // no email
//                  vm.errors.usernameField = true;                    
//                    vm.errors.blankUsername = true;                   
//              }
//              else
//              {
//                  // no password
//                  vm.errors.blankPassword = true;
//              }
//              vm.buttonLoading = false;
//          }
//      }
//  }
//}());
