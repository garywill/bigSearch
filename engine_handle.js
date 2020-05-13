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


var usercustom_engines_list = [];
var usercustom_engines = {};

async function read_usercustom_engines() {
    if (window.run_env == "http_web")
    {
        if (getStor("usercustom_engines") ) {
            usercustom_engines = JSON.parse(getStor("usercustom_engines"));
        }
    }else{
        if (await get_addon_setting("usercustom_engines") ) {
            usercustom_engines = JSON.parse(await get_addon_setting("usercustom_engines"));
        }
    }
    usercustom_engines_list = engines_object_tolist(usercustom_engines);
}
//read_usercustom_engines();

function db(source="bigsearch") {
    var catas_db;
    var engines_db;
    
    if ( !source || source == "bigsearch")
    {
        catas_db = catas;
        engines_db = sEngines
    }else if ( source == "user")
    {
        catas_db = {
            "user": {
                label: i18n([ "用户自定", "User Custom" ]),
                engines: usercustom_engines_list
            }
        };
        engines_db = usercustom_engines;
    }
    
    return {
        catas: catas_db,
        sEngines: engines_db
    };
}

function engines_object_tolist(engines_obj) {
    var list = [];
    Object.entries(engines_obj).forEach( function(ele) {
        const name = ele[0];
        const e_obj = ele[1];
        
        list.push({type:"engine", name: name});
    });
    return list;
} 

// =================================================

const defaultBtn = {"search":{"label":i18n(["搜索", "Search"])}};

function createEngineTr(e_name,source=null){
    var tr = document.createElement("tr");
    tr.className = "engine_tr";
    tr.setAttribute("e",e_name);
    
    var td_dname = document.createElement("td");
    tr.appendChild(td_dname);
    td_dname.className = "enginename_td";
    td_dname.title = i18n(['要进行操作（如搜索），请输入后点击右列相应的按钮', 'To do an action (e.g. search), input text then click a button on the right column']);
    
    var span_in_td_dname = document.createElement("span");
    td_dname.appendChild(span_in_td_dname);
    span_in_td_dname.title = db(source=source).sEngines[e_name].tip ? db(source=source).sEngines[e_name].tip : i18n(["点此打开其首页。要进行操作（如搜索），请输入后点击右列相应的按钮", "Click to open its homepage. To do an action (e.g. search), input text then click a button on the right column"]);
    
    var engine_home_link = document.createElement("a");
    span_in_td_dname.appendChild(engine_home_link);
    span_in_td_dname.className = "engine_home_link";
    engine_home_link.target = "_blank";
    engine_home_link.href = db(source=source).sEngines[e_name].addr;
    engine_home_link.setAttribute("name", e_name);
    engine_home_link.addEventListener('click', function() { stati_click_e(this) ; } );
    engine_home_link.textContent = db(source=source).sEngines[e_name].dname;
    
    if(db(source=source).sEngines[e_name].d_addi_html)
    {
        //engine_home_link.innerHTML = engine_home_link.innerHTML + "&nbsp;<span class='d_addi_html' style='font-size: 90%;' >" + db(source=source).sEngines[e_name].d_addi_html + "</span>";
        var span = document.createElement("span");
        span.className="d_addi_html";
        span.style="font-size: 90%; padding-left:5px;" ;
        
        
        switch ( typeof (db(source=source).sEngines[e_name].d_addi_html) ) {
            case "string":
                span.textContent = db(source=source).sEngines[e_name].d_addi_html;
                break;
            case "object":
                if (Array.isArray(db(source=source).sEngines[e_name].d_addi_html) )
                {
                    db(source=source).sEngines[e_name].d_addi_html.forEach( function(ele) {
                        var link = document.createElement("a");
                        link.textContent = ele['text'];
                        link.href = ele['href'];
                        link.title = ele['tip'];
                        
                        span.appendChild(link);
                    });
                }
                break;
        }
        
        engine_home_link.appendChild(span);
    }
    
    var td_enginebuttons = document.createElement("td");
    tr.appendChild(td_enginebuttons);
    td_enginebuttons.title = i18n(['要进行操作（如搜索），请输入后点击相应的按钮', 'To do an action (e.g. search), input text then click a button']);
    td_enginebuttons.className = "engbtns_td";
    if ( db(source=source).sEngines[e_name].btns === undefined )
    {
        createBtnsAndAppend(td_enginebuttons,defaultBtn);
    }else{
        createBtnsAndAppend(td_enginebuttons,db(source=source).sEngines[e_name].btns);
    }
    function createBtnsAndAppend(parent,btns)
    {
        Object.keys(btns).forEach( (key) => {
            if (isVisible(btns[key]))
            {
                var btn = document.createElement("button");
                btn.className = "gobutton";
                btn.setAttribute("e",e_name);
                btn.setAttribute("b",key);
                btn.addEventListener('click', function () {ebtn_onclick(this);} );
                btn.title = btns[key].btn_tip ? btns[key].btn_tip : i18n(["在上面的输入框中输入后，点击进行相应操作", "Input text into above box, then click to do corresponding action"]);
                btn.textContent = btns[key].label;
                parent.appendChild(btn);
            }
        });
    }
    
    return tr;
}

function createLabelTr(l_str)
{
    var tr = document.createElement("tr");
    tr.className = "labelrow";
    
    var td = document.createElement("td");
    tr.appendChild(td);
    td.className = "labelrowtd";
    td.colSpan = 2;
    td.textContent = l_str;
    
    return tr;
}

function createETableByCata(cata, source=null, object_id=null, object_class=null, object_style=null)
{
    var table = document.createElement("table");
    table.name = cata;
    if (object_id) table.id = object_id;
    if (object_class) table.className = object_class;
    if (object_style) table.style = object_style;
    
    db(source=source).catas[cata].engines.forEach(function(ele){
        if (isVisible(ele))
        {
            if (ele.type == "label")
            {
                table.appendChild( createLabelTr(ele.lstr) );
            }else if(ele.type == "engine")
            {
                try{
                    table.appendChild( createEngineTr(ele.name, source=source) );
                }catch(err){console.error(err);}
            }
        }
    });
    
    return table;
}

function createCataBtn(cata, source=null)
{
    //var div = document.createElement("div");
    
    var button = document.createElement("button");
    //div.appendChild(button);
    button.className = "general_btn cata_btns";
    button.name = cata;
    if (source) button.setAttribute("source",source );
    button.id = "cata_btn_" + cata;
    if (source) button.id = button.id + "_source_" + source;
    
    button.addEventListener('click', function () {cata_click(this);});
        
    var span = document.createElement("span");
    button.appendChild(span);
    span.textContent = db(source=source).catas[cata].label;
    
    //return div;
    return button;
}

///////////////////////////////////////////////////////////

function getDataForGo(engine,btn,source=null)
{
    const data_btnOverEng = ["addr","dname","tip","action","method","charset","kw_key","kw_replace","kw_format","params","full_url","use_other_engine","allow_referer"];
    const data_btnOnly = ["label","btn_tip"];
    const data_engOnly = [];
    
    var engine = db(source=source).sEngines[engine];
    if (engine.btns === undefined)
        engine.btns = defaultBtn;
    
    var data = {};
    
    data_btnOnly.forEach(function(ele){
        if (engine.btns[btn][ele]  !== undefined) {
            data[ele] = engine.btns[btn][ele];
        }
    });
    
    data_engOnly.forEach(function(ele){
        if (engine[ele]  !== undefined) {
            data[ele] = engine[ele];
        }
    });
    
    data_btnOverEng.forEach(function(ele){
        if (engine.btns[btn][ele]  !== undefined) {
            data[ele] = engine.btns[btn][ele];
        }else if (engine[ele]  !== undefined) {
            data[ele] = engine[ele];
        }
    });
    
    return data;
}
function goEngBtn(engine,btn,keyword)
{
    var data = getDataForGo(engine,btn, source=source);
    /*
     * replace
     * format
     * ( use_other_engine | (full_url+charset+urlencode) ) ?
     * "NO" from last step:
     *      params
     *      method+action+referer
     */

    if ( data.kw_replace !== undefined ) 
    {
        for ( var i=0; i<data.kw_replace.length; i++ )
        {
            keyword = keyword.replace( data.kw_replace[i][0], data.kw_replace[i][1]) ;
        }
    }

    if ( data.kw_format !== undefined  ) 
    {  
        keyword = data.kw_format.format(keyword);
    }
    
    if (data.use_other_engine !== undefined){
        goEngBtn( data.use_other_engine.engine, data.use_other_engine.btn , keyword);
        return;
    }
    
    var use_referer = data.allow_referer;
    
    if (data.full_url !== undefined){
        go_full_url(keyword,data.full_url, charset=data.charset,referer=use_referer);
        return;
    }
    
    var fparams = [];
    fparams.push({key:data.kw_key, val:keyword});
    if(data.params !== undefined) {
        data.params.forEach(function(ele){
            fparams.push(ele);
        });
    }
    form_submit(fparams,data.action,charset=data.charset,method=data.method,referer=use_referer);
}

function go_full_url(keyword, full_url, charset="UTF-8",referer=false){
    var iconvd_keyword;
    
    iconvd_keyword = keyword; 
    if (charset != "UTF-8") console.warn("full_url doesn't support non UTF-8 yet!");
    
    var url2open;
    url2open = full_url.format(iconvd_keyword);
    
    var a = document.createElement("a");
    a.style = "display:none;";
    a.target = "_blank";
    a.rel = "noopener";
    a.href = url2open;
    if(referer)
    {
        ;
    }else{
        a.rel += " noreferrer";
    }
    
    a.click();
    //delete a;
}
function form_submit(fparams,action,charset="UTF-8",method="get",referer=false){
    var form=document.createElement("form");
    form.id="formsubmit";
    form.style="display:none;"
    form.action=action;
    form.target="_blank";
    form.acceptCharset=charset;
    form.method=method;
    
    fparams.forEach(function(ele){
        var inp = document.createElement("input");
        inp.name = ele.key;
        inp.value = ele.val;
        form.appendChild(inp);
    });
    
    if(referer)
    {
        document.body.appendChild(form);
        form.submit();
        setTimeout(function() {
            form.parentNode.removeChild(form);
        }, 500);
    }else{
        var jumper=document.createElement("iframe");
        jumper.style="display:none;";
        document.body.appendChild(jumper);
        jumper.contentWindow.document.body.appendChild(form);
        var form = jumper.contentWindow.document.getElementById("formsubmit");
        form.submit();
        setTimeout(function() {
            jumper.parentNode.removeChild(jumper);
        }, 500);
    }
}

function isVisible(obj)
{
    if (!obj.visible_lang ) return true;
    
    if (typeof(obj.visible_lang) === "string")
    {
        if (window.lang == obj.visible_lang) return true;
        else return false;
    }
    else
    {
        obj.visible_lang.forEach( function(ele) {
            if (ele == window.lang) return true
        });
    }
    
    return false
}


