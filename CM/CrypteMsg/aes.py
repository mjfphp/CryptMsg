import pyaes

def aesC(text,key):
    aes = pyaes.AESModeOfOperationCTR(key)
    ciphertext = aes.encrypt(text)
    return "your crypted msg : ",ciphertext
def aesD(text,key):
    aes = pyaes.AESModeOfOperationCTR(key)
    decrypted = aes.decrypt(text)
    return decrypted


