function bindUrlInput() {
  $('#url-input').keypress(function(event) {
    /* bind enters key */
    if (event.which === 13) {
      var url = $(this).val();
      
      if (is_valid_url(url)) {
        var base_url = extract_base_url(url);
        
        if (url_lists.indexOf(base_url) === -1) {
          // add url to url list
          url_lists.push(base_url);
          to_sync.push(base_url);
          console.log('Url lists: ' + url_lists);
            
          // update view
            $('#url-list').prepend('<li>' + base_url + '</li>')
        }
          
        // empty textbox
        $(this).val('');
      }
    }
  });
}

function sync_url_to_db() {
    console.log('To sync: ' + to_sync);
    
    var params = {'urls': to_sync};
    $.post('/url/sync', params, function(data) {
      console.log(data);
    });
    
    to_sync = [];
}

function extract_base_url(url) {
  var working_url = url;
    
  // remove http:// or https:// and grab base url
  if (/^https?/i.test(working_url)) {
    var tokens = working_url.split('/');
    working_url = tokens[2];
  }
  else {
    var tokens = working_url.split('/');
    working_url = tokens[0];
  }
    
  // remove www.
  if (/^www\./i.test(working_url)) {
    working_url = working_url.slice(4);
  }
    
  return working_url;
}

function is_valid_url(url) {
  // modified regex
  // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
  return /^((https?|ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}
