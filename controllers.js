  angular.module('starter.controllers', ['starter.services', 'angular-advanced-searchbox'])

    .controller('PlaylistsCtrl', function (UserSubscription,$cordovaNativeAudio,$scope, DataService, UserService, UserPrefService, CartService,
      PurchaseService, LanguageService, $rootScope, $ionicTabsDelegate, Util, Helper, Config, LocalStorage, CurrentSong, $state,
      $ionicLoading, UserRequestService, $ionicSideMenuDelegate, $http, $timeout, $ionicContentBanner, $cordovaToast, HomePageListService, HorizontalTileUtil, SongListUtil, TagService) {
      
        $scope.tanpuraToggle = {};
        $scope.stopTanpura = function (noteVariable,tanpuraToggle) {
          $rootScope.isSubscribeBannerClicked = false;

          $rootScope.subscribeBanner = function () {
          $rootScope.isSubscribeBannerClicked = true;
            $state.go('app.deals');
          };

          $timeout(function () {
            $cordovaNativeAudio.stop('A');
            $cordovaNativeAudio.stop('A_sharp');
            $cordovaNativeAudio.stop('B');
            $cordovaNativeAudio.stop('C');
            $cordovaNativeAudio.stop('C_sharp');
            $cordovaNativeAudio.stop('D');
            $cordovaNativeAudio.stop('D_sharp');
            $cordovaNativeAudio.stop('E');
            $cordovaNativeAudio.stop('F');
            $cordovaNativeAudio.stop('F_sharp');
            $cordovaNativeAudio.stop('G');
            $cordovaNativeAudio.stop('G_sharp');  
         }, 100);
         

         //subscription get data
         $scope.getsubscriptionDetails = function () {
          UserSubscription.getAll({}, function (resp1) {
            $scope.subscriptionPack = resp1;
            console.log("subscriptionPack = "+JSON.stringify($rootScope.subscriptionPack));
          });
        };
        $scope.getsubscriptionDetails();
         
        }
        $scope.stopTanpura();
        
        if($rootScope.activeTabPurchaseFlag==true){
          // alert("$rootScope.activeTabPurchaseFlag="+$rootScope.activeTabPurchaseFlag);
          $rootScope.activeTab = 'Purchased' 
          $rootScope.activeTabPurchaseFlag==false;
          
        }
    
      $scope.LatestItems = [];
      $ionicSideMenuDelegate.canDragContent(false);
      $scope.slickConfigHomeLoaded = false;
      $scope.slickConfigLatestLoaded = false;
      $scope.slickConfigTagsLoaded = false;
      $scope.hindiSongs = {"code":"hi","display":"Hindi"};
      $scope.englishSongs = {"code":"en","display":"English"};

      $scope.slickConfig = {
        enabled: true,
        autoplay: false,
        draggable: false,
        autoplaySpeed: 3000,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        prevArrow: false,
        nextArrow: false,
        method: {},
        event: {
          beforeChange: function (event, slick, currentSlide, nextSlide) {
            //// console.log("slick before called");
          },
          afterChange: function (event, slick, currentSlide, nextSlide) {
            //// console.log("slick after called");
          }
        }
      };

      $rootScope.user_data = LocalStorage.get('user_data');
      $scope.onLanguageChange = function (language) {
        /*  $ionicLoading.show({
            template: 'loading...'
          });*/

        var body = { 'language': language.code };
        LocalStorage.set('lang', language.code);
        initializeHome();
        initialize('Available');

        var userPref = new UserPrefService(body);
        userPref.$post(userPref, function (response) {
          //// console.log(response);
          // $ionicLoading.hide();

        });
        //// console.log("current lang : " + language);
      }



      $scope.onHorzontalTileClick = function (artist, type) {

        SongListUtil.setValue(artist)
        SongListUtil.setViewName(artist);
        SongListUtil.setId(type);

        $state.go('app.songlist');
      };

      $scope.onShowAll = function (type) {
        HorizontalTileUtil.setCurrType(type);

        $state.go('app.artist');
      }
      $scope.onShowAllLatest = function () {
        SongListUtil.setValue('Latest')
        SongListUtil.setViewName('Recently Added');
        SongListUtil.setId("");
        $state.go('app.songlist');

      }

      $scope.onShowAllTag = function (tag) {
        SongListUtil.setValue(tag.tag)
        SongListUtil.setViewName(tag.tag);
        SongListUtil.setId("tags");
        $state.go('app.songlist');
      }


      UserPrefService.getAll({}, function (resp) {
        // console.log("format: " + JSON.stringify(resp));
        if (!resp.active) {
          $cordovaToast.show(resp.active_msg, 'long', 'bottom').then(function (success) {
            // console.log("The toast was shown");
          }, function (error) {
            // console.log("The toast was not shown due to " + error);
          });
        }
        LocalStorage.set('notesFormat', resp.type);
        LocalStorage.set('lang', resp.language);


        initializeLanguageDropDown();
        initializeHome();
        initialize('Available');
        $rootScope.isPremium = resp.is_premium;
      }, function (err) {
        // console.log(err);
      });

      $scope.refreshHome = function () {
        UserPrefService.getAll({}, function (resp) {
          // console.log("format: " + JSON.stringify(resp));
          if (!resp.active) {
            $cordovaToast.show(resp.active_msg, 'long', 'bottom').then(function (success) {
              // console.log("The toast was shown");
            }, function (error) {
              // console.log("The toast was not shown due to " + error);
            });
          }
          LocalStorage.set('notesFormat', resp.type);
          LocalStorage.set('lang', resp.language);
  
  
          initializeLanguageDropDown();
          initializeHome();
          initialize('Available');
          $rootScope.isPremium = resp.is_premium;
        }, function (err) {
          // console.log(err);
        });
      };

      $scope.refreshHome();

      function initializeLanguageDropDown() {
        LanguageService.getAll({}, function (resp) {
          $scope.languages = resp;
          var currLang = LocalStorage.get('lang');

          if (!currLang) {
            $scope.language = resp[0];
          } else {
            angular.forEach(resp, function (item) {
              if (currLang == item.code) {
                $scope.language = item;
              }
            });
          }
        });
      }

      $scope.PopularItems = [];
      $scope.AvailableItems = [];

      CartService.getAll().$promise.then(function (resp) {
        $rootScope.badgeNumber = resp.size;
      });

      $scope.offset = -10;
      $scope.selectTab = function (str) {
        $scope.offset = -10;
        $ionicTabsDelegate.select(Util.getTabIdByName(str));
        if (str == 'Latest') {
          $scope.selectTabMoreLatest();
        } else if (str != 'Available') {
          $scope.selectTabMore(str);
        }
      }
      $scope.search = function (str) {
        $ionicLoading.show({
          template: 'Searching...'
        });
        $scope.resultsArr = [];
        var urlSearch = Config.url + 'song/getvaluelist?key=' + str;
        $http({
          method: "GET",
          url: urlSearch,
          headers: {
            // 'Authorization': Util.getToken
          }
        }).then(function mySucces(response) {

          $scope.resultsArr = response.data;
          $ionicLoading.hide();
        }, function myError(response) {
          $scope.myWelcome = response.statusText;
        });
      }

      function initializeTags() {
        //$scope.slickConfigLoaded = false;
        $ionicLoading.show({
          template: 'Loading...'
        });
        $scope.slickConfigTagsLoaded = false
        DataService.getAll({
          id: 'tags'
        }).$promise.then(function (response) {

          $scope.tags = response;
          $timeout(function () {
            $scope.slickConfigTagsLoaded = true;

            $ionicLoading.hide();
          });
        });

      }

      function initializeHomeService() {
        $ionicLoading.show({
          template: 'Loading...'
        });
        $scope.slickConfigHomeLoaded = false;
        HomePageListService.getAll({}, function (resp) {
          $scope.homePageList = resp;
          $timeout(function () {
            $scope.slickConfigHomeLoaded = true;
            $ionicLoading.hide();
          });
        });
      }

      function initializeHome() {
        initializeLatest();
        initializeTags();
        initializeHomeService();
      }

      function initializeLatest() {
        $ionicLoading.show({
          template: 'Loading...'
        });
        $scope.slickConfigLatestLoaded = false;
        var currentTabArray = 'LatestItems';
        DataService.getAll({
          offset: $scope.offset,
          value: 'Latest'
        }).$promise.then(function (resp) {
          // // console.log(angular.fromJson(resp));
          if (resp.length > 0) {
            $scope[currentTabArray] = resp;
            LocalStorage.set(currentTabArray, resp);
            $timeout(function () {
              $scope.slickConfigLatestLoaded = true;
              $ionicLoading.hide();
            });
          }

        }, function () {
          $scope[currentTabArray] = LocalStorage.get(currentTabArray);
          // LocalStorage.set(currentTabArray, resp);
          $timeout(function () {
            $scope.slickConfigLatestLoaded = true;
            $ionicLoading.hide();
          });
          // $ionicLoading.hide();
        })
      }

      /*function initialize(str) {
        var currentTabArray = str + 'Items';
        DataService.getAll({
          offset: $scope.offset,
          value: 'free'
        }).$promise.then(function (resp) {
        // // console.log(angular.fromJson(resp));
          if (resp.length > 0) {
            $scope[currentTabArray] = resp;
            LocalStorage.set(currentTabArray, resp);
          }
          $ionicLoading.hide();
        }, function () {
          $scope[currentTabArray] = LocalStorage.get(currentTabArray);
        })
      }*/

      function initialize(str) {
        var currentTabArray = str + 'Items';
        DataService.getAll({
          offset: $scope.offset,
          value: str
        }).$promise.then(function (resp) {
          // // console.log(angular.fromJson(resp));
          if (resp.length > 0) {
            $scope[currentTabArray] = resp;
            LocalStorage.set(currentTabArray, resp);
          }
          $ionicLoading.hide();
        }, function () {
          $scope[currentTabArray] = LocalStorage.get(currentTabArray);
        })
      }

      $scope.selectTabMore = function (str) {

        $rootScope.activeTab = str;
        var currentTabArray = str + 'Items';

        $ionicLoading.show({
          template: 'Loading...'
        });

        DataService.getAll({
          value: str
        }).$promise.then(function (resp) {
          // // console.log(angular.fromJson(resp));
          if (resp.length > 0) {
            $scope[currentTabArray] = resp;
            LocalStorage.set(currentTabArray, resp);

          }
          $ionicLoading.hide();
        }, function () {
          $scope[currentTabArray] = LocalStorage.get(currentTabArray);

          $ionicLoading.hide();
        })
      };

      $scope.selectTabMoreLatest = function () {
        //$scope.slickConfigLoaded = false;
        $rootScope.activeTab = 'Latest';
        /* var str = 'Latest';
        var currentTabArray = str + 'Items';
        $ionicLoading.show({
          template: 'Loading...'
        });
  
        DataService.getAll({
          value: str
        }).$promise.then(function (resp) {
          // console.log(angular.fromJson(resp));
          if (resp.length > 0) {
            $scope[currentTabArray] = resp;
            LocalStorage.set(currentTabArray, resp);
            $timeout(function () {
              $scope.slickConfigLoaded = true;
              // console.log("slick loaded");
            });
          }
          $ionicLoading.hide();
        }, function () {
          $scope[currentTabArray] = LocalStorage.get(currentTabArray);
          $timeout(function () {
            $scope.slickConfigLoaded = true;
          });
          $ionicLoading.hide();
        })*/
        initializeHome();
      };


      $scope.addToFav = function (song, str, searchStr) {
        // console.log('fav clicked');
        $ionicLoading.show({
          template: 'Loading...'
        });
        UserService.post({
          id: song._id
        }, function () {
          if (str == 'search') {
            $scope.search(searchStr);
          }
          else {
            refreshSongs(str);
          }
        });

      };

      $scope.purchaseTab = function () {
        $rootScope.activeTab = 'Purchased';
        $ionicLoading.show({
          template: 'Loading...'
        });
        $scope.purchaseItems = [];
        $scope.noPurchases = false;
        $ionicTabsDelegate.select(Util.getTabIdByName('purchase'));
        PurchaseService.getAll({

        }).$promise.then(function (resp) {
          if (resp.length > 0) {
            $scope.purchaseItems = resp;
            LocalStorage.set('songs', $scope.purchaseItems);
          } else {
            $scope.noPurchases = true;
          }
          $ionicLoading.hide();
        }, function () {
          $scope.purchaseItems = LocalStorage.get('songs');
          $ionicLoading.hide();
        })
        Helper.storeNotes();

      }
      /* $timeout(function () {
        if ($rootScope.activeTab == 'Purchased') {
          $scope.purchaseTab();
        } else if ($rootScope.activeTab == undefined) {
          $ionicTabsDelegate.select(Util.getTabIdByName('Latest'));
          $scope.selectTabMoreLatest();
        } else {
          $ionicTabsDelegate.select(Util.getTabIdByName($rootScope.activeTab));
          if ($rootScope.activeTab == 'Latest') {
            $scope.selectTabMoreLatest();
          } else {
            $scope.selectTabMore($rootScope.activeTab);
          }
        }
      }, 0)*/



      function refreshSongs(str, searchStr) {
        $scope.offset = -10;
        $scope.currentTabArray = str + 'Items';
        $scope[$scope.currentTabArray] = [];
        if (str == 'Latest') {
          $scope.selectTabMoreLatest();
        } else if (str != 'Available') {
          $scope.selectTabMore(str);
        }
      }
      $scope.onDeleteFavClick = function (song, str) {
        $ionicLoading.show({
          template: 'Loading...'
        });
        UserService.delete({
          id: song._id
        }, function () {
          if (str == 'search') {
            $scope.search(searchStr);
          }
          else {
            refreshSongs(str);
          }
        });
      }

      $scope.onBuyClick = function (song, str, searchStr) {

        if (song._source.ui_info.status.key === "buy") {
          CartService.post({
            id: song._id,
            type: LocalStorage.get('notesFormat')
          }, function (resp) {
            if (str == 'search') {
              $scope.search(searchStr);
            }
            else {
              song._source.ui_info.button_color_v_1_1 = 'grey';
              song._source.ui_info.status.value = 'In cart';
            }
            $rootScope.badgeNumber = resp.size;
          }, function () { $ionicLoading.hide(); })

        } else if (song._source.ui_info.status.key === "show" || song._source.ui_info.status.key === "Free") {
          CurrentSong.setSong(song);
          $state.go('app.notes');
        }

      }
      /*  function fetchDataService() {
          $scope[$scope.currentTabArray] = DataService.getAll();
          // console.log("success");
          $ionicLoading.hide();
        }*/

    })


    .controller('FavCtrl', function ($scope, UserService) {
      $scope.favSongs = UserService.getAll();
      $scope.deleteFav = function (song) {
        UserService.delete({
          id: song._id
        }, function () {
          $scope.favSongs = UserService.getAll();
        });
      }
    })

    .controller('DealsCtrl', function (UserSubscription,$scope, $rootScope, $state, $ionicNavBarDelegate, $ionicPopup, LocalStorage, CartService, UserPrefService, PackService, OfferService) {
      $ionicNavBarDelegate.showBackButton(false);
      PackService.getAll({}, function (resp) {

        $scope.packs = resp;

      });

      $scope.getsubscriptionDetails = function () {
        UserSubscription.getAll({}, function (resp1) {
          $rootScope.subscriptionPack = resp1;
          console.log("subscriptionPack = "+JSON.stringify($rootScope.subscriptionPack));
        });
      };
     
      $scope.getsubscriptionDetails();

      $scope.subscriptionValue =  {"count_songs":50,"enable":true,"desc_long":"Get 50 song notes for Rs 50 in this Starter Pack.","price":50,"list_url":"https://nitishmishramusic.wixsite.com/home/starterpacksonglist2","image_url":"http://104.199.194.59:80/starterpack.jpg","code_name":"starterpack","desc":"Get 50 song notes for Rs 50. Tap to get details.","name":"Starter Pack"};
      
      $scope.oneMonth =  {"name": "1 month subscription","id": "1ms","price": 10,"discount": "25","desc": "Get access to all songs for a month","enable": true};

      $scope.threeMonth =  {"name": "3 months subscription","id": "3ms","price": 10,"discount": "20","desc": "Get access to all songs for 3 month","enable": true};
      
      
      OfferService.getAll({}, function (resp) {
        $scope.offers = resp;
      });

      $scope.starterPackClicked = function (pack) {

        var confirmPopup = $ionicPopup.confirm({
          title: pack.name,
          template: "<div>" + pack.desc_long + "<a onclick='window.open(&quot;" + pack.list_url + "&quot;)'>View Songs</a></div>",
          cancelText: 'Cancel',
          okText: 'Add to cart'
        }).then(function (res) {
          if (res) {
            CartService.post({
              id: pack.code_name,
              type: LocalStorage.get('notesFormat')
            }, function (resp) {
              UserPrefService.getAll({}, function (resp1) {
                $rootScope.isPremium = resp1.is_premium;
              });
              $rootScope.badgeNumber = resp.size;
              $state.go('app.cart', null, { reload: true, notify: true });
            })
          }
        });
      }

      $scope.subscriptionClicked = function (pack) {
        console.log("API="+JSON.stringify(pack));
        var confirmPopup = $ionicPopup.confirm({
          title: "Subscription",
          template: "<div> Get access to all song notes already available in the app, new songs will be regularly added. Specific song requests may be charged by rupess ten per song.</div>",
          cancelText: 'Cancel',
          okText: 'Add to cart'
        }).then(function (res) {
          if (res) {
            CartService.post({
              id: pack
             
            }, function (resp) {
              console.log("Subscription Response"+JSON.stringify(resp));
               UserPrefService.getAll({}, function (resp1) {
                 $rootScope.isPremium = resp1.is_premium;
               });
               $rootScope.badgeNumber = resp.size;
              $state.go('app.cart', null, { reload: true, notify: true });
            })
          }
        });
      }

    })

    .controller('CartCtrl', function ($scope, CartService, LocalStorage, PurchaseService, $rootScope, $state, $ionicNavBarDelegate,
      $ionicTabsDelegate, Util, Helper) {
      $ionicNavBarDelegate.showBackButton(false);
      CartService.getAll({}, function (resp) {
        $scope.cartSongs = resp;
        $scope.cartTotal = resp.total;
      });

      $scope.deleteCart = function (song) {
        CartService.delete({
          id: song.cart_id
        }, function () {
          CartService.getAll({}, function (resp) {
            $rootScope.badgeNumber = resp.size;
            $scope.cartSongs = resp;
            $scope.cartTotal = resp.total;

          });
        });
      }
      $scope.checkOut = function () {

        CartService.getAll({}, function (resp) {
          var totalAmt = resp.total;

          $scope.cartTotal = totalAmt;
          if (totalAmt > 0) {
            var options = {
              description: 'Credits towards sargam and piano notes',
              image: 'https://static.wixstatic.com/media/34a91c_85bc47b3f9c14c8ca51107b505546176~mv2.png/v1/fill/w_360,h_358,al_c,usm_0.66_1.00_0.01/34a91c_85bc47b3f9c14c8ca51107b505546176~mv2.png',
              currency: 'INR',
              key: 'rzp_live_pDV7OTSso7O5Tx',
              amount: totalAmt * 100,
              name: 'Nitish Mishra Music',
              theme: {
                color: '#F37254'
              }
            }

            var successCallback = function (success) {

              PurchaseService.post({}, function (resp) {
                LocalStorage.set('songs', resp);
                Helper.storeNotes();
                $scope.cartSongs = CartService.getAll({}, function (resp) {
                  $rootScope.badgeNumber = resp.size;
                  $rootScope.activeTab = 'Purchased'
                  $rootScope.activeTabPurchaseFlag = true;
                  $state.go('app.playlists', null, { reload: true, notify: true });
                });
              });
              alert('payment_id: ' + success.razorpay_payment_id)
            }

            var cancelCallback = function (error) {
              alert(error.description + ' (Error ' + error.code + ')')
            };

            RazorpayCheckout.on('payment.success', successCallback);
            RazorpayCheckout.on('payment.cancel', cancelCallback);

            RazorpayCheckout.open(options);

          } else {
            PurchaseService.post({}, function (resp) {
              LocalStorage.set('songs', resp);
              Helper.storeNotes();
              $scope.cartSongs = CartService.getAll({}, function (resp) {
                $rootScope.badgeNumber = resp.size;
                $rootScope.activeTab = 'Purchased' 
               
                $state.go('app.playlists', null, { reload: true, notify: true });
              });
            });
          }
        })
      }
    })

    .controller('LoginCtrl', function ($scope, $rootScope, LoginService, $ionicPopup, $state, $cordovaOauth, $ionicLoading, LocalStorage, FireBaseTokenService) {
      $scope.data = {};

      function callUserRest(user_data) {
        //// console.log("UserId: " + user_data.userId + " name: " + user_data.displayName + " email: " + user_data.email);
        $ionicLoading.hide();
        var user = new LoginService(user_data);
        user.$post(function (response) {
          window.FirebasePlugin.getToken(function (token) {

            FireBaseTokenService.post({
              firebase_token: token
            });
            // // console.log(token);
          }, function (error) {
            console.error(error);
          });



          /*if (response.status === "new") {
            var alertPopup = $ionicPopup.alert({
              title: 'Welcome!',
              template: "Your trial period of 48 hours has started. Get access to 100 song notes for FREE. Check the 'Available Tab' for a list of all songs"
            });

            alertPopup.then(function (res) {
              $rootScope.activeTab = 'Available';
            
            });
          }*/
        });
        window.localStorage.setItem('auth_token', user_data.idToken);
        $state.go('app.playlists');
      }
      $scope.googleSignIn = function () {
        $ionicLoading.show({
          template: 'Logging in...'
        });

        if (!LocalStorage.get('user_id')) {
          /* window.plugins.googleplus.getSigningCertificateFingerprint(
            function (fingerprint) {
              // console.log(fingerprint);
            }
          );*/
          window.plugins.googleplus.login(
            { 'webClientId': '889876488178-kb3uqoobp69r6pmj5cphicc3m9o5s9o4.apps.googleusercontent.com', 'offline': true },
            function (user_data) {
              callUserRest(user_data);
              LocalStorage.set('user_id', user_data.userId);
              var userDataReq = { 'imageUrl': user_data.imageUrl, 'displayName': user_data.displayName, 'email': user_data.email };
              // userDataReq.imageUrl=user_data.imageUrl;

              LocalStorage.set('user_data', userDataReq);
              $rootScope.user_data = userDataReq;
              console.log(JSON.stringify($rootScope.user_data));
              /* var confirmPopup = $ionicPopup.confirm({
                title: "Select Notes Format",
                template: "You can change this later from the side menu.",
                cancelText: 'Sargam(Sa Re Ga Ma)',
                okText: 'Western(C D E F)'
              }).then(function (res) {
                var body;
                if (res) {
                  LocalStorage.set('notesFormat', 'western');
                  body = { 'type': 'western' };
      
                } else {
                  LocalStorage.set('notesFormat', 'classic');
                  body = { 'type': 'classic' };
      
                }
                var userPref = new UserPrefService(body);
                userPref.$post();
                // $state.go('app.playlists');
              });*/


            },
            function (msg) {
              $ionicLoading.hide();
            }
          );
        } else {
          window.plugins.googleplus.trySilentLogin(
            { 'webClientId': '889876488178-kb3uqoobp69r6pmj5cphicc3m9o5s9o4.apps.googleusercontent.com', 'offline': true },
            function (user_data) {
              callUserRest(user_data);
              var userDataReq = { 'imageUrl': user_data.imageUrl, 'displayName': user_data.displayName, 'email': user_data.email };
              // userDataReq.imageUrl=user_data.imageUrl;

              LocalStorage.set('user_data', userDataReq);
              $rootScope.user_data = userDataReq;
              console.log(JSON.stringify($rootScope.user_data));
            },
            function (msg) {
              $ionicLoading.hide();
            }
          );
        }
      };
    })

    .controller('NoteCtrl', function ($scope,$rootScope,$cordovaNativeAudio,$timeout, CurrentSong, $ionicNavBarDelegate, UserPrefService, LocalStorage, PurchaseServiceNotes) {
      $ionicNavBarDelegate.showBackButton(false);
      //window.plugins.insomnia.keepAwake();

      //tanpura

     
      var noteVariable = 'C';
      $scope.toggleTanpura = function (val, selectedNote) {

        // console.log('Tanpura Function'+val+' selectedNote'+selectedNote);
        if(val){
           noteVariable = selectedNote;
           // console.log('noteVariable'+noteVariable);
          $cordovaNativeAudio.loop(noteVariable);


        }
        if(val==false){
          $timeout(function () {
            $cordovaNativeAudio.stop(noteVariable);
           // $cordovaNativeAudio.unload('click');
         }, 100);
       
        }
      };

      $scope.tanpuraToggle = {};
      $scope.stopTanpura = function (noteVariable,tanpuraToggle) {
        
        $timeout(function () {
          $cordovaNativeAudio.stop('A');
          $cordovaNativeAudio.stop('A_sharp');
          $cordovaNativeAudio.stop('B');
          $cordovaNativeAudio.stop('C');
          $cordovaNativeAudio.stop('C_sharp');
          $cordovaNativeAudio.stop('D');
          $cordovaNativeAudio.stop('D_sharp');
          $cordovaNativeAudio.stop('E');
          $cordovaNativeAudio.stop('F');
          $cordovaNativeAudio.stop('F_sharp');
          $cordovaNativeAudio.stop('G');
          $cordovaNativeAudio.stop('G_sharp');
         // $cordovaNativeAudio.unload('click');
         // console.log('Check Stop');
       }, 100);
      $scope.tanpuraToggle.value = false;
       
      }


  //     $scope.playAudio = function () {
  //       $cordovaNativeAudio.play('click');
  //    };
     
  //    $scope.loopAudio = function () {
  //       $cordovaNativeAudio.loop('click');
     
       
  //    }
  
  //    $scope.stopAudio = function () {
  //     $timeout(function () {
  //       $cordovaNativeAudio.stop('click');
  //      // $cordovaNativeAudio.unload('click');
  //    }, 100);
  //    // console.log('Chal rha hai');
  // };

   // Metronome functions
   $rootScope.metronome = {};
   $rootScope.metronome.metronomeOn = false;
   $rootScope.metronome.metronomeRate = 90;

       if (! window.AudioContext) {
     if (! window.webkitAudioContext) {
         bad_browser();
         return;
     }
     window.AudioContext = window.webkitAudioContext;
     
 }
  
 $rootScope.audioCtx = new AudioContext();
 //var$rootScope.audioCtx = new window.AudioContext;
 var audioLoader = new AudioSampleLoader();
 audioLoader.src = "audio/Classic.mp3";
 audioLoader.ctx =$rootScope.audioCtx;
 audioLoader.onload = function() {
     metronomeBuffer = audioLoader.response;
 };
 audioLoader.onerror = function() {
   // console.log("Error loading Metronome Audio");
 };
 audioLoader.send();

 $rootScope.metronomeSource = null;

 prepareMetronome = function(bpm) {
   var frameCount =$rootScope.audioCtx.sampleRate * (60/bpm);
   var numberOfChannels = metronomeBuffer.numberOfChannels;
   var paddingBuffer =$rootScope.audioCtx.createBuffer(1, frameCount,$rootScope.audioCtx.sampleRate);
   for (var i=0; i<numberOfChannels; i++) {
     var clickData = paddingBuffer.getChannelData(i);
     clickData.set(metronomeBuffer.getChannelData(i));
   };
   $rootScope.metronomeSource =$rootScope.audioCtx.createBufferSource();
   $rootScope.metronomeSource.connect($rootScope.audioCtx.destination);
   $rootScope.metronomeSource.buffer = paddingBuffer;
   $rootScope.metronomeSource.loop = true;
 };

 $rootScope.toggleMetronome = function(metronomeOn) {
   if (metronomeOn == true) {
     prepareMetronome($rootScope.metronome.metronomeRate);
     $rootScope.metronomeSource.start(0);
   } else {
     $rootScope.metronomeSource.stop(0);
     $rootScope.metronome.metronomeOn = false;
   };
 };

 $rootScope.changeTempo = function(val) {
   $rootScope.metronome.metronomeRate = Number($rootScope.metronome.metronomeRate) + Number(val);
   $rootScope.metronomeSource.stop(2);
   prepareMetronome($rootScope.metronome.metronomeRate);
   $rootScope.metronomeSource.start(2);    
 };


      var format = LocalStorage.get('notesFormat');
      var noteslocal;
      function getNote() {
        noteslocal = LocalStorage.get(CurrentSong.getSong()._source.note_id[format])
        if (noteslocal === null) {
          var val = '';
          if (CurrentSong.getSong()._source.meta.tag && CurrentSong.getSong()._source.meta.tag.toLowerCase().includes('free')) {
            val = 'free';
          }
          PurchaseServiceNotes.getById({ id: CurrentSong.getSong()._source.note_id[format], value: val }).$promise.then(function (resp) {
            LocalStorage.set(resp._id, resp._source.note);
            $scope.notes = resp._source.note;
          })
        } else {
          $scope.notes = noteslocal;
        }
      }
      if (format === null) {
        UserPrefService.getAll({}, function (resp) {
          LocalStorage.set('notesFormat', resp.type);
          format = resp.type;
          getNote();
        });
      } else {
        getNote();
      }

      $scope.title = CurrentSong.getSong()._source.name;

    })
    .controller('HowtoCtrl', function () {

    })
    .controller('AlankarCtrl', function () {

    })
    .controller('AboutCtrl', function ($rootScope,$cordovaNativeAudio,$scope,$timeout ) {

      // Metronome functions
      $rootScope.metronome = {};
      $rootScope.metronome.metronomeOn = false;
      $rootScope.metronome.metronomeRate = 90;
  
          if (! window.AudioContext) {
        if (! window.webkitAudioContext) {
            bad_browser();
            return;
        }
        window.AudioContext = window.webkitAudioContext;
        
    }

    $scope.playAudio = function () {
      $cordovaNativeAudio.play('click');
   };
   
   $scope.loopAudio = function () {
      $cordovaNativeAudio.loop('click');
   
     
   }

   $scope.stopAudio = function () {
    $timeout(function () {
      $cordovaNativeAudio.stop('click');
     // $cordovaNativeAudio.unload('click');
   }, 100);
   // console.log('Chal rha hai');
};



//    $timeout(function () {
//     $cordovaNativeAudio.stop('click');
//     $cordovaNativeAudio.unload('click');
//  }, 1000);

 // When button is clicked, the popup will be shown...
   $scope.showPopup = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '',
         title: 'Stop Tanpura',
         subTitle: 'Click OK if you wish to stop',
         scope: $scope,
			
         buttons: [
            { text: 'Cancel' }, {
               text: '<b>OK</b>',
               type: 'button-positive',
               onTap: function(e) {
                   $timeout(function () {
                    $cordovaNativeAudio.stop('click');
                    $cordovaNativeAudio.unload('click');
                 }, 200);
               
               }
            }
         ]
      });

      myPopup.then(function(res) {
         // console.log('Tapped!', res);
      });    
   };
    
    $rootScope.audioCtx = new AudioContext();
      //var$rootScope.audioCtx = new window.AudioContext;
      var audioLoader = new AudioSampleLoader();
      audioLoader.src = "audio/Classic.mp3";
      audioLoader.ctx =$rootScope.audioCtx;
      audioLoader.onload = function() {
          metronomeBuffer = audioLoader.response;
      };
      audioLoader.onerror = function() {
        // console.log("Error loading Metronome Audio");
      };
      audioLoader.send();
  
      $rootScope.metronomeSource = null;
  
      prepareMetronome = function(bpm) {
        var frameCount =$rootScope.audioCtx.sampleRate * (60/bpm);
        var numberOfChannels = metronomeBuffer.numberOfChannels;
        var paddingBuffer =$rootScope.audioCtx.createBuffer(1, frameCount,$rootScope.audioCtx.sampleRate);
        for (var i=0; i<numberOfChannels; i++) {
          var clickData = paddingBuffer.getChannelData(i);
          clickData.set(metronomeBuffer.getChannelData(i));
        };
        $rootScope.metronomeSource =$rootScope.audioCtx.createBufferSource();
        $rootScope.metronomeSource.connect($rootScope.audioCtx.destination);
        $rootScope.metronomeSource.buffer = paddingBuffer;
        $rootScope.metronomeSource.loop = true;
      };
  
      $rootScope.toggleMetronome = function(metronomeOn) {
        if (metronomeOn == true) {
          prepareMetronome($rootScope.metronome.metronomeRate);
          $rootScope.metronomeSource.start(0);
        } else {
          $rootScope.metronomeSource.stop(0);
          $rootScope.metronome.metronomeOn = false;
        };
      };
  
      $rootScope.changeTempo = function(val) {
        $rootScope.metronome.metronomeRate = Number($rootScope.metronome.metronomeRate) + Number(val);
        $rootScope.metronomeSource.stop(2);
        prepareMetronome($rootScope.metronome.metronomeRate);
        $rootScope.metronomeSource.start(2);    
      };
  


    })
    .controller('AppCtrl', function (UserSubscription,$scope,$rootScope) {


      $scope.getsubscriptionDetails = function () {
        UserSubscription.getAll({}, function (resp1) {
          $rootScope.subscriptionPack = resp1;
          console.log("subscriptionPack = "+JSON.stringify($rootScope.subscriptionPack));
        });
      };
      $scope.getsubscriptionDetails();

    })
    .controller('ArtistCtrl', function ($scope, $ionicLoading, $state, HomePageListService, HorizontalTileUtil, $ionicNavBarDelegate, SongListUtil) {


      $ionicNavBarDelegate.showBackButton(false);
      $scope.viewName = HorizontalTileUtil.getCurrType();

      $scope.viewName = HorizontalTileUtil.getCurrType();
      $ionicLoading.show({
        template: 'Loading...'
      });
      HomePageListService.getAll({
        artist: HorizontalTileUtil.getCurrType()
      }, function (resp) {
        $ionicLoading.hide();
        $scope.artists = resp;
        $scope.a=1;
        $scope.loopCards = function () {
        if($scope.a<3){
          $scope.a= $scope.a+1;
        }
        if($scope.a==3){
          $scope.a=1;
        }
        };
      });
      $scope.onArtistClick = function (name) {
        SongListUtil.setValue(name)
        SongListUtil.setViewName(name);
        SongListUtil.setId(HorizontalTileUtil.getCurrType());

        $state.go('app.songlist');
      }

    })
    .controller('SongListCtrl', function ($scope, $ionicLoading, $controller, SongListUtil, $ionicNavBarDelegate, DataService) {
      $controller('PlaylistsCtrl', { $scope: $scope });
      $ionicNavBarDelegate.showBackButton(false);
      $scope.viewName = SongListUtil.getViewName();
      $ionicLoading.show({
        template: 'Loading...'
      });
      DataService.getAll({
        id: SongListUtil.getId(),
        value: SongListUtil.getValue()
      }, function (resp) {
        $scope.songList = resp;
        $ionicLoading.hide();

      })
    })
    .controller('FaqCtrl', function ($scope, FaqService, $ionicNavBarDelegate) {
      $ionicNavBarDelegate.showBackButton(false);
      FaqService.getAll({}, function (resp) {

        $scope.faqs = resp;

      });

    })

    .controller('SettingsCtrl', function ($scope, UserPrefService, LocalStorage, $state) {
      UserPrefService.getAll({}, function (resp) {
        // console.log("format: " + resp)
        $scope.format = resp.type;
        LocalStorage.set('notesFormat', resp.type);
      });
      $scope.notesStyle = function (format) {
        LocalStorage.set('notesFormat', format);
        var body = { 'type': format };
        var userPref = new UserPrefService(body);
        userPref.$post();
        $state.go('app.playlists');
      }
    })

    .controller('RequestednotesCtrl', function ($scope, $cordovaToast, UserRequestService, $ionicPopup, $state) {
      $scope.successAlert = function (str) {
        var alertPopup = $ionicPopup.alert({
          title: 'status',
          template: str
        });

        alertPopup.then(function (res) {
          $state.go('app.playlists');
        });
      };


      window.plugins.socialsharing.shareViaEmail(
        '', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
        'Request Bollywood Notes',
        ['sargamapp@gmail.com'], // TO: must be null or an array
        null, // CC: must be null or an array
        null, // BCC: must be null or an array
        null, // FILES: can be null, a string, or an array
        function () {
          $cordovaToast.show("Thank you for using Sargam and Piano Notes", 'long', 'bottom');
          $state.go('app.playlists');
          // $scope.successAlert('Requested sent successfully');

        }, // called when sharing worked, but also when the user cancelled sharing via email. On iOS, the callbacks' boolean result parameter is true when sharing worked, false if cancelled. On Android, this parameter is always true so it can't be used). See section "Notes about the successCallback" below.
        function () {
          $cordovaToast.show("Thank you for using Sargam and Piano Notes", 'long', 'bottom');
          $state.go('app.playlists');
          // $scope.successAlert('mail sent failed');
          //$scope.message="mail sent failed";
        } // called when sh*t hits the fan
      );
    })

    .controller('ShareCtrl', function ($scope, $ionicPopup, $state, $cordovaToast) {
      $scope.successAlert = function (str) {
        var alertPopup = $ionicPopup.alert({
          title: 'status',
          template: str
        });

        alertPopup.then(function (res) {
          $state.go('app.playlists');
        });
      };
      var options = {
        message: 'Get accurate notes of any song! Download this app Sargam Song Notes!', // not supported on some apps (Facebook, Instagram)
        subject: 'the subject', // fi. for email
        // an array of filenames either locally or remotely
        url: 'https://play.google.com/store/apps/details?id=appworksstudio.com.sargam',
        chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
      }

      var onSuccess = function (result) {
        $state.go('app.playlists');
        $cordovaToast.show("Thank you for using Sargam Song Notes", 'long', 'bottom');
        //$scope.successAlert("shared successfully");
      }

      var onError = function (msg) {
        $state.go('app.playlists');
        $cordovaToast.show("Thank you for using Sargam Song Notes", 'long', 'bottom');
        //$scope.successAlert("shared failed");
      }

      window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

    })