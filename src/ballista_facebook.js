var ballista_facebook = (function ($, ballista) {
    
    ballista.loadFacebookScript = function() {
      if (/^file:/.test(document.location)) {
		  ballista.log('Facebook share button will not work properly on FILE protocol!');
	  }
	  ballista.loadScript(document, 'script', 'facebook-jssdk', 'connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=163974430303334');
    };
    
    ballista.createFacebookButton = function(el, buttonType, options) {
      var divroot = "<div id='fb-root'></div>"
      $(el).append(divroot);      
      var div = "<div";
      div += " class='" + buttonType + "'";
      for (var prop in options) {
        var val = options[prop];
        if (typeof val !== 'undefined') {
          div += " data-" + prop + "='" + options[prop] + "'";
        }
      }
      div += "></div>";
      $(el).append(div);      
      ballista.loadFacebookScript();	  
    };
	   
    ballista.createFacebookShareButton = function(el, href, layout, useIFrame) {
      //<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-mobile-iframe="true"></div>
      var data = {};
      data.layout = layout ? layout : "button_count";
      data["mobile-iframe"] = useIFrame ? useIFrame : true;
      data.href = href ? href : window.location.href;
      ballista.createFacebookButton(el, "fb-share-button", data);
    };

    
}($, ballista));