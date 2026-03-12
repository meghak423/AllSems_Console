# Polynomial expressions - adding , subtracting, division, multiplication

# Polynomial_Operations.py


from sympy import symbols, sympify

def poly(poly1_str, poly2_str, operation):
    x = symbols('x')  

    poly1 = sympify(poly1_str.replace(" ", ""))
    poly2 = sympify(poly2_str.replace(" ", ""))
    
    if operation == 'mul':
        result = poly1 * poly2 
    elif operation == 'add':
        result = poly1 + poly2
    elif operation == 'sub':
        result = poly1 - poly2
    elif operation == 'div':
        result = poly1 / poly2
    else:
        raise ValueError("Unsupported operation. Use 'mul', 'add', 'sub', or 'div'.")
    
    return result

res = poly("2*x+21", "2*x", "add")
print(res)



                           # OR


from sympy import symbols, sympify

x = symbols('x')  

def parse_poly(poly_str):
    return sympify(poly_str.replace(" ", ""))

def multiply(poly1_str, poly2_str):
    poly1 = parse_poly(poly1_str)
    poly2 = parse_poly(poly2_str)
    return poly1 * poly2

def add(poly1_str, poly2_str):
    poly1 = parse_poly(poly1_str)
    poly2 = parse_poly(poly2_str)
    return poly1 + poly2

def subtract(poly1_str, poly2_str):
    poly1 = parse_poly(poly1_str)
    poly2 = parse_poly(poly2_str)
    return poly1 - poly2

def divide(poly1_str, poly2_str):
    poly1 = parse_poly(poly1_str)
    poly2 = parse_poly(poly2_str)
    return poly1 / poly2

def poly(poly1_str, poly2_str, operation):
    if operation == 'mul':
        return multiply(poly1_str, poly2_str)
    elif operation == 'add':
        return add(poly1_str, poly2_str)
    elif operation == 'sub':
        return subtract(poly1_str, poly2_str)
    elif operation == 'div':
        return divide(poly1_str, poly2_str)
    else:
        raise ValueError("Unsupported operation. Use 'mul', 'add', 'sub', or 'div'.")

result = poly("3*x+21", "2*x", "add")
print(result)


 

              # OR


# My code

from sympy import symbols, sympify, Poly, expand

x = symbols('x')

def parse_poly(poly_str):
    return Poly(sympify(poly_str.replace(" ", "")), x)

def format_poly(poly):
    expr = poly.as_expr()
    s = str(expand(expr))
    s = s.replace("**", "^").replace("*", "")
    return s

def multiply(poly1_str, poly2_str):
    poly1 = parse_poly(poly1_str)
    poly2 = parse_poly(poly2_str)
    result = poly1 * poly2
    return format_poly(result)

def add(poly1_str, poly2_str):
    poly1 = parse_poly(poly1_str)
    poly2 = parse_poly(poly2_str)
    result = poly1 + poly2
    return format_poly(result)

def subtract(poly1_str, poly2_str):
    poly1 = parse_poly(poly1_str)
    poly2 = parse_poly(poly2_str)
    result = poly1 - poly2
    return format_poly(result)

def divide(poly1_str, poly2_str):
    poly1 = parse_poly(poly1_str)
    poly2 = parse_poly(poly2_str)
    q, r = poly1.div(poly2)
    if r.as_expr() != 0:
        return f"Quotient: {format_poly(q)}, Remainder: {format_poly(r)}"
    else:
        return format_poly(q)

def poly(poly1_str, poly2_str, operation):
    if operation == 'mul':
        return multiply(poly1_str, poly2_str)
    elif operation == 'add':
        return add(poly1_str, poly2_str)
    elif operation == 'sub':
        return subtract(poly1_str, poly2_str)
    elif operation == 'div':
        return divide(poly1_str, poly2_str)
    else:
        raise ValueError("Unsupported operation. Use 'mul', 'add', 'sub', or 'div'.")

print(poly("3*x+21", "2*x", "add"))
print(poly("3*x+21", "2*x", "sub"))
print(poly("3*x+21", "2*x", "mul"))
print(poly("3*x+21", "2*x", "div"))
print(poly("x^3 + 2*x^2 + 1", "x + 1", "div"))
