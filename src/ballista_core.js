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
    