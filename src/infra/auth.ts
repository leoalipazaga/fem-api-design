import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createJWT = (user: { id: string; username: string }) =>
  jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);

export const comparePassword = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(4);
  return await bcrypt.hash(password, salt);
};

export const isJWTValid = async (token: string) =>
  await jwt.verify(token, process.env.JWT_SECRET);
