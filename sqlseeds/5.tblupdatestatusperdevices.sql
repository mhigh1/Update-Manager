#alter table `valkyrie_db`.`tblupdatestatusperdevices` change pachageID packageID integer(11);
INSERT INTO `valkyrie_db`.`tblupdatestatusperdevices` (`deviceID`, `packageID`, `state`) VALUES ('2', '1', 'Available');
INSERT INTO `valkyrie_db`.`tblupdatestatusperdevices` (`deviceID`, `packageID`, `state`) VALUES ('2', '2', 'Available');
INSERT INTO `valkyrie_db`.`tblupdatestatusperdevices` (`deviceID`, `packageID`, `state`) VALUES ('2', '3', 'Available');
INSERT INTO `valkyrie_db`.`tblupdatestatusperdevices` (`deviceID`, `packageID`, `state`) VALUES ('3', '4', 'Staged');
INSERT INTO `valkyrie_db`.`tblupdatestatusperdevices` (`deviceID`, `packageID`, `state`) VALUES ('3', '5', 'Installed');
INSERT INTO `valkyrie_db`.`tblupdatestatusperdevices` (`deviceID`, `packageID`, `state`) VALUES ('1', '6', 'Available');
