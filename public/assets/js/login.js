$(document).ready(function() {
    
    // Give email input focus on load
    $("input[name='email']").focus();
    
    // When Next button is clicked load the password form part
    $('#loginLightbox').on('click', '#btnNext', function() {
        const email = $("input[name='email']").val();
        $("div[data-viewid='1']").removeClass('slide-in-right');
        $("div[data-viewid='1']").addClass('slide-out-left');
        $("div[data-viewid='1']").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() { 
            this.remove(); 
            $("#loginLightbox").html(`
                <input type="text" name="email" value="${email}" aria-hidden="true" style="display: none" autocomplete="current-username">
                <div data-viewid="2" class="animate slide-in-right">
                    <div id="btnBack" class="identity"><i class="fas fa-arrow-left mr-1"></i>${email}</div>
                    <div class="text-title">Enter password</div>
                    <div class="form-group mt-3">
                        <label for="password" class="sr-only"></label>
                        <input name="password" type="password" class="w-100 px-2" placeholder="Password" autocomplete="current-password">
                    </div>
                    <button id="btnLogin" type="submit" class="btn btn-primary w-25 float-right mt-4">Sign in</button>
                </div>
            `);
            $("input[name='password']").focus();
        });
    });
    
    // When Back button is clicked load the username form part
    $('#loginLightbox').on('click','#btnBack', function() {       
        const email = $("input[name='email']").val();
        $("div[data-viewid='2']").removeClass('slide-in-right');
        $("div[data-viewid='2']").addClass('slide-out-right');
        $("div[data-viewid='2']").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() { 
            this.remove(); 
            $("#loginLightbox").html(`
                <div data-viewid="1" class="animate slide-in-left">
                    <div class="text-title">Sign in</div>
                    <div class="form-group mt-3">
                        <label for="email" class="sr-only"></label>
                        <input name="email" type="email" class="w-100 px-2" placeholder="Email" value="${email}">
                    </div>
                    <div class="action-links">
                        <div class="form-group">
                            <span>no account? <a href="/signup">Create one!</a></span>
                        </div>
                    </div>
                    <button id="btnNext" type="button" class="btn btn-primary w-25 float-right mt-4">Next</button>
                </div>
            `);
            $("input[name='email']").focus();
        }); 
    });
});