// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require material.js
//= require devise
//= require alertify
//= require jquery
//= require ckeditor/init
//= require jquery.form
//= require jquery.validate.min
//= require additional-methods
//= require_tree .
function FilesShow() {
    var files = $("#divContainerFiles").find(".divContainerFile");
    $.each(files, function (index, value) {
        var type = $(value).find("#mimeType").text();
        if (type.indexOf("pdf") !== -1) {
            $(value).find("img").attr({src: "pdf.png"});
        } else if (type.indexOf("word") !== -1) {
            $(value).find("img").attr({src: "doc.png"});
        } else {

        }
    });
    alertify.dialog('genericDialog', function () {
        return {
            main: function (content) {
                this.setContent(content);
            },
            setup: function () {
                return {
                    options: {
                        basic: true,
                        maximizable: false,
                        resizable: false,
                        padding: false
                    }
                };
            },
            build: function () {
                $(this.elements.dialog).css("max-width", "75%");
                $(this.elements.dialog).css("padding", "15px");
            },
            settings: {
                selector: undefined
            },
            hooks: {
                onclose: function () {
                    $("#document_filer").parent().find("label").css("background", "#adafb0 url('https://www.shareicon.net/data/128x128/2015/09/21/104434_cloud_52x52.png') no-repeat center");
                    $("#document_filer").attr("value","");
                }
            }
        };
    });
    $("#btnAddFile").click(function (e) {
        e.preventDefault();
        alertify.genericDialog($('#loadModal').find("form")[0]);
    });
    $("#document_filer").change(function (e) {
        $(this).parent().find("label").css("background", "#00bcd4 url('https://www.shareicon.net/data/128x128/2015/09/21/104434_cloud_52x52.png') no-repeat center");
    });
    $(".optionShare").click(function () {
        var id = $(this).parent().parent().parent().find("#fileId").text();
        url = $(location).attr("href");
        url = $(location).attr("href", "shared_documents/new?id="+id);
    });
    $(".optionShow").click(function () {
        var id = $(this).parent().parent().parent().find("#fileId").text();
        url = $(location).attr("href");
        url = $(location).attr("href", "documents/"+id);
    });
}
function SharedFile() {
    var date = $("#dateCreate").text().split(" ");
    var day = date[0];
    var time = date[1];
    $("#day").text(day);
    $("#time").text(time);
    var type = $("#mimeType").text();
    if (type.indexOf("pdf") !== -1) {
        $(".imgFile").attr({src: "../pdf.png"});
    } else if (type.indexOf("word") !== -1) {
        $(".imgFile").attr({src: "../doc.png"});
    } else {
    alert("¡Wow! ¿¿entro a esta condición?? :o");

        //Documento no aceptado ¿¿entro a esta condición?? :o
    }
    $(document).on('click', '.divContainerAccount', function () {
        var idAccount = $(this).find("#idAccount").text();
        if (selectedAccounts.indexOf(idAccount) !== -1) {
            selectedAccounts.splice(selectedAccounts.indexOf(idAccount), 1);
            $(this).css("background", "white");
            $("#contadorSeleccionados").text(selectedAccounts.length);
        }else{
            selectedAccounts.push(idAccount);
            $(this).css("background", "lightgray");
            $("#contadorSeleccionados").text(selectedAccounts.length);
        }
    });
    $("input").keyup(function () {
        var busqueda = $(this).val();
        $("#divAccounts").empty();
        $.each(accounts, function (index, account) {
            if(account[0].search(busqueda) > -1 || account[1].search(busqueda) > -1){
                if(selectedAccounts.indexOf(account[2]) !== -1){
                    $("#divAccounts").append(
                        "<div class='divContainerAccount mdl-cell mdl-cell--6-col mdl-cell--4-col-phone' style='background-color: lightgray'>" +
                        "<span>"+account[0]+"</span><br>" +
                        "<span>"+account[1]+"</span>" +
                        "<span class='elementHide' id='idAccount'>"+account[2]+"</span>" +
                        "</div>"
                    );
                }else{
                    $("#divAccounts").append(
                        "<div class='divContainerAccount mdl-cell mdl-cell--6-col mdl-cell--4-col-phone'>" +
                        "<span>"+account[0]+"</span><br>" +
                        "<span>"+account[1]+"</span>" +
                        "<span class='elementHide' id='idAccount'>"+account[2]+"</span>" +
                        "</div>"
                    );
                }
            }
        });
    });
    $("#btnCompartir").click(function (e) {
        e.preventDefault();
        $.each(selectedAccounts, function (index, selectedAccount) {
            $.ajax({
                url: "/shared_documents",
                type: "POST",
                headers: {
                    'X-Transaction': 'POST',
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    idAccount: selectedAccount,
                    idDocument: $("#idDocument").text()
                },
                success: function (result) {
                    alertify.notify('Se ha subido un documento', 'success', 3, function(){  });
                    url = $(location).attr("href", "/");
                },
                error: function (result) {
                    alertify.notify('Ocurrio un error al compartir, saldra de la ventana', 'error', 5, function(){  });
                    url = $(location).attr("href", "/");
                }
            });
        });
    });
}
function SharedFilesShow() {
    var files = $("#divContainerFiles").find(".divContainerFile");
    $.each(files, function (index, value) {
        var type = $(value).find("#mimeType").text();
        if (type.indexOf("pdf") !== -1) {
            $(value).find("img").attr({src: "pdf.png"});
        } else if (type.indexOf("word") !== -1) {
            $(value).find("img").attr({src: "doc.png"});
        } else {

        }
    });
}
$(function () {
    $(".tagFirma").click(function () {
        $.ajax({
            type: "POST",
            dataType: "JSON",
            url: "http://192.168.0.128:4000/api/documents/generatePairKeys",
            data: ({'name':'lalolanda','email':'lalolanda@gmail.com'}),
            success: function(responseText){
                if(responseText.code === "200") {
                    alertify.notify('Se ha generado la firma correctamente', 'success', 3, function () {
                    });
                    url = $(location).attr("href", "/");
                }else {
                    alertify.notify('No se ha podido genera la firma', 'error', 3, function(){  });
                }
            }
        })
            .done(function() {
                console.log("success");
            })
            .fail( function( jqXHR, textStatus, errorThrown ) {
                console.log("error",jqXHR.status + ", " + jqXHR.responseText + ", " + errorThrown);
            })
    });

    if($(location).attr("href").search("shared_documents") > -1){
        $("#shared").addClass("active");
        $("#root").removeClass("active");
    }else{
        $("#root").addClass("active");
        $("#shared").removeClass("active");
    }
});
$(function() {
    $(document).on('click', '.toggle-window', function(e) {
        e.preventDefault();

        var panel = $(this).parent().parent();
        var messages_list = panel.find('.messages-list');

        panel.find('.panel-body').toggle();
        //$(this).text("+");
        panel.attr('class', 'panel panel-default');

        if (panel.find('.panel-body').is(':visible')) {
            var height = messages_list[0].scrollHeight;
            messages_list.scrollTop(height);
            //$(this).text("-");
        }
    });
});
$(function () {
    $.validator.addMethod("alfanumOespacio", function(value, element) {
        return /^[ a-záéíóúüñ]*$/i.test(value);
    }, "Ingrese sólo letras y espacios.");
    $.validator.addMethod("alfaNum", function(value, element) {
        return /^[ a-z0-9]*$/i.test(value);
    }, "Ingrese sólo letras, espacios y numeros.");
   $("#edit_account").validate({
       rules: {
           "account[password]":{
               minlength: 6
           },
           "account[password_confirmation]": {
               equalTo : "#account_password",
               minlength: 6
           }
       },
       messages: {
           "account[full_name]": {
               required: "Se necesita el nombre completo",
               alfanumOespacio: true
           },
           "account[user_name]":{
               required: "Se necesita un nombre de usuario"
           },
           "account[email]":{
               required: "Se requiere un correo electronico"
           },
           "account[current_password]":{
               required: "Ingrese la contraseña actual correcta"
           },
           "account[password]":{
               minlength: "La contraseña debe tener por lo menos 6 caracteres"
           },
           "account[password_confirmation]":{
               equalTo: "Las contraseñas no coinciden",
               minlength: "La contraseña debe tener por lo menos 6 caracteres"
           }
       }
   });
   $("#formdocument").validate({
       rules: {
           "fileName": {
               alfaNum: true
           }
       },
       messages: {
           "fileName": {
               required: "Por favor introducir el nombre del archivo"
           }
       }
   });
   $("#new_account").validate({
       rules: {
           "account[password]":{
               minlength: 6,
               required: true
           },
           "account[password_confirmation]": {
               equalTo : "#account_password",
               minlength: 6
           },
           "account[full_name]":{
               minlength: 5,
               alfanumOespacio: true
           }
       },
       messages: {
           "account[full_name]":{
               required: "Se necesita proporcionar un nombre completo para la cuenta nueva",
               lettersonly: "El nombre solo puede aceptar letras",
               minlength: "El nombre completo debe ser de más de 5 caracteres"
           },
           "account[password]": {
               required: "Es necesario proporcionar una contraseña",
               minlength: "La contraseña debe tener por lo menos 6 caracteres"
           },
           "account[password_confirmation]":{
               equalTo: "Las contraseñas no coinciden",
               minlength: "La contraseña debe tener por lo menos 6 caracteres"
           },
           "account[user_name]": {
               required: "Introduzca un nombre de usuario"
           },
           "account[email]": {
               required: "Introduzca un email",
               email: "Por favor introduzca un e-mail valido"
           }
       }
   });
});
