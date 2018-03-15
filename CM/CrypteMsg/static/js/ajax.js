var isInteger = function(x) { return (x ^ 0) === x; };

function isPrime(number) {
	if (typeof number !== 'number' || !isInteger(number)) {
		// Alternatively you can throw an error.
		return false;
	}

	if (number < 2) {
		return false;
	}

	if (number === 2) {
		return true;
	} else if (number % 2 === 0) {
		return false;
	}

	var squareRoot = Math.sqrt(number);
	for(var i = 3; i <= squareRoot; i += 2) {
		if (number % i === 0) {
			return false;
		}
	}

	return true;
}


function ValidateRsa(key1,key2) {
    var a=0
    if(!isPrime(key1))
    {
         $("#msg").append(p+"is not a primary key")
                   a++;
    }

     if(!isPrime(key2))
     {
            $("#msg").append(q+"is not a primary key")
          a++;
     }
     return a==0
}

function SendRsa(key1,key2,msg,typ) {
                     $.ajax({
               type:'POST',
               url: '/cm',
               data: {
                 k1:key1,
                 k2:key2,
                   ty:typ,
                   Message:msg,
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
        },
          success: function (data) {
          if (data.msg) {
              console.log(data.msg)
               $('#msg').html(data.msg)
          }
        }
      })

}

$(document).on('submit',function (e) {
         e.preventDefault();
         method=window.method
         typ=window.typ
         message=$("#inputMsg").val()
         key1=parseInt($("#inputKey1").val())
         key2=parseInt($("#inputKey2").val())

         if(method=="rsa" ){
             if( typ=="c")
             {
                 console.log("pass")
                 if(!ValidateRsa(key1,key2))
               {
                        $("#msg").addClass("has-error")
                       console.log("error")
               }
               else
                  SendRsa(key1,key2,message,typ)
             }
             else
                 SendRsa(key1,key2,message,typ)
         }





})