# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

The Commands of the bot are its API so here's how it will adhere to Semantic Versioning:    
**MAJOR** - Changing/removing existing bot commands breaking how they previously functioned (incompatible API changes)     
**MINOR** - Adding new commands or functionality that won't affect or break existing ones    
**PATCH** - Bug fixes, code improvements (backwards-compatible bug fixes)

## [1.5.0] - 2016-10-21
### Added
- recently played songs are now checked when anyone joins the queue instead of just when current song is playing

## [1.4.4] - 2016-10-20
### Changed
- removing steve command (no one cares about this so I'm treating like patch lol)
- moved bot name to a config setting
- removed commas from youtube country flags

## [1.4.3] - 2016-10-19
### Changed
- fixing history bug
- added moment.js

## [1.4.2] - 2016-10-14
### Changed
- bug fixing

## [1.4.1] - 2016-10-14
### Changed
- fixed the history bug that was vexxing me

## [1.4.0] - 2016-10-14
### Added
- new admin command to refresh history

### Changed
- fix another bug with new history check

## [1.3.1] - 2016-10-14
### Changed
- fix bug with new history check

## [1.3.0] - 2016-10-13
### Added
- Added Cleverbot integration. Chat with cleverbot by using `@derpybot [your message]`
- Added Recently played warning

### Changed
- update usernames on logUser

## [1.2.2] - 2016-10-06
### Changed
- added approved users for !admin commands

## [1.2.1] - 2016-10-06
### Changed
- bug fixes

## [1.2.0] - 2016-10-05
### Added
- added more !admin commands

### Changed
- bug fixes

## [1.1.0] - 2016-10-05
note:  The previous release (0.1.0) should have been a 1.0.0 release because it had MAJOR changes that broke previous functionality so I'm going to jump this relase to 1.1.0.

### Changed
- create separate gh-pages for commands
- code improvements
- added !admin reconnect command

## [0.1.0] - 2016-09-30
### Added
- !flowpoint, !flowpoint @username
- Loaded in all the previous chat triggers from Mixerbot
- !trigger, add/update/del triggers (mod only)
- !sayhi @[username]
- !giphy [search text]
- youtube broken link auto skip
- bot notifies chat of youtube region registriction
- !admin, adding some admin commands, right now it only can restart (owner of bot only)

### Changed
- Stevebot became DerpyBot
- Updated Readme
- Switched from using MongoDB to Firebase
- Disabled Raffles
- Lots of Code improvements
- Added more responses to !bot
- changed the response to !steve
- removed !boo
- removed !chuck
- removed !missuniverse
- removed !meh
- got rid of some undocumented and unnessecary credit related commands
- made !help and !commands the same (both do !commands)
- moved !heart points to incrememnt props, no more separate !heart points

-------------------

## Change Log for previous SteveBot

## [0.0.3] - 2016-02-09
### Added
- !front @username to move @username to front of queue
- !lock/!pause @username to pause @username's queue
- !lockskip to skip the current dj and pause their queue
- !skip and all other !skip [reason]
- Commands list to readme [https://github.com/coryshaw1/stevebot#commands](https://github.com/coryshaw1/stevebot#commands)
- Add Travis CI build check [https://travis-ci.org/coryshaw1/stevebot](https://travis-ci.org/coryshaw1/stevebot)
- Add node dependency check [https://david-dm.org/coryshaw1/stevebot](https://david-dm.org/coryshaw1/stevebot)


### Changed
- !raffle can be used by Managers and higher now to manually start a raffle
- !commands now links to [https://github.com/coryshaw1/stevebot#commands](https://github.com/coryshaw1/stevebot#commands)
- Raffles will not start if the queue is empty or only contains 1 person
- stevebot now requires at least Node 4.3.0 due to a vulnerability

### Fixed
- Fixed !fire chat output type
- Fixed bug where credits could be given to the same user using the @ parameter of the command
- Fixed bug where users that heart/love were being added to users that propped array, and couldn't heart during a song they propped
- Fixed bug where Steve could potentially kick himself (Just like during Miss Universe)

## [0.0.2] - 2016-02-03
### Added
- !commands/!help - Outputs some starter commands
- !fire - Same as !props or !tune with a different message
- !myfire/!myprops/!mytunes/!myhearts/!mylove - Output users number of flames
- !steve/!missuniverse - A couple jabs at who this bot is named after
- Added Jethro logger
    - Use with `bot.log`
- Added this file!

### Changed
- Completely restructured and refactored
    - Inspired by [NitroGhost/dubbot-starter](https://github.com/NitroGhost/dubbot-starter) by [@NitroGhost](https://github.com/NitroGhost)
- Split out all commands/events into separate files
- !balance - Can now look up other's balances by `!balance @username`
- !props/!tune/!heart/!love - Can now prop/heart people not DJing by `!command @username`
    - Limited once per song

### Fixed
- Fixed !dubx command's chat output
- Fixed invalid JOIN/LEFT logs

## [0.0.1] - 2016-02-01
- Initial release