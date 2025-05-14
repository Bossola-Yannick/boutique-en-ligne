const getAllInfo = async () => {
  try {
    const response = await fetch(`../controller/UserController.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur dans le fetch getAllInfo :`, error);
    throw error;
  }
};
const getProfilInfo = async () => {
  const data = await getAllInfo();
  console.log(data[0]);
};
getProfilInfo();
