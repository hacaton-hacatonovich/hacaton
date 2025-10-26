// @ts-nocheck
export const extractCookieValue = (setCookieHeaders, cookieName) => {
  if (!setCookieHeaders) return null;
  
  // Если один cookie - преобразуем в массив
  const cookiesArray = Array.isArray(setCookieHeaders) 
    ? setCookieHeaders 
    : [setCookieHeaders];
  
  for (const cookieHeader of cookiesArray) {
    if (cookieHeader.includes(`${cookieName}=`)) {
      // Извлекаем значение cookie
      const match = cookieHeader.match(new RegExp(`${cookieName}=([^;]+)`));
      if (match) {
        return match[1];
      }
    }
  }
  return null;
};