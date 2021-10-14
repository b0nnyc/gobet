const _GobetServer = "http://172.104.180.176:3000";
var auth = "";
var session = "";
var timerID = 0;
var COOKIES = {};
var LD;
! function ( e ) {
	function n( n ) {
		e.isLandscape = n, r( )
	}

	function t( n ) {
		e.checkRotationDisabled = n, r( )
	}

	function o( ) {
		l.scrollTo( 0, 1 ), l.platform = "egret", s = 0, r( ), l.onorientationchange = r, setInterval( function ( ) {
			r( )
		}, 1e3 )
	}

	function i( ) {
		clearInterval( c );
		var n = document.getElementById( "loadingUi" );
		if( n ) {
			n.innerHTML = "", n.parentNode && n.parentNode.removeChild( n );
			var t = document.getElementsByTagName( "body" )[ 0 ];
			e.delBg ? setTimeout( function ( ) {
				t.className = ( t.className || "" ).replace( /body-bg/gi, "" )
			}, 100 ) : e.bgImg && ( t.style[ "background-image" ] = 'url("' + e.bgImg + '")' )
		}
	}

	function a( ) {
		var e = navigator.userAgent.toString( ).toLowerCase( );
		return e.indexOf( "ipad" ) >= 0 || e.indexOf( "tablet" ) >= 0
	}

	function r( ) {
		var n = document.getElementById( "rotate_screen" );
		if( n ) {
			if( e.checkRotationDisabled || g ) return void( n.style.display = "none" );
			var t = document.getElementById( "rotate_screen_img" );
			t && ( t.style.width = "100%" ), n.style.display = e.isLandscape ? window.innerHeight > window.innerWidth ? "block" : "none" : window.innerHeight > window.innerWidth ? "none" : "block"
		}
	}

	function d( e ) {
		g = e, r( )
	}
	var c, s, l = window,
		g = !1;
	e.setIsLandscape = n, e.setCheckRotationDisabled = t, e.load = o, e.stop = i, e.isPad = a, e.checkRotation = r, e.setPortraitMode = d, o( )
}( LD || ( LD = {} ) );

function entryGame(n) {
	clearInterval(timerID);
	var el = document.getElementById('panel');
	el.style.display = 'none';
	el = document.getElementById( "gameMainDiv" );
	el.style.display='block';	
	mo.PROJ.search = atob(session)+n;
	var dbody = document.getElementById( "body" );
	if( dbody && dbody.style )
		dbody.style.display = "block";
	var loadingUi = document.getElementById( "loadingUi" );
	if( loadingUi && loadingUi.style )
		loadingUi.style.display = "block";
	LD.setCheckRotationDisabled( false );
	egret.runEgret( {
		renderMode: "webgl",
		audioType: 0
	} );
	var parent = document.getElementById( "gameMainDiv" );
	for( let idx in parent.childNodes ) {
		if( parent.childNodes[ idx ].nodeName == "CANVAS" ) {
			parent.childNodes[ idx ].addEventListener( "webglcontextlost", function ( e ) {
				alert( "Browser webGL crash. Refresh page now." );
				window.location.reload( );
			} );
		}
	}
	return false;
}
function getCookie(name){ var c=COOKIES[name];return c?c:""; }
function setCookie(cName, cValue, expDays) {
        var date = new Date();
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
		var str = cName + "=" + encodeURIComponent(cValue) + "; " + expires + "; path=/";
        document.cookie = str;
}
function req(method, url, data, header, callback, err)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			if (callback) 
				callback(xhr.responseText);
		}
	}
	xhr.onerror = err
	xhr.open(method, url, true);
	if (header) {
		for(var x in header) {
			xhr.setRequestHeader(x, header[x]);
		}
	}
	xhr.send(data);
}
function updateInfo(p) {
	var el = document.getElementById('balance')
	if (!el)
		return;
	var nick = p["nick"]
	var balance = p["balance"]
	var str = Number(balance).toLocaleString(navigator.language);
	el.innerHTML = str;
	el = document.getElementById('nick')
	el.innerHTML = nick;
}
function startGame(n) {
	if (auth == '') {
		var el = document.getElementById('gameForm');
		el.style.display = 'none';
		el = document.getElementById('loginForm');
		el.style.display = 'block';
		el = document.getElementById('loginSlider');
		el.value = 1;
		return false;
	}
	return entryGame(n);
}
function resetAction() {
	var el = this;
	if (el.value > 70) {
		el = document.getElementById('resetEmail');
		var login = el.value.trim();
		if (login == "") {
			el.className = 'error';
			el.focus();
			return
		}
	}
}
function registerAction() {
	var el = this;
	if (el.value > 70) {
		el = document.getElementById('regUser');
		var login = el.value.trim();
		if (login == "") {
			el.className = 'error';
			el.focus();
			return
		}
		el = document.getElementById('regEmail');
		var login = el.value.trim();
		if (login == "") {
			el.className = 'error';
			el.focus();
			return
		}
		/*
		el = document.getElementById('regTgphone')
		var login = el.value.trim();
		if (login == "") {
			el.className = 'error';
			el.focus();
			return
		}
		el = document.getElementById('regWaphone')
		var login = el.value.trim();
		if (login == "") {
			el.className = 'error';
			el.focus();
			return
		}
		*/
	}
}
function wdAction() {
	var el = this;
	if (el.value > 70) {
		el = document.getElementById('wdAmount');
		var amount = el.value.trim();
		if (amount == "") {
			el.className = 'error';
			el.focus();
			return
		}
	}
}
function dpAction() {
	var el = this;
	if (el.value > 70) {
		el = document.getElementById('dpDate');
		var amount = el.value.trim();
		if (amount == "") {
			el.className = 'error';
			el.focus();
			return
		}
		el = document.getElementById('dpAmount');
		var amount = el.value.trim();
		if (amount == "") {
			el.className = 'error';
			el.focus();
			return
		}
	}
}
function dmAction() {
	var el = this;
	if (el.value > 70) {
		el = document.getElementById('dmText')
		var text = el.value.trim();
		if (text == "") {
			el.className = 'error';
			el.focus();
			return
		}
	}
}
function _updatePlayerInfo(ok, err) {
	var cookie = document.cookie;
	var headers = {};
	headers["Set-Cookie"] = cookie;
	req("GET", _GobetServer+"/auth", null, headers, 
		function(d) {
			var p = JSON.parse(d);
			var nick = p["nick"]
			if (nick && nick == "")
			{
				setCookie("auth","",6);
				auth = "";
				session = "";
				if (err) { err (); }
			} else {
				setCookie("auth",nick,6);
				auth = nick;
				session = p["session"];
				updateInfo(p);
				if (ok) { ok(); }
			}
		},
		function(e) {
			var el = document.getElementById("hint")
			el.innerHTML = "Failed to login. Please try again later.";
			el.className = 'failed';
			setTimeout(function() { 
				resetLoginAction();
			}, 3000);
		});


}
function updatePlayerInfo() {
	if (auth == "")
		return;
	var token = getCookie("token");
	if (token == "")
		return;
	var login = getCookie("login");
	if (login == "")
		return;
	var nonce = getCookie("nonce");
	if (nonce == "")
		return;
	_updatePlayerInfo();
}
function resetLoginAction() {
	var slider = document.getElementById('loginSlider');
	slider.value = 0;
	slider.addEventListener('change', loginAction);
	slider.disabled = false;
	var el = document.getElementById("hint")
	el.innerHTML = "slide to login"
	el.className = 'hint'
}
function loginAction() {
	var slider = this;
	if (slider.value > 70) {
		slider.disabled = true;
		slider.removeEventListener("change", loginAction);
		var el = document.getElementById('loginUser')
		var login = el.value.trim();
		if (login == "") {
			el.className = 'error';
			el.focus();
			return
		}
		el.className = '';
		el = document.getElementById('loginPasswd')
		var passwd = el.value.trim();
		if (passwd == "") {
			el.className = 'error';
			el.focus();				
			return
		}
		el.className = '';		
		var nonce = new Date().getTime()+"";
		var _token = md5(passwd) + "";
		var token = md5(_token + login) + "";
		var _passwd = md5(token+nonce);
		setCookie("nonce","",7);
		setCookie("login","",7);
		setCookie("token","",7);
		setCookie("nonce",nonce,7);
		setCookie("login",login,7);
		setCookie("token",_passwd,7);
		_updatePlayerInfo(function(){
			resetLoginAction();
			updateState();
		}, function() {
			var el = document.getElementById("hint")
			el.innerHTML = "Failed to login, invalid user name or password. Please try again.";
			el.className = 'failed';
			setTimeout(function() { 
				resetLoginAction();
			}, 3000);
		})
		return;
	}
}
function logout() {
	setCookie("auth","",6);
	auth="";
	updateState();
	return false;
}
function hideAllForm() {
	var el = document.getElementById('loginForm');
	el.style.display = 'none';
	el = document.getElementById('resetForm');
	el.style.display = 'none';
	el = document.getElementById('gameForm');
	el.style.display = 'none';
	el = document.getElementById('registerForm');
	el.style.display = 'none';
	el = document.getElementById('wdForm');
	el.style.display = 'none';
	el = document.getElementById('dpForm');
	el.style.display = 'none';
	el = document.getElementById('dmForm');
	el.style.display = 'none';
}
function showForm(formName) {
	hideAllForm();
	var el = document.getElementById(formName);
	el.style.display = 'block';
	return false;
}
function updateState() {
	hideAllForm();
	var el = document.getElementById('exit');
	el.style.display = 'none';
	el = document.getElementById('info');
	el.style.display = 'none';
	el = document.getElementById('gameForm');
	el.style.display = 'block';
	if (auth == '') {
		resetLoginAction();
	} else {
		el = document.getElementById('exit');
		el.style.display = 'block';
		el = document.getElementById('info');
		el.style.display = 'block';	
	}
}
window.onload = function() {
    window.loadingStartTime = Date.now( );
	LD.delBg = false;
	LD.setIsLandscape( true );
	
    var cookies = decodeURIComponent(document.cookie).split(';');
    for (var i = 0; i < cookies.length; i++) {
        var c = cookies[i].trim().split('=');
		COOKIES[c[0]] = c[1]
	}
	auth = getCookie("auth");
	updatePlayerInfo();
	timerID = setInterval(updatePlayerInfo,5000);
	var el = document.getElementById('registerSlider');
	el.addEventListener('change', registerAction);
	el = document.getElementById('resetSlider');
	el.addEventListener('change', resetAction);
	el = document.getElementById('dmSlider');
	el.addEventListener('change', dmAction);
	el = document.getElementById('dpSlider');
	el.addEventListener('change', dpAction);
	el = document.getElementById('wdSlider');
	el.addEventListener('change', wdAction);
	updateState();
	if( typeof mo != 'undefined') {
		//LD.setPortraitMode( mo.PROJ.portraitMode )
		mo.PROJ.appInfo.cfgUrl = 'project.json';
		mo.PROJ.e_log_disabled = !0;
		mo.PROJ.search = "";
		const parser = document.createElement('a'); 
		parser.href = _GobetServer;
		mo.PROJ.e_port = parser.port;
		mo.PROJ.e_host = parser.hostname;
	}
}
