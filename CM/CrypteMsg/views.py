# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import JsonResponse

from CrypteMsg.des import Crypter,Decrypter
from CrypteMsg.rsa import RsaDecrypt,RsaEncrypt
from CrypteMsg.cesar import chiffre,dechiffre

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
def Crypt(request):
    msg = 'not valid'
    if request.method=="POST":
        message=request.POST['Message']
        key1=request.POST['k1']
        typ = request.POST['ty']
        method = request.POST['Method']
        if method=="des":
            if typ=="en":
                msg=Crypter(message,key1)
            else:
                msg=Decrypter(message,key1)
        if method=="cesar":
            if typ == "en":
                msg = chiffre(message, int(key1))
            else:
                msg = dechiffre(message, int(key1))

    data = {'msg': msg}
    return JsonResponse(data)
