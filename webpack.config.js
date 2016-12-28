var webpack = require("webpack");
var path = require("path");


var sourceDir = "F:\\front_end_repository\\YueWorld\\amp\\";
console.log(path.join(__dirname, "node_modules"));
// 
module.exports = {


    entry:[
		"./static/js/main/menu_list.js",
	
	/*
		sourceDir+"static/dist/css/swiper.min.css",
		sourceDir+"static/dist/css/bootstrap-datetimepicker.min.css",
		sourceDir+"static/dist/css/animate.css",
		sourceDir+"static/css/common/common.css",
		sourceDir+"static/css/common/static_table.css",
		sourceDir+"static/css/main/amp_main.css",
		sourceDir+"static/css/views/noi.css",
		sourceDir+"components/toolbar/filter.css",
		sourceDir+"static/css/views/datatools.css",
		sourceDir+"static/css/common/amp_common.css",
		sourceDir+"static/css/common/amp_page_structure.css",
		sourceDir+"static/css/common/component.css",	
		sourceDir+"static/css/common/amp_animation.css",
		sourceDir+"static/css/plugin/amp_auto_complete.css"
	*/
		
		
	/*
		"./static/dist/js/jquery-1.11.3.min.js",
		"./static/dist/js/angular.js",
		"./static/dist/js/angular-animate.min.js",
		"./static/dist/js/angular-ui-router.js",
		
		"./static/dist/js/bootstrap.min.js",
		"./static/dist/js/swiper.jquery.js",
		"./static/dist/js/iscroll.js",
		"./static/dist/js/jquery.pin.js",
		"./static/dist/js/echarts.common.min.js",
		"./static/dist/js/bootstrap-datetimepicker.js",
		"./static/dist/js/bootstrap-datetimepicker.zh-CN.js",
		"./static/js/views/datatools/finacial.js",
		

		"./static/js/common/common.js",
		"./static/js/common/global_storage.js",
		"./static/js/plugin/amp_auto_complete.js",
		"./static/js/plugin/amp_pagination_bar.js",

		"./static/js/main/menu_list.js",
		"./static/js/main/amp_main.js",
		"./static/js/main/amp_ag.js",
		"./static/js/views/datatools/svgeditor.js",


		"./static/js/main/filters.js",
		"./static/js/common/service/amp_common_service.js",
		"./static/js/views/noi_analyse/noi_controller.js",
		"./static/js/views/noi_analyse/noi_services.js",
		"./static/js/views/noi_analyse/noi_filters.js",
		"./static/js/views/noi_analyse/noi_directives.js",

		"./components/toolbar/filter_controller.js",
		"./components/toolbar/filter_directives.js",

		"./static/js/views/datatools/datatool_controller.js",
		"./static/js/views/datatools/datatool_service.js",
		"./static/js/views/datatools/datatool_filters.js",
		"./static/js/views/datatools/datatool_directive.js",

		"./static/js/investment_analysis/controller/simulation_calculation_main_controller.js",

		"./static/js/main/snap.svg.js",
		"./static/js/mgt_analysis/controller/contract_main_controller.js",
		"./static/js/mgt_analysis/controller/contract_main_left_controller.js",
		"./static/js/mgt_analysis/controller/contract_main_right_controller.js",
		"./static/js/mgt_analysis/controller/cost_main_controller.js",
		"./static/js/mgt_analysis/controller/cost_main_left_controller.js",
		"./static/js/mgt_analysis/controller/cost_enrolment_controller.js",
		"./static/js/mgt_analysis/controller/cost_manual_work_controller.js",
		"./static/js/mgt_analysis/controller/cost_manual_work_left_controller.js",
		"./static/js/mgt_analysis/controller/cost_manual_work_enrolment_controller.js",

		"./static/js/mgt_analysis/controller/passenger_flow_main_controller.js",
		"./static/js/mgt_analysis/controller/passenger_flow_main_left_controller.js",
		"./static/js/mgt_analysis/controller/passenger_flow_main_enrolment_controller.js",
		"./static/js/mgt_analysis/controller/passenger_flow_main_enrolment_left_controller.js",

		"./static/js/mgt_analysis/controller/merchant_sale_main_controller.js",
		"./static/js/mgt_analysis/controller/merchant_sale_main_left_controller.js",

		"./static/js/mgt_analysis/controller/rent_main_controller.js",
		"./static/js/mgt_analysis/controller/rent_main_left_controller.js",

		"./static/js/mgt_analysis/controller/arrears_main_controller.js",
		"./static/js/mgt_analysis/controller/arrears_main_left_controller.js",
		"./static/js/mgt_analysis/controller/arrears_detail_controller.js",
		"./static/js/mgt_analysis/controller/arrears_detail_left_controller.js",
		"./static/js/mgt_analysis/controller/arrears_enrolment_controller.js",
		"./static/js/mgt_analysis/controller/arrears_merchant_detail_controller.js",
		"./static/js/mgt_analysis/controller/arrears_merchant_detail_left_controller.js",
		"./static/js/mgt_analysis/controller/arrears_merchant_detail_receiving_controller.js",

		"./static/js/mgt_analysis/controller/shop_sale_type_list_controller.js",
		"./static/js/mgt_analysis/controller/shop_sale_type_list_left_controller.js",
		"./static/js/mgt_analysis/controller/shop_sale_type_enrolment_controller.js",
		"./static/js/mgt_analysis/controller/shop_sale_rank_controller.js",

		"./static/js/mgt_analysis/controller/business_main_controller.js",
		"./static/js/mgt_analysis/controller/business_main_left_controller.js",
		"./static/js/mgt_analysis/controller/business_merchant_list_controller.js",
		"./static/js/mgt_analysis/controller/business_merchant_list_left_controller.js",
		"./static/js/mgt_analysis/controller/business_merchant_detail_controller.js",
		"./static/js/mgt_analysis/controller/business_merchant_detail_left_controller.js",
		"./static/js/mgt_analysis/controller/business_merchant_detail_enrolment_controller.js",

		"./static/js/mgt_analysis/controller/investment_detail_controller.js",
		"./static/js/mgt_analysis/controller/investment_detail_left_controller.js",
		"./static/js/mgt_analysis/controller/investment_detail_enrolment_controller.js",


		"./static/js/datatools/controller/floor_mgt_controller.js",
		"./static/js/datatools/controller/floor_mgt_left_controller.js",
		"./static/js/datatools/controller/floor_mgt_enrolment_controller.js",


		"./static/js/noi_analysis/controller/noi_enrolment_controller.js",
		"./static/js/noi_analysis/controller/noi_enrolment_left_controller.js"
	*/
	],
	
    output: {
        path: __dirname+"/build",
        filename: "bundle.js"
    }
	 //,resolveLoader: { root: "C:\\Users\\xiaominzh\\Desktop\\package\\amp\\node_modules" }
	,
	resolve: {
	  root: [
		path.resolve('./node_modules')
	  ]
	} 
	,
	module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
			
			,{
                test:/\.(png)|(jpg)$/,
                loader: "url-loader?limit=40000"
            }
        ]
    }
	/*
	,
	plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
  */
};