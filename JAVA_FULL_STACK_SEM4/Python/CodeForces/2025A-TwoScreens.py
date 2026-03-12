for _ in range(int(input())):
	s = input()
	t = input()

	lcp = 0
	n = len(s)
	m = len(t)
	for i in range(1, min(n, m) + 1):
		if s[:i] == t[:i]:
			lcp = i
	print(n + m - max(lcp, 1) + 1)