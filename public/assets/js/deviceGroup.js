// Used by deviceGroup.hbs //

// SAMPLE DATA


// SideNav -- Default Menu
const tmplSideNav = () => {
    return `
        <div class="containsScrollable">
            <ul class="object-navigator-list scrollable">
                <li>
                    <ul class="object-navigator-list">
                        <li>
                            <a class="object" href="/home">
                                <span class="pr-1"><i class="fas fa-home"></i></span>
                                <span class="object-navigator-label">Home</span>
                            </a>
                        </li>
                        <li>
                            <!--<a class="object" href="#">
                                <span class="pr-1"><i class="far fa-star"></i></span>
                                <span class="object-navigator-label">Shortcuts</span>
                            </a>-->
                        </li>
                    </ul>
                </li>
                <li class="objNavSeparator"></li>
                <li>
                    <ul class="object-navigator-list">
                        <li>
                            <a class="object selected" href="/devices">
                                <span class="pr-1"><i class="fas fa-server"></i></span>
                                <span class="object-navigator-label">Devices</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="objNavSeparator"></li>
                <li>
                    <ul class="object-navigator-list">
                        <li>
                            <a class="object" href="http://wsusdashboard.corporate.ge.com/wsus_dashboard/index.html"  target="_blank">
                                <span class="pr-1"><i class="fas fa-external-link-alt"></i></span>
                                <span class="object-navigator-label">WSUS Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a class="object" href="http://vdcgld03341.ics.cloud.ge.com/cgi-bin/selecttsl.cgi"  target="_blank">
                                <span class="pr-1"><i class="fas fa-external-link-alt"></i></span>
                                <span class="object-navigator-label">Targeted Server List</span>
                            </a>
                        </li>
                        <li>
                            <a class="object" href="http://patches.tsg.ge.com/standard/"  target="_blank">
                                <span class="pr-1"><i class="fas fa-external-link-alt"></i></span>
                                <span class="object-navigator-label">Unix Status (Standard)</span>
                            </a>
                        </li>
                        <li>
                            <a class="object" href="http://patches.tsg.ge.com/status/"  target="_blank">
                                <span class="pr-1"><i class="fas fa-external-link-alt"></i></span>
                                <span class="object-navigator-label">Unix Status (Concierge)</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="objNavSeparator"></li>
                <li>
                    <ul class="object-navigator-list">
                        <li>
                            <a class="object" href="#">
                                <span class="pr-1"><i class="fas fa-cogs"></i></span>
                                <span class="object-navigator-label">Administration</span>
                            </a>
                        </li>
                        <li>
                            <a class="object" href="https://github.com/mhigh1/Update-Manager"  target="_blank">
                                <span class="pr-1"><i class="fab fa-github"></i></span>
                                <span class="object-navigator-label">GitHub Repository</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    `;
}

// Document Ready
$(document).ready(function() {

    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get device group from URL
    $.get(`/api/deviceCollection/${urlParams.get('collectionId')}`)
    .then(function(data) {
        console.log(data);
        $('#collectionName').text(data.Name);

        // Get all devices with the device group
        $.get(`/api/devices?collectionId=${urlParams.get('collectionId')}`)
        .then(function(data) {
            console.log(data);
            
            $('#deviceCount').text(data.length);
        });
    });

    



    $('#devices').DataTable({
        "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
        "language": {
            "search": "Filter:"
          }
    });

    // Render the left-panel naviation
    $("#left-panel").html(tmplSideNav());
});