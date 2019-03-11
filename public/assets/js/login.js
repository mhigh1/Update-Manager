$(document).ready(function() {
    // When Next button is clicked load the password form part
    $('#loginLightbox').on('click', '#btnNext', function() {
        $("div[data-viewid='1']").removeClass('slide-in-right');
        $("div[data-viewid='1']").addClass('slide-out-left');
        $("div[data-viewid='1']").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) { 
            this.remove(); 
            $("#loginLightbox").html(`<div data-viewid="2" class="animate slide-in-right">
                <div id="btnBack" class="identity"><i class="fas fa-arrow-left mr-1"></i>USERNAME</div>
                <div class="text-title">Enter password</div>
                <div class="form-group mt-3">
                    <label for="password" class="sr-only"></label>
                    <input name="password" type="password" class="w-100 px-2" placeholder="Password">
                </div>
                <button id="btnLogin" type="button" class="btn btn-primary w-25 float-right mt-4">Sign in</button>
            </div>`);
        });
    });
    // When Back button is clicked load the username form part
    $('#loginLightbox').on('click','#btnBack', function() {
        $("div[data-viewid='2']").removeClass('slide-in-right');
        $("div[data-viewid='2']").addClass('slide-out-right');
        $("div[data-viewid='2']").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) { 
            this.remove(); 
            $("#loginLightbox").html(`<div data-viewid="1" class="animate slide-in-left">
                <div class="text-title">Sign in</div>
                <div class="form-group mt-3">
                    <label for="username" class="sr-only"></label>
                    <input name="username" type="text" class="w-100 px-2" placeholder="Email or Username">
                </div>
                    <button id="btnNext" type="button" class="btn btn-primary w-25 float-right mt-4">Next</button>
            </div>`);
        }); 
    });
});