angular.module('starter.services', [])
  .constant('Config', {
    url: 'http://104.199.194.59:8084/'
  })

  .factory('LocalStorage', function () {
    return {
      set: function (key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
      },
      get: function (key) {
        return JSON.parse(localStorage.getItem(key));
      },
      destroy: function (key) {
        return localStorage.removeItem(key);
      },
      getObject: function (key) {
        return localStorage.getItem(key);
      }
    };
  })

  .factory('Util', function (LocalStorage) {
    var util = {};
    util.getTabIdByName = function (str) {
      if (str == 'Latest') {
        return 0;
      }/* else if (str == 'Popular') {
        return 1;
      } */else if (str == 'Available') {
        return 1;
      } else {
        return 2;
      }
    }

    util.getToken = function (callback) {
      var token = window.localStorage.getItem('auth_token');
      return token;
    }

    util.getLang = function (callback) {
      var lang = window.localStorage.getItem('lang');
      return lang;
    }
    return util;
  })

  .factory('Helper', function (PurchaseServiceNotes, LocalStorage) {
    var helper = {};
    helper.storeNotes = function () {
      PurchaseServiceNotes.getAll({}).$promise.then(function (resp) {
        angular.forEach(resp, function (item) {
          LocalStorage.set(item._id, item._source.note);
        });
      })
    }
    return helper;
  })

  .factory('CurrentSong', function () {
    var song = {};
    return {
      getSong: function () {
        return song;
      },
      setSong: function (value) {
        song = value;
      }
    }
  })

  .factory('HorizontalTileUtil', function () {
    //var artist = {};
    var type = {};
    //var showAllArtist=false;
    return {
     /* getCurrArtist: function () {
        return artist;
      },
      setCurrArtist: function (value) {
        artist = value;
      },*/
      getCurrType: function () {
        return type;
      },
      setCurrType: function (value) {
        type = value;
      }
      /* isShowAllArtist:function(){
         return showAllArtist;
       },
       setShowAllArtist:function(value){
         showAllArtist=value;
       }*/
    }
  })

  .factory('SongListUtil', function () {
    var viewName = {};
    var value = {};
    var id={};
    return {
      getViewName: function () {
        return viewName;
      },
      setViewName: function (value) {
        viewName = value;
      },
      getValue: function () {
        return value;
      },
      setValue: function (val) {
        value = val;
      },
      getId:function(){
        return id;
      },
      setId:function(value){
        id=value
      }
    }

  })

  .factory('DataService', function ($resource, Util, Config) {
    return $resource(Config.url + 'song/:id', {
      id: '@id', offset: '@offset', lang: Util.getLang
    }, {
        getAll: {
          method: 'GET',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })
  
  .factory('TagService', function ($resource, Util, Config) {
    return $resource(Config.url + 'user/tags', {
      id: '@id'
    }, {
        getAll: {
          method: 'GET',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })
  .factory('UserService', function ($resource, Util, Config) {
    return $resource(Config.url + 'user/fav/:id', {
      id: '@id'
    }, {
        post: {
          method: 'POST',
          headers: {
            // 'Authorization': Util.getToken
          }
        }, getAll: {
          method: 'GET',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        },
        delete: {
          method: 'DELETE',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })

  .factory('HomePageListService', function ($resource, Util, Config) {
    return $resource(Config.url + 'user/home/:artist/:name', {
      artist: '@artist', name: '@name', lang: Util.getLang
    }, {
        post: {
          method: 'POST',
          headers: {
            // 'Authorization': Util.getToken
          }
        }, getAll: {
          method: 'GET',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        },
        delete: {
          method: 'DELETE',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })

  .factory('UserPrefService', function ($resource, Util, Config) {
    return $resource(Config.url + 'user/preferences', {
      id: '@id'
    }, {
        post: {
          method: 'POST',
          headers: {
            // 'Authorization': Util.getToken
          }
        }, getAll: {
          method: 'GET',
          isArray: false,
          headers: {
            // 'Authorization': Util.getToken
          }
        },
        delete: {
          method: 'DELETE',
          isArray: false,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })

  .factory('UserSubscription', function ($resource, Util, Config) {
    return $resource(Config.url + 'user/subs', {
      id: '@id'
    }, {
        post: {
          method: 'POST',
          headers: {
            // 'Authorization': Util.getToken
          }
        }, getAll: {
          method: 'GET',
          isArray: false,
          headers: {
            // 'Authorization': Util.getToken
          }
        },
        delete: {
          method: 'DELETE',
          isArray: false,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })

  .factory('UserRequestService', function ($resource, Util, Config) {
    return $resource(Config.url + 'user/requested/:id', {
      id: '@id'
    }, {
        post: {
          method: 'POST',
          headers: {
            // 'Authorization': Util.getToken
          }
        }, getAll: {
          method: 'GET',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        },
        delete: {
          method: 'DELETE',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })
  

  .factory('CartService', function ($resource, Util, Config) {
    return $resource(Config.url + 'user/cart/:id', {
      id: '@id', type: '@type'
    }, {
        post: {
          method: 'POST',
          headers: {
            // 'Authorization': Util.getToken
          }
        }, getAll: {
          method: 'GET',
          headers: {
            // 'Authorization': Util.getToken
          }
        },
        delete: {
          method: 'DELETE',
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })



  .factory('PurchaseService', function ($resource, Util, Config) {
    return $resource(Config.url + 'user/purchase/:id', {
      id: '@id'
    }, {
        post: {
          method: 'POST',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }, getAll: {
          method: 'GET',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })

  .factory('PackService', function ($resource, Util, Config) {
    return $resource(Config.url + 'user/packs/:id', {
      id: '@id'
    }, {
        post: {
          method: 'POST',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }, getAll: {
          method: 'GET',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })

  .factory('OfferService', function ($resource, Util, Config) {
    return $resource(Config.url + 'user/offers/:id', {
      id: '@id'
    }, {
        post: {
          method: 'POST',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }, getAll: {
          method: 'GET',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })

  .factory('PurchaseServiceNotes', function ($resource, Util, Config) {
   // return $resource(Config.url + 'user/purchasenotes/:id', {
   // var lang = window.localStorage.getItem('lang');
   return $resource(Config.url + 'song/notes/:id', {
   // return $resource(Config.url + 'song/notes/:id?key='+lang, {
      id: '@id'
    }, {
        post: {
          method: 'POST',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }, getAll: {
          method: 'GET',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }, getById: {
          method: 'GET',
          isArray: false,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })

  .factory('FireBaseTokenService', function ($resource, Util, Config) {
    return $resource(Config.url + 'login/firebase', {
      id: '@id'
    }, {
        post: {
          method: 'POST',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })

  .factory('LoginService', function ($resource, Config) {
    return $resource(Config.url + 'login', {
      id: '@id'
    }, {
        post: {
          method: 'POST'
        }, getAll: {
          method: 'GET',
          isArray: true
        }
      });
  })
  .factory('LanguageService', function ($resource, Util, Config) {
    return $resource(Config.url + 'user/languages', {
      id: '@id'
    }, {
        post: {
          method: 'POST',
          headers: {
            // 'Authorization': Util.getToken
          }
        }, getAll: {
          method: 'GET',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  }).factory('FaqService', function ($resource, Util, Config) {
    return $resource(Config.url + 'user/faq', {
      id: '@id'
    }, {
        post: {
          method: 'POST',
          headers: {
            // 'Authorization': Util.getToken
          }
        }, getAll: {
          method: 'GET',
          isArray: true,
          headers: {
            // 'Authorization': Util.getToken
          }
        }
      });
  })