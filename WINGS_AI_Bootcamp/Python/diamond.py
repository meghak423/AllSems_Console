def line(k: int) -> str:
    return ' '.join(['*'] * (2 * k + 1))

def make_diamond(size: int) -> str:
    mid = size // 2
    top = [line(i) for i in range(mid + 1)]
    bottom = [line(i) for i in reversed(range(mid))]
    all_lines = top + bottom
    width = max(len(l) for l in all_lines)
    return '\n'.join(l.center(width) for l in all_lines)

# Example usage
print(make_diamond(7))