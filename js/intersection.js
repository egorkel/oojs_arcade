// Geometry classes
// Point
var Point = function (x, y) {
    this.x = x;
    this.y = y;
};
//p-p0
Point.prototype.sub = function (p0) {
    return new Point(this.x - p0.x, this.y - p0.y);
};

// Check, if p1 is on the left side of the line p2p3
var LeftOf = function (p1, p2, p3) {
    var pa = p3.sub(p2);
    var pb = p1.sub(p2);
    var par = pa.x * pb.y - pb.x * pa.y;
    var result = false;
    if (par > 0) {
        result = true;
    }
    return result;
};

// Check, if p1 is inside the rectangle with diagonal p2p3
var IsInside = function (p1, p2, p3) {
    // The second diagonal of the rectangle
    var pa = new Point(p2.x, p3.y);
    var pb = new Point(p3.x, p2.y);
    return LeftOf(p1, p2, pb) &&    // Bottom side
           LeftOf(p1, pb, p3) &&    // Right side
           LeftOf(p1, p3, pa) &&    // Top side
           LeftOf(p1, pa, p2);      // Left side
};

// Check, if rectangles pa1pa2 and pb1pb2 intersect
// pa1pa2 - diagonal of the thirst rectangle
// pb1pb2 - diagonal of the second rectangle
var IsRecIntersect = function (pa1, pa2, pb1, pb2) {
    // The second diagonals of the rectangles
    var pa3 = new Point(pa1.x, pa2.y);
    var pa4 = new Point(pa2.x, pa1.y);
    var pb3 = new Point(pb1.x, pb2.y);
    var pb4 = new Point(pb2.x, pb1.y);
    return IsInside(pb1, pa1, pa2) ||
           IsInside(pb2, pa1, pa2) ||
           IsInside(pb3, pa1, pa2) ||
           IsInside(pb4, pa1, pa2) ||
           IsInside(pa1, pb1, pb2) ||
           IsInside(pa2, pb1, pb2) ||
           IsInside(pa3, pb1, pb2) ||
           IsInside(pa4, pb1, pb2);
};