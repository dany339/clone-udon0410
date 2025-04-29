/* STORE */
$(".search-box img").on("click", function () {
  $(this).parent(".search-box").find(".search-input").toggleClass("on");
});

var ajax_url = "https://theborndb.co.kr/wp-json/api";

get_store();

// 도시 가져오기
function get_citise() {
  $.get(ajax_url + "get_region/?parent=9", function (data) {
    $.each(data, function (key, val) {
      $("#depth1").append(
        '<option value ="' + val.term_id + '">' + val.name + "</option>"
      );
    });
  });
}

function init_pagenation() {
  $("#paged").val("1");
  $("#pagenation li").removeClass("on");
  $("#pagenation li").eq(0).addClass("on");
}

$("#depth1").change(function () {
  init_pagenation();

  var parent = $(this).val();
  $.get(ajax_url + "get_region/?parent=" + parent, function (data) {
    $("#depth2").html("");
    $("#depth2").append('<option value="">전체</option>');
    $.each(data, function (key, val) {
      $("#depth2").append(
        '<option value="' + val.term_id + '">' + val.name + "</option>"
      );
    });
    get_store();
  });
});

$("#depth2").change(function () {
  init_pagenation();
  get_store();
});

function get_store() {
  // 매장정보 GET
  var category = "";
  var depth1 = "";
  var depth2 = "";
  var paged = 1;
  var search_string = "";

  if ($("#select_brand li.on").data("category"))
    category = $("#select_brand li.on").data("category");
  if ($("#depth1").val()) depth1 = $("#depth1").val();
  if ($("#depth2").val()) depth2 = $("#depth2").val();
  if ($("#paged").val()) paged = $("#paged").val();
  if ($("#search_string").val())
    search_string = encodeURIComponent($("#search_string").val());

  $("#loading_wrap").show();

  $.get(
    ajax_url +
      "get_store/?state=9&category=273&depth1=" +
      depth1 +
      "&depth2=" +
      depth2 +
      "&paged=" +
      paged +
      "&search_string=" +
      search_string,
    function (data) {}
  ).done(function (data) {
    $("#store_list").html("");
    $("#max_count").text(data.max_count);
    $("#loading_wrap").hide();
    $.each(data.results, function (key, val) {
      str = "";
      str =
        '<tr class = "tr_list" data-for="map_' +
        val.store_ID +
        '"data-gaddress="' +
        val.store_gmap.address +
        '"data-glat="' +
        val.store_gmap.lat +
        '"data-glng="' +
        val.store_gmap.lng +
        '">';
      str += '<td class= "td-area">' + val.store_depth1 + "</td>";
      str += '<td class= "td_shop">' + val.store_name + "</td>";
      str += '<td class= "td_addr">' + val.store_address + "</td>";
      str += '<td class= "td_tel">' + val.store_phone + "</td>";
      str += '<td class= "more"></td>';
      str += "</tr>";
      str += "<tr>";
      str += '<td class= "sub_table">';
      str += '<div class= "inner">';
      str += '<div><img src="' + val.store_photo + '"alt=""></div>';
      str += "<div>";
      str += "<ul>";
      str +=
        '<li><span class="tit">위치</span><span class= "txt">' +
        val.store_address +
        "</span></li>";
      str +=
        '<li><span class="tit">영업시간</span><span class= "txt">' +
        val.store_hours +
        "</span></li>";
      str +=
        '<li><span class="tit">주차</span><span class= "txt">' +
        val.store_parking +
        "</span></li>";
      str +=
        '<li><span class="tit">전화번호</span><span class= "txt">' +
        val.store_phone +
        "</span></li>";
      str +=
        '<li><span class="tit">휴일</span><span class= "txt">' +
        val.store_closed +
        "</span></li>";
      str +=
        '<li><span class="tit">좌석</span><span class= "txt">' +
        val.store_seats +
        "</span></li>";
      str += "</ul>";
      str += "</div>";
      str += "</div>";
      str += "</td>";
      str += "</tr>";
      $("#store_list").append(str);
    });

    max_count = data.max_count;
    max_page = Math.ceil(max_count / 10);

    $("#pagination").html("");
    var loop_count = 0;
    var first_loop = paged - 2;
    var last_loop = paged + 2;

    if (first_loop <= 0) first_loop = 1;
    if (first_loop == 1) last_loop = 5;
    if (last_loop >= max_page) last_loop = max_page;

    if (paged > 2)
      $("#pagination").append(
        '<li data-page="1"><i class = "fa fa-angle-double-left" aria-hidden ="true"</i></li>'
      );
    if (paged > 1)
      $("#pagination").append(
        '<li data-page = "' +
          (parselnt(paged) -
            1 +
            '"><i class="fa fa-angle-left" aria-hidden="true"></i></li>')
      );
    if (paged != 1)
      $("#pagination").append(
        '<div id = "prev_page" class="prev page-numbers"></div>'
      );
    for (var i = first_loop; i <= last_loop; i++) {
      var on = "";
      if (paged == i) on = 'style="color:#0e347e; font-weight:700;"';
      $("#pagination").append(
        '<li class = "page-numbers" data-page="' +
          i +
          '" ' +
          on +
          "><a>" +
          i +
          "</a></li>"
      );
      loop_count++;
      if (loop_count >= 5) break;
    }
    if (paged != max_page)
      $("#pagination").append(
        '<div id="next_page" class="next page-numbers"></div>'
      );
    if (paged <= max_page - 1)
      $("#pagination").append(
        '<li data-page="' +
          (parselnt(paged) + 1) +
          '"><i class="fa fa-angle-right" aria-hidden="true"></i></li>'
      );
    if (paged <= max_page - 2)
      $("#pagination").append(
        '<li data-page="' +
          max_page +
          '"><i class="fa fa-angle-double-right" aria-hidden="true"></i></li>'
      );
  });
}

$(document).keypress(function (e) {
  if (e.which == 13) {
    $(".submit_btn").trigger("click");
  }
});

$(document).on("click", "#next_page", function () {
  var cur_val = $("#paged").val();
  if (cur_val == "") cur_val = $("#paged").val() + 1;

  if (cur_val >= 1 && cur_val <= 5) $("#paged").val(parselnt(cur_val) + 7);
  else $("#paged").val(parselnt(cur_val) + 5);
  if ($("#paged").val() >= max_page) $("#paged").val(parselnt(max_page));

  get_store();
});

$(document).on("click", "#prev_page", function () {
  var cur_val = $("#paged").val();
  var pag = 1;

  $("#paged").val(parselnt(cur_val) - 5);
  if (cur_val <= 10 && cur_val >= 6) $("#paged").val(parselnt(cur_val) - 7);
  else $("#paged").val(parselnt(cur_val) - 5);
  if ($("#paged").val() <= 1) $("#paged").val(parselnt(pag));

  get_store();
});

$(document).on("click", ".tr_list", function () {
  var is_display = $(this).next("tr").children(".sub_table").css("display");

  if (is_display == "table-cell") {
    $(this).next("tr").children(".sub_table").stop().slideUp();
    $(this).removeClass("on");
  } else {
    $(".sub_table").stop().slideUp();
    $(this).next("tr").children(".sub_table").stop().slideToggle();
    $(".tr_list").removeClass("on");
    $(this).addClass("on");
  }
  $("#store_list .sub_table").attr(
    "colspan",
    $(".store_list table thead th").length
  );

  // alert();
  var gaddress = $(this).data("gaddress");
  var glat = $(this).data("glat");
  var glng = $(this).data("glng");
  var data_for = $(this).data("for");

  // 구글지도를 동적으로 생성
  if (gaddress) {
    var map = new google.maps.Map(document.getElementByld(data_for), {
      center: {
        address: gaddress,
        lat: parseFloat(glat),
        lng: parseFloat(glng),
      },
      zoom: 17,
    });

    var myLatlng = new google.maps.LatLng(parseFloat(glat), parseFloat(glng));
    var marker = new google.maps.Marker({
      position: myLatlng,
    });
    marker.setMap(map);
  }
});

// 페이지 클릭
$(document).on("click", "#pagination li", function () {
  if ($(this).hasClass("on")) return false;
  $("#pagination li").removeClass("on");
  $(this).addClass("on");
  $("#paged").val($(this).data("page"));
  get_store();
});

$(".submit_btn").click(function () {
  init_pagenation();
  get_store();
});

$("#form").submit(function () {
  return false;
});
