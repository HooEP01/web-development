$("h1").addClass("title");

$("button").text("let it go");

console.log($("a").attr("href", "https://www.bing.com"));

$("h1").click(function () {
    $("h1").css("color", "purple")
})

$(document).keydown(function (event) {
    $("h1").text(event.key)
})
// $("input").keydown(function (event) {
//     $("h1").text(event.key)
// })

$(document).on("click", function (event) {
    $("h1").text("On event reference")
})

$("h1").before("<button>New before button</button>")
$("h1").after("<button>New after button</button>")
$("h1").prepend("<button>New before button</button>")
$("h1").append("<button>New after button</button>")

// to remove all button element
// $("button").remove()
$("button").hide()
$("button").show()
$("button").click(function () {
    // $("h1").toggle()
    // $("h1").fadeOut()
    // $("h1").fadeIn()
    // $("h1").fadeToggle()
    // $("h1").slideUp()
    // $("h1").slideDown()
    // $("h1").slideToggle()
    $("h1").animate({
        opacity: 0.5,
    })
})