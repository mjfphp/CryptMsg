
minuscules = 'abcdefghijklmnopqrstuvwxyz'
majuscules = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

def rotation(chaine, x):
    return chaine[x:] + chaine[:x]

def index(c, chaine):
    for i in range(len(chaine)):
        if (c == chaine[i]):
            return i
    return -1

def chiffre_minuscules(chaine, x):

    r = rotation(minuscules, x)
    resultat = ''
    for lettre in chaine:
        resultat = resultat + r[index(lettre, minuscules)]
    return resultat

def chiffre(chaine, x):

    r_min = rotation(minuscules, x)
    r_maj = rotation(majuscules, x)
    resultat = ''
    for lettre in chaine:
        if lettre in minuscules:
            resultat = resultat + r_min[index(lettre, minuscules)]
        elif lettre in majuscules:
            resultat = resultat + r_maj[index(lettre, majuscules)]
        else:
            resultat = resultat + lettre
    return resultat
def dechiffre(chaine,x):
  return chiffre(chaine,26-x)
