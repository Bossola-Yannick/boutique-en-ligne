<?php
include '../components/header.php';
include '../components/search.php';
// include '../components/banner.php';
?>
<section class="admin-section">
  <h1 class="admin-page-title">Pimp my Poule</h1>
  <!-- Gestions des Article -->
  <section class="admin-product">
    <h2 class="admin-subtitle">Produits</h2>
    <div class="create-product button">Ajouter un nouvel article</div>
    <table class="table-product">
      <thead class="table-product-head">
        <tr>
          <th class="table-column-title">Article</th>
          <th class="table-column-title">Description</th>
          <th class="table-column-title">Photo</th>
          <th class="table-column-title">Type</th>
          <th class="table-column-title">Catégories</th>
          <th class="table-column-title">Stock</th>
          <th class="table-column-title">Prix Unitaire HT</th>
          <th class="table-column-title">Prix TTC</th>
          <th class="table-column-title">% Prommotion</th>
          <th class="table-column-title">Prix Final</th>
        </tr>
      </thead>
      <tbody class="table-product-body">
      </tbody>
    </table>
  </section>
  <div class="overlay"></div>
  <!-- MODAL CREATE -->
  <div class="modal-create">
    <div class="modal-header">
      <h2 class="modal-title">Nouveau Produit</h2>
    </div>
    <div class="modal-body">
      <form action="" class="form-create">
        <input type="text" name="name" id="" placeholder="nom du produit">
        <input type="text" name="description" id="" placeholder="description">
        <input type="text" name="photo" id="" placeholder="lien de l'image">
        <select name="type" id="category">
          <option value="">-- catégorie --</option>
          <option value="category">accessoire</option>
          <option value="tag">deguisement</option>
          //! mettre les option en JS
        </select>
        <select name="category" id="sub-category">
          <option value="">-- sous-catégories --</option>
          //! mettre les option en JS
        </select>
        <input type="number" name="stock" id="" placeholder="stock">
        <input type="number" name="price-ht" id="" placeholder="prix Ht">
        <input type="number" name="price-ttc" id="" placeholder="prix TTC">
        <input type="number" name="promotion" id="" placeholder="% Promotion">
        <input type="number" name="price-discount" id="" placeholder="prix de vente" readonly>
        <button type="submit" class="button form-valid">Valider</button>
      </form>
    </div>
    <div class="modal-footer">
      <button class="modal-close button">Fermer</button>
    </div>
  </div>
  <!-- MODAL UPDATE -->
  <div class="modal-update">
    <div class="modal-header">
      <h2 class="modal-title">Nouveau Produit</h2>
    </div>
    <div class="modal-body">
      <form action="">
        <input type="text" name="name" id="" placeholder="nom du produit">
        <input type="text" name="description" id="" placeholder="description">
        <input type="text" name="photo" id="" placeholder="lien de l'image">
        <select name="type" id="category">
          <option value="">-- catégorie --</option>
          <option value="category">accessoire</option>
          <option value="tag">deguisement</option>
          //! mettre les option en JS
        </select>
        <select name="category" id="sub-category">
          <option value="">-- sous-catégories --</option>
          //! mettre les option en JS
        </select>
        <input type="number" name="stock" id="" placeholder="stock">
        <input type="text" name="price-ht" id="" placeholder="prix Ht">
        <input type="text" name="price-ttc" id="" placeholder="prix TTC">
        <input type="number" name="promotion" id="" placeholder="% Promotion">
        <input type="text" name="price-discount" id="" placeholder="prix de vente">
        <button type="submit" class="button form-valid">Valider</button>
      </form>
    </div>
    <div class="modal-footer">
      <button class="modal-close button">Fermer</button>
    </div>
  </div>
  <!-- Gestions des Sous-Catégories "table sub-category -->
  <section class="admin-accessories">
    <h2 class="admin-subtitle">Catégories</h2>
  </section>
  <!-- Gestions des Catégories "table tag" -->
  <section class="admin-tags">
    <h2 class="admin-subtitle">Sous-Catégories</h2>
  </section>

</section>

<?php
include '../components/footer.php';
?>