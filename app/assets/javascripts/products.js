$(document).ready(function() {
  var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/products';

  if(location.pathname === '/') {
    $.ajax({
      url: baseUrl,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        var tbody = $('#products');
        data.products.forEach(function(product) {
          var price = product.base_price ? product.base_price : '0';
          var description = product.description ? product.description : '';
          var row = '<tr><td>' + product.name + '</td>';
              row += '<td>$' + price + '.00</td>';
              row += '<td>' + description + '</td>';
              row += '<td><button data-id="' + product.id + '"class="btn">Show</button></td></tr>';
              tbody.append(row);
        });
      },
      error: function(error) {
        console.log(error);
      }
    });

    $(document).on('click', '.btn', function() {
      var id = this.dataset.id;
      location.href= '/products/' + id; 
    });
  }

  var reg = /\/products\/\d+/;
  if(location.pathname.match(reg)) {
    var panel = $('#panel');
    var id = panel.data('id');
    $.ajax({
      url: baseUrl + '/' + id,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        var product = data.product;
        panel.children('#heading').html(product.name);
        var list = $('#product');
        var price = '<li>Price: $' + product.base_price + '</li>';
        var description = '<li>Description: ' + product.description + '</li>';
        var remove = '<li><button class="btn" id="remove">Delete</button></li>';
        list.append(price);
        list.append(description);
        list.append(remove);
      }
    });

    $(document).on('click', '#remove', function() {
      $.ajax({
        url: baseUrl + '/' + id,
        type: 'DELETE',
        success: function() {
          location.href = '/';
        }
      }); 
    });
  }

  $('#new_product').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: baseUrl,
      type: 'POST', 
      dataType: 'JSON',
      data: $(this).serializeArray(),
      success: function(data) {
        location.href = '/';
      }
    });
  });
});