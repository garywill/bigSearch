<?php 
    include 'hpfunctions.php';
?>
<!DOCTYPE html >
<!-- 
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
-->
<html  <?php if (lang !== "undetermined" ) echo "lang='" . lang . "'";?> >
    
    <head>
        <meta HTTP-EQUIV="Content-Type" CONTENT="text/html;charset=UTF-8"/>
        <?php  if ( php_run_env == "web") { ?>
            <title>
                <?php 
                    echo i18n(["大术专搜 ","BigSearch "]); 
                    echo i18n(["全网搜索"," - Easily search the whole Internet"]);
                ?> 
                | 
                <?php 
                    echo i18n(["主站 ","Main site "]);
                    echo siteaddr[0]["domain"];
                    echo i18n([" 备用站 "," | Stanby Site "]);
                    echo siteaddr[1]["domain"];
                    echo i18n([" 作者主页 "," | My homepage "]);
                    echo author_page[0]["domain"]  ; 
                ?>
            </title>
            
            <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
            <meta name="keywords" content="<?php echo i18n(["元搜索,导航,搜索引擎", "meta-search,navigation,search engines"]); ?>" />
            <meta name="description" content="<?php echo i18n(["与众不同的网页搜索工具！注重搜索质量和广度的人的最佳上网入口，最好用的开放的元搜索引擎。整个互联网的各类搜索都在这里", "A different tool to search online! The best online portal for people who value search quality and breadth. The best open meta search engine to use. All kinds of searches across the Internet are here"]);?>" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0, user-scalable=no">
            
        <?php } else { ?> <title>BigSearch addon page</title> <?php } ?>
        
        <?php 
            scripttag("ck.js"); 
        ?>
        
        <script type="text/javascript" <?php if ( php_run_env != "web") {  ?> src="index-phpjs.js" <?php } ?> >
            <?php if ( php_run_env == "web") {  include 'index-phpjs.php'; } ?>
        </script>
        <?php 
            //scripttag("jquery.min.js","jquery-scripttag");
            
            scripttag("i_ui.js");
            scripttag("enginesdata.js");
            scripttag("engine_handle.js");
            scripttag("i_scripts.js");
        ?>

		<link rel="stylesheet" type="text/css" href="i_layout.css?v=<?php echo filemtime("i_layout.css");?>" />
		<?php  if ( php_run_env != "web") { ?>
            <link rel="stylesheet" type="text/css" href="addon.css" />
        <?php } ?>
		<link rel="stylesheet" type="text/css" id="beau_css_tag" />
		<link rel="stylesheet" type="text/css" id="mobile_css_tag" />

		
		
		<!-- FOR DEBUG !! -->
		<!--
		<script type='text/javascript'         src='http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js'></script>
		-->
    </head>
    
    <body>
        <?php if ( php_run_env == "web") { ?> <script>0</script> <?php } ?>
		<div id="header">
            <?php put_header_nav(); ?>
		  
		</div>
		<div id="desktop_mobile_cont" >
            <button class="general_btn" id="btn_zh"><a href="index.php?hl=zh" lang="zh">中文</a></button>&nbsp;&nbsp;
            <button class="general_btn" id="btn_en"><a href="index.php?hl=en" lang="en">English</a></button>&nbsp;&nbsp;
            <button class="general_btn" id="btn_desktop"><?php echo i18n_html(["切换到桌面版", "Switch to desktop version"]);?></button>
            <button class="general_btn" id="btn_mobile"><?php echo i18n_html(["切换到移动版", "Switch to mobile version"]);?></button>
		</div>

		<div id="wrapper">
			<div id="content">
                <table id="content_o_tab">
                    <tr style="vertical-align:top;">
                        <td>
                            <div id="catas_cont" >
                                <div id="catabtns_header">
                                    <?php echo i18n_html(["选择分类:", "Catagories:"]);?>
                                </div>
                            </div>
                        </td>
                        <td id="center_td">
                            
                                   
                            <div id="intitle" >				
                                <h1 id="index_title" >
                                <a href="/"><?php echo i18n_html(["大术专搜","BigSearch"]); ?></a>
                                </h1>
                                
                                <h3 id="index_subtitle" >
                                <?php echo i18n_html(["与众不同的网络搜索工具", "A different tool to search online"]);?>
                                </h3>
                        
                            </div>
                            
                            <div id="mobile_catasbtn_pos">
                            
                            </div>
                            <!--COMMON INPUTBOX HERE-->
                            <div id="input_o_cont">
                                <div id="input_cont">
                                    <input  id="inputbox" title='<?php echo i18n(["在此输入，然后后点击下方右列按钮进行相应操作（如搜索）", "Input here, then click a button in the right column below to do an action (e.g. search)"]);?>'  />
                                    
                                    <div id="btns_below_input" >
                                        <button class="general_btn" id="inputclear">
                                            <?php echo i18n_html(["清除", "Clean"]);?>
                                        </button>
                                        &nbsp;&nbsp;
                                        <button class="general_btn" id="inputselect">
                                            <?php echo i18n_html(["全选", "Select"]);?>
                                        </button>
                                        &nbsp;&nbsp;
                                        <button class="general_btn" id="inputcopy">
                                            <?php echo i18n_html(["复制", "Copy"]);?>
                                        </button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <button class="general_btn" id="openhist">
                                            <?php echo i18n_html(["输入历史", "Input History"]);?>    
                                        </button>
                                    </div>
                                </div>
                            </div>

                           
                    
                    
                        
                            <div id="engines_o_cont">
                                <div id="engines_cont"> </div>
                            </div>
    

                        </td>
                        <td id="hist_td">
                            <div id="hist_cont">
                                <div id="hist_ban">
                                    <?php echo i18n_html(["输入历史", "Input History"]);?>
                                    <span id="hist_tip">
                                        <?php echo i18n_html(["双击可再次使用", "Doubleclick to use again"]);?>
                                    </span>
                                </div>

                                <div id="hist" ></div>
                                
                                <div id="clearhist">
                                    <?php echo i18n_html(["清空", "Clean All"]);?>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
			
			</div>
			<div id="content_mobile"></div>
			<div id="leftside"></div>
			<div id="rightside"></div>

		</div>
		<br/>

		<div id="bottom">
            <div id="btmbtns" >
                <button class="general_btn btmbtn" id="btn_usage" name="usage"  ><a href="#usage">
                    <?php echo i18n_html(["使用说明", "Usage"]);?>
                </a></button>
                <button class="general_btn btmbtn" id="btn_usetip" name="usetip"  ><a href="#usetip">
                    <?php echo i18n_html(["小技巧", "Tips"]);?>
                </a></button>
                <button class="general_btn btmbtn" id="btn_source" name="source"  ><a target="_blank" href="https://github.com/garywill/bigSearch">
                    <?php echo i18n_html(["源代码/详细说明", "Source Code / User Manual"]);?>
                </a></button>
                <button class="general_btn btmbtn" id="btn_webext" name="webext"  ><a target="_blank" href="https://addons.mozilla.org/firefox/addon/big-search/">
                    <?php echo i18n_html(["浏览器扩展", "Browser Extension"]);?>
                </a></button>
                <button class="general_btn btmbtn" id="btn_faq" style="display:none;" name="faq"  ><a target="_blank" href="https://github.com/garywill/bigSearch#faq">FAQ</a></button>
                <?php put_btm_btns(); ?>
            </div>
            <div class="btm_dialog" id="btn_usage_dialog">
                <a name="usage" ></a>
                <h3><?php echo i18n_html(["使用说明", "Usage"]);?></h3>
                <span class="lang lang-zh">
                    <p>输入后，点击表格右列中的按钮，即可在相应网站（或数据库）中进行相应分类的操作（如搜索）,将打开新分页显示结果。</p>
                    <P>最后点击的按钮被加亮显示，敲击回车即可再次调用。</p>
                    <p>双击搜索历史中的条目，快速将条目移至输入框。</p>
                </span>
                <span class="lang lang-en">
                    <p>After inputting, click button in the right column of the table to perform an operation (e.g. search) in the corresponding website (or database). A new page will be opened to display the results. </p>
                     <P>The last clicked button is highlighted, and it can be called again by pressing Enter. </p>
                     <p>Double-click an entry in the history to quickly move the entry to the input box. </p> 
                </span>
              
            </div>
            <div class="btm_dialog" id="btn_usetip_dialog">
                <a name="usetip" ></a>
                <h3><?php echo i18n_html(["小技巧", "Tips"]);?></h3>
                
                <span class="lang lang-zh">
                    让浏览器在后台打开新页，方便连续点击，以调用不同的搜索引擎来搜索同一关键词。方法如下：<br>
                    
                    
                    Firefox:  在地址栏输入 about:config ，确认进入后，设置 browser.tabs.loadDivertedInBackground = true<br>
                    
                    Chromium等： 1).临时在后台打开新页： 按住ctrl键点击链接或按钮<br>
                    2).永久在后台打开新页：安装对应功能的扩展<br>
                    
                    其他浏览器：有些浏览器在设置中可以选择。大部分国产浏览器为Chromium内核，因此可以尝试Chromium的方法
                </span>
                <span class="lang lang-en">
                    
                    Make browser open new tabs in background, so we can click without interruption to use different search engines to search for same keyword. Here's how to:<br>
                    
                    
                    Firefox:  open about:config, comfirm and enter. Set browser.tabs.loadDivertedInBackground = true<br>
                    
                    Chromium like: 1).New tabs opened in background temporarily: Click link or button with ctrl pressed<br>
                    2).New tabs always opened in background: install an extension implimenting this feature<br>
                    
                    Other browsers: Some browsers may have option in settings. Most browsers are Chromium based, so you can try Chromium's method 
                </span>
            </div>
            <?php put_btm_dialogs(); ?>
		
		</div>
		
		<div id="footer">
            <div class="lang lang-zh">版权所有  保留所有权利</div>
			Copyright 2015-2500   All Rights Reserved.
		</div>
		<div id="floater">
            <table id="floater_table"><tr>  <td id="floater_td"> </td> </tr></table>
		</div>
		<?php if ( php_run_env == "web" ) { ?><script type="text/javascript" id="stati" ></script> <?php } ?>
		
		<img style="position: absolute; top:0 ;width: 1px; max-width: 1px; height: 1px; max-height: 1px;" id="stati_51" />

    </body>

</html>

