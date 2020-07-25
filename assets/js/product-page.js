rate = (i) => {

    // if already selected 
    if (document.getElementsByClassName(i)[0].style.color == "goldenrod") {
        for (let j=i+1; j<=5; j++) {
            document.getElementsByClassName(j)[0].style.color = "lightgray";
        }
    }

    // making new selection
    else {

        for (let j=1; j<=i; j++) {
            console.log(j + " ");
            document.getElementsByClassName(j)[0].style.color = "goldenrod";
        }
    }
} 

$('#storage p').html('Storage: 64GB');
$('#storage button').click(function () {
    $('#storage button').removeClass('btn-outline-danger');
    $('#storage button').addClass('btn-outline-secondary');
    $('#storage p').html('Storage: ' + this.id + 'GB');
    $(this).addClass('btn-outline-danger');
});

$('#color p').html('Colour: grey');
$('#color i').click(function () {
    $('#color i').css('opacity', '0.4');
    $('#color p').html('Colour: ' + this.id);
    $(this).css('opacity', '1');
});