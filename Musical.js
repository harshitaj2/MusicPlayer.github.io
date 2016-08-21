 $(document).ready(function(){
     $.ajaxSetup({ cache: false });
        //var prefix ="/Users/Harshita/Music/";
     var prefix="";
        var suffix = ".mp3";
        var iter=0;
        var m=[];
        $('input[name=inputdir]').val("");
        $("#inputmusic").val("");
        $('audio')[0].volume=($('#vol').val()/10);
        $('#add').children().eq(0).hide();
        $('#dirpathid').show();
        $('#filenameid').hide();
        $('#triangle-right').click(function(){ playnext();                 $('#reddiv').css('background','#4CAF50');
 });
        $('#triangle-left').click(function(){ playprevious();                 $('#reddiv').css('background','#4CAF50');
});
        $("audio")[0].src=prefix+$('#playlist').find('li').eq(iter).text()+suffix;
            $("#reddiv").click(function(){
                if ($("audio")[0].paused){
                $("audio")[0].play();
                $('#reddiv').css('background','#4C8020');
                }
                else{
                     $("audio")[0].pause();
                $('#reddiv').css('background','#4CAF50');
                }
              //  $(this).height("100").width("105");

        });
     
     /*using up, down arrow create confusion
       /* $("#playlist").keypress(function(event){
            if(event.which===38 && $('#playlist').find('li').length>0){

            playprevious();
            }
            if (event.which===40 && $('#playlist').find('li').length>0){
            playnext();
            }
            
            
        });*/
     
        
            $("audio").eq(0).on('ended',function(){
                $('#playlist').find('li').eq(iter).removeClass('active');
                iter++;
                playsong();
                $("audio")[0].play();
            });

    
            $('#add').click(function(){
            if($("#inputmusic").val()===""){
                $("#alertdiv").show();
            
  
                
            }
                else{
                    
                    var playlistlen = $('#playlist').find('li').length;
            $('#playlist').append("<li id=\"song_"+playlistlen+"\" class=\"list-group-item\"><span class=\"badge\"></span>"+$('#inputmusic').val()+"</li>");
            $("#alertdiv").hide();

            $("#inputmusic").val("");
            }
            
        });
     
         $('#add').hover(function(){ 
             $(this).children('span').eq(0).show();


         },function(){

                      $(this).children().eq(0).hide('fast');

         });
     
     $('#inputmusic').on({
       keydown:function(){
            $('#playlist').css('filter','blur(5px)');
  
           
       },
    blur:function(){
                         $('#playlist').css('filter','blur(0px)');

     }
         
         
     });
            $('#add1').click(function(){
              prefix=  $("input[name=inputdir]").val()+"/";
               // $("#ajaxdiv").load("musiclist.txt",function(){ alert("done")});
                $.ajax({
                   // url:"musiclist.txt",
                    url:'http://localhost:8888',
                    type:"POST",
                    data: '{"data": "'+prefix+'"}',
                   // data: "firstname=asdfas&name=asdfasd,
                  //  dataType: "text",


                    success:function(data){
                        $("#dirpathid").hide('slow');
                        $('#filenameid').show();
                        $("input[name=inputdir]").val("");
                        m=[];
                        m=data.split(",");
                        console.log("after"+data.split(",").length);
                    $( "#inputmusic" ).autocomplete({
                        source: m
                    });


                    },
                    error:function(jqXHR, textStatus, errorThrown) {
                        console.log("Error in ajax "+textStatus); //error logging
                }
                });
                });
     $('#playlist').on('click','li',function(){
      var songid = this.getAttribute('id')
        newiter = songid.split('_')[1];
         $('#playlist').find('li').eq(iter).removeClass('active');
         iter =newiter;
         playsong();
        $('#reddiv').css('background','#4CAF50');

     });
     
     var updateremainingtime = function(alen){
         alert($(this).find('li')[iter].childNodes[0].innerHTML);
      
         
     };
            $("#playlist").on('mouseover','li',
               function(){
                    var remtime = ($('audio')[0].duration-$('audio')[0].currentTime)/60;
                remtime = remtime.toFixed(2);
                //alert($(this).find('li')[iter].childNodes[1].nodeValue+" "+iter);
                var songid = this.getAttribute('id');
                songid = parseInt(songid.split('_')[1]);
                //console.log(songid+" "+iter);
                if (songid==iter){

                this.childNodes[0].style.display="inline-block";
               this.childNodes[0].innerHTML="-"+remtime;
                }
                });
     $("#playlist").on('mouseleave','li',
            function(){
               
               this.childNodes[0].style.display="none";
            
            });
     
      /*      $("#playlist").on('mouseleave','li',function(){
            
               this.childNodes[0].style.display="none";
                
            });*/

            var playsong = function(){
                
                                var i = $('#playlist').find('li').length;  
                if (iter==i)
                        iter=0;
                if(iter<0)
                    iter= i-1;
                if (iter<i){
                
                    

                    $("audio")[0].src=prefix+$('#playlist').find('li')[iter].childNodes[1].nodeValue;
                    $('#playlist').find('li').eq(iter).addClass('active');

                         $("audio")[0].load();

                }
        
        
            };
     
        var playprevious = function(){
            $('#playlist').find('li').eq(iter).removeClass('active');
                iter--;
                playsong();
            };
     
     
         var playnext = function(){  
             $('#playlist').find('li').eq(iter).removeClass('active');

                iter++;
                playsong();
        };
     
     $('#vol').change(function(){
        var audioVol =  $(this).val(); 
            $('audio')[0].volume=($(this).val()/10);
            
        });
    });
        