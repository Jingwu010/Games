export function detectCollision(position, others) {
  return others.some(
    body => body.position.x === position.x && body.position.y === position.y
  );
}
