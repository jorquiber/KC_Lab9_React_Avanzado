export function failureRedirects(router, redirectsMap) {
  return function (store) {
    return function (next) {
      return function (action) {
        const result = next(action);

        if (!action.error) {
          return result;
        }

        const redirect = redirectsMap[action.payload.status];
        if (redirect) {
          router.navigate(redirect);
        }

        return result;
      };
    };
  };
}
