import jwt from 'jsonwebtoken';

export const decodeToken = (token: string) => {
  const SECRET = process.env.NEXT_PUBLIC_SECRET;
  if (!SECRET) {
    return {
      isDecoded: false,
      message: 'Problemas com a variavel SECRET'
    };
  }
  try {
    const decoded = jwt.verify(token, SECRET);

    return { decoded: decoded, isDecoded: true };
  } catch (err) {
    return {
      isDecoded: false,
      message: 'Erro na verificação do token'
    };
  }
};
