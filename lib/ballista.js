(function (root, factory) {

    'use strict';

    /* Use AMD */
    if (typeof define === 'function' && define.amd) {
        define(["jQuery"], factory);
    }
    /* Use CommonJS */
    else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require("jQuery"));
    }
    /* Use Browser */
    else {
        root.ballista = factory(root.jQuery);
    }

  }(this, function ($) {

  var self = this;
  self.addElement = function(parent, child) {
    $(parent).append(child);
  };

  self.log = function(msg) {
    if (window && window.console && window.console.log) {
      window.console.log(msg);
    }
  };
  
  self.loadScript = function(d, s, id, url) {
    var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
      if(!d.getElementById(id)){
        js=d.createElement(s);
        js.id=id;
        js.src=p+'://'+url;
        fjs.parentNode.insertBefore(js,fjs);
    }
  };
    

  self.loadTwitterScript = function() {
    self.loadScript(document, 'script', 'twitter-wjs', 'platform.twitter.com/widgets.js');
  };
  
  self.createTwitterButton = function(el, buttonType, options, linkText, segment) {
    self.loadTwitterScript();
    var link = "<a href='https://twitter.com/" + segment + "'";
    link += " class='" + buttonType + "'";
    for (var prop in options) {
      var val = options[prop];
      if (typeof val !== 'undefined') {
        link += " data-" + prop + "='" + options[prop] + "'";
      }
    }
    link += ">" + linkText + "</a>";
    self.addElement(el,link);      
  };
  
  self.createTwitterShareButton = function(el, msg, via, related, hashtag, largeButton, doNotTailor) {
    var data = {};
    data.size = largeButton ? "large" : undefined;
    data.dnt = doNotTailor ? doNotTailor : undefined;
    data.text = msg ? msg : undefined;
    data.via = via ? via : undefined;
    data.related = related ? related : undefined;
    data.hashtags = hashtag ? hashtag : undefined;
    self.createTwitterButton(el, "twitter-share-button", data, "Tweet", "share");
  };
  
  self.createTwitterFollowButton = function(el, twitterAccount, showCount, largeButton, doNotTailor) {
    twitterAccountText = twitterAccount[0] === '@' ? twitterAccount : "@" + twitterAccount;
    twitterAccountSegment = twitterAccount[0] === '@' ? twitterAccount.substring(1) : twitterAccount;
    var data = {};
    data.size = largeButton ? "large" : undefined;
    data.doNotTailor = doNotTailor ? doNotTailor : false;
    data["show-count"] = showCount ? showCount : false;
    self.createTwitterButton(el, "twitter-follow-button", data, "Follow " + twitterAccountText, twitterAccountSegment); 
  };
  
  self.createTwitterHashtagButton = function(el, hashtag, story, users, url, largeButton, doNotTailor) {
    var data = {};
    data.size = largeButton ? "large" : undefined;
    data.doNotTailor = doNotTailor ? doNotTailor : false;
    data.related = users.replace("@", "");
    data.url = url ? url : undefined;
    
    var hashtagUnadorned = hashtag[0] === '#' ? hashtag.substring(1) : hashtag;
    var hashtagAdorned = hashtag[0] === '#' ? hashtag : "#" + hashtag;
    var twitterSegment = "intent/tweet?button_hashtag=" + hashtagAdorned;
    if (typeof story !== 'undefined' && story.length > 0 ) {
      twitterSegment += "&text=" + escape(story);
    }
    self.createTwitterButton(el, "twitter-hashtag-button", data, "Tweet " + hashtagAdorned, twitterSegment); 
  };
  
  self.createTwitterMentionButton = function(el, user, tweetText, relatedUsers, largeButton, doNotTailor) {
    var data = {};
    data.size = largeButton ? "large" : undefined;
    data.doNotTailor = doNotTailor ? doNotTailor : false;
    data.related = relatedUsers.replace("@", "");
    
    var userUnadorned = user[0] === '@' ? user.substring(1) : user;
    var userAdorned = user[0] === '@' ? user : "@" + user;
    var twitterSegment = "intent/tweet?screen_name=" + userUnadorned;
    if (typeof tweetText !== 'undefined' && tweetText.length > 0 ) {
      twitterSegment += "&text=" + escape(tweetText);
    }
    self.createTwitterButton(el, "twitter-mention-button", data, "Tweet to " + userAdorned, twitterSegment); 
  };
  

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

  return {
    createTwitterShareButton: createTwitterShareButton,
    createTwitterFollowButton: createTwitterFollowButton,
    createTwitterHashtagButton: createTwitterHashtagButton,
    createTwitterMentionButton: createTwitterMentionButton,
    createFacebookShareButton: createFacebookShareButton
  };
}));
