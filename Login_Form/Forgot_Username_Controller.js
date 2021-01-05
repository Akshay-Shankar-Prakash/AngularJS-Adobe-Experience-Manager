;(function() {
  'use strict';

  angular
    .module('dash')
    .controller('ForgotUsernameController', ForgotUsernameController);

  function ForgotUsernameController($rootScope,
                                    $attrs,
                                    $sce,
                                    $q,
                                    $scope,
                                    $timeout,
                                    RedirectService,
                                    ngDialog,
                                    Mod10Service,
                                    BinService,
                                    LENGTH_PARAM,
                                    SessionStorageService,
                                    ErrorMessageService,
                                    EncryptionService,  
                                    RetrievePanCertService,
                                    InputFilterService,
                                    RecoverUsernameService,
                                    ServerTimeService,
                                    CaptchaService) {
    
    var stopBlurAfterCardMask = false;
    var removeBlurDelay;
    var buttonShakeTimer;
    var redirectLocation;
    var vm = this;

    angular.extend(vm, {
      input: {
        card: '',
        cvc: '',
        birthDate: ''
      },
      errors:{
        cvc: false,
        card: false,
        dateOfBirth: false,
        incorrectData: false,
        incorrectEntry: false,
        cardNotFound: false,
        noProfileForCard: false,
        backendFail: false,
        noTenuredEmail: false
      },
      showLoadingOverlay: 'on',
      serverTime: undefined,
      emailSent: false,
      buttonLoading: false,
      buttonShake: false,
      onBlurCard: onBlurCard,
      onChangeCard: onChangeCard,
      onBlurCvc: onBlurCvc,
      onChangeCvc: onChangeCvc,
      onBlurDob: onBlurDob,
      onChangeInput: onChangeInput,
      submit: submit,
      aodaClick: aodaClick,
      showErrorMessages: showErrorMessages,
      redirect: redirect,
      setRedirectLocation: setRedirectLocation
    });
      
    init();
        
    function init() {
      $q.when(ServerTimeService.getServerTime())
      .then(function(response){
        _setBlurLoaderTo('off');
        vm.serverTime = response;

      })
      .catch(function(error){
        _setBlurLoaderTo('error');
      });

      $scope.$on('destroy', function(){
        $timeout.cancel(buttonShakeTimer);
        $timeout.cancel(removeBlurDelay);
      });

    }

    function setRedirectLocation(redirectI18nKey){
      redirectLocation = Granite.I18n.get(redirectI18nKey);
    }

    function onBlurCard() {

      // Only apply validations if form input is dirty
      if(vm.form.card.$dirty){
        _clearFieldErrors('card');
        
        if(stopBlurAfterCardMask === false){
          var cardNumber = _clearCardNumber(vm.input.card);

          var _noCardNumber = function(){
            if (!cardNumber) {
              // If there is no card number, the required error message should show.
              vm.form.card.$setValidity('required', false);

              vm.errors.card = true;
              return true;
            }

          };

          var _lengthInvalid = function(){
            if (!_isValidLength(cardNumber, LENGTH_PARAM.card)) {
              vm.form.card.$setValidity('panLength', false);
              // console.log(vm.form);
              // vm.isErrorCardNumberLength = true;

              vm.errors.card = true;
              // vm.creditcardFieldError = true;

              return true;
            } 
          };


          var _mod10Fail = function(){
            if(!Mod10Service.luhnCheck(cardNumber)) {

              vm.form.card.$setValidity('mod10', false);
              // vm.isErrorCardNumberMod = true;

              vm.errors.card = true;
              // vm.creditcardFieldError = true;

              return true;
            }
          };

          return _noCardNumber() ? false : _lengthInvalid() ? false : _mod10Fail() ? false : true;
        }

      }
    }

    function onChangeCard() {
      vm.errors.card = false;
    }

    function onBlurCvc() {
      if(vm.form.cvc.$dirty){

        _clearFieldErrors('cvc');

        var _noCvc = function(){
          if (_isEmpty(vm.input.cvc)) {
            vm.form.cvc.$setValidity('required', false);
            vm.errors.cvc = true;
            return true;
          }
        };

        var _cvcLengthInvalid = function(){
          if(!_isValidLength(vm.input.cvc, LENGTH_PARAM.cvc)) {
            vm.form.cvc.$setValidity('cvcLength', false);
            vm.errors.cvc = true;
            return true;
          }
        };

        return  _noCvc() ? false : _cvcLengthInvalid() ? false : true;
      }
    }

    function onChangeCvc() {
      vm.errors.cvc = false;
    }

    function _clearFieldErrors(field){
      if(field === ''){
          vm.errors.incorrectEntry = false;
          vm.errors.incorrectData = false;
          vm.errors.cardNotFound = false;
          vm.errors.noProfileForCard = false;
          vm.errors.backendFail = false;
          vm.errors.noTenuredEmail = false;
      } else {
        angular.forEach(vm.form[field].$error, function(value, key) {
          // Let required be handled by angular
          if(key != 'required'){
            vm.form[field].$setValidity(key, true);
          }
        });
      }




      vm.errors[field] = false;
    }

    function onChangeInput(inputName) {
        vm.errors[inputName] = false;
    }

    function onBlurDob() {          
        //if input field is invalid, set red bg
        if((vm.form.dateOfBirth.$invalid && vm.form.dateOfBirth.$dirty)){                      
            vm.errors.dateOfBirth = true;
        }
    }

    function showErrorMessages(field){   
        return vm.errors[field];
    }

    function _setFieldsDirty(){
      vm.form.card.$dirty = true;
      vm.form.cvc.$dirty = true;
      vm.form.dateOfBirth.$dirty = true;
    }

    function aodaClick($event,elemID){
        if($event.which === 13 
        || $event.which === 32){
            document.getElementById(elemID).click(); 
        }

    }
      
    // function displayErrorMsg(prefix,error){
    //     switch(error.data.statusCode){              
    //       default:
    //         vm.form.card.$setValidity('cardError', false);        
    //         vm.cardErrorMessage = $sce.trustAsHtml( ErrorMessageService.getErrorMessage(prefix,error));
    //     }            
    //     return error;
    // }

    function _transformCardNumber(cardNumber){
      return cardNumber ? '•••• •••• •••• ' + cardNumber.substr(-4, 4) : '';
    }

    function _isEmpty(value) {
      return (!value || 0 === value.length);
    }

    function _isValidLength(number, length) {
      var isValid;

      if (number) {
        isValid = number.length === length ? true : false;
      }

      return isValid;
    }

    function _clearCardNumber(cardNumber) {
      return cardNumber ? cardNumber.replace(/ /g, '') : false;
    }
      
  
    function displayLockoutPopup(type){
      switch(type){
        case "cvc":
          var popup = ngDialog.open({ template: '24hourCvcLock', preCloseCallback:function(){RedirectService.redirect(redirectLocation);} });         

      }   
    }

    function _clearErrors(){
      // Include clearing errors for date of birth

      _clearFieldErrors('card');
      _clearFieldErrors('cvc');
      _clearFieldErrors('dateOfBirth');
      _clearFieldErrors('');

    }    


    function openDialog(dialogName){
        jQuery('#'+dialogName).modal('show');            
    }

    function encryptValue(cert, value){
      var cipherText="";
      //if(vm.enrollmentType==="addCard"){
        // console.log("encrypting with cert:");
        // console.log(cert);
        cipherText = EncryptionService.encryptValue(cert, value);
        // console.log('cipher Text:' + cipherText);

      return cipherText;
    }

    function _shakeButton(){
      vm.buttonShake = true;
      buttonShakeTimer = $timeout(function(){
        vm.buttonShake = false;
      }, 0);
    }

    function redirect($event){

      if(InputFilterService.enterSpaceOrMousedown($event)){

        //timeout is used so cleanup will occur after any other events that trigger
        $timeout(function() {
          _clearFields();
          _clearErrors();
          vm.form.$setPristine();
        },0);
        
        //A longer timeout is required so visual clean up on IOS completes before navigation
        $timeout(function() {
          RedirectService.redirect(redirectLocation);
        },150);
      }
    }

    function _clearFields(){
      vm.input.card = '';
      vm.input.cvc = '';
      vm.input.birthDate = '';
    }

    function _testisValidCard(cardNumber) {

      var data = '';
        vm.form.card.$setValidity('cardError', true);
        vm.emailSent = true;
    }

    function _validationBinCard(cardNumber) {
      
      return BinService.getBinList()
        .then(function(response) {
          var binData = response.data;
          var isFind;

          isFind = _.some(binData, function(key, value) {
            return value === cardNumber.substr(0, value.length);
          });

          if (isFind) {
            vm.form.card.$setValidity('cardBin', true);
            vm.errors.card = false;
            return true;
          } else {
            vm.errors.card = true;
            vm.form.card.$setValidity('cardBin', false);
            // clear other fields
            vm.input.cvc = '';
            vm.input.birthDate = '';
            vm.errors.cvc = false;
            vm.errors.dateOfBirth = false;
            return false;
          }
        })
        .catch(function(error) {
          return error;
        });
        
    }

      
    function _getCertAndRecover() {

      return RetrievePanCertService.getCertNoHeaders()
        .then(function(response){
          // console.log("successfully got a cert");
          // console.log('cert: ' + response.panCertificate);
          var panCert = response.panCertificate;

          return panCert; 
        })
        .catch(function(error){
          console.log('error getting cert');
          return error;
      });

      
    }

    // Begin actual recoverUsername

    function _recoverUsername(cardNumber, panCert){
        // data for dss
        var data = {
          'panCipherText': encryptValue(panCert, cardNumber),
          'cvcCipherText': encryptValue(panCert, vm.input.cvc),
          'dateOfBirth': vm.input.birthDate           
        };

        CaptchaService.ready
        .then(function () {return CaptchaService.getToken('ForgotUsername', data)})
        .then(function(data) {
          RecoverUsernameService.recoverUsername(data)
          .then(function(response) {
                vm.form.card.$setValidity('cardError', true);
                vm.input.card = _transformCardNumber(response.data.maskedCardNbr);
                vm.emailSent = true;
                      
          })
          .catch(function(error) {
              // Clear the stored time to address any errors where it claims that today is tomorrow in inline validation
              // The misreporting will stop when the user refreshes. This one does not have a significant impact as
              // birthdates less than 16 years into the past will fail against the backend anyway.
              ServerTimeService.clearStoredServerTime();
              switch (error.data.statusCode) {
                case '40004':
                  // Card number invalid
                  vm.errors.incorrectData = true;
                  vm.errors.incorrectEntry = true;
                  break;
                case '40005':
                  // CVC number invalid
                  vm.errors.incorrectData = true;
                  vm.errors.incorrectEntry = true;
                  break;
                case '40050':
                  // DOB invalid
                  vm.errors.incorrectData = true;
                  vm.errors.incorrectEntry = true;
                  break;
                case '40100':
                  // Profile doesn't have a tenured email address
                  vm.errors.incorrectData = true;
                  vm.errors.noTenuredEmail = true;
                  break;
                case '40303':
                  // Card not found in system
                  vm.errors.incorrectData = true;
                  vm.errors.cardNotFound = true;
                  break;
                case '40400':
                  // A user profile was not found for this card
                  vm.errors.incorrectData = true;
                  vm.errors.noProfileForCard = true;
                  break;
                case '40902':
                  // CVC number invalid, retry attempts remain
                  vm.errors.incorrectData = true;
                  vm.errors.incorrectEntry = true;                
                  break;
                case '42900':
                  // CVC number invalid, no more retry attempts remain
                  displayLockoutPopup("cvc");
                  break;
                default:
                  vm.errors.incorrectData = true;
                  vm.errors.backendFail = true;  
              }
              _shakeButton();
          });
        });
    }

    // End actual recoverUsername 

    // Begin actual submit

    function submit($event) {
      if(!vm.emailSent){        
        _setFieldsDirty();

        onBlurDob();
        onBlurCvc();
        onBlurCard();
        
        if(vm.form.$invalid){
          $scope.$emit('dash:public-page-form-submit:focusFirstInvalid');
          _shakeButton();
          return false;
        } 

        vm.buttonLoading = true;

        var cardNumber = _clearCardNumber(vm.input.card);
        
        $q.when(_validationBinCard(cardNumber))
          .then(function(response) {
            if(response){
              // console.log('validationBin:' + response);
              vm.buttonLoading = false;
              $q.when(_getCertAndRecover())
              .then(function(panCertCut){
                _recoverUsername(cardNumber, panCertCut);
              })
              .catch(function(getCertError){
                console.error("Error getting cert");
                console.log(getCertError);
              });
            } else {
              vm.buttonLoading = false;
               _shakeButton();
               console.error("card number not found in validation bin");
            }
            
          })
          .catch(function(error){
            vm.buttonLoading = false;
            console.log('validationBin error');
            return error;
          });
      } else {
        RedirectService.redirect(Granite.I18n.get("LGN-FORGOT-REDIRECT"));
      }

    }

    // End actual submit

    function _setBlurLoaderTo(value){
        removeBlurDelay = $timeout(function() {
          vm.showLoadingOverlay = value;
        }, 0);
    }




    // //Testing Functions:
    // // Begin test submit


    // function submit($event) {
    //   if(!vm.emailSent){
    //     _clearErrors();
    //     _setFieldsDirty();

    //     onBlurDob();
    //     onBlurCvc();
    //     onBlurCard();
        
    //     if(vm.form.$invalid){
    //       _shakeButton();
    //       return false;
    //     } 

    //     vm.buttonLoading = true;

    //     var cardNumber = _clearCardNumber(vm.input.card);
        
    //     $q.when(_validationBinCard(cardNumber))
    //       .then(function(response) {
    //         if(response){
    //           console.log('validationBin:' + response);
    //           vm.buttonLoading = false;
    //           _recoverUsername(cardNumber,'');
    //         } else {
    //           vm.buttonLoading = false;
    //            _shakeButton();
    //           return response;
    //         }
            
    //       })
    //       .catch(function(error){
    //         vm.buttonLoading = false;
    //         console.log('validationBin error');
    //         return error;
    //       });
    //   } else {
    //     RedirectService.redirect(Granite.I18n.get("LGN-FORGOT-REDIRECT"));
    //   }
      
    // }

    // // End test submit

    // // Begin test recover username

    // function _recoverUsername(cardNumber, panCert){

    //     // data for mock
    //     var data = {
    //       'panCipherText': cardNumber,
    //       'cvcCipherText': vm.input.cvc,
    //       'dateOfBirth': dobReformat     
    //     };


    //     console.log("dataPosted");
    //     console.log(data);

    //     RecoverUsernameService.recoverUsername(data)
    //       .then(function(response) {
    //         vm.form.card.$setValidity('cardError', true);
    //         vm.input.card = _transformCardNumber(response.data.maskedCardNbr);
    //         vm.emailSent = true;
                      
    //       })
    //       .catch(function(error) {
    //         console.error("error");
    //         console.log(error);
    //           switch (error.data.statusCode) {
    //             case '40004':
    //               // Card number invalid
    //               _shakeButton();
    //               vm.errors.incorrectData = true;
    //               vm.errors.incorrectEntry = true;
    //               break;
    //             case '40005':
    //               // CVC number invalid
    //               _shakeButton();
    //               vm.errors.incorrectData = true;
    //               vm.errors.incorrectEntry = true;
    //               break;
    //             case '40050':
    //               // DOB invalid
    //               console.log("dob invalid");
    //               _shakeButton();
    //               vm.errors.incorrectData = true;
    //               vm.errors.incorrectEntry = true;
    //               break;
    //             case '40100':
    //               // Profile doesn't have a tenured email address
    //               _shakeButton();
    //               vm.errors.incorrectData = true;
    //               vm.errors.noTenuredEmail = true;
    //               break;
    //             case '40303':
    //               // Card not found
    //               _shakeButton();
    //               vm.errors.incorrectData = true;
    //               vm.errors.cardNotFound = true;
    //               break;
    //             case '40400':
    //               // A user profile was not found for this card
    //               _shakeButton();
    //               vm.errors.incorrectData = true;
    //               vm.errors.noProfileForCard = true;
    //               break;
    //             case '40902':
    //               // CVC number invalid, retry attempts remain
    //               _shakeButton();
    //               vm.errors.incorrectData = true;
    //               vm.errors.incorrectEntry = true;                
    //               break;
    //             case '42900':
    //               // CVC number invalid, no more retry attempts remain
    //               _shakeButton();
    //               displayLockoutPopup("cvc");
    //               break;
    //             default:
    //                vm.errors.incorrectData = true;
    //                vm.errors.backendFail = true;
    //               _shakeButton();
    //           }
    //       });
    // }

    // // End test recover username

  }
}());