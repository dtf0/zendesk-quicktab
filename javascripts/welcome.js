!function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){var d=c(2);$(function(){d.show("welcome",null,$("body"))})},,function(a,b,c){var d=c(3),e={init:function(){this._registerHandlebarsHelpers()},render:function(a,b){return Handlebars.templates[a](b)},show:function(a,b,c){var d=this.render(a,b);c.prop("id",a).html(d)},_registerHandlebarsHelpers:function(){Handlebars.partials=Handlebars.templates,Handlebars.registerHelper("t",function(a){return new Handlebars.SafeString(d.i18n.getString(a)||"String not found: "+a)}),Handlebars.registerHelper("enabledSetting",function(a,b){var c="",e=d.storage.get(a);return b==e&&(c="enabled"),c})}};e.init(),a.exports=e},function(a,b,c){var d=c(4),e={tabs:c(5),pageAction:c(6),i18n:c(7),storage:c(8),extension:c(9),addPageAction:function(a){var b=this.storage.get("urlDetection"),c="noUrls"!==b?"enabled":"disabled";this.pageAction.show(a),this.pageAction.setIcon(c)},didNavigate:function(a){var b={id:a.tabId,url:a.url},c=this.storage.get("urlDetection"),f=d.extractMatches(a.url,c);"noUrls"!==c&&f&&(b.routeDetails=f,e.openRouteInZendesk(b))},didInstall:function(a){var b=this;b.tabs.query("*://*.zendesk.com/agent/*",function(a){a.forEach(function(a){b.addPageAction(a.id)})}),"install"===a.reason&&b.openWelcome(),b.storage.sanitize()},openRouteInZendesk:function(a){var b=a.routeDetails.subdomain,c=a.routeDetails.path,e=this;e.tabs.query("*://"+b+".zendesk.com/agent/*",function(b){for(var f=null,g=0,h=b.length;h>g;g++)if(f=b[g],f.id!==a.id&&f.url.match(d.LOTUS_ROUTE)){e.updateLotusRoute(f.id,c),e.tabs.focus(f),e.tabs.remove(a.id);break}})},updateLotusRoute:function(a,b){var c={target:"route",memo:{hash:b}},d="window.postMessage('"+JSON.stringify(c)+"', '*')";this.tabs.executeScript(a,d)},openWelcome:function(){var a=this.extension.getUrl("welcome.html");this.tabs.create(a)}};a.exports=e},function(a,b,c){var d=(c(3),{LOTUS_ROUTE:/^https?:\/\/(.*).zendesk.com\/agent\/(?!chat|voice)\#?\/?(.*)$/,TICKET_ROUTE:/^https?:\/\/(.*).zendesk.com\/(?:agent\/tickets|tickets|twickets|requests|hc\/requests)\#?\/?(.*)$/,RESTRICTED_ROUTE:/^https?:\/\/(.*).zendesk.com\/(agent\/(chat|talk|admin\/voice)\/?(.*)|tickets\/\d*\/print)/,extractMatches:function(a,b){var c=null,d=this._getLotusUrlMatches(a),e=this._getTicketUrlMatches(a),f=this._checkForRestrictedMatches(a);return f||(e?c=e:d&&"allUrls"===b&&(c=d)),c},_getLotusUrlMatches:function(a){var b=null,c=a.match(this.LOTUS_ROUTE);return c&&(b=this._getRouteDetails(c),b.path="/"+b.path),b},_getTicketUrlMatches:function(a){var b=null,c=a.match(this.TICKET_ROUTE);return c&&(b=this._getRouteDetails(c),b.path="/tickets/"+b.path),b},_getRouteDetails:function(a){var b={};return b.subdomain=a[1],b.path=a[2].replace("#/",""),b},_checkForRestrictedMatches:function(a){var b=a.match(this.RESTRICTED_ROUTE);return b?!0:!1}});a.exports=d},function(a){var b={remove:function(a){chrome.tabs.remove(a)},create:function(a){chrome.tabs.create({url:a})},focus:function(a){var b=a.id,c=a.windowId;chrome.tabs.update(b,{active:!0,highlighted:!0}),chrome.windows.update(c,{focused:!0})},query:function(a,b){chrome.tabs.query({url:a},b)},executeScript:function(a,b){chrome.tabs.executeScript(a,{code:b})}};a.exports=b},function(a){var b={show:function(a){chrome.pageAction.show(a)},setIcon:function(a){var b="/images/icons/icon38-"+a+".png";chrome.tabs.query({url:"*://*.zendesk.com/agent/*"},function(a){a.forEach(function(a){chrome.pageAction.setIcon({tabId:a.id,path:b})})})}};a.exports=b},function(a){var b={getString:function(a){return chrome.i18n.getMessage(a)||"String not found: "+a}};a.exports=b},function(a){var b={get:function(a){return localStorage.getItem(a)},set:function(a,b){b?localStorage.setItem(a,b):localStorage.removeItem(a)},drop:function(){localStorage.clear()},sanitize:function(){this.get("urlDetection")||this.set("urlDetection","allUrls")}};a.exports=b},function(a){var b={getUrl:function(a){return chrome.extension.getURL(a)}};a.exports=b}]);