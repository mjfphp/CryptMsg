# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import JsonResponse

from CrypteMsg.des import Crypter,Decrypter
from CrypteMsg.rsa import RsaDecrypt,RsaEncrypt

from django.shortcuts import render

# Create your views here.
def Index(request):
    return  render(request,'crpyt.html')
def cdRsa(request):
    msg = 'not valid'
    if request.method=="POST":
        message=request.POST['Message']
        key1=request.POST['k1']
        key2=request.POST['k2']
        typ=request.POST['ty']
        if(typ=="en"):
            msg=RsaEncrypt(int(key1),int(key2),message)
        else:
            msg=RsaDecrypt(key1,key2,message)
    data = {'msg': msg}
    return JsonResponse(data)