// Used by deviceGroup.hbs //

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

// Declare variables
let deviceCollection;
let devices;

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);


// Needs Attention table row template
const tmplCardNeedsAttentionRow = function(label, value) {
    return `
        <tr>
            <td>${label}</td>
            <td>${value}</td>
        </tr>
    `
};

const tmplTableRows = function(id, hostname, os, installed, needed, downloaded, pending, failed, unknown) {
    return `
        <tr>
            <td><a href="/device?id=${id}">${hostname}</a></td>
            <td>${os}</td>
            <td>${installed}</td>
            <td>${needed}</td>
            <td>${downloaded}</td>
            <td>${pending}</td>
            <td>${failed}</td>
            <td>${unknown}</td>
        </tr>
    `
}

// Get Device Group from API
$.get(`/api/devices/group/${urlParams.get('targetGroupID')}`).then(function(data) {
    deviceCollection = data;
        
    // Render Device Collection Overview
    $('#collectionName').text(deviceCollection.name);
    $('#collectionDesc').text(deviceCollection.description);
    $('#deviceCount').text(deviceCollection.deviceCount);
});

// Get Devices in Target Group
$.get(`/api/devices/devices?targetGroupID=${urlParams.get('targetGroupID')}`).then(function(data) {
    devices = data;
});
$.get(`/api/devices/updates?targetGroupID=${urlParams.get('targetGroupID')}`).then(function(data) {
    const updateStatusByDevice = data;
    
    const attentionStates = [
        {label: 'Reboot Required', state: 6},
        {label: 'Updates Failed', state: 5}
    ];

    attentionStates.forEach(item => {
        let value = updateStatusByDevice.filter(device => device.state === item.state).map(device => device.deviceID).filter((value, index, self) => self.indexOf(value) === index).length;
        $("#tblAttentionNeeded tbody").append(tmplCardNeedsAttentionRow(item.label, value));
    });
    
    needsAttentionCount = updateStatusByDevice.filter(device => device.state === 5 || device.state === 6)
        .map(device => device.deviceID)
        .filter((value, index, self) => self.indexOf(value) === index).length;

    $('#attentionNeeded').text(needsAttentionCount);
});

// Document Ready
$(document).ready(function() {

    // Render the left-panel naviation
    $("#left-panel").html(tmplSideNav());

    $.get(`/api/devices/updates/group/${urlParams.get('targetGroupID')}`).then(function(data) {
        let content = "";

        data.forEach(device => {
            content += tmplTableRows(device.DeviceID, device.hostName, device.OS, device.Installed, device.Needed, device.Downloaded, device.PendingReboot, device.Failed, device.Unknown);
        });

        $('#devices tbody').html(content);
        
        // Apply the DataTables UI
        $('#devices').DataTable({
            "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
            "language": {
                "search": "Filter:"
            }
        });
    });
});