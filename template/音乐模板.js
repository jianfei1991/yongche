//<div class="music music_ani"></div>



// .music_ani {
//     -webkit-animation: music 2s linear infinite;
//     animation: music 2s linear infinite;
// }

// .music {
//     width: 43px;
//     height: 42px;
//     position: absolute;
//     top: 62px;
//     right: 26px;
//     z-index: 999;
//     background: url('http://i3.yongche.name/u/images/201510/4022501597.png?1445541000') no-repeat center center;
// }
// @-webkit-keyframes music {
//   0% {
//     -webkit-transform:rotate(0deg);
//   }

//   100% {
//     -webkit-transform:rotate(360deg);
//   }
// }
// @keyframes music {
//   0% {
//     transform:rotate(0deg);
//   }

//   100% {
//     transform:rotate(360deg);
//   }
// }





	 $('.music').bind('touchstart', function (e) {
		if($(this).hasClass('music_ani')) {
			$(this).removeClass('music_ani');
			bg.pause();
		} else {
			$(this).addClass('music_ani');
			bg.play();
		}
   });



   

var bg = document.createElement('audio');
bg.src = '';
bg.loop = true;
bg.autoplay = true;
bg.play();
