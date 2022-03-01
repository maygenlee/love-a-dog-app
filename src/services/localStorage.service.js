const localStorageService = {
  saveUser: (user) => {
    const value = JSON.stringify(user);
    localStorage.setItem("activeUser", value);
  },
  getActiveUser: () => {
    return JSON.parse(localStorage.getItem("activeUser"));
  },
  removeActiveUser: () => {
    localStorage.removeItem("activeUser");
  },
};

function useLocalStorage() {
  return localStorageService;
}
export { useLocalStorage };
