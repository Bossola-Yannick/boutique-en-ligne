<?php
include '../components/header.php';
include '../components/search.php';
include '../components/banner.php';
?>
<section class="admin-section">
  <!-- Gestions des Article -->
  <section class="admin-product">
    <h2 class="admin-subtitle">Produits</h2>
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