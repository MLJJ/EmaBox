function DeviseRegistrationsNewView() {
    document.getElementById("account_picture").addEventListener("change", function (e) {
        input = e.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("imgPerfil").setAttribute('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    });
}