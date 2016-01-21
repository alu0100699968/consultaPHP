$(document).ready(function() {
  $('.button').click(function() {
    var bla = $('#texto').val();
    var sitio = $('#position').text();
    $.ajax({
      url: 'http://pr0poise.esy.es/test.php',
      type: 'post',
      data: {
        "action": bla,
        "action2": sitio
      },
      success: function(response) {
        drawTable(JSON.parse(response));
      }
    });

    function drawTable(data) {
      var row = $("<tbody>");
      for (var i = 0; i < data.length; i++) {
        drawRow(data[i], row);
      }
    }

    function drawRow(rowData, row) {
      var roww = $("<tr>");
      $("#personDataTable").append(row);
      roww.append($('<td><b class="ui-table-cell-label">Nombre</b>' + rowData.Nombre + "</td>"));
      roww.append($('<td><b class="ui-table-cell-label">Calle</b>' + rowData.Calle + "</td>"));
      roww.append($('<td><b class="ui-table-cell-label">Teléfono</b>' + rowData.Telefono + "</td>"));
      row.append(roww);
    }
  });
});
