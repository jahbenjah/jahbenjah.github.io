---
layout: post
description: Como seleccionar un select con selenium
---

<div class="example">
  <h3>Lista en un select</h3>
  <select id="dropdown">
    <option value="" disabled="disabled" selected="selected">Por favor selecciona una opción</option>
    <option value="1">Opción 1</option>
    <option value="2">Opción 2</option>
  </select>
</div>
<script>
  var dropdown = document.getElementById('dropdown');
  dropdown.onchange = function(event) {
    var options = dropdown.getElementsByTagName('option');
    for (var i = 0; i < options.length; i++) {
      options[i].removeAttribute('selected');
    }
    document
      .querySelector(`#dropdown option[value='${event.target.value}']`)
      .setAttribute('selected', 'selected');
  };
</script>
