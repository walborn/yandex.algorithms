

from __future__ import annotations
from dataclasses import dataclass

from tests.index import test, input
test(1)

SegmentHash = tuple[int, int]


class SegmentHashBuilder:
  def __init__(self, max_len: int, mod: int = 10**9 + 7, p: int = 137):
    pows = [1] * max_len
    ones = [1] * (max_len + 1)
    for i in range(1, max_len):
      pows[i] = pows[i - 1] * p % mod
      ones[i + 1] = (ones[i] + pows[i]) % mod

    self.mod = mod
    self.p = p
    self.pows = pows
    self.ones = ones

  def from_value(self, x: int = 0, length: int = 0) -> SegmentHash:
    return x * self.ones[length] % self.mod, length

  def op(self, a: SegmentHash, b: SegmentHash) -> SegmentHash:
    (va, la), (vb, lb) = a, b
    return (va * self.pows[lb] + vb) % self.mod, la + lb


H = SegmentHashBuilder(10 ** 6)


@dataclass
class Node:
  hash: SegmentHash | None = None
  l: Node | None = None
  r: Node | None = None
  p: Node | None = None
  promise: int = 0

  def set(self, x: int, length: int | None = None):
    if length is None:
      length = 1 if self.hash is None else self.hash[1]
  
    self.hash = H.from_value(x, length)
    self.promise = x

  def push(self):
    if self.promise:
      self.l.set(self.promise)
      self.r.set(self.promise)
      self.promise = 0

  def pull(self):
    self.hash = H.op(self.l.hash, self.r.hash)


class SegmentTree:
  def __init__(self, a: list[int]):
    n = len(a)
    root = Node()
    stack = [(root, 0, n - 1)]
    while stack:
      node, l, r = stack.pop()
      if l == -1:
        node.pull()
      elif l == r:
        node.set(a[l])
      else:
        m = (l + r) // 2
        node.l, node.r = Node(p=node), Node(p=node)
        stack.extend([(node, -1, -1), (node.r, m + 1, r), (node.l, l, m)])

    self.root = root
    self.len = n

  def update(self, l: int, r: int, x: int) -> None:
    q_l, q_r = l, r
    stack = [(self.root, 0, self.len - 1)]
    while stack:
      node, l, r = stack.pop()
      if l == -1:
        node.pull()
      elif q_r < l or r < q_l:
        continue
      elif q_l <= l and r <= q_r:
        node.set(x)
      else:
        node.push()
        m = (l + r) // 2
        stack.extend([(node, -1, -1), (node.r, m + 1, r), (node.l, l, m)])

  def compare(self, l: int, r: int, k: int) -> bool:
    q_l, q_r = l, r
    hashes = []
    for q_l, q_r in [(q_l, q_l + k - 1), (q_r, q_r + k - 1)]:
      stack = [(self.root, 0, self.len - 1)]
      total_hash = H.from_value()
      while stack:
        node, l, r = stack.pop()
        if q_r < l or r < q_l:
          continue
        if q_l <= l and r <= q_r:
          total_hash = H.op(node.hash, total_hash)
        else:
          node.push()
          m = (l + r) // 2
          stack.extend([(node.l, l, m), (node.r, m + 1, r)])
      hashes.append(total_hash)
    return hashes[0] == hashes[1]


def main():
  _ = int(input())
  a = list(map(int, input().split()))

  tree = SegmentTree(a)

  for _ in range(int(input())):
    typ, l, r, k = map(int, input().split())
    l, r = l - 1, r - 1
    if typ == 0:
      tree.update(l, r, k)
    elif typ == 1:
      print('+' if tree.compare(l, r, k) else '-', end='')


if __name__ == "__main__":
  main()