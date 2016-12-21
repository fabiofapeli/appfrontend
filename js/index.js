
url_servidor = "http://localhost/mapa/"
device_regid = 'XXX'

$(document).ready(function (){

    $('#reset').click(function (event){

            event.preventDefault();

            var url_acao=url_servidor + 'password/reset';

            window.open(url_acao, '_system');
    })

    $('#form-register').submit(function (event){

            event.preventDefault();

            var form = $('#form-register');

            var url_acao=url_servidor + 'app/register';

             $.ajax({
                  type: "post",
                  url: url_acao,
                  dataType: 'json',
                  data: form.serialize() +  '&uuid=' + device.uuid + '&regid=' + device_regid + '&platform=' + device.platform + '&model='  + device.model,
                  success: function( response ) {
                        if( response.status == 'OK' ){
                            self.location = 'inicio.html'
                        }
                        else{
                            alert(response.status)
                        }
                  }
             });

    })

	$('#loginBtn').click(function(){
           
            var url_acao=url_servidor + 'app/login';
            var ValueToPass = 'uuid=' + device.uuid + '&regid=' + device_regid + '&platform=' + device.platform + '&model='  + device.model + '&email='  + $("#email").val() + "&password=" + $("#password").val();

            $.ajax({
                url: url_acao, 
                type: 'post',
                dataType: 'json',
                data: ValueToPass,
                success: function(data) {
                    if(data.status == false){
                        alert(data.message)
                        $('#email').val('')
                        $('#password').val('')
                    }
                    else{
                    	self.location = 'inicio.html'
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.responseText);
                }
            });
            return false;
     });

	$('#sair').click(
		function(e){
	    	e.preventDefault();
	    	url_acao=url_servidor + 'app/logout/' + device.uuid;
			$.getJSON(url_acao, function( data ) {
				if(data.status == true)
					self.location='index.html'
			});
			
		}
	);


})

//document.addEventListener("deviceready", onDeviceReady, false);



//document.addEventListener('deviceready', iniciaPush);