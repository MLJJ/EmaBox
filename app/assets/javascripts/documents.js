//= require jspdf.js

$(function () {
    $('#createDocument').on('click',function () {
        window.location.href = "/documents/new";
    });

    $('#exportDocument').on('click',function () {

        content = CKEDITOR.instances['documentContent'].getData();
        if (content != '' && content != null){
            if ($('#fileName').val() != null && $('#fileName').val() != ''){
                margins = {
                    top: 60,
                    bottom: 60,
                    left: 40,
                    width: 522
                };
                pdf = new jsPDF('p', 'pt', 'letter');
                pdf.fromHTML(
                    content,
                    margins.left,
                    margins.top,
                    {'width': margins.width},
                    function () {
                        pdf.save($('#fileName').val() + '.pdf');
                    },
                    margins);
            }else{
                alertify.notify('Falta el nombre del documento', 'error', 3);
            }
        }else{
            alertify.notify('No has escrito nada dentro del documento', 'error', 3);
        }
    });

    $('#fileSubmit').on('click',function (event) {
        if ($('#documentContent').val() == null && $('#fileName').val().trim() === ''){
            alertify.notify('El nombre y el contenido de documento no pueden estar vacio', 'warning', 3);
            event.preventDefault();
        }
    });
});