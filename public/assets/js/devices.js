// used by devices.hbs //

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
                           <!-- <a class="object" href="#">
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

// Device Collection Table Row Template
const tmplDeviceCollectionRow = (groupName, maintSchedule, deviceCount, groupId) => {
    return `
        <tr>
            <td><a href="/deviceGroup?targetGroupID=${groupId}">${groupName}</a></td>
            <td>${maintSchedule}</td>
            <td>${deviceCount}</td>
        </tr>
    `;
};

const tmplDevCollOverviewRow = (os, groupCount, deviceCount) => {
    return `
        <tr>
            <td>${os}</td>
            <td>${groupCount}</td>
            <td>${deviceCount}</td>
        </tr>
    `;
};

// Document Ready
$(document).ready(function() {

    // Render the left-panel naviation
    $("#left-panel").html(tmplSideNav());

    let totalDevices = 0;

    // Get all device groups
    $.get(`/api/devices/groups`).then(function(data) {
       let deviceGroups = data;

        deviceGroups.forEach(group => {
            if(group.name.includes('UNIX')) {
                group['type'] = "Unix";
            } else {
                group['type'] = "Windows";
            }
        });

        // Render Device Collections Overview card table
        // Get Unique OS types from array (ES6)
        const osTypes = [...new Set(deviceGroups.map(item => item.type))];
        
        // For each OS count the total number of groups and devices
        osTypes.forEach(os => {
            const array = deviceGroups.filter((obj) => obj.type === os);
            const groupCount = array.length;
            let deviceTotal = 0;

            array.forEach(element => {
                deviceTotal += element.deviceCount;
            });
            console.log(deviceTotal);
            // Render the card table rows
            $("#tblDevCollOverview tbody").append(tmplDevCollOverviewRow(os, groupCount, deviceTotal));
        });

        $("#collectionCount").text(deviceGroups.length);

        // Render Device Collections table
        deviceGroups.forEach(element => {
            $("#deviceCollections tbody").append(tmplDeviceCollectionRow(element.name, element.description, element.deviceCount, element.targetGroupID));
            totalDevices += element.deviceCount;
        });    
        
        // Render Total Device Count
        $("#deviceCount").text(totalDevices);

        $('#deviceCollections').DataTable({
            "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
            "language": {
                "search": "Filter:"
            }
        });
    });    
});