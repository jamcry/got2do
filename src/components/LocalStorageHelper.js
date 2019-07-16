// Fetch and parse the localStorage item with given key, returns false otherwise
export default function fetchFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  if(data) return (JSON.parse(data));
  else return false;
}