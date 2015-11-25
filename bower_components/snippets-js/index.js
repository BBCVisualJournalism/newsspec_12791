define("playlister/snippets/util/logging",[],function(){function e(){}function t(e){this._baseUrl=e.baseUrl}function n(){}return e.prototype.log=function(e,t){console[e]([new Date,e.toUpperCase(),t])},e.prototype.info=function(e){return this.log("info",e)},e.prototype.warn=function(e){return this.log("warn",e)},e.prototype.error=function(e){return this.log("error",e)},t.prototype.increment=function(e){var t=this._baseUrl+"?kpi="+e+"&ts="+(new Date).getTime(),n=new Image;n.src=t},n.prototype.log=function(e,t){},n.prototype.info=function(e){},n.prototype.warn=function(e){},n.prototype.error=function(e){},{Logger:e,NoOpLogger:n,RemoteMonitoring:t}}),define("playlister/snippets/util/obj",[],function(){return{merge:function(e,t){var n={};for(var r in e)n[r]=r in t&&t[r]!=null?t[r]:e[r];return n},isEmpty:function(e){for(var t in e)return!1;return!0}}}),define("playlister/snippets/util/dom",[],function(){var e=document.createElement("div"),t=e.matches||e.matchesSelector||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector||function(e){var t=this,n=(t.document||t.ownerDocument).querySelectorAll(e),r=0;while(n[r]&&n[r]!==t)r++;return n[r]?!0:!1},n=e.classList?function(e,t){for(var n=0;n<t.length;n++)e.classList.add(t[n])}:function(e,t){e.className+=" "+t.join(" ")},r=e.classList?function(e,t){for(var n=0;n<t.length;n++)e.classList.remove(t[n])}:function(e,t){e.className=e.className.replace(new RegExp("(^|\\b)"+t.join("|")+"(\\b|$)","gi"),"")},i={indexOf:function(e,t){if(!e)throw new Error("Must be a list of elements");return Array.prototype.indexOf.call(e,t)},querySelectorParents:function(e,t){while(e.parentElement&&!i.matches(e.parentElement,t))e=e.parentElement;return e.parentElement},matches:function(e,n){return t.call(e,n)},addClass:function(e,t){return n(e,t.split(" ")),e},removeClass:function(e,t){return r(e,t.split(" ")),e},getData:function(e,t,n){return e.getAttribute("data-"+t)===null?n:e.getAttribute("data-"+t)},addEventListener:function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,n)},removeEventListener:function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent("on"+t,n)}};return i}),define("playlister/snippets/util/events",[],function(){var e={on:function(e,t,n){return e._events||(e._events={}),e._events[t]||(e._events[t]=[]),e._events[t].push(n),e},off:function(e,t,n){if(!t)e._events={};else if(e._events&&e._events[t])if(!n)e._events[t]=[];else{var r=e._events[t];for(var i=0;i<r.length;i++)n===r[i]&&r.splice(i--,1)}return e},emit:function(e,t,n){if(e._events&&e._events[t]){var r=e._events[t];for(var i=0;i<r.length;i++)r[i].call(null,n)}return e}};return e}),define("playlister/snippets/playables",[],function(){function e(e){this._src=e}function t(e){this._id=e}return e.prototype.getSrc=function(){return this._src},t.prototype.getId=function(){return this._id},{UrlAudioSource:e,ClipAudioSource:t}}),define("playlister/snippets/driver/html5",["../playables"],function(e){var t,n={init:function(){t=new Audio},destroy:function(){t=null},play:function(n){if(n instanceof e.ClipAudioSource)throw new Error("Cannot play clip");return t.src=n.getSrc(),t.load(),t.play(),this},pause:function(){return t.pause(),this},resume:function(){return t.play(),this},stop:function(){return t.pause(),this},setVolume:function(e){return t.volume=e,this},getDuration:function(){return t.duration},getCurrentTime:function(){return t.currentTime},setCurrentTime:function(e){return t.currentTime=e,this},on:function(e,n){return t.addEventListener(e,n),this},off:function(e,n){return t.removeEventListener(e,n),this}};return n}),define("playlister/snippets/driver/smp",["../playables"],function(e){var t,n,r,i=!1,s=!1,o={ended:"playlistEnded"},u=function(e){return o[e]?o[e]:e},a=function(t){return t instanceof e.ClipAudioSource?{kind:"radioProgramme",vpid:t.getId()}:{kind:"radioProgramme",href:t.getSrc()}},f={init:function(e,r){i||(t=document.createElement("div"),t.setAttribute("class","spt-smp"),document.body.appendChild(t),n=e(t).player({ui:{enabled:!1,hideDefaultErrors:!0},responsive:!0,preferInlineAudioPlayback:!0,preferHtmlOnMobile:!0,playlistObject:{items:[{kind:"radioProgramme",href:"http://emp.bbci.co.uk/emp/media/blank.mp3"}]},autoplay:!1}),n.bind("error",function(e){var t={critical:"SMP_Critical",error:"SMP_Error",warning:"SMP_Warning"};t[e.severity]&&r.increment(t[e.severity])}),n.load()),i=!0},destroy:function(){i&&(document.body.removeChild(t),t=null,n.unbind("error"),n=null,r=null),i=!1},play:function(e){return r=e,n.loadPlaylist({items:[a(e)]},{autoplay:!0}),s=!1,this},pause:function(){return r&&(n.pause(),s=!0),this},resume:function(){return r&&s&&(n.play(),s=!1),this},stop:function(){return r&&!s&&(n.suspend(),r=null),this},setVolume:function(e){return n.volume(e),this},getDuration:function(){return n.duration()},getCurrentTime:function(){return n.currentTime()},setCurrentTime:function(e){return n.currentTime(e),this},on:function(e,t){return n.bind(u(e),t),this},off:function(e,t){return n.unbind(u(e),t),this}};return f}),define("playlister/snippets/i18n/locales",[],function(){var e={cy:{},en:{"Play {0}":"Play {0}","Pause playback":"Pause playback","Stop playback":"Stop playback","Resume playback":"Resume playback"},ga:{},gd:{}},t="en",n=e[t];return{setLocale:function(t){if(!e[t])throw new Error('Locale "'+t+'" has not been defined');n=e[t]},t:function(e,t){if(!n[e])throw new Error('Translation for "'+e+'" has not been defined');return n[e].replace(/\{(\d+)\}/,function(e,n){var r="";return t[n]&&(r=t[n]),r})}}}),define("playlister/snippets/animation/progress",[],function(){var e=!1,t,n,r,i,s,o,u,a=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)},f=function(){if(!e)return;var i=r.currentTime*1e3,s=r.duration*1e3,o;n&&i===t?i=s-(n-(new Date).getTime()):(n=(new Date).getTime()-i+s,t=i),s>0&&(o=i/s,l(o)),a(f)},l=function(e){i&&(i.clearRect(0,0,s,o),i.globalAlpha=.3,i.beginPath(),i.arc(s/2,o/2,1/2.6*u,0,2*Math.PI,!1),i.stroke(),i.globalAlpha=1,i.beginPath(),i.arc(s/2,o/2,1/2.6*u,-Math.PI/2,-Math.PI/2+e*2*Math.PI,!1),i.stroke())},c=function(){var e=0;r&&r.duration>0&&(e=r.currentTime/r.duration),l(e)},h=function(a){r=a;var l=r.element.querySelector(".spt-playback"),c=window.devicePixelRatio>=1.5?2:1;s=l.parentElement.offsetWidth*c,o=l.parentElement.offsetHeight*c,u=Math.min(s,o),l.width=s,l.height=o,l.style.display="block",i=l.getContext("2d"),i.lineWidth=u/12,i.strokeStyle="#FFF",e=!0,n=(new Date).getTime()+r.duration*1e3,t=null,f()},p=function(){e=!1,n=null,t=null},d=function(){e=!0,f()},v=function(){e=!1,n=null,t=null,i&&i.clearRect(0,0,s,o),s=null,o=null,u=null,i=null};return{start:function(e){h(e)},pause:function(){p()},update:function(){c()},resume:function(){d()},stop:function(){v()}}}),define("playlister/snippets/component/transform",["../util/dom","../util/obj"],function(e,t){function r(e){var t=[];for(var n in e)t.push([n,e[n]]);return t.map(function(e){return e.map(encodeURIComponent).join("=")}).join("&")}function s(e){var t="snippets_",n=t+ ++i;this.getCallbackName=function(){return n},this.get=function(t){var r=document.createElement("script");r.src=t,r.type="text/javascript",window[n]=function(t){e(t),document.body.removeChild(r)},document.body.appendChild(r)}}function u(e){var n=t.merge(o,e||{});this.getSnippets=function(e,t){if(!e.length)return this;var i=n.baseUrl+"/"+encodeURIComponent(e)+".jsonp",o=new s(t),u={callback:o.getCallbackName()};return n.context!=null&&(u.context=n.context),n.uk!=null&&(u.uk=n.uk?"1":"0"),o.get(i+"?"+r(u)),this}}var n=function(t){var n=e.getData(t,"record-id");if(!n){var r=t.querySelector("record-id");n=r&&r.innerHTML}return n},i=0,o={baseUrl:"",uk:null,context:null},a;return{config:function(e){a=new u(e)},process:function(e){var t=document.querySelectorAll("bbc-snippet"),r=[];for(var i=0;i<t.length;++i)r.push(n(t[i]));var s=this;this.request(r,function(t){s.applyStyle(t.style),s.replace(t.snippets),e()})},applyStyle:function(e){if(!document.querySelectorAll('link[href="'+e+'"]').length){var t=document.createElement("link");t.rel="stylesheet",t.href=e,document.head.appendChild(t)}},request:function(e,t){a.getSnippets(e,t)},replace:function(e){var t={};for(var r=0;r<e.length;++r){var i=document.createElement("div");i.innerHTML=e[r].html;var s=i.children[0];t[e[r].id]=s}var o=document.querySelectorAll("bbc-snippet");for(var r=0;r<o.length;++r){var u=n(o[r]);u&&t[u]&&o[r].parentElement.replaceChild(t[u].cloneNode(!0),o[r])}}}}),define("playlister/snippets/context",[],function(){function e(e){this._uk=e}function t(e){this._name=e}return e.prototype.isUk=function(){return this._uk===!0},e.prototype.isNonUk=function(){return this._uk===!1},e.prototype.isAuto=function(){return this._uk==null},t.prototype.isEmpty=function(){return this._name==null},t.prototype.getName=function(){return this._name},{UserGeo:e,PlaybackContext:t}}),define("playlister/snippets/stats",[],function(){function e(){this._start=null,this._duration=0}function t(){this._count=0}function n(e,t,n){this._playCounter=e,this._continuousPlayCounter=t,this._playTimer=n}return e.prototype.startTimer=function(){return this._start==null&&(this._start=(new Date).getTime()),this},e.prototype.stopTimer=function(){return this._start!=null&&(this._duration+=(new Date).getTime()-this._start,this._start=null),this},e.prototype.getDuration=function(){var e=0;return this._start!=null&&(e=(new Date).getTime()-this._start),this._duration+e},t.prototype.increment=function(){this._count+=1},t.prototype.getCount=function(){return this._count},n.prototype.logPlay=function(){this._playCounter.increment()},n.prototype.logContinuousPlay=function(){this._continuousPlayCounter.increment()},n.prototype.logStartPlayback=function(){this._playTimer.startTimer()},n.prototype.logStopPlayback=function(){this._playTimer.stopTimer()},{StatsPlayTimer:e,StatsPlayCounter:t,StatsLogger:n}}),define("playlister/snippets/main",["./util/logging","./util/obj","./util/dom","./util/events","./driver/html5","./driver/smp","./playables","./i18n/locales","./animation/progress","./component/transform","./context","./stats"],function(e,t,n,r,i,s,o,u,a,f,l,c){"use strict";function h(e){e=t.merge(h.defaults,e||{}),this.isStatsLoggingEnabled=function(){return e.istats_enabled},this.isContinuousPlayEnabled=function(){return e.continuous},this.isPauseEnabled=function(){return e.pause_enabled},this.getBaseUrl=function(){return e.base_url},this.getLocale=function(){return e.locale},this.isUk=function(){return e.uk},this.getContext=function(){return e.context},this.getWaitingDetectionTimeout=function(){return e.waiting_detection_timeout},this.getLoadingTimeout=function(){return e.loading_timeout},this.getMonitoringBaseUrl=function(){return e.monitoring_base_url}}function p(e,t,n){this.getPlayCount=function(){return e.getCount()},this.getContinuousPlayCount=function(){return t.getCount()},this.getPlayDuration=function(){return n.getDuration()}}function j(e,t){this.element=e,this.duration=t.duration,this.resource=t.resource,this.format=t.format,this.tooltip=t.tooltip,this.id=t.id,this.title=t.title,this.artist=t.artist,this.artistId=t.artistId,this.imageSrc=t.imageSrc,this.position=t.index+1,this.index=t.index,this.totalSnippets=t.count,this.playable=!!this.resource,this.loading=!1,this.playing=!1,this.paused=!1,this.waiting=!1,this.currentTime=0}function F(){}h.defaults={istats_enabled:!0,continuous:!1,pause_enabled:!0,base_url:"/modules/snippet",locale:"en",uk:null,context:null,loading_timeout:1e4,waiting_detection_timeout:5e3,monitoring_base_url:"/modules/snippet/monitoring"};var d={metaLoaded:!0,playbackLoading:!0,playbackStarted:!0,playbackPaused:!0,playbackResumed:!0,playbackEnded:!0,playbackStopped:!0,playbackError:!0,playbackWaiting:!0,skippedUnplayable:!0,endOfSnippets:!0,volumeChanged:!0,playbackProgressUpdate:!0,playbackNext:!0,playbackPrev:!0},v=!1,m=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)},g=function(e){return n.matches(e,".spt-snippet")||(e=n.querySelectorParents(e,".spt-snippet")),e},y=function(){return document.querySelectorAll(".spt-snippet")},b=function(e){return n.matches(e,".is-paused")},w=function(e){return n.matches(e,".is-playing")},E=function(e){return!n.matches(e,".is-disabled")},S=function(e){return n.matches(e,".is-loading")},x=function(e){var t=g(e.target);t&&(b(t)?(I.snippet.waiting&&T(),I.resumeSnippet()):w(t)&&I.config.isPauseEnabled()?I.pauseSnippet():w(t)?I.stopSnippet(!0):!S(t)&&E(t)&&(I.setActiveSnippet(t),I.playSnippet(!0)))},T=function(){I.snippet.waiting=!1,I.snippet.loading=!0,I.setSnippetVisualState("loading"),I.apiEvent("playbackLoading"),I.stopPlaybackAnimation()},N=function(e){I.logger.error("Error listener");if(!e.severity||e.severity=="critical")I.snippetError(),B()},C=function(e){I.snippet.paused||(I.logger.info("Waiting listener"),I.apiEvent("playbackWaiting"),I.snippet.playing&&(I.snippet.waiting=!0,I.snippet.playing=!1,I.setSnippetVisualState("paused"),I.pausePlaybackAnimation()))},k=function(){I.logger.info("Loaded listener"),B()},L=function(){I.snippet.loading&&I.driver.getCurrentTime()?(I.logger.info("Started listener"),I.snippet.loading=!1,I.snippet.playing=!0,I.snippet.duration=I.driver.getDuration(),I.copySnippetMetaDataToApi(),I.setSnippetVisualState("playing"),D(),I.startPlaybackAnimation(),I.setSnippetTooltip(I.config.isPauseEnabled()?"Pause playback":"Stop playback"),I.statsLogger.logPlay(),I.userPlayed||I.statsLogger.logContinuousPlay(),I.statsLogger.logStartPlayback(),I.triggerIstats("playlister_snippet_playback"+(I.userPlayed?"":"_continuous")),I.apiEvent("playbackStarted")):I.snippet.waiting?(I.snippet.waiting=!1,I.snippet.playing=!0,I.resumePlaybackAnimation(),I.apiEvent("playbackResumed"),I.setSnippetVisualState("playing")):(I.logger.info("Time update listener"),H(I.config.getWaitingDetectionTimeout()),I.snippet.duration===undefined&&(I.snippet.duration=I.driver.getDuration()),I.snippet.currentTime=I.driver.getCurrentTime(),I.copySnippetMetaDataToApi(),I.apiEvent("playbackProgressUpdate"),I.snippet.playing||I.updatePlaybackAnimation())},A=function(){I.logger.info("Ended listener"),I.stopSnippet(!1),B()},O=function(){I.logger.error("Timeout listener"),I.snippetError()},M,_=function(e){M&&D(),M=setTimeout(O,e)},D=function(){clearTimeout(M),M=null},P=null,H=function(e){P&&B(),P=setTimeout(C,e)},B=function(){clearTimeout(P),P=null},I={player:null,snippet:{},skipUnplayable:!1,playbackAnimation:{},reporting:!1,config:null,userPlayed:!1,paused:!1,istats:null,driver:null,logger:null,monitoring:null,init:function(t,n,r,o){this.config=new h(t);var a=new c.StatsPlayCounter,d=new c.StatsPlayCounter,m=new c.StatsPlayTimer;this.statsLogger=new c.StatsLogger(a,d,m),this.stats=new p(a,d,m),u.setLocale(this.config.getLocale()),this.geo=new l.UserGeo(this.config.isUk()),this.context=new l.PlaybackContext(this.config.getContext());var g={baseUrl:this.config.getBaseUrl()};this.geo.isAuto()||(g.uk=this.geo.isUk()),this.context.isEmpty()||(g.context=this.context.getName()),f.config(g),this.audioEnabled=this.isNativePlaybackSupported(),this.playbackAnimation.enabled=this.isCanvasSupported(),this.config.isContinuousPlayEnabled()&&(this.skipUnplayable=!0),I.logger=I.reporting?new e.Logger:new e.NoOpLogger,I.monitoring=new e.RemoteMonitoring({baseUrl:this.config.getMonitoringBaseUrl()}),r?(I.logger.info("Statistics being logged with iStats"),I.istats=r):(I.logger.warn("No statistics are being logged"),I.monitoring.increment("Client_No_Stats")),this.audioEnabled&&(v||(this.bindApi(),n&&!o?(I.driver=s,I.driver.init(n,I.monitoring),I.driver.on("initialised",function(e){I.bindUIEvents(),I.setAllSnippetsStateEnabled(),I.monitoring.increment("SMP_Initialised")})):(I.driver=i,I.driver.init(),I.bindUIEvents(),I.setAllSnippetsStateEnabled(),I.monitoring.increment("HTML5_Player_Initialised"))),v=!0),f.process(function(){})},setAllSnippetsStateEnabled:function(){n.addClass(document.body,"spt-enabled")},setAllSnippetsStateDisabled:function(){n.removeClass(document.body,"spt-enabled")},destroy:function(){this.setAllSnippetsStateDisabled(),v&&(this.stopSnippet(!0),this.unbindApi(),this.unbindUIEvents(),this.audioEnabled&&I.driver.destroy()),this.snippet={},this.playbackAnimation={},this.audioEnabled=null,this.config=null,v=!1},log:function(e){this.reporting&&console.log(e)},bindApi:function(){window.bbcSnippets={snippet:{},volume:1,functions:{stop:function(){return I.stopSnippet(!0)},play:function(e){return I.playSnippet(!0,e)},pause:function(){return I.pauseSnippet()},resume:function(){return I.resumeSnippet()},next:function(){return I.moveToNextSnippet()},prev:function(){return I.moveToPreviousSnippet()},isFirst:function(){return this.hasCurrentSnippet()&&this.getCurrentSnippet().index===0},isLast:function(){return this.hasCurrentSnippet()&&this.getCurrentSnippet().index===this.getSnippetCount()-1},isFirstPlayable:function(){return this.hasCurrentSnippet()&&this.getCurrentSnippet().index===I.indexOfFirstPlayableSnippet()},isLastPlayable:function(){return this.hasCurrentSnippet()&&this.getCurrentSnippet().index===I.indexOfLastPlayableSnippet()},skipForward:function(){if(this.hasCurrentSnippet()&&!this.isLastPlayable()){var e=this.getCurrentSnippet(),t=e.playing||e.loading;this.next(),t&&this.play(),I.triggerIstats("playlister_snippet_skipped_forward")}},skipBackward:function(){var e=this.getCurrentSnippet(),t=e.playing||e.loading;this.isFirstPlayable()||e.currentTime>2?(I.seekTo(0),I.triggerIstats("playlister_snippet_skipped_to_beginning")):(this.prev(),t&&this.play(),I.triggerIstats("playlister_snippet_skipped_backward"))},first:function(){return I.moveToSnippet(0)},last:function(){return I.moveToSnippet(y().length-1)},firstPlayable:function(){return I.moveToFirstPlayableSnippet()},lastPlayable:function(){return I.moveToLastPlayableSnippet()},skipUnplayable:function(e){return I.setSkipUnplayable(e)},volume:function(e){return I.setVolume(e)},getMetaData:function(){return window.bbcSnippets?window.bbcSnippets:!1},getSnippets:function(){return I.getAllSnippets()},listSnippets:function(){return I.listSnippets()},getSnippetCount:function(){return this.listSnippets().length},getCurrentSnippet:function(){return this.getMetaData().snippet},hasCurrentSnippet:function(){return!t.isEmpty(this.getCurrentSnippet())}}}},unbindApi:function(){for(var e in d)r.off(d[e]);window.bbcSnippets=null},getAllSnippets:function(){var e=y(),t=[];if(e.length>0)for(var n=0,r=e.length;n<r;n++)t[n]=this.getSnippetMeta(e[n]);return t.length?t:!1},listSnippets:function(){var e=y(),t=[],n=0,r=e.length;for(;n<r;n++)t.push(this.getSnippetMeta(e[n]));return t},isNativePlaybackSupported:function(){return document.createElement("audio").canPlayType&&document.createElement("audio").canPlayType("audio/mpeg")},isCanvasSupported:function(){return!!window.CanvasRenderingContext2D},indexOfFirstPlayableSnippet:function(){return this.indexOfNextPlayableSnippet(-1)},indexOfLastPlayableSnippet:function(){return this.indexOfPreviousPlayableSnippet(Infinity)},indexOfNextPlayableSnippet:function(e){var t=y(),n=t.length;e=Math.max(0,e+1);for(;e<n;e++)if(this.getSnippetMeta(t[e]).playable)return e;return-1},indexOfPreviousPlayableSnippet:function(e){var t=y(),n=t.length;e=Math.max(0,n-1-e+1);for(;e<n;e++){var r=n-1-e;if(this.getSnippetMeta(t[r]).playable)return r}return-1},moveToFirstPlayableSnippet:function(){var e=this.indexOfFirstPlayableSnippet();if(e!==-1){var t=y();return this.setActiveSnippet(t[e]),!0}return!1},moveToLastPlayableSnippet:function(){var e=this.indexOfLastPlayableSnippet();if(e!==-1){var t=y();return this.setActiveSnippet(t[e]),!0}return!1},setSkipUnplayable:function(e){return typeof e=="boolean"?(this.skipUnplayable=e,!0):!1},setVolume:function(e){return typeof e=="number"?(window.bbcSnippets.volume=e,this.volume=e,this.audioEnabled&&I.driver.setVolume(this.volume),this.apiEvent("volumeChanged"),!0):!1},seekTo:function(e){this.audioEnabled&&I.driver.setCurrentTime(e)},moveToSnippet:function(e){var t=y(),n=e<0?t.length+e:e,r=t[n];return r?(this.setActiveSnippet(r),!0):!1},getSnippetByOffsetFromCurrentSnippet:function(e){var t=this,r=y(),i=n.indexOf(r,t.snippet.element);if(i+e<0)return!1;var s=r[i+e];return s||!1},moveToNextSnippet:function(){this.apiEvent("playbackNext");var e=this;e.stopSnippet(!0);var t=e.getSnippetByOffsetFromCurrentSnippet(1);return t?(e.setActiveSnippet(t),e.skipUnplayable&&!e.snippet.playable?(e.apiEvent("skippedUnplayable"),e.moveToNextSnippet()):!0):(e.apiEvent("endOfSnippets"),!1)},moveToPreviousSnippet:function(){this.apiEvent("playbackPrev");var e=this;e.stopSnippet(!0);var t=e.getSnippetByOffsetFromCurrentSnippet(-1);return t?(e.setActiveSnippet(t),e.skipUnplayable&&!e.snippet.playable?(e.apiEvent("skippedUnplayable"),e.moveToPreviousSnippet()):!0):(e.apiEvent("endOfSnippets"),!1)},bindUIEvents:function(){n.addEventListener(document.body,"click",x)},unbindUIEvents:function(){n.removeEventListener(document.body,"click",x)},setActiveSnippet:function(e){this.stopSnippet(!0),this.snippet=this.getSnippetMeta(e),this.copySnippetMetaDataToApi(),this.apiEvent("metaLoaded"),I.logger.info("Snippet loaded:"),I.logger.info(this.snippet)},copySnippetMetaDataToApi:function(){window.bbcSnippets.snippet=this.snippet},startPlaybackAnimation:function(){a.start(window.bbcSnippets.snippet)},pausePlaybackAnimation:function(){a.pause()},resumePlaybackAnimation:function(){a.resume()},updatePlaybackAnimation:function(){a.update()},stopPlaybackAnimation:function(){a.stop()},triggerIstats:function(e){var t=this;if(this.config.isStatsLoggingEnabled()){var n={track:t.snippet.id,uk:this.config.isUk(),context:this.config.getContext(),play_count:this.stats.getPlayCount(),continuous_play_count:this.stats.getContinuousPlayCount(),play_duration:Math.floor(this.stats.getPlayDuration()/1e3),source_type:this.snippet.format};I.logger.info("iStats action: "+e),I.istats&&I.istats.log("click",e,n)}},setSnippetTooltip:function(e){if(e&&I.snippet.element){var t=I.snippet.element.querySelector(".spt-button");t&&(t.title=u.t(e))}return this},resetSnippetTooltip:function(){if(I.snippet.element&&I.snippet.tooltip){var e=I.snippet.element.querySelector(".spt-button");e&&(e.title=I.snippet.tooltip)}return this},playSnippet:function(e,n){var r=this;I.userPlayed=e,n!==undefined&&r.setActiveSnippet(n.element);if(!t.isEmpty(this.snippet)&&this.snippet.playing)return!1;if(this.audioEnabled&&!t.isEmpty(this.snippet)&&this.snippet.playable&&!this.snippet.playing){this.snippet.loading=!0,this.setSnippetVisualState("loading"),this.apiEvent("playbackLoading");var i="";return this.snippet.format=="clip"?i=new o.ClipAudioSource(this.snippet.resource):i=new o.UrlAudioSource(this.snippet.resource),I.driver.play(i),I.driver.on("error",N),I.driver.on("loadedmetadata",k),I.driver.on("timeupdate",L),I.driver.on("ended",A),I.driver.on("waiting",C),_(I.config.getLoadingTimeout()),!0}return this.snippetError(),!1},pauseSnippet:function(){return I.snippet.playing?(I.driver.pause(),I.snippet.playing=!1,I.snippet.paused=!0,I.pausePlaybackAnimation(),I.setSnippetVisualState("paused"),I.setSnippetTooltip("Resume playback"),I.apiEvent("playbackPaused"),I.triggerIstats("playlister_snippet_paused"),I.logger.info("Snippet paused"),!0):!1},resumeSnippet:function(){return I.snippet.paused?(I.driver.resume(),I.snippet.playing=!0,I.snippet.paused=!1,I.resumePlaybackAnimation(),I.setSnippetVisualState("playing"),I.setSnippetTooltip(I.config.isPauseEnabled()?"Pause playback":"Stop playback"),I.apiEvent("playbackResumed"),I.triggerIstats("playlister_snippet_resumed"),I.logger.info("Snippet resumed"),!0):!1},snippetError:function(){this.setSnippetVisualState("error"),this.apiEvent("playbackError"),this.stopSnippet(!1,!0),I.logger.error("Snippet error!")},apiEvent:function(e){r.emit(d,e,{type:e,target:window.bbcSnippets}),I.logger.info("API event triggered: "+e)},stopSnippet:function(e,n){return t.isEmpty(I.snippet)?!1:(I.statsLogger.logStopPlayback(),I.driver.stop(),this.stopPlaybackAnimation(),this.setSnippetVisualState("stopped"),I.driver.off("error",N),I.driver.off("loadedmetadata",k),I.driver.off("timeupdate",L),I.driver.off("ended",A),I.driver.off("waiting",C),this.snippet.loading=!1,this.snippet.playing=!1,this.snippet.paused=!1,this.snippet.currentTime=0,this.copySnippetMetaDataToApi(),this.resetSnippetTooltip(),e?(this.triggerIstats("playlister_snippet_stopped"),this.apiEvent("playbackStopped")):n||(this.apiEvent("playbackEnded"),this.config.isContinuousPlayEnabled()&&this.moveToNextSnippet()&&this.playSnippet(!1)),!0)},decode:function(e){var t={},n,r=0,i,s,o=0,u,a="",f=String.fromCharCode,l=e.length,c="",h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(n=0;n<64;n++)t[h.charAt(n)]=n;for(s=0;s<l;s++){i=t[e.charAt(s)],r=(r<<6)+i,o+=6;while(o>=8)c=((u=r>>>(o-=8)&255)||s<l-2)&&(a+=f(u))}return a},getSnippetMeta:function(e){if(e&&e.getAttribute){var t=y(),r="",i=e.querySelector(".spt-button");return i&&(r=i.title),new j(e,{duration:n.getData(e,"duration",30),resource:this.decode(n.getData(e,"resource","")),format:n.getData(e,"format"),id:n.getData(e,"id"),title:n.getData(e,"title"),artist:n.getData(e,"artist"),artistId:n.getData(e,"artist-id"),imageSrc:n.getData(e,"image-src"),index:n.indexOf(t,e),tooltip:r,count:t.length})}return new F},setSnippetVisualState:function(e){var t=this.snippet.element;if(t)switch(e){case"loading":n.removeClass(t,"is-playing has-error is-paused can-pause"),n.addClass(t,"is-loading");break;case"playing":n.removeClass(t,"is-loading has-error is-paused"),n.addClass(t,"is-playing"),I.config.isPauseEnabled()&&n.addClass(t,"can-pause");break;case"paused":n.removeClass(t,"is-loading has-error is-playing can-pause"),n.addClass(t,"is-paused");break;case"stopped":n.removeClass(t,"is-loading is-playing is-paused can-pause");break;case"error":n.removeClass(t,"is-loading is-playing is-paused can-pause"),n.addClass(t,"has-error");break;default:}return I.logger.info("Snippet visual state changed: "+e),this}},q={init:function(e,t,n,r){return I.init(e,t,n,r),this},create:function(e,t){return f.request(e,t),this},on:function(e,t){return r.on(d,e,t),this},off:function(e,t){return r.off(d,e,t),this},cmd:function(e,t){if(window.bbcSnippets&&typeof window.bbcSnippets.functions[e]=="function")return window.bbcSnippets.functions[e](t)},getConfig:function(){return I.config},getStats:function(){return I.stats},destroy:function(){return I.destroy(),this}};return q}),define("playlister/snippets",["playlister/snippets/main","bump-3","istats-1","swfobject-2"],function(e,t,n,r){return{init:function(r){return e.init(r,t,n,this.useHTMLPlayer()),this},useHTMLPlayer:function(){return"ontouchstart"in window||"onmsgesturechange"in window?!1:!r.hasFlashPlayerVersion("10")},create:function(t,n){return e.create(t,n),this},on:function(t,n){return e.on(t,n),this},off:function(t,n){return e.off(t,n),this},cmd:function(t,n){return e.cmd(t,n)},getConfig:function(){return e.getConfig()},getStats:function(){return e.getStats()},destroy:function(){return e.destroy(),this}}});