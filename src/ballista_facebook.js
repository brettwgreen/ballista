var ballista_facebook = (function ($, ballista) {
    
    ballista.loadFacebookScript = function() {
      ballista.loadScript(document, 'script', 'facebook-jssdk', 'connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=163974430303334');
    };
    
    ballista.createFacebookButton = function(el, buttonType, options) {
      var divRoot = "<div id='fb-root'></div>"
      $(el).append(divRoot);      
      ballista.loadFacebookScript();      

      var div = "<div data-href='https://developers.facebook.com/docs/plugins/'";
      div += " class='" + buttonType + "'";
      for (var prop in options) {
        var val = options[prop];
        if (typeof val !== 'undefined') {
          div += " data-" + prop + "='" + options[prop] + "'";
        }
      }
      div += "></div>";
      $(el).append(div);      
    };

    ballista.createFacebookShareButton = function(el, href, layout, useIFrame) {
      //<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-mobile-iframe="true"></div>
      var data = {};
      data.layout = layout ? layout : "button-count";
      data["mobile-iframe"] = useIFrame ? useIFrame : true;
      data.href = href ? href : window.location.href;
      ballista.createFacebookButton(el, "fb-share-button", data);
    };

    
}($, ballista));