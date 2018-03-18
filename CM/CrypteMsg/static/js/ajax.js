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
    if(key2==key1)
    {
         $("#msg").append("key1 and key2 cannot be equel <br>")
                   a++;
    }
    if(!isPrime(key1))
    {
         $("#msg").append(key1+" is not a primary key <br>")
                   a++;
    }

     if(!isPrime(key2))
     {
            $("#msg").append(key2+" is not a primary key <br>")
          a++;
     }
     return a==0
}

function ValidateDes(key1,msg) {
    var a=0
    if(key1.length!=8)
    {
         console.log(key1.length)
         $("#msg").append("Key Should be 8 bytes long")
         a++;
    }
    if(msg.length%8!=0){
         $("#msg").append("Message size should be multiple of 8")
         a++;
    }
    return a==0
}
function ValidateCesar(key1) {
     if(key1.length >26 || key1.length <0)
    {
         $("#msg").append("the number of shift should de beetween 1 and 26 ")
         return false
    }
    return true
}


function Crypter(key1,message,typ,method) {
          console.log("enter")
        $.ajax({
               type:'POST',
               url: '/c',
               data: {
                   k1:key1,
                   ty:typ,
                   Message:message,
                   Method:method,
                   csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
        },
          success: function (data) {
          if (data.msg) {
              console.log(data.msg)
               $('#msg').html(data.msg)
               $('#msg').addClass("alert-info")
          }
        }
      })

}

function SendRsa(key1,key2,msg,typ) {
         console.log("enter")
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
               $('#msg').addClass("alert-info")
          }
        }
      })

}

$(document).on('submit',function (e) {
    e.preventDefault();
    $("#msg").html("")
    $("#msg").removeClass("alert-danger")
    method = window.method
    typ = window.typ
    console.log(typ)
    message = $("#inputMsg").val().trim()
    key1 = $("#inputKey1").val()
    key2 = $("#inputKey2").val()

    if (method == "rsa") {
         key1 = parseInt(key1)
         key2 = parseInt(key2)
        if (typ == "en") {
            if (!ValidateRsa(key1, key2)) {
                $("#msg").addClass("alert-danger")
                console.log("error")
            }
            else
                SendRsa(key1, key2, message, typ)
        }
        else
            SendRsa(key1, key2, message, typ)
    }
    else {
        if(method=="des")
        {
            if(!ValidateDes(key1,message))
            {
                 $("#msg").addClass("alert-danger")
                console.log("error")
            }

            else
            {
               Crypter(key1,message,typ,method)
            }

        }
        if (method == "cesar") {
            key1=parseInt(key1)
            console.log(key1)
               if(!ValidateCesar(key1))
            {
                 $("#msg").addClass("alert-danger")
                console.log("error")
            }

            else
            {
               Crypter(key1,message,typ,method)
            }

        }

    }
})
