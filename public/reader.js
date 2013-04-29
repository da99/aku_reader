
var feed_data = null;

fermata.json('/read-url').post({url: "http://www.holoscience.com/wp/feed/"}, function (err, data) {
  if (err) throw err;

  if (data.data) {
    feed_data = data.data;
    show((data.data));
  }
});

function show_content(e) {
  var i = $(this).parents('div.item');
  var showing = i.hasClass('selected');
  $("#content div.item").removeClass('selected');
  if (!showing)
    i.addClass('selected');
  return false;
}

function new_post(item) {
  var post = $('<div class="item"><a class="title"></a><div class="date"></div><div class="content"></div></div>');
  post.find('a').attr('href', item.link);
  post.find('a').text(item.title);
  post.find('a').on('click', show_content);
  post.find('div.date').text(item.pubdate);
  post.find('div.content').html(item.description);
  return post;
}

function new_feed(title, link) {
  var e = $('<div class="item"><div class="title"><a href=""></a></div></div>');
  $(e.find('a')).attr('href', link);
  $(e.find('a')).text(title);
  e.attr('id', link.replace(/[^a-z0-9\_]/g, '_'));
  e.on('click', function (e) {
    show_posts($(this).parents('div.item'));
    return false;
  });
  return e;
};

var feeds = {};
var show = function (xml) {
  var e = new_feed(xml.title, xml.link);
  feeds[e.attr('id')] = e.items;
  $( "#feeds" ).append( e  );
  _.each(xml.items, function (i) {
    $( "#content" ).prepend( new_post(i) );
  });
};

