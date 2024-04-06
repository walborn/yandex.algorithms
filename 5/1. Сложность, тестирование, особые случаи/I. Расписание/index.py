# A. Не минимум на отрезке
from tests.index import test, input
test(1)

__input__ = input
def input():
  try: return __input__()
  except: return None



n = int(input())
year = int(input())
is29 = year % 400 == 0 or year % 4 == 0 and year % 100 != 0

monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

monthNumber = {
  'January': 0,
  'February': 1,
  'March': 2,
  'April': 3,
  'May': 4,
  'June': 5,
  'July': 6,
  'August': 7,
  'September': 8,
  'October': 9,
  'November': 10,
  'December': 11,
}
monthDays = [ 0, 31, 28 + is29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]
for i in range(1, 13): monthDays[i] += monthDays[i-1]
total = monthDays[-1]

weekdaysToNumber = {
  'Monday': 0,
  'Tuesday': 1,
  'Wednesday': 2,
  'Thursday': 3,
  'Friday': 4,
  'Saturday': 5,
  'Sunday': 6,
}

weekdaysToString = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]

weekdays = [0] * 7

# remove holidays
for i in range(n):
  monthDay, monthName = input().split()
  day = monthDays[monthNumber[monthName]] + int(monthDay) - 1
  weekdays[day % 7] -= 1
  
# append last week
for i in range((365 + is29) % 7):
  weekdays[i] += 1

# shift, becouse first day can be not Monday    
fistDay = weekdaysToNumber[input()]
weekdays = weekdays[-fistDay:] + weekdays[:-fistDay]

a, b = 0, 0
for i in range(1, 7):
  if weekdays[i] < weekdays[a]: a = i
  elif weekdays[i] > weekdays[b]: b = i
  
print(weekdaysToString[b], weekdaysToString[a])


  
  

