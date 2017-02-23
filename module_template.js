/**
 * Created by whobird on 17/2/13.
 */
/*
 * module_template.js
 */

/*jslint         browser : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */

/*global $, amp */

amp.module = (function () {

    //---------------- BEGIN 模块作用域变量 --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name   : 'blue'
        },

        stateMap  = { $container : null },

        jqueryMap = {},

        setJqueryMap, configModule, initModule;
    //----------------- END 模块作用域变量 ---------------

    //------------------- BEGIN 模块通用方法 ------------------
    // example : getTrimmedString
    //-------------------- END 模块通用方法 -------------------

    //--------------------- BEGIN Dom方法 --------------------
    // Begin /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;

        jqueryMap = { $container : $container };
    };
    // End /setJqueryMap/
    //---------------------- END Dom方法 ---------------------

    //------------------- BEGIN event handler -------------------
    // example: onClickButton = ...
    //-------------------- END event handler --------------------



    //------------------- BEGIN 外部方法 -------------------
    // Begin public method /configModule/
    // Purpose    : Adjust configuration of allowed keys
    // Arguments  : A map of settable keys and values
    //   * color_name - color to use
    // Settings   :
    //   * configMap.settable_map declares allowed keys
    // Returns    : true
    // Throws     : none
    //
    configModule = function ( input_map ) {
        spa.butil.setConfigMap({
            input_map    : input_map,
            settable_map : configMap.settable_map,
            config_map   : configMap
        });
        return true;
    };
    // End public method /configModule/

    // Begin public method /initModule/
    // Purpose    : Initializes module
    // Arguments  :
    //  * $container the jquery element used by this feature
    // Returns    : true
    // Throws     : none
    //
    initModule = function ( $container ) {
        stateMap.$container = $container;
        setJqueryMap();
        return true;
    };
    // End public method /initModule/

    // return public methods
    return {
        configModule : configModule,
        initModule   : initModule
    };
    //------------------- END PUBLIC METHODS ---------------------
}());
