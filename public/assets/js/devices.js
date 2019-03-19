// MODULE: Devices

// SAMPLE DATA
const deviceGroups = [
    {
        groupName: "MO-FW2-TH-0000",
        MaintSchedule: "Monthly~FiscalWeek2~Thursday~00:00~Thursday~06:00",
        type: "Windows",
        deviceCount: 222
    },
    {
        groupName: "MO-FW2-TH-0600",
        MaintSchedule: "Monthly~FiscalWeek2~Thursday~06:00~Thursday~12:00",
        type: "Windows",
        deviceCount: 21
    },
    {
        groupName: "MO-FW2-TH-1200",
        MaintSchedule: "Monthly~FiscalWeek2~Thursday~12:00~Thursday~18:00",
        type: "Windows",
        deviceCount: 20
    },
    {
        groupName: "MO-FW2-TH-1800",
        MaintSchedule: "Monthly~FiscalWeek2~Thursday~18:00~Friday~00:00",
        type: "Windows",
        deviceCount: 65
    },
    {
        groupName: "MO-FW2-FR-0000",
        MaintSchedule: "Monthly~FiscalWeek2~Friday~00:00~Friday~06:00",
        type: "Windows",
        deviceCount: 47
    },
    {
        groupName: "MO-FW2-FR-0600",
        MaintSchedule: "Monthly~FiscalWeek2~Friday~06:00~Friday~12:00",
        type: "Windows",
        deviceCount: 0
    },
    {
        groupName: "MO-FW2-FR-1200",
        MaintSchedule: "Monthly~FiscalWeek2~Friday~12:00~Friday~18:00",
        type: "Windows",
        deviceCount: 1
    },
    {
        groupName: "MO-FW2-FR-1800",
        MaintSchedule: "Monthly~FiscalWeek2~Friday~18:00~Saturday~00:00",
        type: "Windows",
        deviceCount: 94
    },
    {
        groupName: "MO-FW2-SA-0000",
        MaintSchedule: "Monthly~FiscalWeek2~Saturday~00:00~Saturday~06:00",
        type: "Windows",
        deviceCount: 215
    },
    {
        groupName: "MO-FW2-SA-0600",
        MaintSchedule: "Monthly~FiscalWeek2~Saturday~06:00~Saturday~12:00",
        type: "Windows",
        deviceCount: 134
    },
    {
        groupName: "MO-FW2-SA-1200",
        MaintSchedule: "Monthly~FiscalWeek2~Saturday~12:00~Saturday~18:00",
        type: "Windows",
        deviceCount: 43
    },
    {
        groupName: "MO-FW2-SA-1800",
        MaintSchedule: "Monthly~FiscalWeek2~Saturday~18:00~Sunday~00:00",
        type: "Windows",
        deviceCount: 88
    },
    {
        groupName: "MO-FW2-SU-0000",
        MaintSchedule: "Monthly~FiscalWeek2~Sunday~00:00~Sunday~06:00",
        type: "Windows",
        deviceCount: 1889
    },
    {
        groupName: "MO-FW2-SU-0600",
        MaintSchedule: "Monthly~FiscalWeek2~Sunday~06:00~Sunday~12:00",
        type: "Windows",
        deviceCount: 56
    },
    {
        groupName: "MO-FW2-SU-1200",
        MaintSchedule: "Monthly~FiscalWeek2~Sunday~12:00~Sunday~18:00",
        type: "Windows",
        deviceCount: 35
    },
    {
        groupName: "MO-FW2-SU-1800",
        MaintSchedule: "Monthly~FiscalWeek2~Sunday~18:00~Monday~00:00",
        type: "Windows",
        deviceCount: 40
    },
    {
        groupName: "UNIX_MO-FW1-TH-0000",
        MaintSchedule: "Monthly~Week1~Thursday~00:00~Thursday~06:00",
        type: "Unix",
        deviceCount: 50
    }
];

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
const tmplDeviceCollectionRow = (groupName, maintSchedule, deviceCount) => {
    return `
        <tr>
            <td>${groupName}</td>
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

    let totalDevices = 0;

    // Render Device Collections table
    deviceGroups.forEach(element => {
        $("#deviceCollections tbody").append(tmplDeviceCollectionRow(element.groupName, element.MaintSchedule, element.deviceCount));
        totalDevices += element.deviceCount;
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
        
        // Render the card table rows
        $("#tblDevCollOverview tbody").append(tmplDevCollOverviewRow(os, groupCount, deviceTotal));
    });

    // Render Total Device Count
    $("#deviceCount").text(totalDevices);
    $("#collectionCount").text(deviceGroups.length);

    $('#deviceCollections').DataTable({
        "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
        "language": {
            "search": "Filter:"
          }
    });

    // Render the left-panel naviation
    $("#left-panel").html(tmplSideNav());
});