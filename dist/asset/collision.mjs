//collision rectangle and circle
function RectCircleColliding(circle, rect) {
	var distX = Math.abs(circle.x - rect.x - rect.w / 2);
	var distY = Math.abs(circle.y - rect.y - rect.h / 2);

	if (distX > rect.w / 2 + circle.r) {
		return false;
	}
	if (distY > rect.h / 2 + circle.r) {
		return false;
	}

	if (distX <= rect.w / 2) {
		return true;
	}
	if (distY <= rect.h / 2) {
		return true;
	}

	var dx = distX - rect.w / 2;
	var dy = distY - rect.h / 2;
	return dx * dx + dy * dy <= circle.r * circle.r;
}

//collision circle
function CirclesColliding(c1, c2) {
	var dx = c2.x - c1.x;
	var dy = c2.y - c1.y;
	var rSum = c1.r + c2.r;
	return dx * dx + dy * dy <= rSum * rSum;
}

//collision rectangle
function RectsColliding(r1, r2) {
	return !(
		r1.x > r2.x + r2.w ||
		r1.x + r1.w < r2.x ||
		r1.y > r2.y + r2.h ||
		r1.y + r1.h < r2.y
	);
}

export { RectCircleColliding, CirclesColliding, RectsColliding };