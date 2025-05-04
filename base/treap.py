class Treap:
  def __init__(self, x, y, left = None, right = None):
    self.x = x
    self.y = y
    self.left = left;
    self.right = right;

  def merge(self, left, right):
    if left == None: return right
    if right == None: return left
    if left.y > right.y:
      x, y, l, r = left.x, left.y, left.left, self.merge(left.right, right)
    else:
      x, y, l, r = right.x, right.y, self.merge(left, right.left), right.right
    return Treap(x, y, l, r)
  
  def split(self, x, left, right)
{
    Treap newTree = null;
    if (this.x <= x)
    {
        if (Right == null)
            R = null;
        else
            Right.Split(x, out newTree, out R);
        L = new Treap(this.x, y, Left, newTree);
    }
    else
    {
        if (Left == null)
            L = null;
        else
            Left.Split(x, out L, out newTree);
        R = new Treap(this.x, y, newTree, Right);
    }
}