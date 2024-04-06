# A. Не минимум на отрезке
from tests.index import test, input
test(12)

import re

__input__ = input
def input():
  try: return __input__()
  except: return None


# w - ширина документа
# h - высота строки
# c - ширина символа
w, h, c = map(int, input().split())
prevFloating = False
  
imageRe = re.compile(r'\(image[\s\n][\s\na-z0-9=-]+\)')
simageRe = re.compile(r'[\s\n]*\(image[\s\n][\s\na-z0-9=-]+\)[\s\n]*')


def getParams(image):
  params = dict()
  for p in re.split(r'[\s\n]+', image[7:-1]):
    key, value = p.split('=')
    params[key] = value
    
  params["width"] = int(params["width"])
  params["height"] = int(params["height"])
  if "dx" in params: params["dx"] = int(params["dx"])
  if "dy" in params: params["dy"] = int(params["dy"])
  
  return params


# Считываем весь текст
text = ''
while (s := input()) != None: text += s + '\n' 

paragraphs = re.split(r'\n\s*\n', text)
sur = []

def insert(x, y, width, lineHeight, prev, curr):
  # а не упирается ли он в surrounded картинки
  # print(x, y, width, lineHeight, prev)
  space = int(
    (prev == 'word' or prev == 'embedded')
    and (curr == 'word' or curr == 'embedded')
    and x != 0
  ) * c 
  
  for sy, sa, sb in sur:
    if y >= sy: continue
    # если упираемся, то начинаем все сначала но уже справа от картинки
    if x <= sa and x + space + width > sa:
      return insert(sb, y, width, lineHeight, 'surrounded', curr)
 
  
  if x + space + width > w:
    return insert(0, y + lineHeight, width, h, 'eof', curr)

  return (x + space + width, y, lineHeight, curr)

# изначально мы начинаем с левого верхнего угла
# по умолчанию высота строки h, но может измениться из-за картинки
x, y, lh = 0, -h, h
fx, fy = 0, 0

for paragraph in paragraphs:
  # ищем самый нижний элемент
  y += lh
  x = 0
  for sy, sa, sb in sur:
    if sy > y: y = sy
  
  sur = []
  
  # разбиваем её на токены - фрагменты и картинки
  images = imageRe.findall(paragraph)

  prev, lh = 'eof', h
  prevFloating = False
  for words in simageRe.split(paragraph):
    # сначала поставим все слова
    for word in re.split(r'[\s\n]+', words):
      #  длина слова, пробел пока не учитываем
      if not word: continue
      
      prevFloating = False
      wl = len(word) * c
      x, y, lh, prev = insert(x, y, wl, lh, prev, 'word')
        
    # теперь добавим картинку
    if not images: continue
    image = images.pop(0)
    print(prev, image, lh)
    params = getParams(image)
    if params['layout'] == 'floating':
      if not prevFloating: fx, fy = x, y
      prevFloating = True
      fx = max(0, min(w - params['width'], fx + params['dx']))
      fy += params['dy']
      print(fx, fy)
      fx += params['width']
    elif params['layout'] == 'surrounded':
      prevFloating = False
      print(x, y)
      x, y, lh, prev = insert(x, y, params['width'], lh, prev, 'surrounded')
      print(x, y, 'changed lh', lh)
      print(x - params['width'], y)
      # высота, начало и конец картинки
      sur.append((y + params['height'], x - params['width'], x))
      prev = 'surrounded'
    elif params['layout'] == 'embedded':
      prevFloating = False
      x, y, lh, prev= insert(x, y, params['width'], lh, prev, 'embedded')
      print(x - params['width'], y)
      lh = max(lh, params['height'])
          
    
