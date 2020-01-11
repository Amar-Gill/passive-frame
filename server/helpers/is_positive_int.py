import re

def is_positive_int(x):
    regex = r'[\W+A-Za-z]'
    match = re.search(regex, str(x))
    if match:
        return False
    elif int(x) <= 0:
        return False
    else:
        return True