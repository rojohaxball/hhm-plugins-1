var room = HBInit();

room.pluginSpec = {
  name: `rub/password`,
  author: `ruben`,
  version: `1.0.0`,
  config: {
    // Roles that can use the in room commands.
    allowedRoles : ['host']
  },
  dependencies: [
    `sav/roles`,
    `sav/commands`,
  ],
  order: {},
  incompatible_with: [],
};

let help = room.getPlugin(`sav/help`);
if ( help ) {
  help.registerHelp( `password`, `PASSWORD`, { numArgs: 1, roles: config.allowedRoles } );
  help.registerHelp( `clearpassword`, ``, { numArgs: 0, roles: config.allowedRoles } );
}

room.onCommand1_password = function ( player, arguments, argumentString ) {
  let roles = room.getPlugin(`sav/roles`);
  if ( !roles ) return;
  if ( roles.ensurePlayerRoles( player.id, config.allowedRoles, room ) ) {
    room.setPassword( arguments[0] );
    room.sendAnnouncement(`Password has been set!`, null, 0xFF0000);
    return false;
  }
}

room.onCommand0_clearpassword = function ( player, arguments, argumentString ) {
  let roles = room.getPlugin(`sav/roles`);
  if ( !roles ) return;
  if ( roles.ensurePlayerRoles( player.id, config.allowedRoles, room ) ) {
    room.setPassword( null );
    room.sendAnnouncement(`Password has been cleared!`, null, 0x00FF00);
  }
}


