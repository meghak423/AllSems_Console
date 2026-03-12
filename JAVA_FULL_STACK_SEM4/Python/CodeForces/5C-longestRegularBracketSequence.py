def longest_regular_bracket_sequence(s):
    
    stack = []
  
    dp = [0] * len(s)
    max_len = 0
    count = 0
    
    for i in range(len(s)):
        if s[i] == '(':
            stack.append(i)
        else:  # s[i] == ')'
            if stack:
                opening_index = stack.pop()
                
                dp[i] = dp[opening_index - 1] + (i - opening_index + 1) if opening_index > 0 else (i - opening_index + 1)
                if dp[i] > max_len:
                    max_len = dp[i]
                    count = 1
                elif dp[i] == max_len:
                    count += 1
    
    if max_len == 0:
        print("0 1")
    else:
        print(f"{max_len} {count}")

s = input().strip()
longest_regular_bracket_sequence(s)
