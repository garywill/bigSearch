/*
 * By 大术专搜(bigSearch)
 * (acsearch.ga, acsearch.tk)
 * 
 * 版权所有 保留所有权利
 * All Rights Reserved
 * 
 * Source code: https://github.com/garywill/bigSearch
 * 
 */

///// basic functions /////
function getElementsByClassName(node, classname) {
	
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

var onrd = new Array(); //on document ready
document.addEventListener('DOMContentLoaded', async (event) => {
//window.onload = function() {    
//$(function(){
    for (var i=0; i<onrd.length; ++i)
    {
        //console.log(onrd[i]);
        //setTimeout( onrd[i] ,10+2*i);
        try{
            await Promise.resolve( onrd[i]() );
        }catch(err){
            console.error(err);
        }
    }
});

////// on document ready /////////////////	
onrd.push(async function(){
    if (window.run_env == "http_web") 
        return;
          
    if (await get_addon_setting("hl")) 
        window.lang = await get_addon_setting("hl");
    else
        window.lang = "en";
    
    //console.log("set user lang:", window.lang);

});

onrd.push( function(){
    init_data();
});

onrd.push( function(){
    //console.log(window.lang);
    rm_not_userlang();
});

onrd.push(function(){
    String.prototype.format = function(replacements) {
        replacements = (typeof replacements === 'object') ? replacements : Array.prototype.slice.call(arguments, 0);
        return formatString(this, replacements);
    }
    var formatString = function (str, replacements) {
        replacements = (typeof replacements === 'object') ? replacements : Array.prototype.slice.call(arguments, 1);
        return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function(m, n) {
            if (m == '{{') { return '{'; }
            if (m == '}}') { return '}'; }
            return replacements[n];
        });
    }
});

onrd.push(function(){
    make_cata_btns();
    
    cata_click( document.getElementById("cata_btn_general") );
    
    set_input_width();
    
});

onrd.push(function(){
    document.getElementById("inputbox").addEventListener('keypress', inputbox_press );
});

onrd.push(function(){
    setTimeout(putmail,5000);
});

onrd.push(async function(){
    //console.log(333);
	if (window.run_env != "http_web" ) 
    {
        //console.log(444);
        //console.log( await get_addon_setting('noaddonstatistics') );
        if ( ( await get_addon_setting('noaddonstatistics') ) == true ||
            browser.extension.inIncognitoContext  
        )
        {
            //console.log(555);
            return;
        }
        
        
    }
    
    setTimeout(do_stati,1000);
});

onrd.push(function(){
	setf();
});



onrd.push(function(){
	setlp();
});

onrd.push(function(){
	displayhist();
});

onrd.push(function(){
	document.getElementById("clearhist").onclick=function()
	{
		delStor("hist" );
		document.getElementById("hist").innerHTML="";
	}
});

onrd.push(function(){
	document.getElementById("inputclear").onclick=function()
	{
		document.getElementById("inputbox").value="";
		setf();
	}
});

onrd.push(function(){
	document.getElementById("inputselect").onclick=function()
	{
		document.getElementById("inputbox").select();
	}
});

onrd.push(function(){
	document.getElementById("inputcopy").onclick=function()
	{
		document.getElementById("inputbox").select();
        try 
        {
            document.execCommand('copy');
            
        }catch(err){  }
	}
});

onrd.push(function(){
	Array.from( document.getElementsByClassName("btmbtn") ).forEach( function(ele) {
        ele.onclick = btm_dialog;
    });
});



onrd.push(function(){
	window.onfocus=windowonfocus;
});

onrd.push(function(){
    document.getElementById("btn_mobile").onclick = function(){
        setStor("mobile","true");
        location.reload();
    };
});
onrd.push(function(){
    document.getElementById("btn_desktop").onclick = function(){
        delStor("mobile");
        location.reload();
    };
});

onrd.push(function(){
    document.getElementById("btn_zh").onclick = function(){
        setCookie_my("hl","zh");
        //location.reload();
    };
});
onrd.push(function(){
    document.getElementById("btn_en").onclick = function(){
        setCookie_my("hl","en");
        //location.reload();
    };
});

onrd.push(function(){
    //setTimeout(layout_init, 30);
    layout_init();
});

onrd.push(function(){
    setTimeout(function() {
        window.onresize = onWindowResize;
    },500);
});

var csieqon = 0;
onrd.push(function(){
    document.getElementById("hist_ban").onclick = function(){
        csieqon++;
        if (csieqon > 10 && window.run_env == "http_web"){
            setStor("beatnowhere","true");
            alert("你想点哪里？");
        }
    };
});

onrd.push(function(){
    //if (window.run_env == "http_web")
        document.getElementById("beau_css_tag").href=beaucss;
});




onrd.push(function(){
    if (window.run_env != "http_web" /* && ! browser.extension.inIncognitoContext */ ) 
    {
        //if (getStor("input_content") )
            document.getElementById("inputbox").value = getStor("input_content");

  
        window.addEventListener("blur", function(){
            var input = document.getElementById("inputbox").value.trim()
            //if (input) 
                setStor("input_content", input);
        });
    }
});
/////////////////////////////////

function make_cata_btns() {
    
    document.getElementById("catas_cont").appendChild(createCataBtn("user", source = "user"));
    
    Object.entries(catas).forEach(function(ele) {
        const cata = ele[0];
        //const cata_cont = ele[1];
        if (isVisible(catas[cata]))
            document.getElementById("catas_cont").appendChild(createCataBtn(cata));
    });
}


function setf() {
	document.getElementById("inputbox").focus();
}


function inputbox_press( e ) {
	var evt = e || window.event
	// "e" is the standard behavior (FF, Chrome, Safari, Opera),
	// while "window.event" (or "event") is IE's behavior
	if ( evt.keyCode === 13 ) {
		// Do something
		//alert("pressed enter");
		inputbox_enter();
		// You can disable the form submission this way:
		//return false
	}
}

function inputbox_enter()
{
	if(document.getElementById("lastp")) 
	{
		document.getElementById("lastp").click();
	}
	else
	{
		document.getElementById("engines_table").getElementsByClassName("gobutton")[0].click();
	}
}

function putmail()
{
    str1 = "garywill";
    str2 = "disroot";
    str3 = "org";
    mail = str1 + "@" + str2 + "." + str3;
    
    var ourmail=document.getElementById("ourmail");
    ourmail.href="mailto:" + mail;
    ourmail.appendChild(document.createTextNode(mail));
    
}

function window_set_onfocus()
{
	window.onfocus=windowonfocus;
}
function windowonfocus()
{
	window.onfocus=null;
	
	displayhist();
	setTimeout(window_set_onfocus,3000);
}


function displayhist()
{
try{
	var operzone=document.getElementById("hist");

	var hists=splithists(gethiststr());
	operzone.innerHTML="";
	for (var i=0;i<hists.length;i++)
	{
		var txt2save=hists[i];
		
		var newDiv=document.createElement("div");
		
		
		newDiv.appendChild(document.createTextNode(txt2save));
		
		newDiv.value=txt2save;
        newDiv.setAttribute("title",txt2save);
        if (!mobile)
        {
            newDiv.ondblclick=function()
            {
                document.getElementById("inputbox").value=this.value;
                setf();
                
            }
        }else{
            newDiv.onclick=function()
            {
                document.getElementById("inputbox").value=this.value;
                setf();
                document.getElementById("floater").style.display="none";
            }
        }
		
		span_buttons = document.createElement("span");
        span_buttons.className = "hist_entry_span_buttons";
        
		span_copyhist=document.createElement("span");
        span_copyhist.className = "hist_entry_button";
		span_copyhist.appendChild(document.createTextNode(i18n(["复制 ", "Copy "])));
		span_buttons.appendChild(span_copyhist);
		span_copyhist.onclick=function(event)
		{
			event.stopPropagation();
            navigator.clipboard.writeText( this.parentNode.parentNode.value );
			
		}
		
		span_delhist=document.createElement("span");
        span_delhist.className = "hist_entry_button";
		span_delhist.appendChild(document.createTextNode(i18n(["删除", "Del"])));
		span_buttons.appendChild(span_delhist);
		span_delhist.onclick=function(event)
		{
			event.stopPropagation();
			del_hist(this.parentNode.parentNode.value);
			displayhist();
		}
				
        newDiv.appendChild(span_buttons);
		operzone.appendChild(newDiv);
			
	}
}catch(err){}
}
function ebtn_onclick(obj) 
{
	var inputval=document.getElementById("inputbox").value.trim();
	if (inputval=="")
	{
		alert(i18n(["搜索框内容为空！", "The inputbox is enpty!"]))
		setf();
		return;
	}
	
    const engine =obj.getAttribute("e");
	const btn = obj.getAttribute("b");
    try{
        goEngBtn( engine, btn, inputval );
    } catch(err) { console.error(`ERROR when trying to call ${engine}/${btn}`); console.error(err); }
	
    
    if(!mobile) setTimeout(setf,500);
    
    setTimeout(function () {stati_clickgo(obj.getAttribute("e"),obj.getAttribute("b")) } ,1);

	setTimeout( function() {
        setc_lastp( obj.getAttribute("e") , obj.getAttribute("b") ); 
        setlp();  
    },1);
	
	setTimeout( function() {
        add_hist2c(inputval);
        displayhist();
    },1);
}



function setlp()
{
try{
	if(document.getElementById("lastp")) document.getElementById("lastp").id="";
	var le="",lb="";
	
	var engs=getElementsByClassName(document.getElementById("engines_table"),"engine_tr");
	if(engs.length>0)

        if(getStor("le"))
        {
            le=getStor("le");
            if(getStor("lb")) lb=getStor("lb");
        }
        else
        {
            getElementsByClassName(engs[0],"gobutton")[0].id="lastp";
            return 0;
        }
	
	
	for (var i=0;i<engs.length;i++)
	{
		if(engs[i].getAttribute("e")==le)
		{
			if(lb!="")
			{
				var btns=getElementsByClassName(engs[i],"gobutton");
				for (var u=0;u<btns.length;u++)
				{
					if(btns[u].getAttribute("b")==lb)
					{
						btns[u].id="lastp";
						break;
					}
				}
			}
			else
			{
				getElementsByClassName(engs[i],"gobutton")[0].id="lastp";
			}
			break;
		}
	}
}catch(err){}
}
function setc_lastp(sete,setb)
{
	setStor("le",sete);
	setStor("lb",setb);
}

async function cata_click(btnobj)
{
    const engines_cont = document.getElementById("engines_cont");
    
    engines_cont.innerHTML = "";
    
    if (btnobj.getAttribute("source")=="user")
    {
        await read_usercustom_engines();
        /*
        engines_cont.textContent=i18n(["导入自定义引擎文件 ", "Choose a file for custom engines "]);
        
        var input_file = document.createElement("input");
        input_file.id="input_user_file";
        input_file.type="file";
        engines_cont.appendChild(input_file);
        
        function onChange(event) {
            var reader = new FileReader();
            //reader.onload = onReaderLoad;
            reader.addEventListener('load', onReaderLoad);
            reader.readAsText(event.target.files[0]);
        }

        function onReaderLoad(event){
            
            engines_cont.innerHTML = "";
        
            usercustom_engines = JSON.parse(event.target.result);
            usercustom_engines_list = engines_object_tolist(usercustom_engines);
            
            engines_cont.appendChild( createETableByCata( btnobj.getAttribute('name'), source=btnobj.getAttribute('source'), object_id='engines_table'));
            
            if (window.run_env == "http_web")
            {
                setStor("usercustom_engines", JSON.stringify(usercustom_engines)); 
            }else{
                console.log("saving user ustom engines to browser.storage");
                browser.storage.local.set({"usercustom_engines": JSON.stringify(usercustom_engines) });
                //setStor("usercustom_engines", JSON.stringify(usercustom_engines) );
            }
            
        }

        input_file.addEventListener('change', onChange);
        */
        
        var begin_input_json_button = document.createElement("button");
        begin_input_json_button.textContent = i18n(["输入自定义JSON", "Input custom JSON"]);
        begin_input_json_button.addEventListener('click', function () {
            var textarea = document.createElement("textarea");
            engines_cont.insertBefore(textarea,engines_cont.firstChild);
            
            var parse_json_button = document.createElement("button");
            parse_json_button.textContent = i18n(["确定", "OK"]);
            
            parse_json_button.addEventListener('click', async function () {
                
                if (window.run_env == "http_web")
                {
                    setStor("usercustom_engines", textarea.value); 
                }else{
                    await browser.storage.local.set({"usercustom_engines": textarea.value });
                }
                await read_usercustom_engines();
                //engines_cont.innerHTML = "";
                if (document.getElementById("engines_table")) 
                    document.getElementById("engines_table").parentNode.removeChild(document.getElementById("engines_table"));
                
                engines_cont.appendChild( createETableByCata( btnobj.getAttribute('name'), source=btnobj.getAttribute('source'), object_id='engines_table'));
            });
            
            engines_cont.insertBefore(parse_json_button,engines_cont.firstChild);
            
            begin_input_json_button.parentNode.removeChild(begin_input_json_button);
            
            
        });
        engines_cont.appendChild(begin_input_json_button);
        
        
        engines_cont.appendChild(document.createTextNode(i18n(["我们鼓励您将自定义引擎提交给我们上游源码", "We encourage users to submit custom engines data to us"])));
    }
    
    engines_cont.appendChild( createETableByCata( btnobj.getAttribute('name'), source=btnobj.getAttribute('source'), object_id='engines_table'));
    

    Array.from( document.getElementsByClassName("cata_btns") ).forEach(function(ele){
        ele.classList.remove("cata_btn_highlight");
    });
    btnobj.classList.add("cata_btn_highlight");
    setlp();
    
    //table_cont_style();
}


function btm_dialog()
{
    Array.from(document.querySelectorAll(".btm_dialog:not(#" + this.id + "_dialog)")).forEach(function(ele) {
        ele.style.display = "none";
    });
	switch(this.id)
	{
        case "btn_donate":
            const donate_pic = "https://gitlab.com/garywill/receiving/raw/master/receivingcode.png";
            // https://gitlab.com/garywill/receiving/raw/master/receivingcode.png
            // https://raw.githubusercontent.com/garywill/receiving/master/receivingcode.png
            if ( document.getElementById("img_receivingcode").getAttribute("src") != donate_pic)
                document.getElementById("img_receivingcode").setAttribute("src",donate_pic); 
		case "btn_about":
		case "btn_usage":
        case "btn_usetip":
			//$("#" + this.id + "_dialog").toggle();
            
            toggle( document.getElementById(this.id + "_dialog") );
			break;
	}
	function toggle(object) {
        if (getComputedStyle(object).display != "none")
            object.style.display = "none";
        else
            object.style.display = "block";
    }
}


function do_stati()
{
    if (getStor("beatnowhere") !== "true")
    {
        
        if (window.run_env == "http_web")
            document.getElementById("stati_51").src = "https://ia.51.la/go1?id=20905905&pvFlag=1";
        else
        {
            document.getElementById("stati_51").src = "https://ia.51.la/go1?id=21129037&pvFlag=1";
        }
        
        if (window.run_env != "http_web")   return;
        
        document.getElementById("stati").src="https://s4.cnzz.com/z_stat.php?id=1278876233&web_id=1278876233";
        
        try{
            var _paq = window._paq = window._paq || [];
            // tracker methods like "setCustomDimension" should be called before "trackPageView" 
            _paq.push(["setCookieDomain", "*.acsearch.ga"]);
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
                var u="https://acsearch.cf/mpx/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '4']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
        }catch(err){}

    }
}
function stati_clickgo(e,b)
{
    try{ _czc.push(["_trackPageview", "search/" + e + '/' + b, "index.php"]); } catch(err){}
}
function stati_click_e(obj)
{
    var e = obj.getAttribute("name");
    try{ _czc.push(["_trackPageview", "enter_engn/" + e , "index.php"]); } catch(err){}
}
function stati_custom_page(str)
{
    try{ _czc.push(["_trackPageview", str , "index.php"]); } catch(err){}
}

