<?php require_once 'common.php'; ?>


const mobilecss="i_layout_m.css?v=<?php echo filemtime("i_layout_m.css");?>"  ;

const beaucss = "i_beau.css?v=<?php echo filemtime("i_beau.css");?>" ;


<?php if ( php_run_env == "web") { ?>
    window.run_env = "http_web";
    window.lang="<?php echo lang;?>";
<?php } else { ?>


( async ()=> {

 
})();


<?php } ?>


