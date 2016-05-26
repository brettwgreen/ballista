
  self.loadFacebookScript = function() {
    if (/^file:/.test(document.location)) {
      self.log('Facebook share button will not work properly on FILE protocol!');
    }
    self.loadScript(document, 'script', 'facebook-jssdk', 'connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=163974430303334');
  };
  
  self.createFacebookButton = function(el, buttonType, options) {
    var divroot = "<div id='fb-root'></div>";
    self.addElement(el,divroot);      
    var div = "<div";
    div += " class='" + buttonType + "'";
    for (var prop in options) {
      var val = options[prop];
      if (typeof val !== 'undefined') {
        div += " data-" + prop + "='" + options[prop] + "'";
      }
    }
    div += "></div>";
    self.addElement(el,div);      

    self.loadFacebookScript();	  
  };
   
  self.createFacebookShareButton = function(el, href, layout, useIFrame) {
    var data = {};
    data.layout = layout ? layout : "button_count";
    data["mobile-iframe"] = useIFrame ? useIFrame : true;
    data.href = href ? href : window.location.href;
    self.createFacebookButton(el, "fb-share-button", data);
  };
