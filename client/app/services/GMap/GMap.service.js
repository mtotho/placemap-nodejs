'use strict';

angular.module('placemapApp')
  .service('GMap', function () {
    

		this.icons={
				//"red": "res/images/marker_icon/icon_red.png", //"http://maps.google.com/mapfiles/ms/icons/red-dot.png",
				//"yellow":"res/images/marker_icon/icon_yellow.png", //"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
				//"green":"res/images/marker_icon/icon_green.png",//"http://maps.google.com/mapfiles/ms/icons/green-dot.png"
				"grey":"assets/images/marker_icon/icon_grey.png",
				"light-red": "assets/images/marker_icon/icon_red_light.png", 
				"light-yellow":"assets/images/marker_icon/icon_yellow_light.png", 
				"light-green":"assets/images/marker_icon/icon_green_light.png",
				"red-delete": "assets/images/marker_icon/icon_red_delete.png", 
				"yellow-delete":"assets/images/marker_icon/icon_yellow_delete.png", 
				"green-delete":"assets/images/marker_icon/icon_green_delete.png",
				"red": "assets/images/clustering/redCircle-25.png", //"http://maps.google.com/mapfiles/ms/icons/red-dot.png",
				"yellow":"assets/images/clustering/yellowCircle-25.png", //"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
				"green":"assets/images/clustering/greenCircle-25.png",//"ht
				"red-select": "assets/images/clustering/redCircle-selected-25.png", //"http://maps.google.com/mapfiles/ms/icons/red-dot.png",
				"yellow-select":"assets/images/clustering/yellowCircle-selected-25.png", //"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
				"green-select":"assets/images/clustering/greenCircle-selected-25.png",//"ht
			}
	 	 this.styles = 
	 	 	[
	 	 		[
	 	 			{
				        url: 'assets/images/clustering/greyCircle-30.png?v=1',
				        height: 30,
				        width: 30,
				        anchor: [0, 0],
				        textColor: '#ffffff',
				        textSize: 9
		     		 }, 
		      		{
				        url: 'assets/images/clustering/greyCircle-40.png?v=1',
				        height: 40,
				        width: 40,
				        anchor: [0, 0],
				        textColor: '#ffffff',
				        textSize: 11
		     		 }, 
		      		{
				        url: 'assets/images/clustering/greyCircle-55.png',
				        height: 55,
				        width: 55,
				        anchor: [0, 0],
				        textColor: '#ffffff',
				        textSize: 12
		      		},
	      			{
				        url: 'assets/images/clustering/greyCircle-65.png?v=1',
				        height: 65,
				        width: 65,
				        anchor: [0, 0],
				        textColor: '#ffffff',
				        textSize: 13
		      		}
	      		], 
	      		[
	      			{
				        url: '../images/conv30.png',
				        height: 27,
				        width: 30,
				        anchor: [3, 0],
				        textColor: '#ff00ff',
				        textSize: 10
		     		},
	     		 	{
				        url: '../images/conv40.png',
				        height: 36,
				        width: 40,
				        anchor: [6, 0],
				        textColor: '#ff0000',
				        textSize: 11
		     	 	}
	  			]
	  		];
	  	


		this.getXY = function (coords, map) {
		
			var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
			var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
			var scale = Math.pow(2, map.getZoom());
			var worldPoint = map.getProjection().fromLatLngToPoint(new google.maps.LatLng(coords.latitude, coords.longitude));
			return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
		}
		


		this.showClustering = function(map, markers){
			var mc = new MarkerClusterer(map, markers, {
		  		  maxZoom: 19,
		          gridSize: 20,
		          styles: this.styles[0]
			});
		}

		this.getIcons = function(){
			return this.icons;
		}
	




  });
