$(function () {


    /* Val is Working here on api calls to the database */

    
    const render = function (items) {
        $('#db-items').empty();

        //appending each item to the table-items #
        items.forEach(function (item) {
            $('#db-items').append(renderItemRow(item));
        });
    }

    //api call and render
    const getItems = function () {
        $.get('/api/tblDevices').then(render);
    }

    const renderItemRow = function (item) {
        const tr = $('<tr>');

        const input = $('<input>').attr({
            type: 'number',
            min: 0,
            id: item.id
        });

        //appending items to the div
        tr.append(
            $('<td>').text(item.deviceID),
            $('<td>').text(item.hostName),
            $('<td>').text(item.fullDomainName),
            $('<td>').text(item.ipAddress),
            $('<td>').text(item.lastSyncTime),
            $('<td>').text(item.lastReportedStatusTime),
            $('<td>').text(item.lastReportedRebootTime),
            $('<td>').text(item.effectiveLastDetectionTime),
            $('<td>').text(item.lastSyncResult),
            $('<td>').text(item.parentServerID)
        );
        return tr;

        const JsonObj = {
            deviceID: item.deviceID,
            hostName:item.hostName,
            fullDomainName: item.fullDomainName,
            ipAddress: item.ipAddress,
            lastSyncTime: item.lastSyncTime,
            lastReportedStatusTime: item.lastReportedStatusTime,
            lastReportedRebootTime: item.lastReportedRebootTime,
            effectiveLastDetectionTime: item.effectiveLastDetectionTime,
            lastSyncResult: item.lastSyncResult,
            parentServerID: item.parentServerID,
            deviceGroup: item.deviceGroup,
            osFamily: item.osFamily
        }
    }
    getItems();
});