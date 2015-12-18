$(document).ready(function() {
  $('.button').click(function() {
    var bla = $('#texto').val();
    $.ajax({
      url: 'http://pr0poise.esy.es/test.php',
      type: 'post',
      data: {
        "action": bla
      },
      success: function(response) {
        //window.alert(response);
        console.log(JSON.parse(response).Nombre);
        //$('#resultados').text(JSON.stringify(JSON.parse(response), null, 4));
        drawRow(JSON.parse(response));
      }
    });

    function drawTable(data) {
      for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
      }
    }

    function drawRow(rowData) {
      var row = $("<tbody>")
      var roww =$("<tr>")
      $("#personDataTable").append(row);
      roww.append($('<td><b class="ui-table-cell-label">ID</b>' + rowData.ID + "</td>"));
      roww.append($('<td><b class="ui-table-cell-label">Nombre</b>' + rowData.Nombre + "</td>"));
      roww.append($('<td><b class="ui-table-cell-label">Descripción</b>' + rowData.Descripcion + "</td>"));
      roww.append($('<td><b class="ui-table-cell-label">Precio</b>' + rowData.Precio + "</td>"));
      roww.append($('<td><b class="ui-table-cell-label">Stock</b>' + rowData.Stock + "</td></t"));
      row.append(roww);
      console.log(row);
    }
  });
});
