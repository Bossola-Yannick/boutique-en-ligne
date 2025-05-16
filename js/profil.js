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
  const userInfo = data[0];
  $(".item-mail").text(userInfo.email);
  $(".item-password").text("*******");
  $(".item-firstname").text(" " + userInfo.first_name);
  $(".item-lastname").text(" " + userInfo.last_name);
  $(".item-adress").text(" " + userInfo.adress);
  $(".item-postalcode").text(" " + userInfo.postal_code);
  $(".item-city").text(" " + userInfo.city);
  console.log(userInfo);
};
if (
  window.location.href ===
  "http://localhost/boutique-en-ligne/vue/profilVue.php"
) {
  getProfilInfo();
}
