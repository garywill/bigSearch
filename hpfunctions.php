<?php
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
require_once 'common.php';

function i18n_html($arr)
{
    if ( is_array($arr) )
    {
        if (array_key_exists(0,$arr))
        {
            $html_out = "";
            $html_out .= "<span class='lang lang-zh'>" . $arr[0] . "</span>" ;
            if (array_key_exists(1,$arr))
            {
                $html_out .= "<span class='lang lang-en'>" . $arr[1] . "</span>" ;
            }
            return $html_out;
        }    
        else 
        {
            $html_out = "";
            foreach ($arr as $l => $s)
            {
                $html_out .= "<span class='lang lang-$l'>" . $s . "</span>" ;
            }
            return $html_out;
        }
    }else if ( is_string($arr) )
        return $arr;
    else 
        return "i18n_no";
}


function i18n($arr)
{
    if ( is_array($arr) )
    {
        if ( array_key_exists(lang,$arr) )
            return $arr[lang];
        else if (lang == "zh" && array_key_exists(0,$arr))
            return $arr[0];
        else if (lang == "en" && array_key_exists(1,$arr))
            return $arr[1];
        else if ( array_key_exists("en",$arr) )
            return $arr["en"];
        else if ( array_key_exists("zh",$arr) )
            return $arr["zh"];
        else if ( is_string($arr[0]) )
            return $arr[1];
        else 
            return "i18n_no";
    }else if ( is_string($arr) )
        return $arr;
    else 
        return "i18n_no";
}


////////////////////////////////////////////

const siteaddr = [
    [
        "domain" => "acsearch.ga",
        "prtc" => [ "https" , "http"],
    ],
    [
        "domain" => "acsearch.tk",
        "prtc" => [ "http"],
    ],
];
const author_page = [
    [
        "domain" => "garywill.github.io",
        "prtc" => [ "https" , "http"],
    ]
];
define('guestbaddr',"http://acsmessage.atwebpages.com/");

////////////////////////////////////////////

function scripttag($fn,$id=false)
{
    echo "<script type='text/javascript' src='${fn}?v=" . filemtime($fn) . "'";
    
    if($id) echo " id='${id}' ";
    
    echo "></script>" ;
}

function putsiteaddrlink($x)
{
    echo "<a href='" . $x["prtc"][0] . "://" . $x["domain"] . "' >" . $x["domain"] . "</a>" ;
}


function put_btm_btns()
{
    ?>
    <button class="general_btn btmbtn" id=""  style="display:none;"><a target="_blank"   rel="nofollow" href="<?php echo guestbaddr; ?>">
        <?php echo i18n_html(["留言板/反馈问题", "Guestbook/Feedback"]);?>
    </a></button>
    <button class="general_btn btmbtn" id="btn_donate" name="donate"  ><a href="#donate">
        <?php echo i18n_html(["打赏捐助", "Buy me a coffee"]);?>
    </a></button>
    <button class="general_btn btmbtn" id="btn_about" name="about"  ><a href="#about" >
        <?php echo i18n_html(["关于", "About"]);?>
    </a></button>
    
    <?php
}
function put_btm_dialogs()
{
    ?>
    <div class="btm_dialog" id="btn_donate_dialog" style="display:none;" >
        <a name="donate" ></a>
        <h3><?php echo i18n_html(["打赏捐助", "Buy me a coffee"]);?></h3>
        <?php echo i18n_html(["建造不易，感谢支持！", "Thank you for recognizing and giving reward for our work!"]);?>
        
        <br/>
        <a target="_blank" href="https://github.com/garywill/receiving/blob/master/receiving_methods.md">
            <img style="max-width: 100%;" id="img_receivingcode" />
        </a>
    </div>
    <div class="btm_dialog" id="btn_about_dialog" >
        <a name="about" ></a>
        <h3><?php echo i18n_html(["关于", "About"]);?></h3>
        
        <?php echo i18n_html(["本站地址：  ", "Our URL:  "]); 
        echo i18n_html(["（主站）","(Main site) "]);  putsiteaddrlink(siteaddr[0]) ?> 
        &nbsp;&nbsp;
        <?php putsiteaddrlink(siteaddr[1]) ?>
        <br>
        <?php echo i18n_html(["作者主页：","Author's homepage:  "]); putsiteaddrlink(author_page[0]) ;
        
        
        echo i18n_html(["  邮箱：","  E-mail: "]); ?> <span ><a id="ourmail" ></a></span> <br/>
        
        <br/>
        
    </div>
    <?php

}

function put_header_nav()
{
    ?>
    <span class="header-nav-span"> <a href="<?php if ( php_run_env != "web") echo siteaddr[0]["prtc"][0] . "://" . siteaddr[0]["domain"]  ?>">
    <?php 
        echo  i18n_html(["大术专搜主页", "BigSearch Home"]) ;
    ?></a> </span>
    <?php
}

?>
