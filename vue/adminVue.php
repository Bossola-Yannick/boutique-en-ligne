<?php
include '../components/header.php';
?>
<?php
include '../components/banner.php';
?>
<section class="admin-section">
  <h1 class="admin-title">Pimp My Poule</h1>
  <!-- Gestions des Article -->
  <section class="admin-product">
    <h2 class="admin-subtitle">Produits</h2>
    <table>
      <thead>
        <tr>
          <th>Article</th>
          <th>Description</th>
          <th>Photo</th>
          <th>Type</th>
          <th>Catégories</th>
          <th>tag</th>
          <th>Stock</th>
          <th>Prix Unitaire HT</th>
          <th>% Prommotion</th>
          <th>TVA</th>
          <th>Prix TTC</th>
        </tr>
      </thead>
      <tbody></tbody>
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