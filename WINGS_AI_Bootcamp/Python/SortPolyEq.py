import re

def sort_polynomial(expr):
    terms = re.findall(r'[-+]?\s*\d*x(?:\^\d+)?|[-+]?\s*\d+', expr.replace(' ', ''))
    def key(term):
        if 'x^' in term:
            return -int(term.split('^')[1])
        elif 'x' in term:
            return -1
        else:
            return 0
    sorted_terms = sorted(terms, key=key)
    return ' '.join(sorted_terms).replace('+-', '- ')

expr = "3x^2 + 5x^4 - 2x + 7"
print(sort_polynomial(expr))
