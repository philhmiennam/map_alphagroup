/*//GET VALUE DEFAULT---------------------------------------------------------------

let form = {};

//get type map
$.getJSON('/rest/typemap').then(resp => {
    resp.forEach(item =>
        // value of td - table
        $('#getselect_typemap').append('<option value="' + item.id + '">' + item.name + '</option>')
    );
});

//get province
$.getJSON('/rest/province').then(resp => {
    resp.forEach(item =>
        $('#getselect_province').append('<option value="' + item.id + '">' + item.name + '</option>')
    );
});
//--------------------------------------------------------------------------------

function select_province() {

    // $("#getselect_district").append([null]);

    var id_province = $("#getselect_province").val();
    $("#getselect_district").empty();
    $.ajax({
        url: "/rest/district/" + id_province,
        success: function (data) {
            data.forEach(item =>
                $('#getselect_district').append('<option value="' + item.id + '">' + item.name + '</option>')
            );
        }
    });
}

function select_district() {
    var id_district = $("#getselect_district").val();
    $("#getselect_commune").empty();
    $.ajax({
        url: "/rest/findCommuneById/" + id_district,
        success: function (data) {
            data.forEach(item =>
                $('#getselect_commune').append('<option value="' + item.id + '">' + item.name + '</option>')
            );
        }
    });
}

// function submitdemo() {
//     var id_district = $("#getselect_district").val();
//     var id_province = $("#getselect_province").val();
//     var id_commune = $("#getselect_commune").val();
// }


function uploadFile() {
    let formData = new FormData();
    formData.append("file", fileupload.files[0]);
    console.log(formData);

    axios.post('/rest/upload/mbtiles_file', formData)
        .then(response => element.innerHTML = response);
}*/