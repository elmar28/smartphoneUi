//$.fn.overlay=function(options){
$(function(){
	$('.btn_pop').each(function(){
		var options={
			nodeDialog: '.dialog',
			nodeHitArea: '#hitArea',
			nodeMsg: '.dialogContent',
			nodeConfirm:'.btnConfirm',
			nolayer:false,
			nodeEvent:'click',
			positionTop:60,
			setTouch:false
		};

		var flagOverlay=false;
		var triggerEvent=options.nodeEvent;
		var $toggleOverlay=$(this);
		var $dialog=$(options.nodeDialog);
		var $hitArea=$(options.nodeHitArea);
		var $msg=$(options.nodeMsg);
		var nolayer=options.nolayer;
		var setTouch=options.setTouch;
		var $btnConfirm=(options.nodeConfirm)?$(options.nodeConfirm):'';

		$toggleOverlay.bind(triggerEvent,function(){
			if(!flagOverlay){
				var setHeight=document.documentElement.scrollHeight;
				var positionTop=options.positionTop?options.positionTop:160;
				var mgnT=window.offsetHeight>0?window.offsetHeight+positionTop:positionTop;

				$msg.css('margin-top',mgnT+'px');
				if(nolayer){
					$hitArea.hide();
				}

				flagOverlay=true;
				$dialog.addClass('visible');
				$hitArea.height(setHeight);

				setTimeout(function(){
					$dialog
						.addClass('overlay')
						.bind('touchmove',cancelTouch)
						.bind('webkitTransitionEnd',function(){
							if(setTouch===true){
								$hitArea
									.bind('touchstart',cancelTouch)
									.bind('click touchend',closeTouch);
							}else{
								$hitArea.bind('touchstart',cancelTouch);
								$btnConfirm.bind('click touchend',closeTouch);
							};
							$(this).unbind('webkitTransitionEnd');
						});
				},150);
			};
			function cancelTouch(e){
				e.preventDefault();
			};
			function closeTouch(e){
				$dialog
					.removeClass('overlay')
					.bind('webkitTransitionEnd',function(){
						$hitArea.height(0);
						$(this)
							.removeClass('visible')
							.unbind('touchmove webkitTransitionEnd');
						flagOverlay=false;
					});
				$(this).unbind('touchstart');
				$hitArea.unbind('touchstart');
			};
		});
	});
});