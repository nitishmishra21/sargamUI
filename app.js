// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngResource', 'ion-floating-menu'
  ,'starter.directives', 'ngCordovaOauth', 'jett.ionic.content.banner', 'ion-alpha-scroll', 'ngCordova','slickCarousel'
])

  .run(function ($ionicPlatform,$cordovaNativeAudio, $state, $rootScope, $ionicHistory, $ionicNavBarDelegate, $ionicContentBanner, $cordovaToast, FireBaseTokenService) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      $ionicHistory.nextViewOptions({
        disableBack: true
      });



       $cordovaNativeAudio
   .preloadSimple('click', 'audio/C_sharp.mp3')
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.log(error);
   });

   $cordovaNativeAudio.preloadComplex('click', 'audio/C_sharp.mp3', 1, 1)
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.error(error);
   });

   // A#
   $cordovaNativeAudio
   .preloadSimple('A_sharp', 'audio/A_sharp.mp3')
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.log(error);
   });

   $cordovaNativeAudio.preloadComplex('A_sharp', 'audio/A_sharp.mp3', 1, 1)
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.error(error);
   });
   
   // A
   $cordovaNativeAudio
   .preloadSimple('A', 'audio/A.mp3')
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.log(error);
   });

   $cordovaNativeAudio.preloadComplex('A', 'audio/A.mp3', 1, 1)
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.error(error);
   });

   // B
   $cordovaNativeAudio
   .preloadSimple('B', 'audio/B.mp3')
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.log(error);
   });

   $cordovaNativeAudio.preloadComplex('B', 'audio/B.mp3', 1, 1)
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.error(error);
   });
   
   // C#
   $cordovaNativeAudio
   .preloadSimple('C_sharp', 'audio/C_sharp.mp3')
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.log(error);
   });

   $cordovaNativeAudio.preloadComplex('C_sharp', 'audio/C_sharp.mp3', 1, 1)
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.error(error);
   });

   // C
   $cordovaNativeAudio
   .preloadSimple('C', 'audio/C.mp3')
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.log(error);
   });

   $cordovaNativeAudio.preloadComplex('C', 'audio/C.mp3', 1, 1)
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.error(error);
   });

   // D#
   $cordovaNativeAudio
   .preloadSimple('D_sharp', 'audio/D_sharp.mp3')
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.log(error);
   });

   $cordovaNativeAudio.preloadComplex('D_sharp', 'audio/D_sharp.mp3', 1, 1)
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.error(error);
   });

   // D
   $cordovaNativeAudio
   .preloadSimple('D', 'audio/D.mp3')
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.log(error);
   });

   $cordovaNativeAudio.preloadComplex('D', 'audio/D.mp3', 1, 1)
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.error(error);
   });


   // E
   $cordovaNativeAudio
   .preloadSimple('E', 'audio/E.mp3')
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.log(error);
   });

   $cordovaNativeAudio.preloadComplex('E', 'audio/E.mp3', 1, 1)
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.error(error);
   });

   // F#
   $cordovaNativeAudio
   .preloadSimple('F_sharp', 'audio/F_sharp.mp3')
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.log(error);
   });

   $cordovaNativeAudio.preloadComplex('F_sharp', 'audio/F_sharp.mp3', 1, 1)
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.error(error);
   });

   // F
   $cordovaNativeAudio
   .preloadSimple('F', 'audio/F.mp3')
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.log(error);
   });

   $cordovaNativeAudio.preloadComplex('F', 'audio/F.mp3', 1, 1)
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.error(error);
   });

   // G#
   $cordovaNativeAudio
   .preloadSimple('G_sharp', 'audio/G_sharp.mp3')
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.log(error);
   });

   $cordovaNativeAudio.preloadComplex('G_sharp', 'audio/G_sharp.mp3', 1, 1)
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.error(error);
   });

   // G
   $cordovaNativeAudio
   .preloadSimple('G', 'audio/G.mp3')
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.log(error);
   });

   $cordovaNativeAudio.preloadComplex('G', 'audio/G.mp3', 1, 1)
	   .then(function (msg) {
      // console.log(msg);
   }, function (error) {
      // console.error(error);
   });

  //  var href = $state.href($state.current.name);
  //  console.log('Kuch dikh rha hai kya-->'+href);
  //  if (href == '#/app/playlists') {
  //   $cordovaNativeAudio.stop('click');
  //  }

      

      // window.FirebasePlugin.onTokenRefresh(function (token) {
      //   // save this server-side and use it to push notifications to this device
      //   FireBaseTokenService.post({
      //     firebase_token: token
      //   });
      //   console.log(token);
      // }, function (error) {
      //   // console.error(error);
      // });
      $ionicPlatform.registerBackButtonAction(function (event) {
        if ($rootScope.backButtonPressedOnceToExit) {
          navigator.app.exitApp();
        }
        else if ($state.current.name == "app.playlists") {
          $rootScope.backButtonPressedOnceToExit = true;
          window.plugins.toast.showShortCenter(
            "Press back button again to exit", function (a) { }, function (b) { }
          );
          setTimeout(function () {
            $rootScope.backButtonPressedOnceToExit = false;
          }, 2000); //<-- remove this line to disable the exit
        }
        else if ($state.current.name == "app.notes") {
         // window.plugins.insomnia.allowSleepAgain();
          navigator.app.backHistory();
          $ionicNavBarDelegate.showBackButton(false);
        }
        else {
          navigator.app.backHistory();
          $ionicNavBarDelegate.showBackButton(false);
        }
      }, 100);

      var contentBannerInstance;
      // document.addEventListener("online", function () {
      //   //doSomething();
      //   console.log("online");

      //   $cordovaToast.show("app is online", 'long', 'bottom').then(function (success) {
      //     console.log("The toast was shown");
      //   }, function (error) {
      //     console.log("The toast was not shown due to " + error);
      //   });
      //   if (contentBannerInstance) {
      //     contentBannerInstance();
      //     contentBannerInstance = null;
      //   }
      //   $rootScope.offline = false;
      //   window.localStorage.setItem('offline', false);
      // }, false);


      document.addEventListener("offline", function () {
        // doSomething();
        $rootScope.offline = true;
        window.localStorage.setItem('offline', true);
        if (contentBannerInstance == null) {
          contentBannerInstance = $ionicContentBanner.show({
            text: ['System Unavailable', 'Please try again later.'],
            interval: 3000,

            type: 'info',
            transition: 'vertical'
          });

          $cordovaToast.show("app is offline", 'long', 'bottom').then(function (success) {
            console.log("The toast was shown");
          }, function (error) {
            console.log("The toast was not shown due to " + error);
          });
        }
      }, false);
      console.log('root scope : ' + $rootScope.offline);
      window.plugins.googleplus.trySilentLogin(
        { 'webClientId': '889876488178-kb3uqoobp69r6pmj5cphicc3m9o5s9o4.apps.googleusercontent.com', 'offline': true },
        function (user_data) {
          window.localStorage.setItem('auth_token', user_data.idToken);
          var userDataReq={'imageUrl':user_data.imageUrl,'displayName':user_data.displayName,'email':user_data.email};
          console.log('Ye Sb App JS se ja rha h='+JSON.stringify(userDataReq));
          window.localStorage.setItem('user_data',JSON.stringify(userDataReq));
          // $state.go('app.playlists');
        },
        function (msg) {
         
          if (!window.localStorage.getItem('user_id')) {
          
            $state.go('login');
          }
        });
    });
  })
  .run(function ($interval) {
    $interval(function () {
      window.plugins.googleplus.trySilentLogin(
        { 'webClientId': '889876488178-kb3uqoobp69r6pmj5cphicc3m9o5s9o4.apps.googleusercontent.com', 'offline': true },
        function (user_data) {
          console.log("UserId: " + user_data.userId + " name: " + user_data.displayName + " email: " + user_data.email);
          window.localStorage.setItem('auth_token', user_data.idToken);
          var userDataReq={'imageUrl':user_data.imageUrl,'displayName':user_data.displayName,'email':user_data.email};
          
           window.localStorage.setItem('user_data',JSON.stringify(userDataReq));
        },
        function (msg) {
          console.log('silent login failed');
          //$state.go('login');
        }
      );
      // delete all the required localStorage variables by specifying their keys
    }, 1000 * 60 * 5);
  })
  .config(function ($stateProvider, $urlRouterProvider, $resourceProvider,$ionicConfigProvider) {
    //$resourceProvider.defaults.stripTrailingSlashes = false;
    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/loginView.html',
        controller: 'LoginCtrl'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html',
            controller: 'PlaylistsCtrl'
          }
        }
      }).state('app.share', {
        url: '/share',
        views: {
          'menuContent': {
            templateUrl: 'templates/share.html',
            controller: 'ShareCtrl'
          }
        }
      })
      .state('app.artist', {
        url: '/artist',
        views: {
          'menuContent': {
            templateUrl: 'templates/artist.html',
            controller: 'ArtistCtrl'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl'
          }
        }
      }).state('app.requestednotes', {
        url: '/requestednotes',
        views: {
          'menuContent': {
            templateUrl: 'templates/requestnotes.html',
            controller: 'RequestednotesCtrl'
          }
        }
      })
      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'templates/about.html',
            controller: 'AboutCtrl'
          }
        }
      })
      .state('app.faq', {
        url: '/faq',
        views: {
          'menuContent': {
            templateUrl: 'templates/faq.html',
            controller: 'FaqCtrl'
          }
        }
      })
      .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        }
      })
      .state('app.Alankar', {
        url: '/Alankar',
        views: {
          'menuContent': {
            templateUrl: 'templates/Alankar.html'
          }
        }
      })
      .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'PlaylistsCtrl'
          }
        }
      })
      .state('app.notes', {
        url: '/notes',
        views: {
          'menuContent': {
            templateUrl: 'templates/note.html',
            controller: 'NoteCtrl'
          }
        }
      })
      .state('app.howto', {
        url: '/howto',
        views: {
          'menuContent': {
            templateUrl: 'templates/howto.html',
            controller: 'HowtoCtrl'
          }
        }
      })
      .state('app.fav', {
        url: '/fav',
        views: {
          'menuContent': {
            templateUrl: 'templates/fav.html',
            controller: 'FavCtrl'
          }
        }
      })
      .state('app.songlist', {
        url: '/songlist',
        views: {
          'menuContent': {
            templateUrl: 'templates/songList.html',
            controller: 'SongListCtrl'
          }
        }
      })
      .state('app.cart', {
        url: '/cart',
        views: {
          'menuContent': {
            templateUrl: 'templates/cart.html',
            controller: 'CartCtrl'
          }
        }
      })
      .state('app.deals', {
        url: '/deals',
        views: {
          'menuContent': {
            templateUrl: 'templates/deals.html',
            controller: 'DealsCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('app/playlists');
  });