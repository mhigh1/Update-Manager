// TEMP DATA
const sampleData = [
    {
        id: 17,
        hostname: "CTS2012R2D1",
        manufacturer: "VMware, Inc",
        osName: "Windows Server 2012 R2",
        assetNo: "1002520656",
        osImgUrl: "/assets/images/microsoft_200x200.png"
    },
    {
        id: 2,
        hostname: "TESTRHEL7",
        manufacturer: "VMware, Inc",
        osName: "Red Hat Enterprise Linux",
        assetNo: "1002520657",
        osImgUrl: "/assets/images/redhat_200x200.png"
    }
];


// Template for Device Card
const tmplDeviceCard = (id, hostname, manufacturer, osName, assetNo, osImgUrl) => {
    return `
        <div class="card">
            <div class="card-header bg-white">
                <a href="/device?id=${id}">${hostname}</a>
                <div>
                    <span class="text-muted">${manufacturer}</span>
                </div>
            </div>
            <div class="card-body" style="font-size: .85rem">
                <img src="${osImgUrl}" width="50px" height="50px" style="float: left; margin-right: 1rem;">
                <div>${osName}</div>
                <div>${assetNo}</div>
            </div>
            <div class="card-footer text-muted text-right" style="padding: .5rem .75rem; font-size: .825rem"></div>
        </div>`;
}

// SideNav -- Default Menu
const tmplSideNav = () => {
    return `
        <div class="containsScrollable">
            <ul class="object-navigator-list scrollable">
                <li>
                    <ul class="object-navigator-list">
                        <li>
                            <a class="object selected" href="/home">
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
                            <a class="object" href="/devices">
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

$(document).ready(function() {

    // Render the left-panel naviation
    $("#left-panel").html(tmplSideNav());

    // Foreach record in array add a device card
    sampleData.forEach(el => {
        $("#deviceCards").append(tmplDeviceCard(el.id, el.hostname, el.manufacturer, el.osName, el.assetNo, el.osImgUrl));
    });

    // Add device count from array
    $("#deviceCount").text(sampleData.length);
});