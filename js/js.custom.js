/*
*
* Author: Mark Fail
* Author URL: http://www.premiumpress.com
* Version: 10.x 
*
* THIS FILE WILL BE UPDATED WITH EVERY UPDATE
* IF YOU WANT TO MODIFY THIS FILE, CREATE A CHILD THEME
*
* http://codex.wordpress.org/Child_Themes
*/

/* =============================================================================
 LOAD SETUP
  ========================================================================== */	 

var startTime = (new Date()).getTime();
var CNDPath = ajax_img_url;
var pptMapLoaded = 0;
var pptScrollStartPoint = 100;
var galCode = "";
var pptThemes = function(){
	
	var screenWidth = jQuery( window ).width();
	
	var handleReady = function(){  
		console.log("ppt - ready");
		 
		if(!jQuery("body").hasClass('wp-admin')){
		
			console.log("ppt - script - boostrap");
		
			jQuery("<script/>",{type:'text/javascript', src: CNDPath + 'js/js.bootstrap.js'}).appendTo('head');
		
		}
		
		console.log("ppt - css - fontawesome");
		
		jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/_fontawesome.css" type="text/css" id="ppt-fontawesome" />');
		
	}
	
	var handleRemovePreloader = function(){ 
	
			if(jQuery('#main-category-wrap').length > 0){
			pptNav2();
			}
	
		setTimeout(function(){ 
						
			console.log("ppt - pre-loader removed");  
			
			jQuery("#sidebar-wrapper").css('display', '');
			jQuery('#page-loading').hide(); //.html('')
			
			jQuery("#wrapper").addClass('d-flex').removeClass('hidepage').addClass('preload-hide');	
			
			jQuery("#admin-wrapper").show(); 
			
			
			// VIDEO PLAYER
			if(jQuery("#LoadVideoPlayer").length > 0 ){				
				LoadVideoPlayer();	 
			}
			
			// CAROUSEL GALLERY
			if(jQuery("#LoadGalleryCarousel").length > 0 ){		
			 
				LoadGalleryCarousel();
			}
			
			
					
		}, 1000);
		
		setTimeout(function(){ 
							
			tinyScroll();
					
		}, 2000);
	
	}
	
	
	
	var handleInlineEditor = function(){ 
		
		
		if(jQuery("body").hasClass('ppt-inline-editor')){
			
		console.log("ppt - loading - admin editor");
		loadJS(CNDPath + 'js/js.inline-editor.js', 'ppt-inline-editor', function(el) {
			
			jQuery("body").prepend('<div class="bg-danger text-light p-2 text-center text-600">Live Text Editor Enabled <span class="badge badge-warning">beta</span></div>');
			
			jQuery('.ppt-editable').pptie();	
			
		});
		
		}
	}
	
	 
	
	var handleLoad = function(){ 
	
		console.log("ppt - page loaded"); 
		
		// ADD IN TRIGGER DIVS		
		jQuery("body").append('<div class="ppt-js-trigger-theme-update"></div>');
		jQuery("body").append('<div class="ppt-js-trigger-elementor-update"></div>');
		jQuery("body").append('<div class="ppt-js-trigger-search-update"></div>');
		jQuery("body").append('<div class="ppt-js-trigger-ajax"></div>'); 
				
		jQuery(".ppt-js-trigger-elementor-update").change(function(e) {
			pptThemes.update_after_insert_elementor();
		});
		jQuery(".ppt-js-trigger-search-update").click(function(e) {
			pptThemes.update_after_search();
		});
		jQuery(".ppt-js-trigger-theme-update").click(function(e) {
			pptThemes.update_after_insert_theme();
		});
		jQuery(".ppt-js-trigger-ajax").click(function(e) {
			pptThemes.update_after_ajax();
		});	 
		 
		jQuery(".hidepage").each(function() {
		  jQuery( this ).removeAttr("style").removeClass('hidepage').addClass('preload-hide');
		}); 
		  
		
		if(jQuery("body").hasClass('single-listing_type')){
			
			jQuery("<script/>",{type:'text/javascript', src: CNDPath + 'js/js.plugins-comments.js'}).appendTo('head');
			jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/_comments.css" type="text/css" />');
			 
			
		}
		
		
		if(jQuery("body").hasClass('theme-sp, theme-so, theme-ph')){
			
			console.log("ppt - loading - cart");	
			
			jQuery("<script/>",{type:'text/javascript', src: CNDPath + 'js/js.cart.js'}).appendTo('head');
			jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/_cart.css" type="text/css" />');
 		
		}
		
		if(jQuery("body").hasClass('logged-in')){
			
			console.log("ppt - loading - logged in");	
			  
			jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/_loggedin.css" type="text/css" />');
 		
		}
		
		
		if(jQuery(".ppt_admin_quickeditor-fab").length > 0 ){
			
			console.log("ppt - loading - admin helper bar");	
			  
			jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/css.plugins-adminbar.css" type="text/css" />');
 		
		}
		
		
		if(jQuery("#savedzipcode").length > 0){		
		jQuery(".filterbox-distance").trigger('click');
		}
		
		
		console.log("ppt - fonts");
		if(jQuery("#ppt-google-fonts").length == 0 ){ 
		jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/_fonts.css" type="text/css" />');
		}
		
		tinyScroll();
		
		setTimeout(function(){ 
		jQuery(".ppt_admin_quickeditor").show();
		}, 3000);
		
		
		if(jQuery("#ajax-search-output").length > 0){ 
		pptThemes.update_after_search();
		}
		
	}




	var handleScrollBar = function(){ 
	
		console.log("ppt - checking - scrollbar"); 
		
	 	if(jQuery(".ppt-scroll").length > 0){
		 
			var i=1;
			var a = jQuery(".ppt-scroll");
			a.each(function (a) {
				
				target = jQuery(this).attr('data-target');
				if(jQuery(target).length > 0){ 
				
				
				var wins = jQuery(window).width();
				if ( wins < 767){ 
				}else{				
				const qs = new PerfectScrollbar(target);
				i++;	
				} 
				
				}
			});
			
						
			
		}
	}
	var handleCookieLaw = function(){ 
	
		console.log("ppt - checking - cookies"); 
		
	 	if(jQuery("[ppt-addon-cookielaw]").length > 0){
				
			val = jQuery("[ppt-addon-cookielaw]").val();
			
			if(val == 0){				
				processCookie();				
			}				
			
		}
	}

	var handleColorChanges = function(){ 
	
		console.log("ppt - checking - color changes"); 
		
	 	if(jQuery(".js-text-primary").length > 0){
			
			var a = jQuery(".js-text-primary");
			a.each(function (a) {
							 
				jQuery(this).on({
					mouseenter: function () {
						//stuff to do on mouse enter
						jQuery(this).addClass("text-primary");
					},
					mouseleave: function () {
						//stuff to do on mouse leave
						jQuery(this).removeClass("text-primary");
					}
				});
							 
			}); 
		}
		
		
		if(jQuery(".js-bg-primary").length > 0){
			
			var a = jQuery(".js-bg-primary");
			a.each(function (a) {
							 
				jQuery(this).on({
					mouseenter: function () {
						//stuff to do on mouse enter
						jQuery(this).addClass("bg-primary text-light");
						jQuery(this).find(".text-primary").removeClass("text-primary").addClass("text-primary1 text-white");
						
						
					},
					mouseleave: function () {
						//stuff to do on mouse leave
						jQuery(this).removeClass("bg-primary text-light");
						jQuery(this).find(".text-primary1").removeClass("text-primary1 text-white").addClass("text-primary");
					}
				});
							 
			}); 
		}
	}
		


	var handleOverlays = function(){ 
	
		console.log("ppt - checking - overlays"); 
		
	 	if(jQuery("[data-overlay]").length > 0){
			
			var a = jQuery("[data-overlay]");
			a.each(function (a) {
							 
				var divStyle = jQuery(this).data('overlay');
				console.log("ppt - found - overlay "+divStyle); 
				
				if(divStyle == "green"){ 				
					jQuery(this).prepend("<div class='bg-overlay-green z-1'></div>");				
				} else if(divStyle == "black"){ 
					jQuery(this).prepend("<div class='bg-overlay-black z-1'></div>");	
				} else if(divStyle == "grey"){ 
					jQuery(this).prepend("<div class='bg-overlay-grey z-1'></div>");	
				} else if(divStyle == "white"){ 
					jQuery(this).prepend("<div class='bg-overlay-white z-1'></div>");	
				} else if(divStyle == "primary"){ 
					jQuery(this).prepend("<div class='bg-overlay-primary bg-primary z-1'></div>");	
				} else if(divStyle == "primary"){ 
					jQuery(this).prepend("<div class='bg-overlay-secondary bg-secondary z-1'></div>");	
				} else if(divStyle == "gradient"){ 
					jQuery(this).prepend("<div class='bg-overlay-gradient z-1'></div>");	
				} else if(divStyle == "gradient-left"){ 
					jQuery(this).prepend("<div class='bg-overlay-gradient-left z-1'></div>");	
				
				} else if(divStyle == "gradient-left-small"){ 
					jQuery(this).prepend("<div class='bg-overlay-gradient-left-small z-1'></div>");	
				
				
				} else if(divStyle == "gradient-small"){ 
					jQuery(this).prepend("<div class='bg-gradient-small z-1'></div>");	
				  
				}	 
							 
			 });		
		}
	}

	
	
	var handleAccordion = function(){  
		
		console.log("ppt - loading - accordion");  
	 
	 	if(jQuery(".ppt-accordion").length > 0){ 
		 
			var a = jQuery(".ppt-accordion:not(.hasTrigger)");
			a.each(function (a) {
				
				var pA = jQuery(this);
				jQuery(this).addClass("hasTrigger"); 
				
				jQuery(this).find(".btn-show").on("click", function (e) {					  
					jQuery(pA).toggleClass("show");
				});	
				 
				
			});
			
		}
	}
	var handleShowHide = function(){  
	
	 	if(jQuery(".ppt-show-hide").length > 0){
		 
			var a = jQuery(".ppt-show-hide:not(.hasTrigger)");
			a.each(function (a) {
				jQuery(this).addClass("hasTrigger");
				jQuery(this).on("click", function (e) {					  
					jQuery(this).toggleClass("show");
				});		
			});
		}	

	}
 
	var handleDivCleanUp = function(){  
	
	
	
		
		console.log("ppt - loading - div cleanup");  
	  
		
		if(jQuery("#2_location_wrap").length > 0){
			if(jQuery("#2_location_wrap").html().length < 1300){
			jQuery("#2_location_wrap").hide();
			}
		}
		
		if(jQuery("#3_features_wrap").length > 0){
			if(jQuery("#3_features_wrap").html().length < 1000){
			jQuery("#3_features_wrap").hide();
			}
		}
		
		if(jQuery(".cleanmeup").length > 0){
			
			var a = jQuery(".cleanmeup");
			a.each(function (a) {
				if(jQuery(this).html().length < 50){
					jQuery(this).hide();
				}		 
			});  
		}
		
		if(jQuery("[ppt-box]").length > 0){
			
			var a = jQuery("[ppt-box]");
			a.each(function (a) {
				var p = jQuery(this);
				 
				if(jQuery(this).find("._content:not(.no-hide)").length > 0){			 
					if(jQuery(this).find("._content:not(.no-hide)").html().length < 70){
						jQuery(this).hide();
					}
				}
			});  
		}
		
		
		
		
		if(jQuery(".ppt-count-comments-0").length > 0){
		jQuery("#5_reviews_title").hide(); 
		}
		
		if(jQuery(".single .comment-single").length == 0){
		jQuery(".single .showcommentsbtn").hide();
		}
		
		
		if(jQuery('#buynowform').length > 0){
		jQuery(".buynowlink").show();
		}
	
	
		// THEME MH
		//if(jQuery("body").hasClass('listing_type-template-default') && jQuery("body").hasClass('theme-mj') ){
		// jQuery("<script/>",{type:'text/javascript', src: CNDPath + 'js/js.theme-mj.js'}).appendTo('head');
		//}
	 
	  	// THEME AT
		if(jQuery("body").hasClass('listing_type-template-default') && jQuery("body").hasClass('theme-at') ){
		  jQuery("<script/>",{type:'text/javascript', src: CNDPath + 'js/js.theme-at.js'}).appendTo('head');
		} 
		
		// THEME DA
		if(jQuery("body").hasClass('listing_type-template-default') && jQuery("body").hasClass('theme-da') ){
		  jQuery("<script/>",{type:'text/javascript', src: CNDPath + 'js/js.theme-da.js'}).appendTo('head');
		}
		 
		
		// THEME SP
		if(jQuery("body").hasClass('theme-sp') && jQuery('#ppt-loaded-cart').length == 0 ){
		  jQuery("<script/>",{type:'text/javascript', src: CNDPath + 'js/js.cart.js'}).appendTo('head').attr('id', 'ppt-loaded-cart'); 
		} 
		
		// DEMO COUNTS	
		if(jQuery("#demo-homepage").length > 0 ){
			jQuery(".count-demo").html(jQuery(".demo-preview").length); 
			jQuery(".count-login").html(jQuery(".demo-login").length); 
			jQuery(".count-register").html(jQuery(".demo-register").length); 
			jQuery(".count-pricing").html(jQuery(".demo-pricing").length); 
			jQuery(".count-search").html(jQuery(".demo-search").length);
		}
		 
		
	}	
	
	
	var handleStickyMenu = function(){ 
		
		console.log("ppt - checking - sidebar scroll"); 
		
		if(jQuery(".limit-box").length > 0  ){
		 
			jQuery(".sidebar-fixed-content").scrollToFixed({
				minWidth: 1064,
				zIndex: 12,
				marginTop: 100,
				removeOffsets: true,
				limit: function () {
					var a = jQuery(".limit-box").offset().top - jQuery(".sidebar-fixed-content").outerHeight(true) - 50;
					return a;
				},
				postFixed: function() {  
					
					jQuery(".sidebar-fixed-content-wrap .card").show();
					
				},
				
				preFixed: function() { 
					jQuery(".sidebar-fixed-content-wrap .card").hide();
				},
			}); 			
		} 
		
	}
	


	var handleModals = function(){ 
		
		console.log("ppt - checking - modals"); 
	 
		jQuery(".editlisting-modal-close, .editlisting-modal-wrap-overlay").on("click", function (e) {
			jQuery(".editlisting-modal-wrap").removeClass('show');		
		});
	 
	}
	
	
	var handleMaps = function(){ 
	 
		var mapWindowOpen = 0;
		var mapWindowTrigger = 0;
		
		console.log("ppt - checking - maps"); 
		
		if(jQuery(".ppt-js-map-trigger").length > 0){ 		
			handleLoadMap();
		}
		if(jQuery("#ppt_map_location").length > 0){ 		
			handleLoadMap();
		}
		
		if(jQuery(".filterbox-distance").length > 0){ 	
			jQuery(".filterbox-distance").on("click", function (e) { 
				if(jQuery("#search_radius").length == 0 ){ 
					handleLoadMap();
					mapWindowTrigger
				}
			});
		}
		
		
		
		if(jQuery("#map-main").length > 0){ 			
			console.log("ppt - found - big map"); 
			handleLoadMap();			
		} 
		
		if(jQuery(".single-map-item").length > 0){
			
			if(jQuery("#ppt-loaded-map").length > 0 ){ 
							
			}else{ 
			
				jQuery(".single-map-item:not(.map-trigger-set)").each(function (a) {
					jQuery(this).on("click", function (e) { 
						
						btnlink = jQuery(this);  
						var icon = jQuery(this).find('i');
						
						if(btnlink.hasClass('fa-preload')){
						 
							icon.removeClass('fa-spin fa-sync');
							btnlink.removeClass('fa-preload');							
							jQuery(btnlink).trigger('click'); 
							
							mapWindowOpen = 1;
						
						}else{
						 	
							if(!mapWindowOpen){
								icon.addClass('fa-spin fa-sync');
								btnlink.addClass('fa-preload');
								setTimeout(function(){ btnlink.trigger('click');  }, 4000); 
							}
						}
						  
					});	
					
					jQuery(this).addClass('map-trigger-set'); 
				});  
			} 
			
			jQuery(document).on("click",".single-map-item, .ppt-js-map-trigger", function (e) {
			 
			handleLoadMap();
			});
			
		} 
		
	}
	
	var handleLoadMap = function(){ 
		
		if(!pptMapLoaded){
			 
			
			if( jQuery("#ppt-map-provider").val() == "mapbox" ){
			 
				loadJS(CNDPath + 'js/js.plugins-map-mapbox.js', 'ppt-mapbox', function(el) {
																					   
					pptMapLoaded = 1;
					
					setTimeout(function(){ 
						ppt_load_map_provider();
					}, 2000);
					
				});
			
			}else if( jQuery("#ppt-map-provider").val() == "google"){
			  
				loadJS(CNDPath + 'js/js.plugins-map-google.js', 'ppt-google', function(el) {	
																					   
					pptMapLoaded =1;
					
					setTimeout(function(){ 
						ppt_load_map_provider();
					}, 2000);
					
				});
				
			} 
			
		}else if(pptMapLoaded == 1){
			
			ppt_load_map_provider();	 
			
		}
	}
	
	var handleOwlSlider = function(){  
		
		console.log("ppt - checking - owl slider");  
		
		
		if(jQuery(".owl-carousel").length > 0){
			
			console.log("ppt - found - owl slider");
			
			var WaitTime = 2000;
			if(jQuery("#ppt-loaded-owl").length > 0){
				WaitTime = 0;
			}else{
				console.log("ppt - installed - owl");
				
				jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/css.plugins-owl.css" type="text/css" id="ppt-loaded-owl-css" />');
				
				jQuery("<script/>",{type:'text/javascript', src: CNDPath + 'js/js.plugins-owl.js'}).appendTo('head').attr('id', 'ppt-loaded-owl');
			} 
			
			setTimeout(function(){ 
								
				if(jQuery(".card-sponsored").length > 0){
					
					jQuery(".card-sponsored").show();
					
					jQuery(".sponsored-text").show();
					
					jQuery(".card-sponsored .item").mouseover(function() {
						jQuery(".card-sponsored").removeClass('overflow-hidden');	
						
					});
					jQuery(".card-sponsored .item").mouseout(function() {
						jQuery(".card-sponsored").addClass('overflow-hidden');										 
					});
					
					
				}
								
				LoadOwlSlider(); 			
			}, WaitTime);		 
			
		}
	}
	
	var LoadOwlSlider = function(){ 
	
		console.log("ppt - loading - owl"); 
	
		var a = jQuery(".owl-carousel");
					a.each(function (a) {
									 
						console.log("ppt - added - new slider");
						
						var rtl = false;
						var Smargin = 20;
						var Show1200 = 4;
						var Show1000 = 4;
						var Show600 = 3;
						var Show0 = 1;
						var SAutoPlay = 0;
						
						attr = jQuery(this).attr('data-1200');
						if(typeof attr !== 'undefined' && attr !== false){
							Show1200 = attr;
						}
						
						attr = jQuery(this).attr('data-1000');
						if(typeof attr !== 'undefined' && attr !== false){
							Show1000 = parseFloat(attr);
						}
						
						attr = jQuery(this).attr('data-600');
						if(typeof attr !== 'undefined' && attr !== false){
							Show600 = parseFloat(attr);
						}
						
						attr = jQuery(this).attr('data-0');
						if(typeof attr !== 'undefined' && attr !== false){
							Show0 = parseFloat(attr);
						}
						
						attr = jQuery(this).attr('data-margin');
						if(typeof attr !== 'undefined' && attr !== false){
							Smargin = parseFloat(attr);
						}
						
						attr = jQuery(this).attr('data-autoplay');
						if(typeof attr !== 'undefined' && attr !== false){
							SAutoPlay = parseFloat(attr);
						}
					 
						
						var owl = jQuery(this).owlCarousel({
								loop: false,
								margin: Smargin,
								nav: false,
								dots: false,
								rtl: rtl,
								autoHeight: true,
								
								autoplay: SAutoPlay,
								autoPlaySpeed: 5000,
								autoPlayTimeout: 5000,
								autoplayHoverPause: true,
								
								responsive: {
									0: {
										items: Show0
									},
									600: {
										items: Show600
									},
									1000: {
										items: Show1000
									},
									1200: {
										items: Show1200
									}
								},
						});
					 
						//owl.trigger('owl.play',1000);
						
						if(jQuery(".btn.next").length > 0){						
							 jQuery(".btn.next").click(function(){
								owl.trigger('next.owl.carousel');
								owl.trigger('refresh.owl.carousel');
							  })
							  jQuery(".btn.prev").click(function(){
								owl.trigger('prev.owl.carousel');
								owl.trigger('refresh.owl.carousel');
							  }); 
						}
						 
						
						if(jQuery(".fa-long-arrow-right.next").length > 0){						
							 jQuery(".fa-long-arrow-right.next").click(function(){
								owl.trigger('next.owl.carousel');
								owl.trigger('refresh.owl.carousel');
							  });
						}
						
					});
					
	
	}
	
	var handleRatings = function(){  
		
		console.log("ppt - checking - ratings");  
		 
		if(jQuery('.rating-label').length > 0){
			
			console.log("ppt - found - ratings");  
			
			jQuery("<script/>",{type:'text/javascript', src: CNDPath + 'js/js.plugins-ratings.js'}).appendTo('head');			
			
			setTimeout( function(){ 
													   
				jQuery('.rating-label').rating(); 		
				jQuery('.rating-label').each(function () {
						jQuery('<span class="label label-default"></span>')
							.text(jQuery(this).val() || ' ')
							.insertAfter(this);
				});
				jQuery('.rating-label').on('change', function () {
						jQuery(this).next('.label').text(jQuery(this).val());
				}); 
				
				
				updateratingcolor();
			
			}  , 3000 ); 				
		}
	
	}

	var handlePopups = function(){  
		
		console.log("ppt - checking - magic popups");  
		 
		if(jQuery('.popup-yt').length > 0){
			
			console.log("ppt - found - magic popups"); 
			
			jQuery("<script/>",{type:'text/javascript', src: CNDPath + 'js/js.plugins-magnificpop.js'}).appendTo('head'); 
			jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/css.plugins-magnificpop.css" type="text/css" />');	
			
			setTimeout( function(){ 
								 
				jQuery('.popup-yt').magnificPopup({
					type: 'iframe',
					mainClass: 'mfp-fade',
					preloader: true,
				});
			
			}  , 3000 );  
			
		}
			
	}
	
 
	
	
	var handleTypeahead = function(){  
		
		console.log("ppt - checking - Typeahead");  
		 
		if(jQuery('.typeahead').length > 0){
			
			console.log("ppt - found - Typeahead"); 
			
			jQuery("<script/>",{type:'text/javascript', src: CNDPath + 'js/js.plugins-typeahead.js'}).appendTo('head');
			
			setTimeout( function(){ 
											
				jQuery("input.typeahead").typeahead({	
													
						onSelect: function(item) { 
						  window.location = item.extra;
						},
						ajax: {
							
							url: ajax_site_url,
							timeout: 500,
							triggerLength: 1,
							dataType: 'json',			
							method: "POST",	
							
							data: {
								search_action: "search_live",
								search_data: jQuery(".typeahead").val(), 
							},
							preDispatch: function (query) { 
								return {
									search: query,
									search_action: "search_live",
								}
							},
							preProcess: function (data) {
							 
								if (data.success === false) {
									 
									return false;
								}
							 
								return data.mylist;
							}
						},	
					}); 
				
			
			}  , 3000 );  
			
		}
			
	}
	
	var handleGridSlider = function(){  
		
		console.log("ppt - checking - grid slider");  
		 
		if(jQuery('#ppt_grid_gallery').length > 0){
			
			console.log("ppt - found - grid slider"); 
			 
			
		}
	}
	
	var handleCustomList = function(){  
		
		console.log("ppt - checking - custom lists");  
		 
		if(jQuery('.ppt-custom-list').length > 0){
			
			console.log("ppt - found - custom list");
			
			ProcessCustomList("makes", "makes" , jQuery("#models").attr('data-thisvalue')); 
			
			if(jQuery('.ppt-custom-list-models').length > 0){
			
				ProcessCustomList("models", "models" , jQuery(".ppt-custom-list-models").attr('data-thisvalue'));			
			}			
		}
	}

	
 
	var handleCopyLink = function(){  
		
		console.log("ppt - checking - copylink");  
		 
		if(jQuery('.js-copy-link').length > 0){			
			
			loadJS(CNDPath + 'js/js.zclip.js', 'ppt-zlip', function(el) {
			
			});
		}
	}  
	var handleCurrency = function(){  
		
		console.log("ppt - checking - currency");  
		 
		if(jQuery('.ppt-price').length > 0){ 
		
			  UpdatePrices();		  			
		}
	} 
	
	var handleSMS = function(){  
		
		console.log("ppt - checking - SMS");  
		 
		if(jQuery('#mobilenum-input, #whatsapp-input').length > 0){
			
			
			loadJS(CNDPath + 'js/js.mobileprefix.js', 'ppt-mobile-sms', function(el) {				
				
				var handleChange = function() {    
			   		jQuery("#mobilenum-input, #whatsapp-input").val(iti.getNumber());
			   	}
			   
				var input = document.querySelector("#mobilenum-input, #whatsapp-input");
				var iti = window.intlTelInput(input, { 
				  utilsScript: CNDPath + 'js/js.mobileprefixU.js',
				 // autoHideDialCode: false,
				  nationalMode: false,
				   
				});
			
				input.addEventListener('change', handleChange);
				input.addEventListener('keyup', handleChange);
				 
				jQuery(".iti__country-list li").click(function(e) {				 
					jQuery("#mobilenum-input, #whatsapp-input").val( '+' + jQuery(this).data('dial-code') ); 
					
				}); 
			});  
								
		}
	} 

	
	
	var handleCountUp = function(){  
		
		console.log("ppt - checking - count up");  
		 
		if(jQuery('.ppt-countup').length > 0){ 
			
			console.log("ppt - found - count up"); 			 
			
			  jQuery(".ppt-countup").each(function (t, e) {				 									
				var $this = jQuery(this);
				
				if(jQuery.isNumeric(jQuery(this).html())){
				countTo = parseFloat(jQuery(this).html());				 	  
					 jQuery({ countNum: 0 }).animate({
						countNum: countTo
					  }, { 
						duration: 4000,
						easing:'linear',
						step: function() {
						  $this.text(Math.floor(this.countNum));
						},
						complete: function() {
						  $this.text(this.countNum.toLocaleString()); 
						  
						}
				});  	
				}
               
            });
			
		}
	} 
	
 
	var handleCountDown = function(){  
		
		console.log("ppt - checking - countdown");  
		 
		if(jQuery('[data-ppt-countdown]').length > 0 || jQuery('#auction_timer_layout_single_side').length > 0){ 
			
			console.log("ppt - found - countdown"); 			 
			
			loadJS(CNDPath + 'js/js.plugins-countdown.js', 'ppt-countdown', function(el) {
																					 
				setTimeout( function(){ 
				 ppt_countdowns(); 
				 }, 1000 );
			  
			});  
			
		}
		
		
		
		
	} 
	
	
	var handleNotify = function(){  
		
		console.log("ppt - checking - notify"); 
		
		if(jQuery(".notify-stop").length == 0 && !jQuery("body").hasClass('wp-admin')  ){
			
			loadJS(CNDPath + 'js/js.plugins-notify.js', 'ppt-notify', function(el) {  
						 
				 setTimeout( function(){ 
						 
					 ajax_load_notification_bubble();  
							
				 }  , 3000 );
					
				
			});  
		}		
	} 
	
	var handleQRCode = function(){  
		
		console.log("ppt - checking - qr code"); 
		
		if(jQuery(".qr-hover").length > 0){
			 
			var a = jQuery(".qr-hover");
			a.each(function (a) {	
							 
				jQuery(this).on("mouseover", function () { 
													   
					//="%postid%" ="%link%"
					var qrimg  	= jQuery(this).attr('data-qr-img');
					var qrlink  = jQuery(this).attr('data-qr-link');
					 
					if(jQuery("."+qrimg).length > 0){
						
						if(!jQuery("."+qrimg).hasClass("qr-img-gen")){
							processQRCode("."+qrimg, qrlink);
							jQuery("."+qrimg).addClass("qr-img-gen");
						} 
						
					}
				}); 
					 
			}); 
		}		
	} 
	
	
	var handleSelectPicker = function(){  
		
		console.log("ppt - checking - select picker"); //bootstrap-select

		if(jQuery(".selectpicker, .filterbox-seller, #parent_category_list").length > 0){ 
			
			if(jQuery("#ppt-loaded-selectpicker").length == 0){					
				
				jQuery(".selectpicker").addClass('overflow-hidden');
				
				loadJS(CNDPath + 'js/js.plugins-selectpicker.js', 'ppt-selectpicker', function(el) {
					
					jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/css.plugins-selectpicker.css" type="text/css" id="ppt-loaded-selectpicker" />');	
				
					jQuery(".selectpicker, .bootstrap-select").show();
					 
					jQuery(".bootstrap-select, .selectpicker").removeClass('overflow-hidden');					 
					
				}); 				
			 
			}			
		}		
	} 
	
	
	var handleDropDowns = function(){  
		
		console.log("ppt - checking - dropdown menus");  

		if(jQuery(".dropdown").length > 0){  
			 	
				var a = jQuery(".dropdown:not(.hasTrigger)");
				a.each(function (a) {
								 
					jQuery(this).addClass("hasTrigger");				 
				 	
					if(jQuery(this).hasClass("nohover")){
						
					}else{
						
						jQuery(this).mouseenter(function () {
							   ShowHideDropDown(jQuery(this));
						});
						
						jQuery(this).mouseleave(function () {
								  ShowHideDropDown(jQuery(this));
							 }
						 ); 
					}
				 
					jQuery(this).click(function(e) {  
					    ShowHideDropDown(jQuery(this));
											
					});		
					
				});
		}		
	} 	
	
	function ShowHideDropDown(d){
		
		if(d.hasClass("show")){
			d.removeClass("show");
		}else{
			d.addClass("show");
		}	
	}
	
	
	var handlePricingTable = function(){  
		
		console.log("ppt - checking - pricing table"); //bootstrap-select

		if(jQuery(".price-toggle-wrap").length > 0){ 
			
			if(jQuery("#ppt-loaded-pricingtable").length == 0){
			 
				jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/css.plugins-pricingtable.css" type="text/css" id="ppt-loaded-pricingtable" />');	
				
				console.log("ppt - loaded - pricing table");
			}			
		}		
	} 	
	
	var handleFlags = function(){  
		
		console.log("ppt - checking - flags"); //bootstrap-select

		if(jQuery(".flag").length > 0){ 
			
			if(jQuery("#ppt-loaded-flags").length == 0){
			 
				jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/css.plugins-flag.css" type="text/css" id="ppt-loaded-flags" />');	
				
				console.log("ppt - loaded - flags");
			}			
		}		
	} 
	
	
	var handleSVGIcons = function(){  
		
		console.log("ppt - checking - sliders");

		if(jQuery(".ppt-icon-svg").length > 0){
			
			 
		
		}
	}
		
	var handleSliders = function(){  
		
		console.log("ppt - checking - sliders");

		if(jQuery(".slick-slider").length > 0){ 
			
			if(jQuery("#ppt-loaded-slickslider").length == 0){
			 
				jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/css.plugins-slickslider.css" type="text/css" id="ppt-loaded-slickslider" />');	
				
				console.log("ppt - loaded - sliders");
			}			
		}	
		
		
		
		if(jQuery(".price-slider, .filterbox-price").length > 0){ 
		
				jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/_comments.css" type="text/css" id="ppt-loaded-comments" />');
				loadJS(CNDPath + 'js/js.plugins-sliders.js', 'ppt-sliders', function(el) {
					 																 
					if(jQuery(".filterbox-price").length > 0){ 
						jQuery('.filterbox-price').click(function(e) { 												  
																				  
							setTimeout( function () {
								priceslider();
							 }, 2000);
							
						});
					}
					 														 
					priceslider(); 
					
				});
		}	
		
		
	} 
	
	function priceslider(){
		
		var a = jQuery(".price-slider");
					a.each(function (a) {
									 
						jQuery(this).ionRangeSlider({
							type: "double",
							keyboard: true,
							
							min: 0,
							max: jQuery(this).attr('data-max'),
							from:0,
							to: jQuery(this).attr('data-max'),
							step:1,
							//grid: true,
							hide_min_max:true,
							hide_from_to:true,
							
							onChange: function (data) {
								
								jQuery('.txt_price1').html(data.from);;
								jQuery('.txt_price2').html(data.to);
								
								jQuery('#filter_price_value_1').val(data.from);
								jQuery('#filter_price_value_2').val(data.to);
											 
							},onFinish: function (data) { 
								
							   _filter_update();
							}	 
							
						});	
						
		});
	}
	
	
	
	
	var handleDatepicker = function(){  
		
		console.log("ppt - checking - date picker"); 

		if(jQuery(".ppt-datepicker").length > 0){ 
			
			if(jQuery("#ppt-loaded-datepicker").length == 0){
				
				
				jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/css.plugins-datepicker.css" type="text/css" id="ppt-loaded-datepicker" />');
				
				loadJS(CNDPath + 'js/js.plugins-datepicker.js', 'ppt-datepicker', function(el) {
				
					var a = jQuery(".ppt-datepicker");
					a.each(function (a) {
						 
						jQuery(jQuery(this).attr('data-target')).datetimepicker({format: 'yyyy-mm-dd hh:ii:ss',   
						autoclose: true,
						todayHighlight: true,
					   // showMeridian: true,
						startView: 2,
						maxView: 1,  
						pickTime: false, buttonText: '<i class="fa fa-cog"></i>', fontAwesome: 1,  todayBtn: true, pickerPosition: "bottom-right"});
							
						
					});
				});  
			} 
		}
		
	} 
	
	var handleAudio = function(){  
		
		console.log("ppt - checking - audio XXXX"); 
		
		if(jQuery(".ppt-audio").length > 0){
			
			console.log("ppt - loaded - audio"); 
			 
			loadJS(CNDPath + 'js/js.audio.js', 'ppt-audio', function(el) {
																	 
				var a = jQuery(".ppt-audio");
				a.each(function (a) {
								 
				new ppt_audiobox({divId:jQuery(this).attr("id"),autoplay:false,color:jQuery(this).data('color'),defaultVolume:80 }, [
					{
						title:"",
						artist:'',
						albumArturl:jQuery(this).data('thumbnail'),
						url:jQuery(this).data('src'),
					}
				]);
				
				});
																					   
			
			});
			 
			
		}
		
	} 
	
	var handleCharts = function(){  
		
		console.log("ppt - checking - charts"); 
		
		if(jQuery(".ppt-charts").length > 0){
			
			console.log("ppt - loaded - charts"); 
			 
			loadJS(CNDPath + 'js/js.plugins-charts.js', 'ppt-charts', function(el) {
																					   
			
			});
			
		}
		
	} 
	
	
	var handleAnimation = function(){  
			
			console.log("ppt - checking - animation"); 
			 
			if(jQuery(".ppt-animate").length > 0){ 
				
				var i=1;
				var a = jQuery(".ppt-animate");
				a.each(function (a) {
					
					let target =  jQuery(this);
				 	var animation = target.data('animation');	
				 	 
					if (typeof  target.data('items') !== 'undefined' &&  target.data('items') !== false) {
						
						var wrapid = 'wrap-'+i;
						target.addClass(wrapid);  
							
						target.data('num', 0);
						
						pptAnimatedText(animation, wrapid); 
						
						speed = 1500;
						if(animation == "ppt-animate-typed" || animation == "ppt-animate-pulse-in" ){	
							 
							var chars = findLongestWord(target.data('items'));							
							speed = chars*800;
						}
						 
						setInterval(function () {
											  
							pptAnimatedText(animation, wrapid);
						
						}, speed );
					
					}
				 	
					i++;
				});		 
			
			}
	}
	 
	function findLongestWord(str) {
	  var strSplit = str.split(',');
	  var longestWord = 0;
	  for(var i = 0; i < strSplit.length; i++){
		if(strSplit[i].length > longestWord){
		longestWord = strSplit[i].length;
		 }
	  }
	  return longestWord;
	}
	
	function pptAnimatedText(animation, wrapper) {
		  
		  var thisDiv = jQuery('.ppt-animate.'+wrapper);
		  
		  var itemsdata = thisDiv.data('items');
		  var items = itemsdata.split(',');
		  
		 itemsLength = items.length;
		 n = thisDiv.data('num');
		 
		 if (n < 0) {
			 n = 0;
		 }
		 
		thisDiv.html('');
		 
		 var chars = items[n].split('');
		//target.css("min-width", 15 * chars.length);
		thisDiv.css("display", "inline-block");
 	 
		 if(animation == "ppt-animate-typed" || animation == "ppt-animate-pulse-in"){
			 
			 
			 speed = 500;
			 if(animation == "ppt-animate-pulse-in"){
				 speed = 300;
			 }
		
			if (typeof items[n] !== 'undefined') {				
				
				for( let j = 0; j < chars.length; j++ ){
                            
                       setTimeout(function (j) { 
						 
			 			thisDiv.find('span').removeClass(animation);
						thisDiv.html( thisDiv.html() + '<span class="'+animation+'">'+chars[j]+'<span>'); 									 
								 
                      }, speed * j + 1, j);
                }
			
			}
		
		 } else {
			 
			if (typeof items[n] !== 'undefined') {
				 
				thisDiv.html('<span class="'+animation+' active">'+items[n]+'<span>');						
				setTimeout( function () {
					jQuery('.ppt-animate.'+wrapper+' .active').addClass("out").removeClass("in");
				 }, 1000);
			} 
		
		 } 
		
		  
		 if (n + 1 == itemsLength) {			
			thisDiv.data('num', 0); 			
         } else{
			thisDiv.data('num', thisDiv.data('num') + 1); 
		 }
		 
		 
	}
	
	
	var handleTypewriter = function(){  
		
		console.log("ppt - checking - typewriter"); 
		 
		
	 	if(jQuery("[data-title-animated]").length > 0){ 
			
			loadJS(CNDPath + 'js/js.plugins-typewriter.js', 'ppt-typewrite', function(el) {
				
				var tid = 1;
				var a = jQuery("[data-title-animated]");
				a.each(function (a) { 	
					 
					var txt = jQuery(this).text();	
					
					if(jQuery(this).hasClass("ppt-animated-typed") ){
						
						
						jQuery(this).addClass('typed'+tid);
						var tv = jQuery(this).html();
					
					}else{	
					
						if(txt.indexOf("?") != -1){
							txt = txt.replace("?", " <span class='typed"+tid+"'></span>");
						}else{
							txt = txt + " <span class='typed"+tid+" end'></span>";
						}
						
						jQuery(this).html(txt);
						var tv = jQuery(this).data('title-animated');
					
					}
					 
															
					var typed = new Typed('.typed'+tid, {
						strings: tv.split(','),
						typeSpeed: 100,
						backSpeed: 20,
						startDelay: 1000,
						backDelay: 2000,
						smartBackspace: false, // this is a default
						loop: true,
						showCursor: false,
					});	
					
					// FADE IN
					if(jQuery(this).hasClass("ppt-animated-typed") ){
					jQuery(this).fadeIn(1500);
					}
					
					tid++;
					
				}); 
			 		 
			 });		
		}
 
		
		
		if(jQuery(".ppt-typewriter").length > 0){
			 
		 	loadJS(CNDPath + 'js/js.plugins-typewriter.js', 'ppt-typewrite', function(el) {
																					  
			var tv = jQuery(".ppt-typewriter").val();
		 						
				var typed = new Typed('.typed', {
				strings: tv.split(','),
				typeSpeed: 100,
				backSpeed: 20,
				startDelay: 1000,
				backDelay: 2000,
				smartBackspace: true, // this is a default
				loop: true
			  	});																	   
			
			}); 
		}
		
	} 
	
	
	var handleLightbox = function(){  
		
		console.log("ppt - checking - lightbox"); 
		
		if(jQuery('[data-toggle="lightbox"]').length > 0){
			
			console.log("ppt - loaded - lightbox"); 
			
			jQuery('head').append('<link rel="stylesheet" href="'+ CNDPath + 'css/css.plugins-lightbox.css" type="text/css" />');	
		 
			loadJS(CNDPath + 'js/js.plugins-lightbox.js', 'ppt-lightbox', function(el) {
																					  
				jQuery(document).on('click', '[data-toggle="lightbox"]', function(event) {
					event.preventDefault();
				   jQuery(this).ekkoLightbox();
				}); 
																					  
			});
			
			 
			
		}
		
	} 
 

	
	var handleSearch = function(){  
		
		console.log("ppt - checking - search"); 
		
		
		
		// LOADED INSIDE
		if(jQuery("#premiumpress-search").length > 0){ 
		
		 
		}else if(jQuery("#ajax-search-output").length > 0){ 
		  
			loadJS(CNDPath + 'js/js.search.js', 'ppt-search', function(el) {
																	   
				_updateselected('no');
				 
			   var i = 0;
			   jQuery('.filters_sidebar .filter-content').each(function () {
					if(i < 5){
					jQuery(this).addClass('show');
					i ++;
					}
					
				}); 												   
				
				if(jQuery("#savedsearcheshere").length > 0){
					savesearch_get();
				}
			  
			});   
			
		} 
		
	} 	
	
	
	
	var handleMobileGallery = function(){ 
		 
		var wins = jQuery(window).width();
	 	
		if(jQuery("#mobileGalleryMove").length > 0){
			if(jQuery("#mobileGalleryMove").html().length > 100){
	 			galCode = jQuery("#mobileGalleryMove").html();
			}
		}
		 
		if ( wins < 767){	
		
			jQuery("#mobileGallery").html(galCode).addClass('ismobile');	
			jQuery("#mobileGalleryMove").html('');
			jQuery(".ppt-modal-wrap:not(.nc) .card-footer").show();
			
			var a = jQuery(".bg-image");
			a.each(function (a) {
				if (jQuery(this).attr("data-bg")) jQuery(this).css("background-image", "url(" + jQuery(this).data("bg") + ")");
			});
			
		} else{	
		
			if(jQuery("#mobileGallery").hasClass('ismobile')){
			
			jQuery("#mobileGalleryMove").html(galCode);
			}
								
			jQuery("#mobileGallery").html('');
			jQuery(".ppt-modal-wrap:not(.nc) .card-footer").hide();
			
			
		}		
		
		handleImages();
		 
		
	}

	var handlefixedHeader = function(){ 
		 
		var wins = jQuery(window).width();
		 
		if ( wins > 767){
			
			if(jQuery(".hero-full:not(.stay-fixed)").length > 0){
				jQuery("header:not(.ppt-fixed-header").addClass('fixed-top ppt-fixed-header');
			}
			
			if(jQuery(".fixed-top:not(.ppt-fixed-header, .stay-fixed)").length > 0){
				jQuery(".fixed-top").addClass('ppt-fixed-header');
			}
			
			jQuery(".navbar-darkxxx").addClass('navbar-dark').removeClass('navbar-light').removeClass('navbar-darkxxx');
			 
			
			if(jQuery(".ppt-fixed-header").length > 0){ 
			
				jQuery('.ppt-fixed-header').addClass('fixed-top bg-transparent-none').removeClass('bg-dark'); //.addClass('bg-white')
				jQuery('.ppt-fixed-header .elementor_mainmenu').removeClass('navbar-light').addClass('navbar-dark');
				jQuery('.ppt-fixed-header .elementor_topmenu').addClass('fade');
				jQuery('.ppt-fixed-header .elementor_submenu').removeClass('bg-primary').addClass('bg-primaryxxx');			
				jQuery('.header2 .elementor_submenu, .header12 .elementor_submenu').attr('style','display: none !important');
				  
			}		
		}else{
			 
			jQuery('.ppt-fixed-header .elementor_mainmenu').addClass('navbar-light').removeClass('navbar-dark');
			jQuery('.ppt-fixed-header').removeClass('bg-transparent').addClass('bg-white xxx');
			
			jQuery('.ppt-fixed-header').removeClass('navbar-dark').addClass('navbar-light navbar-darkxxx');
			
		}
		
		
	}
	
	var handlefixedHeaderResize = function(){
		
		if(jQuery(".ppt-fixed-header").length > 0){
		
			var wins = jQuery(window).width();
			
			if (wins  < 767){
				
				
				jQuery('.ppt-fixed-header.fixed-top').removeClass('fixed-top').removeClass('bg-transparent-none').addClass('bg-white');
				jQuery('.ppt-fixed-header .elementor_mainmenu').addClass('navbar-light').removeClass('navbar-dark');
				
				jQuery('.ppt-fixed-header.navbar-dark').removeClass('navbar-dark').addClass('navbar-light navbar-darkxxx');
				
			}else if ( wins > 767){
				
				jQuery('.ppt-fixed-header').addClass('fixed-top bg-transparent-none').removeClass('bg-white');
				jQuery('.ppt-fixed-header .elementor_mainmenu').addClass('navbar-dark').removeClass('navbar-light');
				
				jQuery(".navbar-darkxxx").addClass('navbar-dark').removeClass('navbar-light').removeClass('navbar-darkxxx');
		
			} 
			
		}
		
	}
	
	var handlefixedHeaderScroll = function(){ 
		
		if(jQuery(".ppt-fixed-header").length > 0){ 
		 	
			if(jQuery(this).scrollTop() > 150) {
			
				jQuery('.ppt-fixed-header.elementor_header').removeClass('bg-transparent').removeClass('bg-transparent-none');
				jQuery('.ppt-fixed-header .elementor_mainmenu').addClass('navbar-light').removeClass('navbar-dark');
				
				if(jQuery(window).width() > 767){
				jQuery('.ppt-fixed-header.navbar-dark').addClass('navbar-light navbar-darkxxx').removeClass('navbar-dark');
				jQuery('.ppt-fixed-header.elementor_header').addClass('bg-white shadow');
				}
				
			} else if(jQuery(this).scrollTop() < 150) {
				
				if(jQuery(window).width() > 767){
				jQuery('.ppt-fixed-header.elementor_header').removeClass('bg-white shadow');
				}
				
				jQuery('.ppt-fixed-header.navbar-darkxxx').addClass('navbar-dark').removeClass('navbar-darkxxx');
				
				handlefixedHeader();
			} 
		} 
	}
	
	var handleSocial = function(){ 
		
		if(jQuery(".addthis_button_compact").length > 0){ 
		
			var a = jQuery(".addthis_button_compact");
			a.each(function (a) {
							 
				jQuery(this).click(function(e) {  
					
					jQuery("<script/>",{type:'text/javascript', src: '//s7.addthis.com/js/300/addthis_widget.js#pubid='+jQuery(this).attr('data-addthisid')}).appendTo('head');
					
										 
				});
			});
			
		} 
	}	
 
	
 
	var handleLiveEditors = function(){  
		
		if(jQuery(".ppt-own-listing").length > 0){ 
			processLiveEditors();
		}
	
	}
	
	
	var handleMainForm = function(){ 
	 
		if(jQuery("#MAINCONTAINER").length > 0){
	
		
		}	
	}
	
	var handleImages = function(){  
	
	 	 
		var a = jQuery("img.lazy");
		a.each(function (a) {
			img = jQuery(this).attr("data-src"); 	
			if (typeof img !== 'undefined') {
			jQuery(this).removeAttr("data-src").addClass('ppt-lazy').attr("src", img); 
			}
		});
		
	 
		var a = jQuery(".bg-image:not(.js-image-preload-set)");
		var imgc = 8888;
		a.each(function (a) {
						 
			var hh = jQuery(this);
			var img = hh.attr('data-image');
			
			if (typeof img == 'undefined') {
				var img = hh.attr('data-bg');	
			}
			
			var pid = imgc;
			  
			if (typeof img !== 'undefined') {
				
				if (typeof jQuery(this).attr("data-pid") !== 'undefined') {
					pid = jQuery(this).attr("data-pid"); 
				}else{
					imgc++;	
				}
				
				jQuery(this).addClass('ppt-lazy-img-'+pid);
				
				if(jQuery("#ppt-loaded-img-"+pid).length == 0){ 
				jQuery( "<style type='text/css'>.ppt-lazy-img-"+pid+".visible { background-image: url(" + img + ");}</style>" ).appendTo( "head" ).attr('id', 'ppt-loaded-img-'+pid);	
				}
				
				jQuery(this).addClass('js-image-preload-set');
				
			}
			
		});
		
		 
	 
		var a = jQuery(".bg-image:not(.js-image-preload-set)");
		a.each(function (a) {
			if (jQuery(this).attr("data-image")) jQuery(this).css("background-image", "url(" + jQuery(this).data("image") + ")");
		});
		
		
		var a = jQuery(".bg-pattern:not(.js-image-preload-set)");
		a.each(function (a) {
			if (jQuery(this).attr("data-bg")) jQuery(this).css("background-image", "url(" + jQuery(this).data("bg") + ")");
			jQuery(this).addClass('js-image-preload-set');
		});
		
		var a = jQuery(".bg-pattern-small:not(.js-image-preload-set)");
		a.each(function (a) {
			if (jQuery(this).attr("data-bg")) jQuery(this).css("background-image", "url(" + jQuery(this).data("bg") + ")");
			jQuery(this).addClass('js-image-preload-set');
		});
	
	
	}
	
	var handleImagesSearch = function(){
			
			console.log("ppt - checking - images");
			var a = jQuery(".bg-image:not(.js-image-trigger-set, .js-image-preload-set)");
			a.each(function (a) {
							 
				if (jQuery(this).attr("data-bg")) jQuery(this).css("background-image", "url(" + jQuery(this).data("bg") + ")");
				 
				jQuery(this).addClass('js-image-trigger-set');
				
			});
	}
 
 
	return {
		init:function(){
			
			console.log("ppt - init");
			
			handleSearch();
			
			handleReady();
			
			handleOwlSlider();			
			handleMaps();			
			handleRatings();
			handlePopups();
			handleTypeahead();
			handleGridSlider(); 
			handleStickyMenu();
			handleModals();
			handleCurrency();
			handleSMS();
			handleCopyLink();
			handleNotify();
			handleDatepicker();
			handleSelectPicker();
			handleShowHide();
			handleAccordion();
			handleCharts();
			handleLiveEditors();
			
			handleLightbox();
			handleAudio();
			handleDropDowns();
			handleTypewriter();
			handleAnimation();
			handleCountDown();
			handleCountUp();
			handlefixedHeader();
			handleMainForm();			
			handleCustomList();
			handlePricingTable();
			handleFlags();
			handleSocial();
			handleSliders(); 
			handleImages();
			handleInlineEditor(); 
			handleOverlays();
		 	handleMobileGallery();
			handleCookieLaw(); 
			handleSVGIcons();
			handleColorChanges();
			handleScrollBar();
			handleQRCode();
			handleRemovePreloader();
			handleDivCleanUp(); 
			 
			var endTime = (new Date()).getTime();
      		var ms = endTime - startTime;
			 
			console.log('Page Load Time: 0 Seonds - '+ ms + ' Micro Seconds ---- ');
			
			handleLoad();
			
			 
		}, 
		load:function(){ 
			 
			  
			
		},
		
		scroll: function(){
			
			handlefixedHeaderScroll();
			
			
		},
		
		resize:function(){  
		 
			handlefixedHeaderResize();
			handleMobileGallery();
			
		},
		
		update_after_insert_elementor:function(){ 
		
			console.log("ppt - elementor triggered");
			
			handleOwlSlider();
			handleCurrency();
			handleImagesSearch();
			handleCountDown();
			handleShowHide();
			handleAccordion();
			handleColorChanges();
			handleAnimation();
			
			console.log("end ------- elementor triggered");
		 	
		},
		
		update_after_search:function(){ 
		 	
			console.log("ppt ------- after search triggered");
			
			handleCurrency();
			handleImagesSearch();
			handleCountDown();
			handleShowHide();
			handleAccordion();
			handleColorChanges();
			handleQRCode();
			
			console.log("end ------- after search triggered");
			 
		},
		
		update_after_insert_theme:function(){ 
		 	
			handleMaps();
			handleCurrency();
			handleImagesSearch();
			handleCountDown();
			handleShowHide();
			handleAccordion();
			handleColorChanges();
			handleAnimation();
		},
		
		update_after_ajax:function(){ 
		
			console.log("ppt - ajax update triggered");
			
			handleMaps();
			handleCurrency();
			handleImagesSearch();
			handleCountDown(); 
			handleCountUp();
			handleShowHide();
			handleImages();
			handleSVGIcons();
			handleDropDowns();
			handleScrollBar();
			handleQRCode();
			handleAnimation();
			
			console.log("end ------- ajax update triggered");
		 	
		},
		
	}// end return 
	
}();


// Register IntersectionObserver
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // Add 'active' class if observation target is inside viewport
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add('visible');
    }
    // Remove 'active' class otherwise
    else {
     // entry.target.classList.remove('active');
    }
  })
})

// Declares what to observe, and observes its properties.
const boxElList = document.querySelectorAll('.bg-image');
boxElList.forEach((el) => {
  io.observe(el);
})
 
 

jQuery(document).ready(function() {
    'use strict';
	
	pptThemes.init(); 
	
	
	var body = jQuery('body');
	var html = jQuery('html');

	function getUrlParams(dParam) {
		var dPageURL = window.location.search.substring(1),
			dURLVariables = dPageURL.split('&'),
			dParameterName,
			i;
			
		for (i = 0; i < dURLVariables.length; i++) {
			dParameterName = dURLVariables[i].split('=');

			if (dParameterName[0] === dParam) {
				return dParameterName[1] === undefined ? true : decodeURIComponent(dParameterName[1]);
			}
		}
	}
	
	var direction =  getUrlParams('dir');
	if(direction != 'rtl') {direction = 'ltr'; } 
  
    switch(direction) {
        case "rtl":
            html.attr("dir", "rtl");
            html.addClass('rtl');
            body.attr("direction", "rtl");
            break;
        case "ltr": 
            html.attr("dir", "ltr");
            html.removeClass('rtl');
            body.attr("direction", "ltr");
            break;
        default: 
            html.attr("dir", "ltr");
            body.attr("direction", "ltr");
    }
	
});
jQuery(window).on('load',function () {
	'use strict'; 
	pptThemes.load();	
}); 
jQuery(window).on('resize',function () {
	'use strict'; 
	pptThemes.resize();
}); 
jQuery(window).on('scroll',function () {
	'use strict'; 
	pptThemes.scroll();
}); 

jQuery(document).on("input", ".numericonly, .val-numeric", function() {
	
	if(jQuery(".ppt-mobile-device").length == 0){
	
    this.value = this.value.replace(/[^0-9\.]/g, '');
	
	}
	
}); 

jQuery(document).on("input", ".val-nospaces", function() {
    this.value = this.value.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
});
 
/* =============================================================================
 LOAD SETUP
  ========================================================================== */	 
jQuery(window).on('load', function(){
									   
		 
		jQuery(window).on('scroll', function() {
											 
			
			if(jQuery('.previewmode').length){
				 
			}else{
			
			if(jQuery(this).scrollTop() > 150) {
				
				if(jQuery('.innerpage .has-sticky .elementor_topmenu').length){
				jQuery('.innerpage .has-sticky .elementor_topmenu').attr('style','display: none !important');
				}		 
				
				jQuery('.has-sticky').addClass('sticky');
				
			} else {
				
				if(jQuery('.innerpage .has-sticky .elementor_topmenu').length){
				jQuery('.innerpage .has-sticky .elementor_topmenu').attr('style','display: block !important');
				}
				
				jQuery('.has-sticky').removeClass('sticky');
			}
			
			}
			
		}); 
	
	});

	function checkSize(){
		
		 var wins = jQuery(window).width(); 
		 
		  				 
			if (wins  < 991){
				
				jQuery('.has-sticky .elementor_mainmenu').removeClass('fixed-scroll');			
				jQuery('.filters_sidebar .filter-content').addClass('collapse collapsexx').removeClass('show'); 
				
				jQuery('#filters-extra').addClass('collapse collapsexx').removeClass('show');
			 
	
			}else if ( wins > 991){
	
				jQuery('.bg-gradient-smallx').removeClass('bg-gradient-smallx').addClass('bg-gradient-small');
				
				jQuery('.collapsexx').addClass('collapse show').removeClass('collapsexx');	
				 
				
			}	 
		 
		 
	}
  
/* =============================================================================
  
  ========================================================================== */	 
 
  jQuery(document).ready(function(){ 
								  							
	"use strict";	
   
    checkSize();
  
    jQuery(window).resize(checkSize);
	
	/* MOBILE MENU	*/
  	jQuery(".menu-toggle").click(function(e) {
      
	  e.preventDefault();
	  
	  jQuery("#sidebar-wrapper").toggleClass("ppt-animate-slidein");
	  
      jQuery("#wrapper").toggleClass("toggled");

	  if(jQuery(".sidebar-heading").length == 0){
		  jQuery.ajax({
			type: "POST",
			url: ajax_site_url,		
			data: {
				   action: "load_sidebar",			   
			   },
			   success: function(response) { 
			   
					jQuery('#sidebar-wrapper').html(response);	
					
					jQuery(".menu-toggle1").click(function(e) {
					  e.preventDefault();
					  jQuery("#wrapper").toggleClass("toggled");
					  jQuery('#sidebar-wrapper').html('');
					});
			   }
		   });
	  } 
	  
    });
	
	if(jQuery(".menu-toggle1").length > 0){ 
		jQuery(".menu-toggle1").click(function(e) {
					  e.preventDefault();
					  jQuery("#wrapper").toggleClass("toggled");
					  jQuery('#sidebar-wrapper').html('');
					});
	}
										   
	if(jQuery(".menu-toggle-slim").length > 0){ 
		jQuery(".menu-toggle-slim").click(function(e) {
					  e.preventDefault();
					  jQuery("#wrapper").toggleClass("toggled-slim");
					  
		});
	}									   
	
	/*  TABS */	
	jQuery(".ppt-tabs-listing > ul li").click(function(e) {

		jQuery(".is-active").removeClass("is-active");
		jQuery(this).addClass("is-active");
	
		if(jQuery(this).attr("data-id") == "tab1"){
			
			jQuery('#tab3').hide();
			jQuery('#tab2').hide();
			jQuery('#tab1').show(); 
			
		}else if(jQuery(this).attr("data-id") == "tab3"){
			
			jQuery('#tab3').show();
			jQuery('#tab2').hide();
			jQuery('#tab1').hide();
		
		}else{
		
			jQuery('#tab1').hide();
			jQuery('#tab2').show();
			jQuery('#tab3').hide();
		
		}  
	}); 
	
	/* dynamic lists */
	jQuery('.ppt-list-custom').change(function(){ 
		 
		ProcessCustomList(jQuery(this).attr('id'), jQuery(this).data('target') ,jQuery(this).val());  		 
	
	});
	
	
	/*  PATTERNS */
	jQuery('section .bg-pattern').each(function () {		  
		jQuery(this).closest('section').addClass('with-pattern');		
	}); 
  
	 
	/*  FAVS	   */	
	jQuery(document).on("click",".favs_add", function (e) {
		
		var btnbit = jQuery(this);
		
		jQuery(this).removeClass('btn-icon').html("<i class='fas fa-spinner fa-spin'></i>");
		
		jQuery.ajax({
			type: "POST",
			url: ajax_site_url,	
			dataType: 'json',	
			data: {
				'action': "favs",
				'pid': jQuery(this).attr("data-pid"),				 
			},
			success: function(response) {
				 
				if(response.status == "add"){
						
						if(jQuery(btnbit).attr("data-text") == 1 && jQuery(btnbit).attr("data-icon") == 0 ){
							
							jQuery(btnbit).html(jQuery(btnbit).attr("data-textadd")); 
						
						}else if(jQuery(btnbit).attr("data-text") == 1){
							jQuery(btnbit).html('<i class="fa fa-heart"></i> <span>'+jQuery(btnbit).attr("data-textadd")+'</span>'); 
						
						}else{
							jQuery(btnbit).html('<i class="fa fa-heart"></i>'); 	
						}
						
				
				}else if(response.status == "remove"){
						
						if(jQuery(btnbit).attr("data-text") == 1 && jQuery(btnbit).attr("data-icon") == 0 ){
							
							jQuery(btnbit).html(jQuery(btnbit).attr("data-textremove")); 
						
						}else if(jQuery(btnbit).attr("data-text") == 1){
							jQuery(btnbit).html('<i class="fa fa-heart-broken"></i> <span>'+jQuery(btnbit).attr("data-textremove")+'</span>'); 
						}else{
							jQuery(btnbit).html('<i class="fa fa-heart-broken"></i>');
						}
				
				}else if(response.status == "login"){
					
						jQuery(btnbit).html('<i class="fa fa-user"></i>');
				
				}else{			
							
				}			
			},
			error: function(e) {
			   console.log('error getting search results');
			}
		}); 
		 
		  
	});	
	
	/*  SUBSCRIBE	*/ 	
	jQuery(document).on("click",".button_user_add", function (e) {
		
		var btnbit = jQuery(this);
		
		jQuery(this).removeClass('btn-icon').html("<i class='fas fa-spinner fa-spin'></i>");
		
		var showtext = jQuery(this).attr('data-text');
		
		var type = jQuery(this).attr('data-type');
		
		jQuery.ajax({
			type: "POST",
			url: ajax_site_url,	
			dataType: 'json',	
			data: {
				'action': "subscribe",
				'type': jQuery(this).attr('data-type'),
				'button': jQuery(this).attr("data-button"),
				'uid': jQuery(this).attr("data-uid"),
				'pid': jQuery(this).attr("data-pid"),
				'css': jQuery(this).attr("class"),
				"showtext": showtext,
			},
			success: function(response) {
			 	 
				if(response.status == "add"){					
					
					jQuery(btnbit).replaceWith(response.output); 					
						 
				}else if(response.status == "remove"){
					
					jQuery(btnbit).replaceWith(response.output); 
					 
				
				}else if(response.status == "login"){
					
						jQuery(btnbit).html('<i class="fa fa-user"></i>');
				
				} 
				 
			if(response.data == "like_list" || response.data == "dislike_list"){
				 
				var vote = "up";
				if(response.data == "dislike_list"){
					vote = "down";
				}
				
				jQuery.ajax({
					type: "POST",  
					url: ajax_site_url,	
					data: {
						action: "rating_likes",
						pid: response.pid,
						value: vote,
					},
					success: function(e) { 
					  
					},
					error: function(e) {
						 
					}
				});
				 
				
			}
				
				
			},
			error: function(e) {
			   console.log('error getting search results');
			}
		}); 
		 
		  
	});
	
 
	
	/*  IMAGRE BLOCK BUTTONS */
  	jQuery("figcaption button").click(function(e) {     
	  e.preventDefault();	  
	  window.location.href = jQuery(this).attr("data-link");
	  
    });
	 
 
	
	/* SCROLL TOO */
	if(jQuery(".scroll-init").length > 0){
		jQuery(".scroll-init div").singlePageNav({
			filter: ":not(.external)",
			updateHash: false,
			offset: 250,
			threshold: 250,
			speed: 1200,
			currentClass: "active"
		}); 
	}
     
    jQuery(".custom-scroll-link").on("click", function () {
		 
        var a = 150 + jQuery(".scroll-nav-wrapper").height();
        if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") || location.hostname === this.hostname) {
            var b = jQuery(this.hash);
            b = b.length ? b : jQuery("[name=" + this.hash.slice(1) + "]");
            if (b.length) {
                jQuery("html,body").animate({
                    scrollTop: b.offset().top - a
                }, {
                    queue: false,
                    duration: 1200,
                    easing: "easeInOutExpo"
                });
                return false;
            }
        }
    });
	 	
	
	
	/*  fade in */
	var IE='\v'=='v';jQuery("#back-top").hide();
		jQuery(window).scroll(function () {
			if (!IE) {
				if (jQuery(this).scrollTop() > 100) {
					jQuery('#back-top').fadeIn();
				} else {
					jQuery('#back-top').fadeOut();
				}
			}
			else {
				if (jQuery(this).scrollTop() > 100) {
					jQuery('#back-top').show();
				} else {
					jQuery('#back-top').hide();
				}	
			}
		});

		/*  scroll body to 0px on click */
		jQuery('#back-top a, .scroll-to-top').click(function () {
			jQuery('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		
		
	/*  MODAL CLOSE */
	jQuery(".ppt-modal-close, .ppt-modal-wrap-overlay:not(.no-remove)").on("click", function (e) {
        jQuery(".ppt-modal-wrap").removeClass('show');		
    });
	jQuery(".extra-modal-wrap-overlay:not(.no-remove)").on("click", function (e) {
        jQuery(".extra-modal-wrap").removeClass('show');		
    });
	jQuery(".comment-modal-wrap-overlay:not(.no-remove)").on("click", function (e) {
        jQuery(".comment-modal-wrap").removeClass('show');		
    });
	
	
		
	 /*  NOTIFCATION MODSL */
	jQuery(".notify-footer .n_count").on("click", function (e) {
        	processNotificatons();
    });
	 
 
	/*  MESSAGE MODAL */
	jQuery(".filter-modal-close, .filter-modal-wrap-overlay").on("click", function (e) {
        jQuery(".filter-modal-wrap").removeClass('show');		
    });
 
	
	/*  FINALL TRIGGER RESIZE FOR LOADERS ETC */
	jQuery(".btn.next, .btn.prev").on("click", function (e) {
        tinyScroll();
    });
 	 

});
  
  
jQuery(window).bind("load", function() { 
	
	
	setTimeout( function(){ 
						 
    /*  LOAD IN THE SIDEBAR */
	jQuery("#sidebar-wrapper").show();
	
  }  , 7000 );
	
	
	
 
});


function ProcessUserMsgList(uid){ 
 
jQuery.ajax({
        type: "POST",
        url: ajax_site_url,
		dataType: 'json',	
		data: {
            action: "load_chat_list",
			uid: uid,
			listbox:1,
        },
        success: function(response) {
		 	
			if(response.total < 1){
			
			jQuery('#ajax_msg_list').html("<a class='dropdown-item text-center no-msg' href='" + jQuery('#ajax_msg_list').attr("data-link") + "'>" + jQuery('#ajax_msg_list').attr("data-title") + "</a>");  
			
			tinyScroll();
				
			}else if(response.status == "ok"){
			 			
			jQuery('#ajax_msg_list').html(response.output);  
			
			tinyScroll();	
			
			
			/*  CUSTOM ICONS AND AVATARS */
			var a = jQuery(".bg-image");
			a.each(function (a) {
				if (jQuery(this).attr("data-bg")) jQuery(this).css("background-image", "url(" + jQuery(this).data("bg") + ")");
			});
			
  		 	
			} 		
        },
        error: function(e) {
            console.log(e)
        }
    });
	
}// end are you sure

/* =============================================================================
	DYNAMIC LISTS
========================================================================== */	 

function ProcessCustomList(selectorID, taxKey, taxValue){
 		
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "ajax_get_list_custom",	
			   key: taxKey,
			   val: taxValue,		   
           },
           success: function(response) {
		   
			   if(response.status == "ok"){
				   
			  		jQuery('#'+taxKey).html("<option value=''>"+ jQuery('#'+selectorID).data('text-'+taxKey) +"</option>");
				  
					jQuery.each(response.data, function(k, v) {
						
						if(k == jQuery('#'+taxKey).data('value')){
						jQuery('#'+taxKey).append('<option value="'+k+'" selected=selected>'+v+'</option>');
						}else{
						jQuery('#'+taxKey).append('<option value="'+k+'">'+v+'</option>');	
						}
						
					   
					});
			   }
		   		 
           },
           error: function(e) {
               console.log(e)
           }
       }); 

}

/* =============================================================================
	FUNCTION TO SCROLL 1PX AND TRIGGER THE LAZY LOAD
========================================================================== */	 

function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}


function processCookie(){
	
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_cookie",   			 
           },
           success: function(response) { 
		    	
		   		pptModal("cookie", response, "modal-bottom ", "ppt-animate-fadeup bg-white rounded-0", 0);
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
	
}
function processDownload(pid){
	
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_download",   
			   pid:pid,
           },
           success: function(response) { 
		    	
		   		pptModal("download", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white ppt-modal-shadow w-700", 1);
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
	
}
function processDispute(pid, total){
	
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_disputes",   
			   pid:pid,
			   total:total,
           },
           success: function(response) { 
		    	
		   		pptModal("dispute", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-700", 1);
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
	
}

function processCookieOk(){
	
	
		jQuery(".ppt-cookie-notice").removeClass('show');
	
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "ajax_cookie_accept",   			 
           },
           success: function(response) { 
		    	 
           },
           error: function(e) {
               console.log(e)
           }
       });
	
}


function processNotificatons(){  
		 
   	  
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_notifications",   			 
           },
           success: function(response) { 
		    
		   		pptModal("notices", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-700", 0);
		    	 
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}
function processGifts(uid, pid){  
   	  
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_gifts", 
			   uid: uid,
			   pid: pid,  			 
           },
           success: function(response) {  
			 	
				pptModal("gifts", response, "modal-bottomxxxx", "ppt-animate-bouncein bg-white ppt-modal-shadow w-700", 0);
				
				// UPDATE PRICE DISPLAY
				UpdatePrices();
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}
function processVideoOpen(pid, vid){	       
	 
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_video_form",	
			   pid: pid,
			   vid: vid		   
           },
           success: function(response) { 
		      	
				pptModal("video", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500", 1);
				 
				jQuery('video').mediaelementplayer({videoWidth: '100%',  videoHeight: '100%',  enableAutosize: true,});
			 
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}  

   
function processRegister(){  
		
		// CHECK FOR RELOAD VALUE
		var reloadme = 0;
		if(jQuery('#reloadform').length > 0){			
			reloadme = 1;
		}
		
		var extra = "";
		if(jQuery('#extra').length > 0){			
			extra = jQuery('#extra').val();
		}
   	  
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_register_form",   			 
           },
           success: function(response) {
			   
			   pptModal("register", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500", 0);
		      
				if(reloadme == 1){
					jQuery('#form_user_register').append('<input type="hidden" name="reload" id="reloadform" value="1">');
				}
				
				if(extra !=""){					 
					 jQuery('#form_user_register').append('<input type="hidden" name="extra" id="extra" value="'+extra+'">');					  
				}
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}

function processLogin(reloadme, extra){
	
		// CHECK FOR RELOAD VALUE
		if(jQuery('#reloadform').length > 0){			
			reloadme = 1;
		}
	 
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_login_form",			   
           },
           success: function(response) { 
		   
		   	 	
				pptModal("login", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500", 0);
			   
				 // CHECK FOR REDIRECT				  
				 if (reloadme ==1){					 
					 jQuery('#form_user_login').append('<input type="hidden" name="reload" id="reloadform" value="1">');					  
				 }
				 
				 if (extra !=""){					 
					 jQuery('#form_user_login').append('<input type="hidden" name="extra" id="extra" value="'+extra+'">');					  
				 }
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}

function processStats(pid){
	 	
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,	
   		data: {
               action: "load_listingstats_form",	
			   pid:pid,
           },
           success: function(response) { 
		   		
				pptModal("stats"+pid, response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-700", 0);
				 
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}

function processBoost(){	 	
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,	
   		data: {
               action: "load_addon_boost",
           },
           success: function(response) { 
		   		
				pptModal("boost", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500", 0);
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
}

function processFeatured(pid){	 	
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,	
   		data: {
               action: "load_addon_featured",
			   pid:pid,
           },
           success: function(response) { 
		   		
				pptModal("featured"+pid, response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500 ppt-modal-shadow", 0);
				 
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
}


function processSponsored(pid){	 	
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,	
   		data: {
               action: "load_addon_sponsored",
			   pid:pid,
           },
           success: function(response) { 
		   		
				pptModal("sponsored"+pid, response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500 ppt-modal-shadow", 0);
				 
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
}
function processHomepage(pid){	 	
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,	
   		data: {
               action: "load_addon_homepage",
			   pid:pid,
           },
           success: function(response) { 
		   		
				pptModal("homepage", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500 ppt-modal-shadow", 0);
				 
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
}


function processListingUpgrade(pid){

	 	
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,	
   		data: {
               action: "load_listingupgrade_form",	
			   pid:pid,
           },
           success: function(response) { 
		   		
				pptModal("listingupgrade", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-700 ppt-modal-shadow", 0);
				 
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}

function processUpgrade(){
	
		// CHECK FOR RELOAD VALUE
		if(jQuery('#reloadform').length > 0){			
			reloadme = 1;
		}
	 
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_upgrade_form",			   
           },
           success: function(response) {
		   		
		   		pptModal("upgrade", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-700 ppt-modal-shadow", 1);
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}
function processLanguages(){

	 	
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,	
   		data: {
               action: "load_languages",
           },
           success: function(response) { 
		   		
				pptModal("languages", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500", 0);
				 
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}
function processPayment(data, amount){
		processNewPayment(data);
}
function processNewPayment(data){
	 
 		// CHECK IF ITS A DIV OR DIRECT PAYMENT CODE
		if(data.length < 50){
			data = jQuery(data).val();
		}
	
	     jQuery.ajax({
           type: "POST",
           url: ajax_site_url,		
   		data: {
               action: "load_new_payment_form",
   			details:data,
           },
           success: function(response) { 
		   
		   pptModal("payment", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500 ppt-modal-shadow", 1);
			
			UpdatePrices();
		    
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}

function processCredit(){
	
		// CHECK FOR RELOAD VALUE
		if(jQuery('#reloadform').length > 0){			
			reloadme = 1;
		}
	 
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_credit_form",			   
           },
           success: function(response) { 
		   
		   		pptModal("credit", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-700 ppt-modal-shadow", 1);
				
				UpdatePrices();
			    
   			
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}

function processMessageSingle(uid,pid){
	
	 
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_msg_form",	
			   uid: uid,
			   pid: pid,
           },
           success: function(response) { 
				
		   		pptModal("message", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500 ppt-modal-shadow", 1);
				
				jQuery('.userf').val(uid);
				jQuery('.userfieldmsg').hide();   			
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}

function processMessage(uid){
	 
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_msg_form",	
			   uid: uid,
           },
           success: function(response) {  
		   
		   		pptModal("message", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500  ppt-modal-shadow", 1);
				
				jQuery('.userf').val(uid);
				jQuery('.userfieldmsg').hide();   			
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}



function processFilterbox(fd, taxdata){
	 
	 
	 if(jQuery(".modal-"+fd).length > 0){
		 
		 jQuery(".modal-"+fd).fadeIn(400);
		 
	 }else{
	 
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_search_filter",	
			   fid: fd,
			   showtax: taxdata,
			   
           },
           success: function(response) { 
		    
		  	 pptModal("filter"+fd, response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500 ppt-modal-shadow", 0);
		   	  
				
				//newModal.find(".card-footer").on("click", function (e) {					 
				/	//jQuery('.filterboxWrap').toggleClass('_show');	
				//}); 
				 
				
           },
           error: function(e) {
               console.log(e)
           }
       });
	   
	 }
   
}
  


function processClearLogs(){
	 
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "notification_clear",			   
           },
           success: function(response) { 
				
           },
           error: function(e) {
               console.log(e)
           }
       }); 
}

function processQRCode(div, qrlink){
	 	
		 jQuery(div).html("<i class='fa fa-sync fa-spin'></i>");
		 
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "ajax_qrcode",	
			   link: qrlink,
           },
           success: function(response) { 
		   
		   jQuery(div).html("<img src='" + response.link + "' class='img-fluid' />");
				
           },
           error: function(e) {
               console.log(e)
           }
       }); 
	  
}

function processTerms(pid){ 
		  
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_terms",	
			   pid: pid,
           },
           success: function(response) { 
		   	
			pptModal("terms", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500 ppt-modal-shadow", 0);
		  		
           },
           error: function(e) {
               console.log(e)
           }
       }); 
	  
}

function processCashback(pid){ 
		  
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_cashback",	
			   pid: pid,
           },
           success: function(response) { 
		   	
			pptModal("cashback", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-700 ppt-modal-shadow", 0);
			
			processNewCashback(pid);
		  		
           },
           error: function(e) {
               console.log(e)
           }
       }); 
	  
}
function processNewCashback(pid){ 

jQuery.ajax({
						type: "POST",
						  url: ajax_site_url,	
						dataType: 'json',	
						data: {
							action: "add_cashback",
							pid: pid, 
						},
						success: function(response) {
				 
							if(response.status == "ok"){
							
									jQuery(".btn-cashback").removeClass('btn-primary').addClass('btn-success'); 
							
							}		
						},
						error: function(e) {
							console.log(e)
						}
				});
}
function processCommentPop(){
	 
	var am = jQuery(".comment-modal-wrap").html();	 
	jQuery(".comment-modal-wrap").remove();
	pptModal("comment", am, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-700 ppt-modal-shadow", 0);
		Commentrating();	

	
  
}

/* =============================================================================
	FUNCTION TO SCROLL 1PX AND TRIGGER THE LAZY LOAD
========================================================================== */	 

function tinyScroll() {
    window.scrollBy(0, 1);
}

function TogglePass(id){

	if(jQuery('#'+id).prop('type') == "text"){	
		jQuery('#'+id).prop('type', 'password');	
	}else{	
		jQuery('#'+id).prop('type', 'text');	
	}
}

/* =============================================================================
 FORM VALIDATION
  ========================================================================== */	 
function updateratingcolor(){
	
	if(jQuery(".has_active_rating").length > 0){ 
					var a = jQuery(".rating_newstyle .rating-symbol");
					a.each(function (a) {						 
						if(jQuery(this).hasClass('has_active_rating')){	
						jQuery(this).addClass('btn-primary');
						}else{						
					 
						}
					});
				}
}
/* =============================================================================
 FORM VALIDATION
  ========================================================================== */	 
function js_validate_fields(text){

	var canContinue = true;
 
	jQuery('.required-active').each(function(i, obj) {		
		jQuery(obj).removeClass('required-active');					  
	});	
	
 	jQuery('.required-field').each(function(i, obj) {		
				
		if(jQuery(obj).val() == ""){			
			jQuery(obj).addClass('required-active').focus();				
			canContinue = false;
		}		
	});
	
 	jQuery('.val-numeric').each(function(i, obj) {	
		 
		if(jQuery(obj).val() === "" ){				
			jQuery(obj).addClass('required-active').focus();				
			canContinue = false;
		}		
 
	});
	
 	jQuery('.val-notzero').each(function(i, obj) {	
		 
		if(jQuery(obj).val() === "0" ){				
			jQuery(obj).addClass('required-active').focus();				
			canContinue = false;
		}		
 
	});	
	if(canContinue){
		return true;
	} else {
		alert(text);
		return false;
	}
} 
 
 
  
  /* =============================================================================
ScrollToFixed
========================================================================== */ 
 
(function(a){a.isScrollToFixed=function(b){return !!a(b).data("ScrollToFixed")};a.ScrollToFixed=function(d,i){var l=this;l.$el=a(d);l.el=d;l.$el.data("ScrollToFixed",l);var c=false;var G=l.$el;var H;var E;var e;var y;var D=0;var q=0;var j=-1;var f=-1;var t=null;var z;var g;function u(){G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed");f=-1;D=G.offset().top;q=G.offset().left;if(l.options.offsets){q+=(G.offset().left-G.position().left)}if(j==-1){j=q}H=G.css("position");c=true;if(l.options.bottom!=-1){G.trigger("preFixed.ScrollToFixed");w();G.trigger("fixed.ScrollToFixed")}}function n(){var I=l.options.limit;if(!I){return 0}if(typeof(I)==="function"){return I.apply(G)}return I}function p(){return H==="fixed"}function x(){return H==="absolute"}function h(){return !(p()||x())}function w(){if(!p()){t.css({display:G.css("display"),width:G.outerWidth(true),height:G.outerHeight(true),"float":G.css("float")});cssOptions={"z-index":l.options.zIndex,position:"fixed",top:l.options.bottom==-1?s():"",bottom:l.options.bottom==-1?"":l.options.bottom,"margin-left":"0px"};if(!l.options.dontSetWidth){cssOptions.width=G.width()}G.css(cssOptions);G.addClass(l.options.baseClassName);if(l.options.className){G.addClass(l.options.className)}H="fixed"}}function b(){var J=n();var I=q;if(l.options.removeOffsets){I="";J=J-D}cssOptions={position:"absolute",top:J,left:I,"margin-left":"0px",bottom:""};if(!l.options.dontSetWidth){cssOptions.width=G.width()}G.css(cssOptions);H="absolute"}function k(){if(!h()){f=-1;t.css("display","none");G.css({"z-index":y,width:"",position:E,left:"",top:e,"margin-left":""});G.removeClass("scroll-to-fixed-fixed");if(l.options.className){G.removeClass(l.options.className)}H=null}}function v(I){if(I!=f){G.css("left",q-I);f=I}}function s(){var I=l.options.marginTop;if(!I){return 0}if(typeof(I)==="function"){return I.apply(G)}return I}function A(){if(!a.isScrollToFixed(G)){return}var K=c;if(!c){u()}else{if(h()){D=G.offset().top;q=G.offset().left}}var I=a(window).scrollLeft();var L=a(window).scrollTop();var J=n();if(l.options.minWidth&&a(window).width()<l.options.minWidth){if(!h()||!K){o();G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed")}}else{if(l.options.maxWidth&&a(window).width()>l.options.maxWidth){if(!h()||!K){o();G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed")}}else{if(l.options.bottom==-1){if(J>0&&L>=J-s()){if(!x()||!K){o();G.trigger("preAbsolute.ScrollToFixed");b();G.trigger("unfixed.ScrollToFixed")}}else{if(L>=D-s()){if(!p()||!K){o();G.trigger("preFixed.ScrollToFixed");w();f=-1;G.trigger("fixed.ScrollToFixed")}v(I)}else{if(!h()||!K){o();G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed")}}}}else{if(J>0){if(L+a(window).height()-G.outerHeight(true)>=J-(s()||-m())){if(p()){o();G.trigger("preUnfixed.ScrollToFixed");if(E==="absolute"){b()}else{k()}G.trigger("unfixed.ScrollToFixed")}}else{if(!p()){o();G.trigger("preFixed.ScrollToFixed");w()}v(I);G.trigger("fixed.ScrollToFixed")}}else{v(I)}}}}}function m(){if(!l.options.bottom){return 0}return l.options.bottom}function o(){var I=G.css("position");if(I=="absolute"){G.trigger("postAbsolute.ScrollToFixed")}else{if(I=="fixed"){G.trigger("postFixed.ScrollToFixed")}else{G.trigger("postUnfixed.ScrollToFixed")}}}var C=function(I){if(G.is(":visible")){c=false;A()}};var F=function(I){(!!window.requestAnimationFrame)?requestAnimationFrame(A):A()};var B=function(){var J=document.body;if(document.createElement&&J&&J.appendChild&&J.removeChild){var L=document.createElement("div");if(!L.getBoundingClientRect){return null}L.innerHTML="x";L.style.cssText="position:fixed;top:100px;";J.appendChild(L);var M=J.style.height,N=J.scrollTop;J.style.height="3000px";J.scrollTop=500;var I=L.getBoundingClientRect().top;J.style.height=M;var K=(I===100);J.removeChild(L);J.scrollTop=N;return K}return null};var r=function(I){I=I||window.event;if(I.preventDefault){I.preventDefault()}I.returnValue=false};l.init=function(){l.options=a.extend({},a.ScrollToFixed.defaultOptions,i);y=G.css("z-index");l.$el.css("z-index",l.options.zIndex);t=a("<div />");H=G.css("position");E=G.css("position");e=G.css("top");if(h()){l.$el.after(t)}a(window).bind("resize.ScrollToFixed",C);a(window).bind("scroll.ScrollToFixed",F);if("ontouchmove" in window){a(window).bind("touchmove.ScrollToFixed",A)}if(l.options.preFixed){G.bind("preFixed.ScrollToFixed",l.options.preFixed)}if(l.options.postFixed){G.bind("postFixed.ScrollToFixed",l.options.postFixed)}if(l.options.preUnfixed){G.bind("preUnfixed.ScrollToFixed",l.options.preUnfixed)}if(l.options.postUnfixed){G.bind("postUnfixed.ScrollToFixed",l.options.postUnfixed)}if(l.options.preAbsolute){G.bind("preAbsolute.ScrollToFixed",l.options.preAbsolute)}if(l.options.postAbsolute){G.bind("postAbsolute.ScrollToFixed",l.options.postAbsolute)}if(l.options.fixed){G.bind("fixed.ScrollToFixed",l.options.fixed)}if(l.options.unfixed){G.bind("unfixed.ScrollToFixed",l.options.unfixed)}if(l.options.spacerClass){t.addClass(l.options.spacerClass)}G.bind("resize.ScrollToFixed",function(){t.height(G.height())});G.bind("scroll.ScrollToFixed",function(){G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed");A()});G.bind("detach.ScrollToFixed",function(I){r(I);G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed");a(window).unbind("resize.ScrollToFixed",C);a(window).unbind("scroll.ScrollToFixed",F);G.unbind(".ScrollToFixed");t.remove();l.$el.removeData("ScrollToFixed")});C()};l.init()};a.ScrollToFixed.defaultOptions={marginTop:0,limit:0,bottom:-1,zIndex:1000,baseClassName:"scroll-to-fixed-fixed"};a.fn.scrollToFixed=function(b){return this.each(function(){(new a.ScrollToFixed(this,b))})}})(jQuery);
 
 /* =============================================================================
  EASING
   ========================================================================== */
 
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});




 /* =============================================================================
  SCROLL
   ========================================================================== */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.PerfectScrollbar=e()}(this,function(){"use strict";function t(t){return getComputedStyle(t)}function e(t,e){for(var i in e){var r=e[i];"number"==typeof r&&(r+="px"),t.style[i]=r}return t}function i(t){var e=document.createElement("div");return e.className=t,e}function r(t,e){if(!v)throw new Error("No element matching method supported");return v.call(t,e)}function l(t){t.remove?t.remove():t.parentNode&&t.parentNode.removeChild(t)}function n(t,e){return Array.prototype.filter.call(t.children,function(t){return r(t,e)})}function o(t,e){var i=t.element.classList,r=m.state.scrolling(e);i.contains(r)?clearTimeout(Y[e]):i.add(r)}function s(t,e){Y[e]=setTimeout(function(){return t.isAlive&&t.element.classList.remove(m.state.scrolling(e))},t.settings.scrollingThreshold)}function a(t,e){o(t,e),s(t,e)}function c(t){if("function"==typeof window.CustomEvent)return new CustomEvent(t);var e=document.createEvent("CustomEvent");return e.initCustomEvent(t,!1,!1,void 0),e}function h(t,e,i,r,l){var n=i[0],o=i[1],s=i[2],h=i[3],u=i[4],d=i[5];void 0===r&&(r=!0),void 0===l&&(l=!1);var f=t.element;t.reach[h]=null,f[s]<1&&(t.reach[h]="start"),f[s]>t[n]-t[o]-1&&(t.reach[h]="end"),e&&(f.dispatchEvent(c("ps-scroll-"+h)),e<0?f.dispatchEvent(c("ps-scroll-"+u)):e>0&&f.dispatchEvent(c("ps-scroll-"+d)),r&&a(t,h)),t.reach[h]&&(e||l)&&f.dispatchEvent(c("ps-"+h+"-reach-"+t.reach[h]))}function u(t){return parseInt(t,10)||0}function d(t){return r(t,"input,[contenteditable]")||r(t,"select,[contenteditable]")||r(t,"textarea,[contenteditable]")||r(t,"button,[contenteditable]")}function f(e){var i=t(e);return u(i.width)+u(i.paddingLeft)+u(i.paddingRight)+u(i.borderLeftWidth)+u(i.borderRightWidth)}function p(t,e){return t.settings.minScrollbarLength&&(e=Math.max(e,t.settings.minScrollbarLength)),t.settings.maxScrollbarLength&&(e=Math.min(e,t.settings.maxScrollbarLength)),e}function b(t,i){var r={width:i.railXWidth},l=Math.floor(t.scrollTop);i.isRtl?r.left=i.negativeScrollAdjustment+t.scrollLeft+i.containerWidth-i.contentWidth:r.left=t.scrollLeft,i.isScrollbarXUsingBottom?r.bottom=i.scrollbarXBottom-l:r.top=i.scrollbarXTop+l,e(i.scrollbarXRail,r);var n={top:l,height:i.railYHeight};i.isScrollbarYUsingRight?i.isRtl?n.right=i.contentWidth-(i.negativeScrollAdjustment+t.scrollLeft)-i.scrollbarYRight-i.scrollbarYOuterWidth:n.right=i.scrollbarYRight-t.scrollLeft:i.isRtl?n.left=i.negativeScrollAdjustment+t.scrollLeft+2*i.containerWidth-i.contentWidth-i.scrollbarYLeft-i.scrollbarYOuterWidth:n.left=i.scrollbarYLeft+t.scrollLeft,e(i.scrollbarYRail,n),e(i.scrollbarX,{left:i.scrollbarXLeft,width:i.scrollbarXWidth-i.railBorderXWidth}),e(i.scrollbarY,{top:i.scrollbarYTop,height:i.scrollbarYHeight-i.railBorderYWidth})}function g(t,e){function i(e){b[d]=g+Y*(e[a]-v),o(t,f),R(t),e.stopPropagation(),e.preventDefault()}function r(){s(t,f),t[p].classList.remove(m.state.clicking),t.event.unbind(t.ownerDocument,"mousemove",i)}var l=e[0],n=e[1],a=e[2],c=e[3],h=e[4],u=e[5],d=e[6],f=e[7],p=e[8],b=t.element,g=null,v=null,Y=null;t.event.bind(t[h],"mousedown",function(e){g=b[d],v=e[a],Y=(t[n]-t[l])/(t[c]-t[u]),t.event.bind(t.ownerDocument,"mousemove",i),t.event.once(t.ownerDocument,"mouseup",r),t[p].classList.add(m.state.clicking),e.stopPropagation(),e.preventDefault()})}var v="undefined"!=typeof Element&&(Element.prototype.matches||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector),m={main:"ps",element:{thumb:function(t){return"ps__thumb-"+t},rail:function(t){return"ps__rail-"+t},consuming:"ps__child--consume"},state:{focus:"ps--focus",clicking:"ps--clicking",active:function(t){return"ps--active-"+t},scrolling:function(t){return"ps--scrolling-"+t}}},Y={x:null,y:null},X=function(t){this.element=t,this.handlers={}},w={isEmpty:{configurable:!0}};X.prototype.bind=function(t,e){void 0===this.handlers[t]&&(this.handlers[t]=[]),this.handlers[t].push(e),this.element.addEventListener(t,e,!1)},X.prototype.unbind=function(t,e){var i=this;this.handlers[t]=this.handlers[t].filter(function(r){return!(!e||r===e)||(i.element.removeEventListener(t,r,!1),!1)})},X.prototype.unbindAll=function(){var t=this;for(var e in t.handlers)t.unbind(e)},w.isEmpty.get=function(){var t=this;return Object.keys(this.handlers).every(function(e){return 0===t.handlers[e].length})},Object.defineProperties(X.prototype,w);var y=function(){this.eventElements=[]};y.prototype.eventElement=function(t){var e=this.eventElements.filter(function(e){return e.element===t})[0];return e||(e=new X(t),this.eventElements.push(e)),e},y.prototype.bind=function(t,e,i){this.eventElement(t).bind(e,i)},y.prototype.unbind=function(t,e,i){var r=this.eventElement(t);r.unbind(e,i),r.isEmpty&&this.eventElements.splice(this.eventElements.indexOf(r),1)},y.prototype.unbindAll=function(){this.eventElements.forEach(function(t){return t.unbindAll()}),this.eventElements=[]},y.prototype.once=function(t,e,i){var r=this.eventElement(t),l=function(t){r.unbind(e,l),i(t)};r.bind(e,l)};var W=function(t,e,i,r,l){void 0===r&&(r=!0),void 0===l&&(l=!1);var n;if("top"===e)n=["contentHeight","containerHeight","scrollTop","y","up","down"];else{if("left"!==e)throw new Error("A proper axis should be provided");n=["contentWidth","containerWidth","scrollLeft","x","left","right"]}h(t,i,n,r,l)},L={isWebKit:"undefined"!=typeof document&&"WebkitAppearance"in document.documentElement.style,supportsTouch:"undefined"!=typeof window&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),supportsIePointer:"undefined"!=typeof navigator&&navigator.msMaxTouchPoints,isChrome:"undefined"!=typeof navigator&&/Chrome/i.test(navigator&&navigator.userAgent)},R=function(t){var e=t.element,i=Math.floor(e.scrollTop);t.containerWidth=e.clientWidth,t.containerHeight=e.clientHeight,t.contentWidth=e.scrollWidth,t.contentHeight=e.scrollHeight,e.contains(t.scrollbarXRail)||(n(e,m.element.rail("x")).forEach(function(t){return l(t)}),e.appendChild(t.scrollbarXRail)),e.contains(t.scrollbarYRail)||(n(e,m.element.rail("y")).forEach(function(t){return l(t)}),e.appendChild(t.scrollbarYRail)),!t.settings.suppressScrollX&&t.containerWidth+t.settings.scrollXMarginOffset<t.contentWidth?(t.scrollbarXActive=!0,t.railXWidth=t.containerWidth-t.railXMarginWidth,t.railXRatio=t.containerWidth/t.railXWidth,t.scrollbarXWidth=p(t,u(t.railXWidth*t.containerWidth/t.contentWidth)),t.scrollbarXLeft=u((t.negativeScrollAdjustment+e.scrollLeft)*(t.railXWidth-t.scrollbarXWidth)/(t.contentWidth-t.containerWidth))):t.scrollbarXActive=!1,!t.settings.suppressScrollY&&t.containerHeight+t.settings.scrollYMarginOffset<t.contentHeight?(t.scrollbarYActive=!0,t.railYHeight=t.containerHeight-t.railYMarginHeight,t.railYRatio=t.containerHeight/t.railYHeight,t.scrollbarYHeight=p(t,u(t.railYHeight*t.containerHeight/t.contentHeight)),t.scrollbarYTop=u(i*(t.railYHeight-t.scrollbarYHeight)/(t.contentHeight-t.containerHeight))):t.scrollbarYActive=!1,t.scrollbarXLeft>=t.railXWidth-t.scrollbarXWidth&&(t.scrollbarXLeft=t.railXWidth-t.scrollbarXWidth),t.scrollbarYTop>=t.railYHeight-t.scrollbarYHeight&&(t.scrollbarYTop=t.railYHeight-t.scrollbarYHeight),b(e,t),t.scrollbarXActive?e.classList.add(m.state.active("x")):(e.classList.remove(m.state.active("x")),t.scrollbarXWidth=0,t.scrollbarXLeft=0,e.scrollLeft=0),t.scrollbarYActive?e.classList.add(m.state.active("y")):(e.classList.remove(m.state.active("y")),t.scrollbarYHeight=0,t.scrollbarYTop=0,e.scrollTop=0)},T={"click-rail":function(t){t.event.bind(t.scrollbarY,"mousedown",function(t){return t.stopPropagation()}),t.event.bind(t.scrollbarYRail,"mousedown",function(e){var i=e.pageY-window.pageYOffset-t.scrollbarYRail.getBoundingClientRect().top>t.scrollbarYTop?1:-1;t.element.scrollTop+=i*t.containerHeight,R(t),e.stopPropagation()}),t.event.bind(t.scrollbarX,"mousedown",function(t){return t.stopPropagation()}),t.event.bind(t.scrollbarXRail,"mousedown",function(e){var i=e.pageX-window.pageXOffset-t.scrollbarXRail.getBoundingClientRect().left>t.scrollbarXLeft?1:-1;t.element.scrollLeft+=i*t.containerWidth,R(t),e.stopPropagation()})},"drag-thumb":function(t){g(t,["containerWidth","contentWidth","pageX","railXWidth","scrollbarX","scrollbarXWidth","scrollLeft","x","scrollbarXRail"]),g(t,["containerHeight","contentHeight","pageY","railYHeight","scrollbarY","scrollbarYHeight","scrollTop","y","scrollbarYRail"])},keyboard:function(t){function e(e,r){var l=Math.floor(i.scrollTop);if(0===e){if(!t.scrollbarYActive)return!1;if(0===l&&r>0||l>=t.contentHeight-t.containerHeight&&r<0)return!t.settings.wheelPropagation}var n=i.scrollLeft;if(0===r){if(!t.scrollbarXActive)return!1;if(0===n&&e<0||n>=t.contentWidth-t.containerWidth&&e>0)return!t.settings.wheelPropagation}return!0}var i=t.element,l=function(){return r(i,":hover")},n=function(){return r(t.scrollbarX,":focus")||r(t.scrollbarY,":focus")};t.event.bind(t.ownerDocument,"keydown",function(r){if(!(r.isDefaultPrevented&&r.isDefaultPrevented()||r.defaultPrevented)&&(l()||n())){var o=document.activeElement?document.activeElement:t.ownerDocument.activeElement;if(o){if("IFRAME"===o.tagName)o=o.contentDocument.activeElement;else for(;o.shadowRoot;)o=o.shadowRoot.activeElement;if(d(o))return}var s=0,a=0;switch(r.which){case 37:s=r.metaKey?-t.contentWidth:r.altKey?-t.containerWidth:-30;break;case 38:a=r.metaKey?t.contentHeight:r.altKey?t.containerHeight:30;break;case 39:s=r.metaKey?t.contentWidth:r.altKey?t.containerWidth:30;break;case 40:a=r.metaKey?-t.contentHeight:r.altKey?-t.containerHeight:-30;break;case 32:a=r.shiftKey?t.containerHeight:-t.containerHeight;break;case 33:a=t.containerHeight;break;case 34:a=-t.containerHeight;break;case 36:a=t.contentHeight;break;case 35:a=-t.contentHeight;break;default:return}t.settings.suppressScrollX&&0!==s||t.settings.suppressScrollY&&0!==a||(i.scrollTop-=a,i.scrollLeft+=s,R(t),e(s,a)&&r.preventDefault())}})},wheel:function(e){function i(t,i){var r=Math.floor(o.scrollTop),l=0===o.scrollTop,n=r+o.offsetHeight===o.scrollHeight,s=0===o.scrollLeft,a=o.scrollLeft+o.offsetWidth===o.scrollWidth;return!(Math.abs(i)>Math.abs(t)?l||n:s||a)||!e.settings.wheelPropagation}function r(t){var e=t.deltaX,i=-1*t.deltaY;return void 0!==e&&void 0!==i||(e=-1*t.wheelDeltaX/6,i=t.wheelDeltaY/6),t.deltaMode&&1===t.deltaMode&&(e*=10,i*=10),e!==e&&i!==i&&(e=0,i=t.wheelDelta),t.shiftKey?[-i,-e]:[e,i]}function l(e,i,r){if(!L.isWebKit&&o.querySelector("select:focus"))return!0;if(!o.contains(e))return!1;for(var l=e;l&&l!==o;){if(l.classList.contains(m.element.consuming))return!0;var n=t(l);if([n.overflow,n.overflowX,n.overflowY].join("").match(/(scroll|auto)/)){var s=l.scrollHeight-l.clientHeight;if(s>0&&!(0===l.scrollTop&&r>0||l.scrollTop===s&&r<0))return!0;var a=l.scrollWidth-l.clientWidth;if(a>0&&!(0===l.scrollLeft&&i<0||l.scrollLeft===a&&i>0))return!0}l=l.parentNode}return!1}function n(t){var n=r(t),s=n[0],a=n[1];if(!l(t.target,s,a)){var c=!1;e.settings.useBothWheelAxes?e.scrollbarYActive&&!e.scrollbarXActive?(a?o.scrollTop-=a*e.settings.wheelSpeed:o.scrollTop+=s*e.settings.wheelSpeed,c=!0):e.scrollbarXActive&&!e.scrollbarYActive&&(s?o.scrollLeft+=s*e.settings.wheelSpeed:o.scrollLeft-=a*e.settings.wheelSpeed,c=!0):(o.scrollTop-=a*e.settings.wheelSpeed,o.scrollLeft+=s*e.settings.wheelSpeed),R(e),(c=c||i(s,a))&&!t.ctrlKey&&(t.stopPropagation(),t.preventDefault())}}var o=e.element;void 0!==window.onwheel?e.event.bind(o,"wheel",n):void 0!==window.onmousewheel&&e.event.bind(o,"mousewheel",n)},touch:function(e){function i(t,i){var r=Math.floor(h.scrollTop),l=h.scrollLeft,n=Math.abs(t),o=Math.abs(i);if(o>n){if(i<0&&r===e.contentHeight-e.containerHeight||i>0&&0===r)return 0===window.scrollY&&i>0&&L.isChrome}else if(n>o&&(t<0&&l===e.contentWidth-e.containerWidth||t>0&&0===l))return!0;return!0}function r(t,i){h.scrollTop-=i,h.scrollLeft-=t,R(e)}function l(t){return t.targetTouches?t.targetTouches[0]:t}function n(t){return!(t.pointerType&&"pen"===t.pointerType&&0===t.buttons||(!t.targetTouches||1!==t.targetTouches.length)&&(!t.pointerType||"mouse"===t.pointerType||t.pointerType===t.MSPOINTER_TYPE_MOUSE))}function o(t){if(n(t)){var e=l(t);u.pageX=e.pageX,u.pageY=e.pageY,d=(new Date).getTime(),null!==p&&clearInterval(p)}}function s(e,i,r){if(!h.contains(e))return!1;for(var l=e;l&&l!==h;){if(l.classList.contains(m.element.consuming))return!0;var n=t(l);if([n.overflow,n.overflowX,n.overflowY].join("").match(/(scroll|auto)/)){var o=l.scrollHeight-l.clientHeight;if(o>0&&!(0===l.scrollTop&&r>0||l.scrollTop===o&&r<0))return!0;var s=l.scrollLeft-l.clientWidth;if(s>0&&!(0===l.scrollLeft&&i<0||l.scrollLeft===s&&i>0))return!0}l=l.parentNode}return!1}function a(t){if(n(t)){var e=l(t),o={pageX:e.pageX,pageY:e.pageY},a=o.pageX-u.pageX,c=o.pageY-u.pageY;if(s(t.target,a,c))return;r(a,c),u=o;var h=(new Date).getTime(),p=h-d;p>0&&(f.x=a/p,f.y=c/p,d=h),i(a,c)&&t.preventDefault()}}function c(){e.settings.swipeEasing&&(clearInterval(p),p=setInterval(function(){e.isInitialized?clearInterval(p):f.x||f.y?Math.abs(f.x)<.01&&Math.abs(f.y)<.01?clearInterval(p):(r(30*f.x,30*f.y),f.x*=.8,f.y*=.8):clearInterval(p)},10))}if(L.supportsTouch||L.supportsIePointer){var h=e.element,u={},d=0,f={},p=null;L.supportsTouch?(e.event.bind(h,"touchstart",o),e.event.bind(h,"touchmove",a),e.event.bind(h,"touchend",c)):L.supportsIePointer&&(window.PointerEvent?(e.event.bind(h,"pointerdown",o),e.event.bind(h,"pointermove",a),e.event.bind(h,"pointerup",c)):window.MSPointerEvent&&(e.event.bind(h,"MSPointerDown",o),e.event.bind(h,"MSPointerMove",a),e.event.bind(h,"MSPointerUp",c)))}}},H=function(r,l){var n=this;if(void 0===l&&(l={}),"string"==typeof r&&(r=document.querySelector(r)),!r||!r.nodeName)throw new Error("no element is specified to initialize PerfectScrollbar");this.element=r,r.classList.add(m.main),this.settings={handlers:["click-rail","drag-thumb","keyboard","wheel","touch"],maxScrollbarLength:null,minScrollbarLength:null,scrollingThreshold:1e3,scrollXMarginOffset:0,scrollYMarginOffset:0,suppressScrollX:!1,suppressScrollY:!1,swipeEasing:!0,useBothWheelAxes:!1,wheelPropagation:!0,wheelSpeed:1};for(var o in l)n.settings[o]=l[o];this.containerWidth=null,this.containerHeight=null,this.contentWidth=null,this.contentHeight=null;var s=function(){return r.classList.add(m.state.focus)},a=function(){return r.classList.remove(m.state.focus)};this.isRtl="rtl"===t(r).direction,this.isNegativeScroll=function(){var t=r.scrollLeft,e=null;return r.scrollLeft=-1,e=r.scrollLeft<0,r.scrollLeft=t,e}(),this.negativeScrollAdjustment=this.isNegativeScroll?r.scrollWidth-r.clientWidth:0,this.event=new y,this.ownerDocument=r.ownerDocument||document,this.scrollbarXRail=i(m.element.rail("x")),r.appendChild(this.scrollbarXRail),this.scrollbarX=i(m.element.thumb("x")),this.scrollbarXRail.appendChild(this.scrollbarX),this.scrollbarX.setAttribute("tabindex",0),this.event.bind(this.scrollbarX,"focus",s),this.event.bind(this.scrollbarX,"blur",a),this.scrollbarXActive=null,this.scrollbarXWidth=null,this.scrollbarXLeft=null;var c=t(this.scrollbarXRail);this.scrollbarXBottom=parseInt(c.bottom,10),isNaN(this.scrollbarXBottom)?(this.isScrollbarXUsingBottom=!1,this.scrollbarXTop=u(c.top)):this.isScrollbarXUsingBottom=!0,this.railBorderXWidth=u(c.borderLeftWidth)+u(c.borderRightWidth),e(this.scrollbarXRail,{display:"block"}),this.railXMarginWidth=u(c.marginLeft)+u(c.marginRight),e(this.scrollbarXRail,{display:""}),this.railXWidth=null,this.railXRatio=null,this.scrollbarYRail=i(m.element.rail("y")),r.appendChild(this.scrollbarYRail),this.scrollbarY=i(m.element.thumb("y")),this.scrollbarYRail.appendChild(this.scrollbarY),this.scrollbarY.setAttribute("tabindex",0),this.event.bind(this.scrollbarY,"focus",s),this.event.bind(this.scrollbarY,"blur",a),this.scrollbarYActive=null,this.scrollbarYHeight=null,this.scrollbarYTop=null;var h=t(this.scrollbarYRail);this.scrollbarYRight=parseInt(h.right,10),isNaN(this.scrollbarYRight)?(this.isScrollbarYUsingRight=!1,this.scrollbarYLeft=u(h.left)):this.isScrollbarYUsingRight=!0,this.scrollbarYOuterWidth=this.isRtl?f(this.scrollbarY):null,this.railBorderYWidth=u(h.borderTopWidth)+u(h.borderBottomWidth),e(this.scrollbarYRail,{display:"block"}),this.railYMarginHeight=u(h.marginTop)+u(h.marginBottom),e(this.scrollbarYRail,{display:""}),this.railYHeight=null,this.railYRatio=null,this.reach={x:r.scrollLeft<=0?"start":r.scrollLeft>=this.contentWidth-this.containerWidth?"end":null,y:r.scrollTop<=0?"start":r.scrollTop>=this.contentHeight-this.containerHeight?"end":null},this.isAlive=!0,this.settings.handlers.forEach(function(t){return T[t](n)}),this.lastScrollTop=Math.floor(r.scrollTop),this.lastScrollLeft=r.scrollLeft,this.event.bind(this.element,"scroll",function(t){return n.onScroll(t)}),R(this)};return H.prototype.update=function(){this.isAlive&&(this.negativeScrollAdjustment=this.isNegativeScroll?this.element.scrollWidth-this.element.clientWidth:0,e(this.scrollbarXRail,{display:"block"}),e(this.scrollbarYRail,{display:"block"}),this.railXMarginWidth=u(t(this.scrollbarXRail).marginLeft)+u(t(this.scrollbarXRail).marginRight),this.railYMarginHeight=u(t(this.scrollbarYRail).marginTop)+u(t(this.scrollbarYRail).marginBottom),e(this.scrollbarXRail,{display:"none"}),e(this.scrollbarYRail,{display:"none"}),R(this),W(this,"top",0,!1,!0),W(this,"left",0,!1,!0),e(this.scrollbarXRail,{display:""}),e(this.scrollbarYRail,{display:""}))},H.prototype.onScroll=function(t){this.isAlive&&(R(this),W(this,"top",this.element.scrollTop-this.lastScrollTop),W(this,"left",this.element.scrollLeft-this.lastScrollLeft),this.lastScrollTop=Math.floor(this.element.scrollTop),this.lastScrollLeft=this.element.scrollLeft)},H.prototype.destroy=function(){this.isAlive&&(this.event.unbindAll(),l(this.scrollbarX),l(this.scrollbarY),l(this.scrollbarXRail),l(this.scrollbarYRail),this.removePsClasses(),this.element=null,this.scrollbarX=null,this.scrollbarY=null,this.scrollbarXRail=null,this.scrollbarYRail=null,this.isAlive=!1)},H.prototype.removePsClasses=function(){this.element.className=this.element.className.split(" ").filter(function(t){return!t.match(/^ps([-_].+|)$/)}).join(" ")},H});

 /* =============================================================================
  CURRENCY
   ========================================================================== */

(function($){$.formatCurrency={};$.formatCurrency.regions=[];$.formatCurrency.regions[""]={symbol:"$",positiveFormat:"%s%n",negativeFormat:"(%s%n)",decimalSymbol:".",digitGroupSymbol:",",groupDigits:true};
$.fn.formatCurrency=function(destination,settings){if(arguments.length==1&&typeof destination!=="string"){settings=destination;destination=false
}var defaults={name:"formatCurrency",colorize:false,region:"",global:true,roundToDecimalPlace:2,eventOnDecimalsEntered:false};defaults=$.extend(defaults,$.formatCurrency.regions[""]);
settings=$.extend(defaults,settings);if(settings.region.length>0){settings=$.extend(settings,getRegionOrCulture(settings.region))}settings.regex=generateRegex(settings);
return this.each(function(){$this=$(this);var num="0";num=$this[$this.is("input, select, textarea")?"val":"html"]();if(num.search("\\(")>=0){num="-"+num
}if(num===""||(num==="-"&&settings.roundToDecimalPlace===-1)){return}if(isNaN(num)){num=num.replace(settings.regex,"");if(num===""||(num==="-"&&settings.roundToDecimalPlace===-1)){return
}if(settings.decimalSymbol!="."){num=num.replace(settings.decimalSymbol,".")}if(isNaN(num)){num="0"}}var numParts=String(num).split(".");var isPositive=(num==Math.abs(num));
var hasDecimals=(numParts.length>1);var decimals=(hasDecimals?numParts[1].toString():"0");var originalDecimals=decimals;num=Math.abs(numParts[0]);
num=isNaN(num)?0:num;if(settings.roundToDecimalPlace>=0){decimals=parseFloat("1."+decimals);decimals=decimals.toFixed(settings.roundToDecimalPlace);
if(decimals.substring(0,1)=="2"){num=Number(num)+1}decimals=decimals.substring(2)}num=String(num);if(settings.groupDigits){for(var i=0;i<Math.floor((num.length-(1+i))/3);
i++){num=num.substring(0,num.length-(4*i+3))+settings.digitGroupSymbol+num.substring(num.length-(4*i+3))}}if((hasDecimals&&settings.roundToDecimalPlace==-1)||settings.roundToDecimalPlace>0){num+=settings.decimalSymbol+decimals
}var format=isPositive?settings.positiveFormat:settings.negativeFormat;var money=format.replace(/%s/g,settings.symbol);money=money.replace(/%n/g,num);
var $destination=$([]);if(!destination){$destination=$this}else{$destination=$(destination)}$destination[$destination.is("input, select, textarea")?"val":"html"](money);
if(hasDecimals&&settings.eventOnDecimalsEntered&&originalDecimals.length>settings.roundToDecimalPlace){$destination.trigger("decimalsEntered",originalDecimals)
}if(settings.colorize){$destination.css("color",isPositive?"black":"text-danger")}})};$.fn.toNumber=function(settings){var defaults=$.extend({name:"toNumber",region:"",global:true},$.formatCurrency.regions[""]);
settings=jQuery.extend(defaults,settings);if(settings.region.length>0){settings=$.extend(settings,getRegionOrCulture(settings.region))}settings.regex=generateRegex(settings);
return this.each(function(){var method=$(this).is("input, select, textarea")?"val":"html";$(this)[method]($(this)[method]().replace("(","(-").replace(settings.regex,""))
})};$.fn.asNumber=function(settings){var defaults=$.extend({name:"asNumber",region:"",parse:true,parseType:"Float",global:true},$.formatCurrency.regions[""]);
settings=jQuery.extend(defaults,settings);if(settings.region.length>0){settings=$.extend(settings,getRegionOrCulture(settings.region))}settings.regex=generateRegex(settings);
settings.parseType=validateParseType(settings.parseType);var method=$(this).is("input, select, textarea")?"val":"html";var num=$(this)[method]();
num=num?num:"";num=num.replace("(","(-");num=num.replace(settings.regex,"");if(!settings.parse){return num}if(num.length==0){num="0"}if(settings.decimalSymbol!="."){num=num.replace(settings.decimalSymbol,".")
}return window["parse"+settings.parseType](num)};function getRegionOrCulture(region){var regionInfo=$.formatCurrency.regions[region];if(regionInfo){return regionInfo
}else{if(/(\w+)-(\w+)/g.test(region)){var culture=region.replace(/(\w+)-(\w+)/g,"$1");return $.formatCurrency.regions[culture]}}return null}function validateParseType(parseType){switch(parseType.toLowerCase()){case"int":return"Int";
case"float":return"Float";default:throw"invalid parseType"}}function generateRegex(settings){if(settings.symbol===""){return new RegExp("[^\\d"+settings.decimalSymbol+"-]","g")
}else{var symbol=settings.symbol.replace("$","\\$").replace(".","\\.");return new RegExp(symbol+"|[^\\d"+settings.decimalSymbol+"-]","g")}}})(jQuery); 
 
function UpdatePrices(){	
 

	// GET SYMBOLS
	var pptdecimalSymbol 	= ".";
	var pptdigitGroupSymbol = ",";
	var pptSymbol 			= "$";
	var pptPosition 		= "left";
	var pptroundToDecimalPlace = 2;
	
	if(jQuery("#ppt-current-tho").length > 0 && jQuery("#ppt-current-tho").val() != ""){
		var pptdigitGroupSymbol = jQuery("#ppt-current-tho").val();
	}
			
	if(jQuery("#ppt-current-dec").length > 0 && jQuery("#ppt-current-dec").val() != ""){
		var pptdecimalSymbol = jQuery("#ppt-current-dec").val();
	}
	
	if(jQuery("#ppt-current-symbol").length > 0 && jQuery("#ppt-current-symbol").val() != ""){
		var pptSymbol = jQuery("#ppt-current-symbol").val();
	} 
	
	if(jQuery("#ppt-current-position").length > 0 && jQuery("#ppt-current-position").val() != ""){
		var pptPosition = jQuery("#ppt-current-position").val();
	}  
	
	// FORMAT
	if(pptPosition == "right"){	
	
	 	jQuery(".ppt-price:not(.free)").formatCurrency( { symbol: "", roundToDecimalPlace: pptroundToDecimalPlace, decimalSymbol: pptdecimalSymbol, digitGroupSymbol: pptdigitGroupSymbol, groupDigits: true } ).addClass("ppt-price-set");	 //, groupDigits: false 
		
		jQuery('.ppt-price:not(.free)').each(function(i, obj) {				
				amount = jQuery(this).html();
				jQuery(this).attr("data-price-amount", amount);
				jQuery(this).html(  "<span class='ppt-price free'>"+amount+"</span>" + pptSymbol ).removeClass("ppt-price"); 
		});	
	
	
	}else{		
		
		if(pptSymbol.includes("fa")){
			
			jQuery('.ppt-price:not(.free)').each(function(i, obj) {				
				amount = jQuery(this).html();
				jQuery(this).attr("data-price-amount", amount);
				jQuery(this).html( pptSymbol + "<span class='ppt-price free'>"+amount+"</span>" ).removeClass("ppt-price"); 
			});	
			
		}else{
		 
			jQuery(".ppt-price:not(.free)").formatCurrency( { symbol: pptSymbol, roundToDecimalPlace: pptroundToDecimalPlace, decimalSymbol: pptdecimalSymbol, digitGroupSymbol: pptdigitGroupSymbol } ).addClass("ppt-price-set");
			
		}	
	}
	
	 //03. CHOP OFF EXTRS	
	if(pptdecimalSymbol == "." || pptdecimalSymbol == " "){
		jQuery('.ppt-price').each(function(i, obj) {	
			var val = jQuery(this).html();
			var res = val.substring(val.length - 3, val.length);
			if(res == ".00" || res == " 00"){
				var newt = val.slice(0, -3);
				jQuery(this).html(newt);	
			}
		});
	} 
	 
}

/* =============================================================================
   LOAD CSS
   ========================================================================== */ 
function loadJS(url, id, callback) {
    
	 
	if(jQuery("#"+id).length == 0){
		
		console.log("ppt - loaded script - " +id);
		
		var el = jQuery("<script/>",{type:'text/javascript', src: url}).appendTo('head').attr('id', id);		
		if(typeof(callback) == "function") {
			
			setTimeout( function(){ 
			
				el.onload = callback(el);
			
			} ,2000);  
       		
    	}
		
	}else{
		
		console.log("ppt - already loaded script - " +id);
		
		callback();
	}	 

}
/* =============================================================================
   FAVS SWITCH
   ========================================================================== */ 
function processFavsSwitch(id){

	console.log("ppt - favs -"+id);
	
	card = jQuery("[data-pid='"+id+"']");
 	
	if(card.hasClass("isFavs")){ 
		card.removeClass("isFavs");
		card.find("._cancel").hide();
		card.find("._ok").show();	
	}else{ 
		card.addClass("isFavs");
		card.find("._cancel").show();
		card.find("._ok").hide();	} 
	 
	jQuery.ajax({
		type: "POST",
		url: ajax_site_url,	
		dataType: 'json',	
		data: {
			'action': "favs",
			'pid': id,				 
		},
		success: function(response) { } 
	}); 

}


/* =============================================================================
   FORMS
   ========================================================================== */ 

function processContactForm(id){
	 
       jQuery.ajax({
        type: "POST",
        url: ajax_site_url,		
   		data: {
               action: "load_contactform",	
			   pid: id,
           },
           success: function(response) {  
		   
		   		pptModal("message", response, "modal-bottom-rightxxx", "ppt-animate-bouncein bg-white w-500  ppt-modal-shadow", 0);
				
				jQuery('.userf').val(id);
				jQuery('.userfieldmsg').hide();   			
           },
           error: function(e) {
               console.log(e)
           }
       });
   
}

function formsContactUser(){

	var canContinue = 1;
	var formdata = {};
	
	jQuery('.contact-required').each(function(){
	
		jQuery(this).removeClass("required-active");
		
		if(jQuery(this).val() == ""){
			jQuery(this).addClass("required-active");
			canContinue = 0;
		}	
			
		formdata[jQuery(this).attr('data-name')] = jQuery(this).val();
	});
	
	email = jQuery("[data-name='email']");
	if(!isValidEmail(email.val())){			
		jQuery(email).addClass('required-active');
		canContinue = 0;	
	}
 
	
	if(!canContinue){	
	alert(jQuery("[data-error]").val());
	return false;
	} 
 
	if(!jQuery("#privacypolicy").is(':checked')){
	alert(jQuery("[data-error-privacy]").val());
	return false;
	}
	
	
	if(jQuery("[data-form-recaptcha]").length > 0 ){
		if(jQuery("#g-recaptcha-response").length == 0 || jQuery("#g-recaptcha-response").val().length == 0){
			alert(jQuery("[data-error-recaptcha]").val());
			return false;
		}
		 
		formdata['g-recaptcha-response'] = jQuery("#g-recaptcha-response").val();
	}
	
	pid = jQuery("[data-form-pid]");
	formdata['pid'] = jQuery(pid).val();
	 
	jQuery("[data-btn-submit]").prop('disabled', true);	

    jQuery.ajax({
        type: "POST",
        url: ajax_site_url,	
		dataType: 'json',	
		enctype: 'multipart/form-data',
   		data: {
               action: "single_contactform", 
			   data: formdata,		 
           },
           success: function(response) { 
			  
			  if(response.status == "ok"){ 
			  
			  jQuery(".data-form-fields").html('');
			  jQuery(".data-form-ok").show(); 
			  
			  }else{
			
				alert(response.msg);
				jQuery("[data-btn-submit]").prop('disabled', false);
				
			  }
			   
		   }	
	
	});

}

/* =============================================================================
   Notify
   ========================================================================== */ 
   
function pptNoticeShow(noticeID){

	jQuery(noticeID).addClass('ppt-note-animate').addClass('ppt-notice-open');
	jQuery(noticeID+" .card-notice").addClass("_visible");  
}

function pptNoticeClose(){

	notice = jQuery(".ppt-card-notice");	
	setTimeout(function () {
		notice.removeClass('ppt-note-animate');
		jQuery(".card-notice").removeClass("_visible").addClass("_reverse");	
		setTimeout(function () {
			notice.removeClass('ppt-notice-open');  
		}, 400);
	}, 100);
	
}

function processUserIP(){
	
	jQuery.ajax({
			type: "POST",
			url: ajax_site_url,		
			data: {               
					elementor_action: "load_ipdata",
			   },
			   success: function(response) {
	
					//console.log(response);
					
					if(response.data.lng != ""){
						
						jQuery(".save-map-log").val(response.data.lng);
						jQuery(".save-map-lat").val(response.data.lat);
						jQuery(".save-map-zip").val(response.data.zip);
						
						jQuery(".save-map-country").val(response.data.country_name);
						jQuery(".save-map-city").val(response.data.city);
						
						jQuery(".save-map-ip").val(response.data.ip);
						jQuery(".save-map-ip-country-code").val(response.data.country);
						jQuery(".save-map-ip-country").val(response.data.country_name);
						jQuery(".save-map-ip-city").val(response.data.city);					
						jQuery(".data-map-location").val(response.data.city+', '+response.data.country_name);
						
						if(jQuery('.ipdataout').length > 0){
							jQuery(".ipdataout").html(response.data.city+', '+response.data.country_name);
						} 
					
					} 
					
			   }
	});

}
/* =============================================================================
   DOCS
   ========================================================================== */ 
 
function _docsToggleStyle(val){

	var toggleFieldWrap = jQuery('.toggle-style-'+val+' .toggle-me');
	if(toggleFieldWrap.hasClass('on')){
		toggleFieldWrap.removeClass('on').addClass('off');
	}else{
		toggleFieldWrap.removeClass('off').addClass('on');
	} 
	
	if(val == "boostrap-css-rtl" || val == "theme-grid-rtl" ){
		
		if(jQuery('body').hasClass('rtl')){ 
		
			jQuery('body').removeClass('rtl');
			jQuery('html').attr('dir','ltr'); 
			
		}else{
			jQuery('body').addClass('rtl');
			jQuery('html').attr('dir','rtl');
			
		}
	}
	
	var i = jQuery("#"+val); 	 
	if (typeof i.attr("type") !== 'undefined') { // STYLESHEET	 	
	 
		if(i.hasClass('unset')){ 
			i.removeClass('unset');
			i.attr("href",i.attr("old-href"));
		}else{
			i.addClass('unset');
			i.attr("old-href", i.attr("href") );	
			i.attr("href","");
		} 	
	}else{	// javascript
	
		if(i.hasClass('unset')){ 
			i.attr("src",i.attr("old-src"));
		}else{
			i.addClass('unset');
			i.attr("old-src", i.attr("src") );	
			i.attr("src","");
		}  
	}
 
}
/* =============================================================================
   Basic Form Validation
   ========================================================================== */ 
 
function ppt_form_validation(formid){

	console.log("ppt form - validation started - "+formid);
 
	var canContinue = 1;
	var formdata = {};
	
	jQuery(formid+' [data-required="1"]').removeClass("required-active");
	jQuery(formid+' [data-required="1"]').each(function(){
  	 
		var i = jQuery(this); 
			 
		if (typeof i.attr("data-type") !== 'undefined') {
			
			var t = i.attr("data-type"); 			
			if(t == "password" ){
				
				validPass = 1;
				if(jQuery(this).val().length < 5){					
				validPass = 0;
				}else if(jQuery(this).val() == ""){
				validPass = 0;
				} 
				 
				if(jQuery('input[name="password_r"]').length > 0){
			  
					rp = jQuery('input[name="password_r"]');
					if(rp.val().length < 5){					
					validPass = 0;
					rp.addClass("required-active");
					}else if(rp.val() == ""){
					validPass = 0; 
					rp.addClass("required-active");  
					}
					
					if(rp.val() != i.val()){
					validPass = 0;	
					}
				
				}
				
				if(!validPass){
					jQuery(this).addClass("required-active");
					canContinue = 0;	
				}
				
				
			}else if(t == "email" && !isValidEmail(i.val())){	
			
				console.log("ppt form - invalid field - "+jQuery(this).attr("name"));
						
				jQuery(i).addClass('required-active');
				canContinue = 0;	
			
			}else if(i.val() == ""){
				
				jQuery(this).addClass("required-active");
				canContinue = 0;
			}
		
		}else if (typeof i.attr("type") !== 'undefined') {
			
			var t = i.attr("type");
			
			if(jQuery(this).val() == ""){
				jQuery(this).addClass("required-active");
				canContinue = 0;
			} 
		
		}else{
			
			if(i.is("select")){
			
				input = i.find(':selected');
				if(input.val() == ""){
					jQuery(this).addClass("required-active");
					canContinue = 0;
				}
			
			}else if(i.is("textarea")){
			
				if(i.val() == ""){
					jQuery(this).addClass("required-active");
					canContinue = 0;
				}
				
			}else{
			
				console.log("ppt form - skipped field - "+jQuery(this).attr("name"));
			
			} 
		}	
		
	});
	
	if(jQuery(formid+' input[name="password"]:not([data-required="1"])').length > 0){
		 
		var i = jQuery(formid+' input[name="password"]'); 
		validPass = 1;
		
		if(i.val() == ""){
		 
		}else if(i.val().length < 5){					
			validPass = 0;
		}
				 
		if(i.val().length > 0 && jQuery('input[name="password_r"]').length > 0){
			  
			rp = jQuery('input[name="password_r"]');
			if(rp.val().length < 5){					
				validPass = 0;
				rp.addClass("required-active");
			}else if(rp.val() == ""){
				validPass = 0; 
				rp.addClass("required-active");  
			}
					
			if(rp.val() != i.val()){
				validPass = 0;	
			}
				
		}
				
		if(!validPass){
			i.addClass("required-active");
			canContinue = 0;	
		}
		
	}
 
	jQuery(formid+' .required-active').each(function(){
		jQuery(this).change(function() { 
			jQuery(this).removeClass("required-active");									
		});
	});
	
	console.log("ppt form - validation result - "+canContinue);
	
	return canContinue;

}

/* =============================================================================
   MODALS
   ========================================================================== */ 
 
function pptModal(name, content, css, animation, destroy){

	var fd = name;
	 
	 
	if(destroy == 1 && jQuery(".modal-"+name).length > 0){
		jQuery(".modal-"+name).remove();
	} 
	 
	// if it exists, show it again
	if(jQuery(".modal-"+name).length > 0){	 
	 	jQuery(".modal-"+name).addClass('show');
		
		if(jQuery(".modal-"+name).css('display') == 'none'){			
			jQuery(".modal-"+name).show();		
	  	}
		
	}else{
	
		// clone
		closeBtn = '<div class="show-mobile ppt-modal-mobile-close p-3 w-100"><a href="#" class="btn-system btn-close w-100 shadow-sm" data-ppt-btn>X</a></div>';
		if(name == "message" || name == "offer" || name == "notices" || name == "notice-new-notify" || name == "notice-new-custom" || name == "notice-new-message"){
		closeBtn = '';
		}
			
		jQuery("body").append('<div class="ppt-modal-wrap show modal-'+fd+' '+css+'"><div class="ppt-modal-wrap-overlay"></div><div class="ppt-modal-item '+animation+'"><div class="ppt-modal-container">'+content+'</div>'+closeBtn+'</div></div>');  
		
		
		
		jQuery(".notify-footer").addClass("z-1"); 
		
	
		var a = jQuery(".ppt-modal-wrap .bg-image");
		a.each(function (a) {
				if (jQuery(this).attr("data-image")) jQuery(this).css("background-image", "url(" + jQuery(this).data("image") + ")");
		});
		 
		// triggers
		if(name == "notice-new-custom"){
			
		}else{
			 
			jQuery(".modal-"+name+" .ppt-modal-wrap-overlay").on("click", function (e) {		  
				jQuery(".modal-"+name).removeClass('show');	
				//jQuery(".modal-"+name).hide();
				jQuery(".modal-"+name).fadeOut(400);		
				 
			});
			
		}
		jQuery(".btn-close").on("click", function (e) {	 
			jQuery(".ppt-modal-wrap").removeClass('show');	
		});  
		
		 
		 jQuery(".ppt-js-trigger-ajax").trigger('click');
		 
	
	}
}




 
function pptNav2(){
	
  var items = jQuery('#cat-items').width(); 
  
  jQuery('#main-category-wrap').addClass('container py-0');
  
   if( jQuery("#cat-items li").length > 5){
   
   jQuery('#navMenu-wrapper').addClass('addon');
  
  }else{
  jQuery('.navMenu-paddles').hide();
  }
  
  var itemSelected = document.getElementsByClassName('cat-item');
  navPointerScroll(jQuery(itemSelected));
  
  jQuery("#cat-items").scrollLeft(200).delay(200).animate({
    scrollLeft: "-=200"
  }, 2000, "easeOutQuad");
 
	jQuery('.navMenu-paddle-right').click(function () {
		jQuery("#cat-items").animate({
			scrollLeft: '+='+items
		});
	});
	jQuery('.navMenu-paddle-left').click(function () {
		jQuery( "#cat-items" ).animate({
			scrollLeft: "-="+items
		});
	});

  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    var scrolling = false;

    jQuery(".navMenu-paddle-right").bind("mouseover", function(event) {
        scrolling = true;
        scrollContent("right");
    }).bind("mouseout", function(event) {
        scrolling = false;
    });

    jQuery(".navMenu-paddle-left").bind("mouseover", function(event) {
        scrolling = true;
        scrollContent("left");
    }).bind("mouseout", function(event) {
        scrolling = false;
    });

    function scrollContent(direction) {
        var amount = (direction === "left" ? "-=3px" : "+=3px");
        jQuery("#cat-items").animate({
            scrollLeft: amount
        }, 1, function() {
            if (scrolling) {
                scrollContent(direction);
            }
        });
    }
  }
  
}

function navPointerScroll(ele) {

	var parentScroll = jQuery("#cat-items").scrollLeft();
	var offset = (jQuery(ele).offset().left - jQuery('#cat-items').offset().left);
	var totalelement = offset + jQuery(ele).outerWidth()/2;

	var rt = ((jQuery(ele).offset().left) - (jQuery('#navMenu-wrapper').offset().left) + (jQuery(ele).outerWidth())/2);
	jQuery('#menuSelector').animate({
		left: totalelement + parentScroll
	})
}